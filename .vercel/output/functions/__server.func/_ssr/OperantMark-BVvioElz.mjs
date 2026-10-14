import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OperantMark-BVvioElz.js
var import_jsx_runtime = require_jsx_runtime();
function OperantMark({ dark = false, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "h-7 w-7 shrink-0",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "2",
					y: "2",
					width: "28",
					height: "28",
					rx: "5",
					fill: "var(--color-primary)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "16",
					r: "6.5",
					fill: "none",
					stroke: "var(--color-primary-foreground)",
					strokeWidth: "2.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 9.5V4M22.5 16H28",
					stroke: "var(--color-primary-foreground)",
					strokeWidth: "2.4"
				})
			]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-[13px] font-extrabold tracking-[0.2em] ${dark ? "text-navy" : ""}`,
			children: "OPERANTSCALE"
		})]
	});
}
//#endregion
export { OperantMark as t };
