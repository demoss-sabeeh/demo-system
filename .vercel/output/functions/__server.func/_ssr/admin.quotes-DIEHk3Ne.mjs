import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.quotes-DIEHk3Ne.js
var $$splitComponentImporter = () => import("./admin.quotes-BCP44Swk.mjs");
var Route = createFileRoute("/_authenticated/admin/quotes")({
	validateSearch: (s) => typeof s.open === "string" ? { open: s.open } : {},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
