import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-GnGdkTa5.js
var $$splitComponentImporter = () => import("./book-Bp2SmT0R.mjs");
var Route = createFileRoute("/book")({
	validateSearch: (s) => typeof s.service === "string" ? { service: s.service } : {},
	head: () => ({ meta: [
		{ title: "Book a Detailing Appointment Online — Apex Auto Detailing" },
		{
			name: "description",
			content: "Choose a service and an available time at the Apex detailing studio in Dallas. Instant confirmation."
		},
		{
			property: "og:title",
			content: "Book an Appointment — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Pick an available time online."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
