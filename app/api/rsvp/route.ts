import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { rsvpSchema } from "@/lib/validations";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const data = parsed.data;
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "RSVP is not configured yet. Please set Supabase environment variables.",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("rsvp_responses").insert({
    full_name: data.full_name,
    email: data.email || null,
    attending: data.attending,
    guest_count: data.attending ? data.guest_count : 0,
    dietary_notes: data.dietary_notes || null,
    message: data.message || null,
  });

  if (error) {
    console.error("RSVP insert error:", error.message);
    return NextResponse.json(
      { error: "Failed to save RSVP. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
