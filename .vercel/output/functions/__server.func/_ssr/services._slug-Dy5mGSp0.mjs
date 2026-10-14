import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SiteLayout } from "./SiteLayout-B_CPnTr7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-Dy5mGSp0.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-site py-24",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-5xl text-navy",
		children: "Service not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/services",
		className: "mt-4 inline-block text-primary",
		children: "View all services"
	})]
}) });
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
