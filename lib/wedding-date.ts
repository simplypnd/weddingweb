/** Format a Date as local `YYYY-MM-DDTHH:mm:ss` for the countdown. */
export function formatLocalIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}:00`;
}

/** Parse hero date + time text into a local ISO string for the countdown. */
export function parseDisplayToIso(
  dateDisplay: string,
  timeDisplay: string,
): string | null {
  const combined = `${dateDisplay.trim()} ${timeDisplay.trim()}`;
  if (!combined.trim()) return null;

  let d = new Date(combined);
  if (!Number.isNaN(d.getTime())) return formatLocalIso(d);

  const withoutWeekday = dateDisplay.replace(/^[A-Za-z]+,\s*/, "").trim();
  d = new Date(`${withoutWeekday} ${timeDisplay.trim()}`);
  if (!Number.isNaN(d.getTime())) return formatLocalIso(d);

  return null;
}

export function isoToPickers(dateIso: string): { date: string; time: string } {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) {
    return { date: "", time: "" };
  }
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return { date, time };
}

export function applyPickers(
  date: string,
  time: string,
): { dateIso: string; dateDisplay: string; timeDisplay: string } | null {
  if (!date || !time) return null;

  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null;

  const local = new Date(y, m - 1, d, hh, mm);
  if (Number.isNaN(local.getTime())) return null;

  return {
    dateIso: formatLocalIso(local),
    dateDisplay: local.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    timeDisplay: local.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export function syncWeddingFromDisplay(
  dateDisplay: string,
  timeDisplay: string,
  currentIso: string,
): string {
  return parseDisplayToIso(dateDisplay, timeDisplay) ?? currentIso;
}
