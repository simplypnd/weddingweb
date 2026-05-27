"use client";

import { useRouter } from "next/navigation";

export function AdminHeader({
  title = "RSVP Responses",
  subtitle = "Private admin view",
}: {
  title?: string;
  subtitle?: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-dusty px-6 py-2 text-sm font-medium text-dusty-dark transition-colors hover:bg-dusty hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty"
      >
        Log out
      </button>
    </header>
  );
}
