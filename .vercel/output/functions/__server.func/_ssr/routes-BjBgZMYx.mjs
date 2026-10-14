import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as SERVICES } from "./knowledge-B7rJYZvr.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { L as Clock, l as Star, rt as ArrowRight, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-B_CPnTr7.mjs";
import { n as HERO_IMAGE, t as GALLERY } from "./gallery-D3x66nXX.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjBgZMYx.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site grid items-end gap-10 pb-14 pt-14 md:pt-20 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow animate-rise text-primary",
							children: "Dallas · Ceramic Coating · Paint Correction · PPF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 animate-rise font-display text-[3.4rem] leading-[0.95] text-navy [animation-delay:80ms] md:text-[5.2rem]",
							children: ["Premium Auto Detailing, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-primary",
								children: "Done Right."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md animate-rise text-lg leading-relaxed text-slate [animation-delay:160ms]",
							children: "Professional detailing, paint correction, ceramic coating, and protection services for vehicles that deserve more."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "cta",
								size: "lg",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									children: ["Get a quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "cta-outline",
								size: "lg",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book",
									children: "Book an appointment"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-reveal overflow-hidden rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: HERO_IMAGE,
								alt: "Black BMW M4 with fresh ceramic coating in the Apex studio",
								width: 1920,
								height: 1088,
								className: "aspect-[16/10] w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -left-3 top-8 hidden animate-drift rounded-md border bg-surface px-4 py-3 shadow-sm md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-slate",
								children: "Ceramic Coating"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm font-bold text-navy",
								children: [
									"From ",
									money(899),
									" · ~6 hrs"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-4 right-6 hidden animate-drift rounded-md border bg-surface px-4 py-3 shadow-sm [animation-delay:1.5s] md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 text-sm font-bold text-navy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " Studio inspected"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate",
								children: "Paint-depth measured before work"
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-site grid grid-cols-2 divide-x md:grid-cols-4",
				children: [
					[ShieldCheck, "Climate-controlled studio"],
					[Clock, "Book online in 60 seconds"],
					[Star, "Inspection under studio lighting"],
					[ArrowRight, "Clear pricing before we start"]
				].map(([Icon, t], i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-4 py-5 text-sm font-semibold text-navy first:pl-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0 text-primary" }),
							" ",
							t
						]
					}, i);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-site py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-primary",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl text-navy md:text-5xl",
					children: "Care at every level."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/services",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "All services →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid border-t md:grid-cols-2 lg:grid-cols-3",
				children: SERVICES.slice(0, 6).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/services/$slug",
					params: { slug: s.slug },
					className: "group border-b p-6 transition-colors hover:bg-surface md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular text-xs font-bold text-slate",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-xl font-bold text-navy",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-slate",
							children: s.short
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-navy",
								children: ["From ", money(s.priceFrom)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-primary transition-transform group-hover:translate-x-1" })]
						})
					]
				}, s.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-navy text-navy-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site grid gap-12 py-20 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sky",
						children: "How it works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl md:text-5xl",
						children: "From inquiry to showroom finish."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-8 sm:grid-cols-2 lg:col-span-8",
					children: [
						["Request a quote", "Tell us about your vehicle and the result you want. You'll hear back right away."],
						["Get a recommendation", "We confirm the right package and send a clear, itemized quote."],
						["Book your time", "Pick an available slot online. Reminders are sent before your visit."],
						["Drive away protected", "We inspect under studio lighting and recommend your next maintenance."]
					].map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-sidebar-border pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular text-xs font-bold text-sky",
								children: ["STEP 0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg font-bold",
								children: t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-navy-muted",
								children: d
							})
						]
					}, t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-site py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-navy md:text-5xl",
					children: "Recent work."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/gallery",
					className: "text-sm font-semibold text-primary hover:underline",
					children: "View gallery →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: GALLERY.slice(1, 5).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "group overflow-hidden rounded-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.src,
						alt: `${g.car} — ${g.work}`,
						loading: "lazy",
						width: 1200,
						height: 912,
						className: "aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "pt-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-navy",
								children: g.car
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate",
								children: ["· ", g.work]
							})
						]
					})]
				}, g.car))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-xl font-display text-4xl text-navy md:text-5xl",
					children: "Ready when you are."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "cta",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/quote",
							children: "Get a quote"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "cta-outline",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							children: "Book appointment"
						})
					})]
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
