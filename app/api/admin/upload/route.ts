import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { STORAGE_BUCKET } from "@/lib/site-config-schema";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { requireAdminApi } from "@/lib/verify-admin-api";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "audio/mpeg",
  "audio/mp3",
]);

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
};

export async function POST(request: NextRequest) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (folder !== "gallery" && folder !== "story" && folder !== "audio") {
    return NextResponse.json(
      { error: "folder must be gallery, story, or audio" },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed. Use JPEG, PNG, WebP, or MP3." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = EXT[file.type] ?? "bin";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError.message);
    return NextResponse.json(
      {
        error:
          uploadError.message.includes("Bucket not found")
            ? "Storage bucket not found. Create the wedding-assets bucket in Supabase (see README)."
            : "Upload failed",
      },
      { status: 500 },
    );
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
