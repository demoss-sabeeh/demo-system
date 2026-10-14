import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as LEAD_STATUSES, c as dayKey, i as LEAD_SOURCES, l as fmtDate, o as QUOTE_STATUSES, p as label } from "./format-DLdEZFeI.mjs";
import { a as Panel, d as useAppointments, g as useFollowUps, i as PageTitle, o as RowsSkeleton, x as useQuotes, y as useLeads } from "./admin-data-Bn9IN1fZ.mjs";
import { a as Bar, c as Tooltip, i as CartesianGrid, n as YAxis, o as Cell, r as XAxis, s as ResponsiveContainer, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.analytics-m-Yrv45L.js
var import_jsx_runtime = require_jsx_runtime();
var C = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function Bars({ data, color = C[0], height = 200 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			margin: {
				top: 4,
				right: 4,
				left: -24,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					vertical: false,
					stroke: "var(--color-border)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "name",
					tick: {
						fontSize: 10,
						fill: "var(--color-slate)"
					},
					tickLine: false,
					axisLine: false,
					interval: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					allowDecimals: false,
					tick: {
						fontSize: 10,
						fill: "var(--color-slate)"
					},
					tickLine: false,
					axisLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					cursor: { fill: "var(--color-secondary)" },
					contentStyle: {
						fontSize: 12,
						borderRadius: 6,
						border: "1px solid var(--color-border)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "value",
					radius: [
						3,
						3,
						0,
						0
					],
					fill: color
				})
			]
		})
	});
}
function HBar({ rows }) {
	const max = Math.max(1, ...rows.map((r) => r.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2.5",
		children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-navy",
				children: r.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-slate",
				children: r.value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 h-1.5 rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full",
				style: {
					width: `${r.value / max * 100}%`,
					background: C[i % 3]
				}
			})
		})] }, r.name))
	});
}
function Analytics() {
	const leads = useLeads();
	const quotes = useQuotes();
	const appts = useAppointments();
	const fus = useFollowUps();
	if (leads.isLoading || appts.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 8 });
	const L = leads.data ?? [];
	const volume = Array.from({ length: 14 }, (_, i) => /* @__PURE__ */ new Date(Date.now() - (13 - i) * 864e5)).map((d) => ({
		name: fmtDate(d, {
			month: "numeric",
			day: "numeric"
		}),
		value: L.filter((l) => dayKey(l.created_at) === dayKey(d)).length
	}));
	const pipeline = LEAD_STATUSES.map((s) => ({
		name: label(s),
		value: L.filter((l) => l.status === s).length
	}));
	const quoteStatus = QUOTE_STATUSES.map((s) => ({
		name: label(s),
		value: (quotes.data ?? []).filter((q) => q.status === s).length
	}));
	const sources = LEAD_SOURCES.map((s) => ({
		name: label(s),
		value: L.filter((l) => l.source === s).length
	})).sort((a, b) => b.value - a.value);
	const demand = Object.entries(L.reduce((a, l) => (a[l.service?.name ?? "Other"] = (a[l.service?.name ?? "Other"] ?? 0) + 1, a), {})).map(([name, value]) => ({
		name,
		value
	})).sort((a, b) => b.value - a.value);
	const apptTrend = Array.from({ length: 21 }, (_, i) => new Date(Date.now() + (i - 10) * 864e5)).map((d) => ({
		name: fmtDate(d, {
			month: "numeric",
			day: "numeric"
		}),
		value: (appts.data ?? []).filter((a) => dayKey(a.starts_at) === dayKey(d) && a.status !== "cancelled").length
	}));
	const fuStatus = [
		"pending",
		"scheduled",
		"completed",
		"cancelled"
	].map((s) => ({
		name: label(s),
		value: (fus.data ?? []).filter((f) => f.status === s).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Analytics",
				subtitle: "Calculated live from the records in this workspace. No projected revenue or ROI is shown."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Lead volume · last 14 days",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { data: volume })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Pipeline distribution",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
							data: pipeline,
							color: C[2]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Booking volume · ±10 days",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
							data: apptTrend,
							color: C[1]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Quote status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 200,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: quoteStatus,
								layout: "vertical",
								margin: {
									left: 10,
									right: 10
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										hide: true,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										width: 70,
										tick: {
											fontSize: 11,
											fill: "var(--color-slate)"
										},
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										fontSize: 12,
										borderRadius: 6
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										radius: [
											0,
											3,
											3,
											0
										],
										children: quoteStatus.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: C[i % 5] }, i))
									})
								]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Lead sources",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HBar, { rows: sources })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Service demand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HBar, { rows: demand })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Follow-up activity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HBar, { rows: fuStatus })
					})
				]
			})
		]
	});
}
//#endregion
export { Analytics as component };
