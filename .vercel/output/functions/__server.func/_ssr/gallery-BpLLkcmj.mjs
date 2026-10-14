import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-B_CPnTr7.mjs";
import { t as GALLERY } from "./gallery-D3x66nXX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-BpLLkcmj.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Gallery",
		title: "Finished in the studio."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-site grid gap-x-4 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-3",
		children: GALLERY.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: `group ${i === 0 ? "sm:col-span-2" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: g.src,
					alt: `${g.car} after ${g.work}`,
					loading: i < 2 ? "eager" : "lazy",
					width: 1200,
					height: 912,
					className: `w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "mt-3 grid min-w-0 gap-1 border-b pb-3 sm:flex sm:items-baseline sm:justify-between sm:gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-navy",
					children: g.car
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-slate",
					children: g.work
				})]
			})]
		}, g.car))
	})] });
}
//#endregion
export { GalleryPage as component };
