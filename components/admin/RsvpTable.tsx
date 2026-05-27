import type { RsvpResponse } from "@/lib/rsvp-types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function RsvpTable({ responses }: { responses: RsvpResponse[] }) {
  if (responses.length === 0) {
    return (
      <p className="rounded-2xl bg-cream p-8 text-center text-ink-muted">
        No RSVPs yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-cream shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-beige text-xs uppercase tracking-wider text-ink-muted">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Attending</th>
            <th className="px-4 py-3 font-medium">Guests</th>
            <th className="px-4 py-3 font-medium">Dietary</th>
            <th className="px-4 py-3 font-medium">Message</th>
            <th className="px-4 py-3 font-medium">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((row) => (
            <tr key={row.id} className="border-b border-beige/60 last:border-0">
              <td className="px-4 py-3 font-medium text-ink">{row.full_name}</td>
              <td className="px-4 py-3 text-ink-muted">{row.email ?? "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    row.attending
                      ? "rounded-full bg-dusty/15 px-2 py-0.5 text-dusty-dark"
                      : "rounded-full bg-beige px-2 py-0.5 text-ink-muted"
                  }
                >
                  {row.attending ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-4 py-3 text-ink-muted">
                {row.attending ? row.guest_count : "—"}
              </td>
              <td className="max-w-[140px] truncate px-4 py-3 text-ink-muted" title={row.dietary_notes ?? undefined}>
                {row.dietary_notes || "—"}
              </td>
              <td className="max-w-[160px] truncate px-4 py-3 text-ink-muted" title={row.message ?? undefined}>
                {row.message || "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                {formatDate(row.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
