import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Q as BellRing, X as CalendarCheck, Y as CalendarClock, j as FileText, o as UserPlus } from "../_libs/lucide-react.mjs";
import { _ as timeAgo, a as LEAD_STATUSES, c as dayKey, d as fmtTime, f as fullName, h as money, l as fmtDate, p as label, r as FU_TYPES, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { S as useRecentActivity, a as Panel, d as useAppointments, g as useFollowUps, i as PageTitle, o as RowsSkeleton, r as Kpi, s as StatusBadge, t as EmptyState, x as useQuotes, y as useLeads } from "./admin-data-Bn9IN1fZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-BaqLjH8X.js
var import_jsx_runtime = require_jsx_runtime();
function greeting() {
	const h = Number(new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Chicago",
		hour: "numeric",
		hour12: false
	}).format(/* @__PURE__ */ new Date()));
	return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}
function Overview() {
	const leads = useLeads();
	const quotes = useQuotes();
	const appts = useAppointments();
	const fus = useFollowUps();
	const activity = useRecentActivity();
	const today = dayKey(/* @__PURE__ */ new Date());
	const weekAgo = Date.now() - 6048e5;
	const L = leads.data ?? [];
	const upcoming = (appts.data ?? []).filter((a) => new Date(a.starts_at).getTime() > Date.now() - 36e5 && ![
		"cancelled",
		"no_show",
		"completed"
	].includes(a.status)).slice(0, 6);
	const pendingFu = (fus.data ?? []).filter((f) => f.status === "pending" || f.status === "scheduled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: `${greeting()}, Mike.`,
				subtitle: "Here's what's happening with your detailing business."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: UserPlus,
						label: "New leads",
						value: L.filter((l) => l.status === "new").length,
						hint: `${L.filter((l) => new Date(l.created_at).getTime() > weekAgo).length} received this week`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: FileText,
						label: "Open quotes",
						value: (quotes.data ?? []).filter((q) => [
							"draft",
							"sent",
							"viewed"
						].includes(q.status)).length,
						hint: "Draft, sent or viewed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: CalendarCheck,
						label: "Booked",
						value: (appts.data ?? []).filter((a) => ["confirmed", "requested"].includes(a.status) && new Date(a.starts_at).getTime() > Date.now()).length,
						hint: "Upcoming appointments"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: BellRing,
						label: "Follow-ups",
						value: pendingFu.length,
						hint: "Pending or scheduled"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: CalendarClock,
						label: "Today",
						value: (appts.data ?? []).filter((a) => dayKey(a.starts_at) === today && a.status !== "cancelled").length,
						hint: "Appointments today"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Lead pipeline",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/pipeline",
					className: "text-xs font-semibold text-primary",
					children: "Open pipeline →"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-px overflow-hidden rounded border bg-border min-[480px]:grid-cols-4 sm:grid-cols-7 [&>*:last-child]:col-span-2 min-[480px]:[&>*:last-child]:col-span-1",
					children: LEAD_STATUSES.map((s) => {
						const items = L.filter((l) => l.status === s);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/leads",
							search: { status: s },
							className: "bg-surface p-3 hover:bg-secondary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-slate",
									children: label(s)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular mt-1 text-2xl font-extrabold text-navy",
									children: items.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular text-[11px] text-slate",
									children: money(items.reduce((a, l) => a + l.estimated_value, 0))
								})
							]
						}, s);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Recent leads",
					className: "lg:col-span-2",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/leads",
						className: "text-xs font-semibold text-primary",
						children: "All leads →"
					}),
					bodyClass: "p-0",
					children: leads.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 5 })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: L.slice(0, 7).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/leads/$id",
							params: { id: l.id },
							className: "flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-bold text-navy",
										children: fullName(l.customer)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-slate",
										children: [
											vehicleName(l.vehicle),
											" · ",
											l.service?.name
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular hidden text-sm font-semibold text-navy sm:block",
									children: money(l.estimated_value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular w-14 text-right text-[11px] text-slate",
									children: timeAgo(l.created_at)
								})
							]
						}) }, l.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Recent activity",
					bodyClass: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: (activity.data ?? []).slice(0, 9).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-navy",
								children: a.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate",
								children: [
									fullName(a.customer),
									" · ",
									timeAgo(a.created_at)
								]
							})]
						}, a.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Upcoming appointments",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/calendar",
						className: "text-xs font-semibold text-primary",
						children: "Calendar →"
					}),
					bodyClass: "p-0",
					children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No upcoming appointments" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: upcoming.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-16 shrink-0 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase text-slate",
										children: fmtDate(a.starts_at, { weekday: "short" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular text-sm font-bold text-navy",
										children: fmtTime(a.starts_at)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-bold text-navy",
										children: fullName(a.customer)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-slate",
										children: [
											vehicleName(a.vehicle),
											" · ",
											a.service?.name
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })
							]
						}, a.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Pending follow-ups",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/follow-ups",
						className: "text-xs font-semibold text-primary",
						children: "All →"
					}),
					bodyClass: "p-0",
					children: pendingFu.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "All caught up" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: pendingFu.slice(0, 6).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-bold text-navy",
									children: [
										fullName(f.customer),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-slate",
											children: ["· ", FU_TYPES[f.type]]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-slate",
									children: f.reason
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-[11px] text-slate",
								children: fmtDate(f.next_contact_at)
							})]
						}, f.id))
					})
				})]
			})
		]
	});
}
//#endregion
export { Overview as component };
