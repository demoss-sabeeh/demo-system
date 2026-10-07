export const TZ = "America/Chicago";

export const money = (n: number | null | undefined) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n ?? 0);

export const fmtDate = (d: string | Date | null | undefined, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) =>
  d ? new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(new Date(d)) : "—";

export const fmtTime = (d: string | Date) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(d));

export const fmtDateTime = (d: string | Date) => `${fmtDate(d)} · ${fmtTime(d)}`;

export function timeAgo(d: string | Date) {
  const s = Math.max(1, Math.round((Date.now() - new Date(d).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  return days < 30 ? `${days}d ago` : fmtDate(d);
}

/** YYYY-MM-DD for a Date in the business timezone */
export function dayKey(d: string | Date) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(d));
  return p;
}

/** Build an ISO timestamp from a business-local date + "10:00 AM" style label. */
export function localToIso(date: string, label: string) {
  const m = label.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let h = m ? parseInt(m[1]) % 12 : 9;
  if (m && m[3].toUpperCase() === "PM") h += 12;
  const min = m ? parseInt(m[2]) : 0;
  // Find the UTC offset for America/Chicago on that date.
  const guess = new Date(`${date}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:00Z`);
  const local = new Date(guess.toLocaleString("en-US", { timeZone: TZ }));
  const offset = guess.getTime() - local.getTime();
  return new Date(guess.getTime() + offset).toISOString();
}

export const LEAD_STATUSES = ["new", "contacted", "qualified", "quoted", "booked", "completed", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export const LEAD_SOURCES = ["website", "google", "instagram", "facebook", "phone", "referral"] as const;
export const QUOTE_STATUSES = ["draft", "sent", "viewed", "accepted", "declined", "expired"] as const;
export const APPT_STATUSES = ["requested", "confirmed", "in_progress", "completed", "cancelled", "no_show"] as const;
export const FU_STATUSES = ["pending", "scheduled", "completed", "cancelled"] as const;
export const FU_TYPES: Record<string, string> = {
  quote: "Quote follow-up",
  no_response: "No-response follow-up",
  missed_inquiry: "Missed inquiry",
  appointment_reminder: "Appointment reminder",
  post_service: "Post-service follow-up",
  reactivation: "Customer reactivation",
};

export const label = (s: string) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export type Tone = "neutral" | "info" | "primary" | "success" | "warning" | "danger" | "navy";
export const statusTone: Record<string, Tone> = {
  new: "primary", contacted: "info", qualified: "navy", quoted: "warning", booked: "success", completed: "neutral", lost: "danger",
  draft: "neutral", sent: "info", viewed: "primary", accepted: "success", declined: "danger", expired: "neutral",
  requested: "warning", confirmed: "success", in_progress: "primary", cancelled: "danger", no_show: "danger",
  pending: "warning", scheduled: "info", active: "success", paused: "neutral", success: "success", skipped: "neutral", failed: "danger",
};

export const fullName = (c?: { first_name: string; last_name: string } | null) => (c ? `${c.first_name} ${c.last_name}` : "—");
export const vehicleName = (v?: { year: number; make: string; model: string } | null) => (v ? `${v.year} ${v.make} ${v.model}` : "—");
