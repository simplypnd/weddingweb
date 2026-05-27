"use client";

import { useState } from "react";

type Props = {
  label: string;
  folder: "gallery" | "story";
  currentUrl: string;
  onUrlChange: (url: string) => void;
};

export function ImageUploadField({
  label,
  folder,
  currentUrl,
  onUrlChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Upload failed");
        return;
      }
      onUrlChange(body.url);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink">{label}</label>
      {currentUrl && (
        <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg bg-beige">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={uploading}
        className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-dusty file:px-4 file:py-2 file:text-sm file:font-medium file:text-cream"
      />
      <input
        type="url"
        value={currentUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Or paste image URL"
        className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
      />
      {uploading && <p className="text-sm text-ink-muted">Uploading…</p>}
      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
