import { X as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as serviceBySlug } from "./knowledge-B7rJYZvr.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-BN7EYxCt.js
var $$splitComponentImporter = () => import("./services._slug-DEA0Wy_u.mjs");
var $$splitNotFoundComponentImporter = () => import("./services._slug-Dy5mGSp0.mjs");
var Route = createFileRoute("/services/$slug")({
	loader: ({ params }) => {
		const s = serviceBySlug(params.slug);
		if (!s) throw notFound();
		return { service: s };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Service not found — Apex Auto Detailing" }, {
			name: "robots",
			content: "noindex"
		}] };
		const s = loaderData.service;
		return { meta: [
			{ title: `${s.name} in Dallas — Apex Auto Detailing` },
			{
				name: "description",
				content: `${s.short} Starting at ${money(s.priceFrom)}.`
			},
			{
				property: "og:title",
				content: `${s.name} — Apex Auto Detailing`
			},
			{
				property: "og:description",
				content: s.short
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
