import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminNav } from "@/components/admin/AdminNav";
import { RsvpTable } from "@/components/admin/RsvpTable";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { RsvpResponse } from "@/lib/rsvp-types";
export const dynamic = "force-dynamic";

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-cream px-4 py-5 text-center shadow-sm">
      <p className="text-2xl font-semibold text-dusty-dark md:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted md:text-sm">
        {label}
      </p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return (
      <>
        <AdminHeader />
        <p className="rounded-2xl bg-cream p-8 text-center text-ink-muted">
          Supabase is not configured. Add your environment variables and restart the
          server.
        </p>
      </>
    );
  }

  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <>
        <AdminHeader />
        <p className="rounded-2xl bg-cream p-8 text-center text-red-700">
          Failed to load RSVPs: {error.message}
        </p>
      </>
    );
  }

  const responses = (data ?? []) as RsvpResponse[];
  const attending = responses.filter((r) => r.attending);
  const declined = responses.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0);

  return (
    <>
      <AdminHeader />
      <AdminNav />
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <SummaryCard label="Total responses" value={responses.length} />
        <SummaryCard label="Attending" value={attending.length} />
        <SummaryCard label="Declined" value={declined.length} />
        <SummaryCard label="Total guests" value={totalGuests} />
      </div>
      <RsvpTable responses={responses} />
    </>
  );
}
