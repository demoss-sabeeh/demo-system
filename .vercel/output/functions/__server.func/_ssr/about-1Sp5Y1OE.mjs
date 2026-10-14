import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-B_CPnTr7.mjs";
import { t as GALLERY } from "./gallery-D3x66nXX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-1Sp5Y1OE.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "About",
		title: "A studio built around the finish.",
		children: "Apex is a Dallas detailing studio focused on paint correction, ceramic coating and paint protection film — with the same process on every vehicle."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-site grid gap-12 py-16 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: GALLERY[2].src,
			alt: "Machine polishing an Audi RS5 hood",
			loading: "lazy",
			width: 1200,
			height: 912,
			className: "aspect-[4/3] w-full rounded-md object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8",
			children: [[
				["Inspect first", "Every vehicle is inspected under studio lighting and paint-depth measured before we recommend anything."],
				["Controlled environment", "Coatings and film are installed indoors, away from dust and Texas heat."],
				["Clear communication", "You get a clear quote, a confirmed time, and a reminder before your visit."]
			].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-navy",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-slate",
					children: d
				})]
			}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "cta",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/quote",
					children: "Get a quote"
				})
			})]
		})]
	})] });
}
//#endregion
export { About as component };
