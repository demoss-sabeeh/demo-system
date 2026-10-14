import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { U as Check } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Wizard-Owx_W0mg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stepper({ steps, current }) {
	const progress = (0, import_react.useRef)(null);
	const previous = (0, import_react.useRef)(current);
	(0, import_react.useEffect)(() => {
		if (previous.current === current) return;
		previous.current = current;
		progress.current?.scrollIntoView({
			block: "start",
			behavior: "instant"
		});
		progress.current?.parentElement?.querySelector("[data-step-panel]")?.focus({ preventScroll: true });
	}, [current]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		ref: progress,
		className: "flex scroll-mt-28 gap-1",
		"aria-label": "Progress",
		children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex-1",
			"aria-current": i === current ? "step" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-0.5 w-full transition-colors", i <= current ? "bg-primary" : "bg-border") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-2 hidden items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] sm:flex", i === current ? "text-navy" : i < current ? "text-primary" : "text-muted-foreground"),
				children: [
					i < current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }),
					" ",
					s
				]
			})]
		}, s))
	});
}
function StepPanel({ k, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"data-step-panel": true,
		tabIndex: -1,
		className: "scroll-mt-28 outline-none",
		initial: {
			opacity: 0,
			x: 16
		},
		animate: {
			opacity: 1,
			x: 0
		},
		transition: { duration: .25 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-4xl text-navy",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children
		})]
	}, k);
}
function Field({ label, htmlFor, error, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor,
				className: "mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-slate",
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-medium text-destructive",
				role: "alert",
				children: error
			})
		]
	});
}
var inputCls = "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";
function OptionCard({ selected, onClick, title, meta, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		type: "button",
		onClick,
		disabled,
		"aria-pressed": selected,
		className: cn("grid h-auto min-h-12 w-full grid-cols-1 items-center justify-start gap-1 whitespace-normal rounded-md border bg-surface px-4 py-3.5 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3", selected ? "border-primary ring-2 ring-primary/15" : "hover:border-navy/30", disabled && "cursor-not-allowed opacity-40 line-through"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 font-semibold text-navy",
			children: title
		}), meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-slate sm:text-right",
			children: meta
		})]
	});
}
function Summary({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "divide-y rounded-md border bg-surface",
		children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1 px-4 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "min-w-0 text-slate",
				children: k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "min-w-0 break-words font-semibold text-navy [overflow-wrap:anywhere] sm:text-right",
				children: v || "—"
			})]
		}, k))
	});
}
//#endregion
export { Summary as a, Stepper as i, OptionCard as n, inputCls as o, StepPanel as r, Field as t };
