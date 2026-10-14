import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SERVICES } from "./knowledge-B7rJYZvr.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { U as Check } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-B_CPnTr7.mjs";
import { t as GALLERY } from "./gallery-D3x66nXX.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
import { t as Route } from "./services._slug-BN7EYxCt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-DEA0Wy_u.js
var import_jsx_runtime = require_jsx_runtime();
var IMG = {
	"full-detail": 4,
	"ceramic-coating": 0,
	"paint-correction": 2,
	"paint-protection-film": 5,
	"interior-detail": 7,
	"maintenance-detail": 3,
	"fleet-detailing": 1
};
function ServiceDetail() {
	const { service: s } = Route.useLoaderData();
	const img = GALLERY[IMG[s.slug] ?? 0];
	const others = SERVICES.filter((o) => o.slug !== s.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site grid gap-10 py-14 lg:grid-cols-12 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services",
						className: "eyebrow text-slate hover:text-primary",
						children: "← Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 animate-rise font-display text-6xl leading-none text-navy md:text-7xl",
						children: s.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 animate-rise text-lg leading-relaxed text-slate",
						children: s.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid grid-cols-2 border-y py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "eyebrow text-slate",
								children: "Starting at"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-2xl font-bold text-navy",
								children: money(s.priceFrom)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-xs text-slate",
								children: [
									"Typical ",
									money(s.priceFrom),
									"–",
									money(s.priceTo)
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "eyebrow text-slate",
							children: "Duration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 text-2xl font-bold text-navy",
							children: [
								"~",
								s.durationHours,
								" hours"
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "cta",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/quote",
								search: { service: s.slug },
								children: "Request a quote"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "cta-outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								search: { service: s.slug },
								children: "Book appointment"
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img.src,
					alt: `${img.car} — ${s.name}`,
					width: 1200,
					height: 912,
					className: "aspect-[4/3] w-full animate-reveal rounded-md object-cover"
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-site grid gap-12 py-16 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow text-primary",
			children: "What's included"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-3",
			children: s.includes.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 border-b pb-3 text-navy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
					" ",
					i
				]
			}, i))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-primary",
				children: "Ideal for"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-3xl leading-snug text-navy",
				children: s.ideal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-slate",
					children: "Other services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y border-y",
					children: others.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services/$slug",
						params: { slug: o.slug },
						className: "flex justify-between py-3 text-sm font-semibold text-navy hover:text-primary",
						children: [o.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-slate",
							children: ["From ", money(o.priceFrom)]
						})]
					}) }, o.slug))
				})]
			})
		] })]
	})] });
}
//#endregion
export { ServiceDetail as component };
