import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SERVICES } from "./knowledge-B7rJYZvr.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { rt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-B_CPnTr7.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.index-BOqvvVQ6.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Services",
		title: "Every finish, handled precisely.",
		children: "Demo pricing shown as starting points. Final pricing is confirmed after a paint inspection."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-site py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y border-y",
			children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/services/$slug",
				params: { slug: s.slug },
				className: "group grid items-center gap-4 py-7 md:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-navy md:col-span-4",
						children: s.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate md:col-span-5",
						children: s.short
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular text-sm text-slate md:col-span-1",
						children: [
							"~",
							s.durationHours,
							" hrs"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center justify-between font-semibold text-navy md:col-span-2 md:justify-end md:gap-4",
						children: [
							"From ",
							money(s.priceFrom),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-primary transition-transform group-hover:translate-x-1" })
						]
					})
				]
			}) }, s.slug))
		})
	})] });
}
//#endregion
export { ServicesPage as component };
