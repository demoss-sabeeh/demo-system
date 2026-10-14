import { i as __toESM } from "../_runtime.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, q as redirect, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as FAQ, r as SERVICES, t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$23 } from "./admin.customers._id-BANMN3iW.mjs";
import { t as Route$24 } from "./admin.leads._id-CNqdH9fm.mjs";
import { t as Route$25 } from "./admin.leads.index-C4c_NlI_.mjs";
import { t as Route$26 } from "./admin.quotes-DIEHk3Ne.mjs";
import { t as Route$27 } from "./admin.vehicles._id-m_OhtXba.mjs";
import { t as Route$28 } from "./book-GnGdkTa5.mjs";
import { t as Route$29 } from "./quote-DcG1LIxL.mjs";
import { t as Route$30 } from "./services._slug-BN7EYxCt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-P9JMXn74.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BsslZpDP.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$22 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Apex Auto Detailing — Powered by OperantScale" },
			{
				name: "description",
				content: "Premium auto detailing, ceramic coating, paint correction and PPF in Dallas, Texas."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$22.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			else queryClient.clear();
		});
		return () => data.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "bottom-right" })]
	});
}
var $$splitComponentImporter$20 = () => import("./routes-BjBgZMYx.mjs");
var Route$21 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Apex Auto Detailing — Premium Car Detailing in Dallas, TX" },
			{
				name: "description",
				content: "Ceramic coating, paint correction, PPF and full detailing in Dallas. Request a quote or book online with Apex Auto Detailing."
			},
			{
				property: "og:title",
				content: "Apex Auto Detailing — Premium Auto Detailing, Done Right."
			},
			{
				property: "og:description",
				content: "Ceramic coating, paint correction, PPF and full detailing in Dallas, Texas."
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "AutoWash",
				name: BUSINESS.name,
				telephone: BUSINESS.phone,
				address: {
					"@type": "PostalAddress",
					streetAddress: "2211 Commerce St",
					addressLocality: "Dallas",
					addressRegion: "TX",
					postalCode: "75201",
					addressCountry: "US"
				},
				openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00"]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./route-Di7iQBCH.mjs");
var Route$20 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./about-1Sp5Y1OE.mjs");
var Route$19 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Apex Auto Detailing — Dallas Detailing Studio" },
		{
			name: "description",
			content: "A climate-controlled Dallas studio focused on paint correction, ceramic coating and paint protection film."
		},
		{
			property: "og:title",
			content: "About — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Our approach to premium detailing in Dallas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./auth-Bj2tCxyS.mjs");
var Route$18 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — OperantScale Business OS" },
		{
			name: "description",
			content: "Sign in to the OperantScale detailing business dashboard."
		},
		{
			property: "og:title",
			content: "Sign in — OperantScale"
		},
		{
			property: "og:description",
			content: "Business dashboard sign-in."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./contact-B-5jeX4h.mjs");
var Route$17 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Apex Auto Detailing — Dallas, TX" },
		{
			name: "description",
			content: "Visit our Dallas studio at 2211 Commerce St, call (214) 555-0199, or request a quote online."
		},
		{
			property: "og:title",
			content: "Contact — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Studio address, hours and ways to reach us."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./faq-C1dcRLMW.mjs");
var Route$16 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — Ceramic Coating, Paint Correction & PPF | Apex" },
			{
				name: "description",
				content: "Answers about ceramic coating longevity, paint correction, preparation and booking at Apex Auto Detailing."
			},
			{
				property: "og:title",
				content: "FAQ — Apex Auto Detailing"
			},
			{
				property: "og:description",
				content: "Common questions about our detailing services."
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQ.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./gallery-BpLLkcmj.mjs");
var Route$15 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — Ceramic Coating & PPF Work | Apex Auto Detailing" },
		{
			name: "description",
			content: "Selected ceramic coating, paint correction and paint protection film work from the Apex studio in Dallas."
		},
		{
			property: "og:title",
			content: "Gallery — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Selected detailing work from our Dallas studio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var Route$14 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: ({ request }) => {
	const origin = new URL(request.url).origin;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/services",
		...SERVICES.map((s) => `/services/${s.slug}`),
		"/gallery",
		"/about",
		"/faq",
		"/contact",
		"/quote",
		"/book"
	].map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml" } });
} } } });
var $$splitComponentImporter$13 = () => import("./admin-CoROIMww.mjs");
var Route$13 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "OperantScale — Apex Auto Detailing" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./services.index-BOqvvVQ6.mjs");
var Route$12 = createFileRoute("/services/")({
	head: () => ({ meta: [
		{ title: "Detailing Services & Pricing — Apex Auto Detailing Dallas" },
		{
			name: "description",
			content: "Full detail, ceramic coating, paint correction, PPF, interior and fleet detailing in Dallas, with starting prices."
		},
		{
			property: "og:title",
			content: "Detailing Services — Apex Auto Detailing"
		},
		{
			property: "og:description",
			content: "Ceramic coating, paint correction, PPF and more in Dallas, TX."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.index-BaqLjH8X.mjs");
var Route$11 = createFileRoute("/_authenticated/admin/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./admin.analytics-m-Yrv45L.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/analytics")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.appointments-BNk1oqh1.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/appointments")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.automations-CAp4yFII.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/automations")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin.calendar-e7Nf0Vr8.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/calendar")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.follow-ups-BxTHTrub.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/follow-ups")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.messages-DoIBv--q.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.pipeline-ChiIIrbV.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/pipeline")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.services-CsYX3ZA2.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/services")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.settings-J_di_ksf.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.customers.index-CATZmaG_.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/customers/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.vehicles.index-BR44uAS6.mjs");
var Route = createFileRoute("/_authenticated/admin/vehicles/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var AuthenticatedRouteRoute = Route$20.update({
	id: "/_authenticated",
	getParentRoute: () => Route$22
});
var AboutRoute = Route$19.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$22
});
var AuthRoute = Route$18.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$22
});
var BookRoute = Route$28.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => Route$22
});
var ContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$22
});
var FaqRoute = Route$16.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$22
});
var GalleryRoute = Route$15.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$22
});
var QuoteRoute = Route$29.update({
	id: "/quote",
	path: "/quote",
	getParentRoute: () => Route$22
});
var SitemapDotxmlRoute = Route$14.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$22
});
var AuthenticatedAdminRoute = Route$13.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ServicesIndexRoute = Route$12.update({
	id: "/services/",
	path: "/services/",
	getParentRoute: () => Route$22
});
var ServicesSlugRoute = Route$30.update({
	id: "/services/$slug",
	path: "/services/$slug",
	getParentRoute: () => Route$22
});
var AuthenticatedAdminIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminAnalyticsRoute = Route$10.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminAppointmentsRoute = Route$9.update({
	id: "/appointments",
	path: "/appointments",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminAutomationsRoute = Route$8.update({
	id: "/automations",
	path: "/automations",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCalendarRoute = Route$7.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminFollowUpsRoute = Route$6.update({
	id: "/follow-ups",
	path: "/follow-ups",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminMessagesRoute = Route$5.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminPipelineRoute = Route$4.update({
	id: "/pipeline",
	path: "/pipeline",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminQuotesRoute = Route$26.update({
	id: "/quotes",
	path: "/quotes",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminServicesRoute = Route$3.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCustomersIndexRoute = Route$1.update({
	id: "/customers/",
	path: "/customers/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminCustomersIdRoute = Route$23.update({
	id: "/customers/$id",
	path: "/customers/$id",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminLeadsIndexRoute = Route$25.update({
	id: "/leads/",
	path: "/leads/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminLeadsIdRoute = Route$24.update({
	id: "/leads/$id",
	path: "/leads/$id",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminVehiclesIndexRoute = Route.update({
	id: "/vehicles/",
	path: "/vehicles/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminAnalyticsRoute,
	AuthenticatedAdminAppointmentsRoute,
	AuthenticatedAdminAutomationsRoute,
	AuthenticatedAdminCalendarRoute,
	AuthenticatedAdminFollowUpsRoute,
	AuthenticatedAdminMessagesRoute,
	AuthenticatedAdminPipelineRoute,
	AuthenticatedAdminQuotesRoute,
	AuthenticatedAdminServicesRoute,
	AuthenticatedAdminSettingsRoute,
	AuthenticatedAdminIndexRoute,
	AuthenticatedAdminCustomersIdRoute,
	AuthenticatedAdminLeadsIdRoute,
	AuthenticatedAdminVehiclesIdRoute: Route$27.update({
		id: "/vehicles/$id",
		path: "/vehicles/$id",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminCustomersIndexRoute,
	AuthenticatedAdminLeadsIndexRoute,
	AuthenticatedAdminVehiclesIndexRoute
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	BookRoute,
	ContactRoute,
	FaqRoute,
	GalleryRoute,
	QuoteRoute,
	SitemapDotxmlRoute,
	ServicesSlugRoute,
	ServicesIndexRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
