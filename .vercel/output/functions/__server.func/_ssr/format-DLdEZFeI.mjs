//#region node_modules/.nitro/vite/services/ssr/assets/format-DLdEZFeI.js
var TZ = "America/Chicago";
var money = (n) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
}).format(n ?? 0);
var fmtDate = (d, opts = {
	month: "short",
	day: "numeric"
}) => d ? new Intl.DateTimeFormat("en-US", {
	timeZone: TZ,
	...opts
}).format(new Date(d)) : "—";
var fmtTime = (d) => new Intl.DateTimeFormat("en-US", {
	timeZone: TZ,
	hour: "numeric",
	minute: "2-digit"
}).format(new Date(d));
var fmtDateTime = (d) => `${fmtDate(d)} · ${fmtTime(d)}`;
function timeAgo(d) {
	const s = Math.max(1, Math.round((Date.now() - new Date(d).getTime()) / 1e3));
	if (s < 60) return `${s}s ago`;
	const m = Math.round(s / 60);
	if (m < 60) return `${m}m ago`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}h ago`;
	const days = Math.round(h / 24);
	return days < 30 ? `${days}d ago` : fmtDate(d);
}
/** YYYY-MM-DD for a Date in the business timezone */
function dayKey(d) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(new Date(d));
}
/** Build an ISO timestamp from a business-local date + "10:00 AM" style label. */
function localToIso(date, label) {
	const m = label.match(/(\d+):(\d+)\s*(AM|PM)/i);
	let h = m ? parseInt(m[1]) % 12 : 9;
	if (m && m[3].toUpperCase() === "PM") h += 12;
	const min = m ? parseInt(m[2]) : 0;
	const guess = /* @__PURE__ */ new Date(`${date}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:00Z`);
	const local = new Date(guess.toLocaleString("en-US", { timeZone: TZ }));
	const offset = guess.getTime() - local.getTime();
	return new Date(guess.getTime() + offset).toISOString();
}
var LEAD_STATUSES = [
	"new",
	"contacted",
	"qualified",
	"quoted",
	"booked",
	"completed",
	"lost"
];
var LEAD_SOURCES = [
	"website",
	"google",
	"instagram",
	"facebook",
	"phone",
	"referral"
];
var QUOTE_STATUSES = [
	"draft",
	"sent",
	"viewed",
	"accepted",
	"declined",
	"expired"
];
var APPT_STATUSES = [
	"requested",
	"confirmed",
	"in_progress",
	"completed",
	"cancelled",
	"no_show"
];
var FU_STATUSES = [
	"pending",
	"scheduled",
	"completed",
	"cancelled"
];
var FU_TYPES = {
	quote: "Quote follow-up",
	no_response: "No-response follow-up",
	missed_inquiry: "Missed inquiry",
	appointment_reminder: "Appointment reminder",
	post_service: "Post-service follow-up",
	reactivation: "Customer reactivation"
};
var label = (s) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
var statusTone = {
	new: "primary",
	contacted: "info",
	qualified: "navy",
	quoted: "warning",
	booked: "success",
	completed: "neutral",
	lost: "danger",
	draft: "neutral",
	sent: "info",
	viewed: "primary",
	accepted: "success",
	declined: "danger",
	expired: "neutral",
	requested: "warning",
	confirmed: "success",
	in_progress: "primary",
	cancelled: "danger",
	no_show: "danger",
	pending: "warning",
	scheduled: "info",
	active: "success",
	paused: "neutral",
	success: "success",
	skipped: "neutral",
	failed: "danger"
};
var fullName = (c) => c ? `${c.first_name} ${c.last_name}` : "—";
var vehicleName = (v) => v ? `${v.year} ${v.make} ${v.model}` : "—";
//#endregion
export { timeAgo as _, LEAD_STATUSES as a, dayKey as c, fmtTime as d, fullName as f, statusTone as g, money as h, LEAD_SOURCES as i, fmtDate as l, localToIso as m, FU_STATUSES as n, QUOTE_STATUSES as o, label as p, FU_TYPES as r, TZ as s, APPT_STATUSES as t, fmtDateTime as u, vehicleName as v };
