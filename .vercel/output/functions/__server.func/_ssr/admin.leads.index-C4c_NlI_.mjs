import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.leads.index-C4c_NlI_.js
var $$splitComponentImporter = () => import("./admin.leads.index-Bqo3aw4N.mjs");
var Route = createFileRoute("/_authenticated/admin/leads/")({
	validateSearch: (s) => ({
		status: typeof s.status === "string" ? s.status : void 0,
		q: typeof s.q === "string" ? s.q : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
