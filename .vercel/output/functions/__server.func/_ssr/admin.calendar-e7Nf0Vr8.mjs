import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { B as ChevronRight, V as ChevronLeft } from "../_libs/lucide-react.mjs";
import { c as dayKey, d as fmtTime, g as statusTone } from "./format-DLdEZFeI.mjs";
import { d as useAppointments, i as PageTitle, o as RowsSkeleton } from "./admin-data-Bn9IN1fZ.mjs";
import { t as AppointmentSheet } from "./AppointmentSheet-CKKGPRYY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.calendar-e7Nf0Vr8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var addDays = (d, n) => new Date(d.getTime() + n * 864e5);
var startOfWeek = (d) => addDays(d, -((d.getDay() + 6) % 7));
var toneCls = {
	success: "border-l-success bg-success-soft",
	primary: "border-l-primary bg-accent",
	warning: "border-l-warning bg-warning-soft",
	danger: "border-l-destructive bg-danger-soft",
	neutral: "border-l-slate bg-muted",
	info: "border-l-sky bg-info-soft",
	navy: "border-l-navy bg-info-soft"
};
function Chip({ a, onClick, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("w-full rounded-sm border-l-2 px-1.5 py-1 text-left text-[11px] leading-tight hover:opacity-80", toneCls[statusTone[a.status] ?? "neutral"], a.status === "cancelled" && "line-through opacity-60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular font-bold text-navy",
				children: fmtTime(a.starts_at)
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-navy",
				children: [
					a.customer?.first_name,
					" ",
					compact ? "" : a.customer?.last_name
				]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-slate",
				children: a.service?.name
			})
		]
	});
}
function CalendarPage() {
	const a = useAppointments();
	const isMobile = useIsMobile();
	const [selectedView, setView] = (0, import_react.useState)(null);
	const view = selectedView ?? (isMobile ? "day" : "week");
	const [anchor, setAnchor] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [sel, setSel] = (0, import_react.useState)(null);
	const byDay = (0, import_react.useMemo)(() => (a.data ?? []).reduce((acc, x) => ((acc[dayKey(x.starts_at)] ??= []).push(x), acc), {}), [a.data]);
	const today = dayKey(/* @__PURE__ */ new Date());
	const step = view === "day" ? 1 : view === "week" ? 7 : 30;
	const days = view === "day" ? [anchor] : view === "week" ? Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(anchor), i)) : (() => {
		const s = startOfWeek(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
		return Array.from({ length: 42 }, (_, i) => addDays(s, i));
	})();
	const title = view === "month" ? anchor.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric"
	}) : view === "week" ? `Week of ${days[0].toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	})}` : anchor.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	const current = sel ? a.data?.find((x) => x.id === sel) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Calendar",
				subtitle: title,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-full rounded-md border bg-surface p-0.5 sm:w-auto",
						children: [
							"day",
							"week",
							"month"
						].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: view === v ? "navy" : "ghost",
							size: "sm",
							"aria-pressed": view === v,
							onClick: () => setView(v),
							className: "h-11 flex-1 capitalize sm:h-8 sm:flex-none",
							children: v
						}, v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						"aria-label": "Previous",
						onClick: () => setAnchor(addDays(anchor, -step)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setAnchor(/* @__PURE__ */ new Date()),
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						"aria-label": "Next",
						onClick: () => setAnchor(addDays(anchor, step)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					})
				] })
			}),
			a.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {}) : view === "day" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border bg-surface",
				children: [
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17
				].map((h) => {
					const list = (byDay[dayKey(anchor)] ?? []).filter((x) => Number(new Intl.DateTimeFormat("en-US", {
						timeZone: "America/Chicago",
						hour: "numeric",
						hour12: false
					}).format(new Date(x.starts_at))) === h);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-14 border-b last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular w-16 shrink-0 border-r px-2 py-2 text-[11px] text-slate",
							children: [
								h > 12 ? h - 12 : h,
								":00 ",
								h >= 12 ? "PM" : "AM"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 flex-wrap gap-2 p-1.5",
							children: list.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full sm:w-64",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									a: x,
									onClick: () => setSel(x.id)
								})
							}, x.id))
						})]
					}, h);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("grid min-w-[700px] grid-cols-7 gap-px overflow-hidden rounded-md border bg-border"),
					children: [[
						"Mon",
						"Tue",
						"Wed",
						"Thu",
						"Fri",
						"Sat",
						"Sun"
					].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary/60 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate",
						children: d
					}, d)), days.map((d) => {
						const k = dayKey(d);
						const list = byDay[k] ?? [];
						const out = view === "month" && d.getMonth() !== anchor.getMonth();
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("bg-surface p-1.5", view === "week" ? "min-h-[360px]" : "min-h-[104px]", out && "bg-muted/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("tabular mb-1 text-xs font-bold", k === today ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground" : out ? "text-mist" : "text-navy"),
								children: d.getDate()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [list.slice(0, view === "month" ? 3 : 10).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									a: x,
									compact: view === "month",
									onClick: () => setSel(x.id)
								}, x.id)), view === "month" && list.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setAnchor(d);
										setView("day");
									},
									className: "text-[10px] font-semibold text-primary",
									children: [
										"+",
										list.length - 3,
										" more"
									]
								})]
							})]
						}, k);
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "Times shown in Central Time (Dallas)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentSheet, {
				appt: current,
				onClose: () => setSel(null)
			})
		]
	});
}
//#endregion
export { CalendarPage as component };
