import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn } from "./button-B2pxHB9K.mjs";
import { A as Funnel, L as Clock, g as Play, t as Zap } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as timeAgo, f as fullName } from "./format-DLdEZFeI.mjs";
import { a as Panel, f as useAutomationRuns, i as PageTitle, o as RowsSkeleton, p as useAutomations, s as StatusBadge } from "./admin-data-Bn9IN1fZ.mjs";
import { t as Switch } from "./switch-BS6bDcIJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.automations-CAp4yFII.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Node({ kind, text, i }) {
	const [I, l, c] = {
		trigger: [
			Zap,
			"Trigger",
			"border-primary bg-accent"
		],
		condition: [
			Funnel,
			"Condition",
			"border-warning/40 bg-warning-soft"
		],
		delay: [
			Clock,
			"Wait",
			"border-mist bg-muted"
		],
		action: [
			Play,
			"Action",
			"border-border bg-surface"
		]
	}[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "mx-auto h-7 w-4",
		viewBox: "0 0 16 28",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "8",
			y1: "0",
			x2: "8",
			y2: "28",
			stroke: "var(--color-mist)",
			strokeWidth: "2",
			strokeDasharray: "4 4",
			className: "animate-flow"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 6
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: i * .06 },
		className: cn("mx-auto flex w-full max-w-sm items-center gap-3 rounded-md border px-3 py-2.5", c),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-4 w-4 shrink-0 text-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-bold uppercase tracking-[0.14em] text-slate",
			children: l
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-navy",
			children: text
		})] })]
	})] });
}
function Flow({ a }) {
	const nodes = [
		{
			kind: "trigger",
			text: a.trigger
		},
		...a.conditions.map((t) => ({
			kind: "condition",
			text: t
		})),
		...a.delay ? [{
			kind: "delay",
			text: a.delay
		}] : [],
		...a.actions.map((t) => ({
			kind: "action",
			text: t
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-2",
		children: nodes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
			i,
			...n
		}, a.key + i))
	});
}
function Automations() {
	const autos = useAutomations();
	const runs = useAutomationRuns();
	const [sel, setSel] = (0, import_react.useState)(null);
	const current = autos.data?.find((a) => a.id === sel) ?? autos.data?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Automation Center",
				subtitle: "Workflow definitions are display-only; no background worker executes them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-warning/30 bg-warning-soft p-3 text-sm text-warning",
				children: "Do not rely on these definitions for customer messages, reminders, or follow-ups. Automated execution is not configured."
			}),
			autos.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: autos.data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-start gap-3 rounded-md border bg-surface p-4 transition-colors", current?.id === a.id && "border-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSel(a.id),
							className: "min-w-0 flex-1 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-navy",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-slate",
									children: a.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-slate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-navy",
											children: "When"
										}),
										" ",
										a.trigger,
										a.delay ? ` · after ${a.delay}` : "",
										" → ",
										a.actions.join(", ")
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: a.status === "active",
							disabled: true,
							"aria-label": `${a.name} status (read only)`
						})]
					}) }, a.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: `Workflow · ${current.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flow, { a: current })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Recent runs",
						bodyClass: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-72 divide-y overflow-y-auto",
							children: (runs.data ?? []).slice(0, 20).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3 px-4 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-semibold text-navy",
										children: r.automation?.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-slate",
										children: r.summary || fullName(r.customer)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular text-[11px] text-slate",
										children: timeAgo(r.created_at)
									})]
								})]
							}, r.id))
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { Automations as component };
