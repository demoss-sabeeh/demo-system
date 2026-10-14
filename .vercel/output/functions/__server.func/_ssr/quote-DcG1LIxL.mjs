import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-DcG1LIxL.js
var $$splitComponentImporter = () => import("./quote-ng1-hQ3E.mjs");
var Route = createFileRoute("/quote")({
	validateSearch: (s) => typeof s.service === "string" ? { service: s.service } : {},
	head: () => ({ meta: [
		{ title: "Request a Detailing Quote — Apex Auto Detailing Dallas" },
		{
			name: "description",
			content: "Tell us about your vehicle and get a ceramic coating, paint correction or PPF quote from Apex in Dallas."
		},
		{
			property: "og:title",
			content: "Request a Quote — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Get a detailing recommendation for your vehicle."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
