"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { ContentSubNav } from "@/components/admin/ContentSubNav";
import { AdminNav } from "@/components/admin/AdminNav";

export function ContentEditorShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, saving, message, error, save, config } = useContentConfig();

  if (loading) {
    return (
      <>
        <AdminHeader title="Edit invitation" />
        <AdminNav />
        <p className="text-center text-ink-muted">Loading…</p>
      </>
    );
  }

  if (!config) {
    return (
      <>
        <AdminHeader title="Edit invitation" />
        <AdminNav />
        <p className="rounded-2xl bg-cream p-8 text-center text-red-700">
          {error || "Could not load site settings."}
        </p>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Edit invitation" />
      <AdminNav />
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-beige bg-sand/95 px-4 py-3 backdrop-blur-sm md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            Pick a section to edit, then save when you are done.
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="min-h-[48px] shrink-0 rounded-full bg-dusty px-8 py-2 text-base font-medium text-cream hover:bg-dusty-dark disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save all changes"}
          </button>
        </div>
        {message && (
          <p
            className="mt-3 rounded-xl bg-cream px-4 py-2 text-sm text-dusty-dark"
            role="status"
          >
            {message}
          </p>
        )}
        {error && (
          <p
            className="mt-3 rounded-xl bg-cream px-4 py-2 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <div className="md:grid md:grid-cols-[200px_1fr] md:gap-8">
        <ContentSubNav />
        <div>{children}</div>
      </div>
    </>
  );
}
