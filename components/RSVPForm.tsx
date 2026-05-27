"use client";

import { FormEvent, useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

type FormState = "idle" | "submitting" | "success" | "error";

export function RSVPForm({ config }: { config: SiteConfig }) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (attending === null) {
      setErrorMessage("Please let us know if you can attend.");
      setState("error");
      return;
    }

    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      full_name: String(data.get("full_name") ?? ""),
      email: String(data.get("email") ?? ""),
      attending,
      guest_count: attending ? Number(data.get("guest_count") ?? 1) : 1,
      dietary_notes: String(data.get("dietary_notes") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      form.reset();
      setAttending(null);
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-2xl bg-cream p-8 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="font-serif text-2xl text-dusty-dark">Thank you!</p>
        <p className="mt-3 text-ink-muted">
          Your RSVP has been received. We can&apos;t wait to celebrate with you.
        </p>
        <button
          type="button"
          className="mt-6 min-h-[44px] text-sm font-medium text-dusty-dark underline-offset-2 hover:underline"
          onClick={() => setState("idle")}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-ink">
          Full name <span className="text-dusty">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Will you attend? <span className="text-dusty">*</span>
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex min-h-[48px] cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="attending_ui"
              checked={attending === true}
              onChange={() => setAttending(true)}
              className="h-5 w-5 accent-dusty"
            />
            <span>Joyfully accepts</span>
          </label>
          <label className="flex min-h-[48px] cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="attending_ui"
              checked={attending === false}
              onChange={() => setAttending(false)}
              className="h-5 w-5 accent-dusty"
            />
            <span>Regretfully declines</span>
          </label>
        </div>
      </fieldset>

      {attending && (
        <div>
          <label htmlFor="guest_count" className="mb-1.5 block text-sm font-medium text-ink">
            Number of guests (including you)
          </label>
          <select
            id="guest_count"
            name="guest_count"
            defaultValue={1}
            className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
          >
            {Array.from({ length: config.rsvp.maxGuests }, (_, i) => i + 1).map(
              (n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ),
            )}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="dietary_notes" className="mb-1.5 block text-sm font-medium text-ink">
          Dietary restrictions
        </label>
        <textarea
          id="dietary_notes"
          name="dietary_notes"
          rows={3}
          className="w-full rounded-xl border border-beige bg-cream px-4 py-3 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message to the couple
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-xl border border-beige bg-cream px-4 py-3 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
        />
      </div>

      {state === "error" && errorMessage && (
        <p className="text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full min-h-[48px] rounded-full bg-dusty px-6 py-3 text-base font-medium text-cream transition-colors hover:bg-dusty-dark disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty"
      >
        {state === "submitting" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
