import { i as __toESM } from "../_runtime.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DFHNb4Ti.mjs";
import { G as isRedirect, S as useRouter, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { r as SERVICES, t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { C as Menu, _ as Phone, n as X, tt as ArrowUp, w as MapPin, x as MessageSquareText } from "../_libs/lucide-react.mjs";
import { i as SheetTrigger, n as SheetContent, r as SheetTitle, t as Sheet } from "./sheet-BFMX6gd5.mjs";
import { i as literalType, n as coerce, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-B_CPnTr7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var contact = objectType({
	firstName: stringType().trim().min(1).max(60),
	lastName: stringType().trim().min(1).max(60),
	email: stringType().trim().email().max(160),
	phone: stringType().trim().min(7).max(30)
});
var vehicle = objectType({
	year: coerce.number().int().min(1950).max(2030),
	make: stringType().trim().min(1).max(40),
	model: stringType().trim().min(1).max(60),
	color: stringType().trim().max(40).default("")
});
var quoteSchema = objectType({
	contact,
	vehicle,
	serviceSlug: stringType().max(60),
	preferredDate: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(literalType("")).refine((value) => !value || !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && (/* @__PURE__ */ new Date(`${value}T00:00:00Z`)).toISOString().slice(0, 10) === value, "Choose a valid preferred date."),
	preferredTime: stringType().max(30).optional(),
	condition: stringType().max(40).optional(),
	notes: stringType().max(1e3).optional()
});
var submitQuoteRequest = createServerFn({ method: "POST" }).inputValidator((d) => quoteSchema.parse(d)).handler(createSsrRpc("6caef2925de9e4e98c5044614bc5c918b332ef423a5a3d6cd6cd0e080281ab64"));
var getAvailability = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	date: stringType(),
	serviceSlug: stringType().max(60)
}).parse(d)).handler(createSsrRpc("86129e4c7268f8be0cdf7a195a2f9016ecee01b3146fb26228660942afd10124"));
var bookingSchema = objectType({
	contact,
	vehicle,
	serviceSlug: stringType().max(60),
	date: stringType(),
	time: stringType().max(20),
	notes: stringType().max(1e3).optional()
});
var createBooking = createServerFn({ method: "POST" }).inputValidator((d) => bookingSchema.parse(d)).handler(createSsrRpc("4d793d084f61da582101050f1afa312a70d12c1f84d8b3fe4c193412e1cacbd7"));
var askAssistant = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ messages: arrayType(objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().max(2e3)
})).min(1).max(30) }).parse(d)).handler(createSsrRpc("89ac62f1516609b9e1b35c7159f82ca06a5c6c5a4d11e54d32c6b142adcb06ef"));
var SUGGESTIONS = [
	"I have a 2024 BMW M4. How much is ceramic coating?",
	"Can I come Friday?",
	"What are your hours?"
];
function AssistantWidget() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [msgs, setMsgs] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi — I'm the Apex assistant. Ask me about services, pricing, timing or availability."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)(null);
	const ask = useServerFn(askAssistant);
	const endRef = (0, import_react.useRef)(null);
	const dialogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [msgs, busy]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const viewport = window.visualViewport;
		const resize = () => {
			if (!viewport || !dialogRef.current) return;
			const covered = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
			dialogRef.current.style.setProperty("--assistant-bottom", `${covered > 100 ? covered + 8 : 80}px`);
			dialogRef.current.style.setProperty("--assistant-height", `${Math.max(120, viewport.height - (covered > 100 ? 16 : 96))}px`);
		};
		resize();
		viewport?.addEventListener("resize", resize);
		viewport?.addEventListener("scroll", resize);
		const escape = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", escape);
		return () => {
			viewport?.removeEventListener("resize", resize);
			viewport?.removeEventListener("scroll", resize);
			window.removeEventListener("keydown", escape);
		};
	}, [open]);
	async function send(text) {
		const t = text.trim();
		if (!t || busy) return;
		const next = [...msgs, {
			role: "user",
			content: t
		}];
		setMsgs(next);
		setInput("");
		setBusy(true);
		try {
			const r = await ask({ data: { messages: next.slice(1).map(({ role, content }) => ({
				role,
				content
			})) } });
			setMode(r.mode);
			setMsgs((m) => [...m, {
				role: "assistant",
				content: r.reply,
				action: r.action
			}]);
		} catch {
			setMsgs((m) => [...m, {
				role: "assistant",
				content: "Sorry — I couldn't reach the assistant. Please call (214) 555-0199 or request a quote."
			}]);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref: dialogRef,
		initial: {
			opacity: 0,
			y: 16,
			scale: .98
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 12
		},
		transition: { duration: .2 },
		role: "dialog",
		"aria-label": "Apex assistant",
		className: "fixed inset-x-3 bottom-[var(--assistant-bottom,80px)] z-50 flex max-h-[min(70dvh,var(--assistant-height,70dvh))] flex-col overflow-hidden rounded-lg border bg-surface shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--navy)_40%,transparent)] sm:inset-x-auto sm:right-6 sm:w-[380px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between bg-navy px-4 py-3 text-navy-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Apex Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-navy-muted",
						children: ["Answers from Apex's service guide", mode === "demo" ? " · demo mode" : ""]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setOpen(false),
					"aria-label": "Close assistant",
					className: "h-11 w-11 shrink-0 hover:bg-sidebar-accent hover:text-navy-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm [overflow-wrap:anywhere]",
				children: [
					msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.role === "user" ? "flex justify-end" : "",
						children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[85%] rounded-lg rounded-br-sm bg-navy px-3 py-2 text-navy-foreground",
							children: m.content
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[92%] text-foreground [&_p]:leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: m.content }), m.action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: m.action === "book" ? "navy" : "default",
								className: "mt-2",
								children: m.action === "book" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book",
									children: "Book appointment"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/quote",
									children: "Request a quote"
								})
							})]
						})
					}, i)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 py-2",
						"aria-label": "Assistant is typing",
						children: [
							0,
							1,
							2
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 w-1.5 animate-pulse rounded-full bg-slate",
							style: { animationDelay: `${d * 150}ms` }
						}, d))
					}),
					msgs.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 pt-1",
						children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => send(s),
							className: "h-auto min-h-11 whitespace-normal rounded-md px-3 py-2 text-left text-xs text-slate hover:border-primary hover:text-primary",
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				className: "flex shrink-0 items-end gap-2 border-t p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "assistant-input",
						className: "sr-only",
						children: "Message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "assistant-input",
						rows: 1,
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								send(input);
							}
						},
						placeholder: "Ask about a service…",
						className: "max-h-28 min-h-11 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-base outline-none focus:border-primary sm:text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						className: "h-11 w-11 shrink-0",
						disabled: !input.trim() || busy,
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
					})
				]
			})
		]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "navy",
		onClick: () => setOpen((o) => !o),
		"aria-label": open ? "Close assistant" : "Chat with Apex",
		"aria-expanded": open,
		className: "fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-md bg-navy px-5 shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 text-sm font-semibold text-navy-foreground shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6",
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: open ? "Close" : "Ask Apex"
		})]
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function ApexMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "h-7 w-7",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 3 29 28H3L16 3Z",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 22h12",
				stroke: "var(--color-primary)",
				strokeWidth: "2.2"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[15px] font-extrabold tracking-[0.18em]",
				children: "APEX"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[9px] font-semibold tracking-[0.32em] text-muted-foreground",
				children: "AUTO DETAILING"
			})]
		})]
	});
}
function SiteLayout({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-navy text-navy-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-site flex h-8 items-center justify-between text-[11px] tracking-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-navy-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
							" ",
							BUSINESS.address
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${BUSINESS.phone}`,
						className: "hidden items-center gap-1.5 sm:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }),
							" ",
							BUSINESS.phone
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-site flex h-16 items-center justify-between gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-navy",
							"aria-label": "Apex Auto Detailing home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApexMark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-7 lg:flex",
							"aria-label": "Main",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								activeOptions: { exact: n.to === "/" },
								className: "text-[13px] font-semibold text-slate transition-colors hover:text-navy",
								activeProps: { className: "text-navy" },
								children: n.label
							}, n.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "cta-outline",
								size: "sm",
								className: "h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book",
									children: "Book appointment"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "cta",
								size: "sm",
								className: "h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/quote",
									children: "Get a quote"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-11 w-11 shrink-0 lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "right",
								className: "w-[85vw] max-w-sm overflow-y-auto bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "sr-only",
										children: "Menu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
										className: "mt-8 flex flex-col",
										"aria-label": "Mobile",
										children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: n.to,
											onClick: () => setOpen(false),
											className: "border-b py-4 font-display text-3xl text-navy",
											children: n.label
										}, n.to))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "cta",
											size: "lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/quote",
												onClick: () => setOpen(false),
												children: "Get a quote"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "cta-outline",
											size: "lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/book",
												onClick: () => setOpen(false),
												children: "Book appointment"
											})
										})]
									})
								]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "bg-navy text-navy-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-site grid gap-10 py-14 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApexMark, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 max-w-sm text-sm text-navy-muted",
									children: [
										"Premium detailing, paint correction, ceramic coating and paint protection film in ",
										BUSINESS.city,
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "cta",
										size: "sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/quote",
											children: "Get a quote"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin",
										className: "inline-flex h-8 items-center rounded-md border border-navy-muted/30 px-3 text-xs font-semibold text-navy-muted hover:text-navy-foreground",
										children: "Business login"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-navy-muted",
							children: "Services"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/services/$slug",
								params: { slug: s.slug },
								className: "text-navy-foreground/85 hover:text-navy-foreground",
								children: s.name
							}) }, s.slug))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-navy-muted",
							children: "Visit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
							className: "mt-4 space-y-1 text-sm not-italic text-navy-foreground/85",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: BUSINESS.address }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: BUSINESS.phone }),
								BUSINESS.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-navy-muted",
									children: [
										h.day,
										": ",
										h.time
									]
								}, h.day))
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-sidebar-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container-site flex flex-col gap-2 py-5 text-[11px] text-navy-muted sm:flex-row sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apex Auto Detailing is a fictional business used for product demonstration." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Powered by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold tracking-[0.14em] text-navy-foreground",
							children: "OPERANTSCALE"
						})] })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantWidget, {})
		]
	});
}
function PageHeader({ eyebrow, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow animate-rise text-primary",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl animate-rise font-display text-5xl leading-[1.02] text-navy md:text-7xl",
					children: title
				}),
				children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 max-w-2xl animate-rise text-lg text-slate [animation-delay:120ms]",
					children
				})
			]
		})
	});
}
//#endregion
export { submitQuoteRequest as a, getAvailability as i, SiteLayout as n, useServerFn as o, createBooking as r, PageHeader as t };
