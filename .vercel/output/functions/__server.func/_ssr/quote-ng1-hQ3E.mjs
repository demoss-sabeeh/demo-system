import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as serviceBySlug, r as SERVICES } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { D as LoaderCircle, it as ArrowLeft, rt as ArrowRight, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as coerce, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as submitQuoteRequest, n as SiteLayout, o as useServerFn } from "./SiteLayout-B_CPnTr7.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Summary, i as Stepper, n as OptionCard, r as StepPanel, t as Field } from "./Wizard-Owx_W0mg.mjs";
import { t as Route } from "./quote-DcG1LIxL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-ng1-hQ3E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Contact",
	"Vehicle",
	"Service",
	"Preferences",
	"Review"
];
var stepSchemas = [
	objectType({
		firstName: stringType().trim().min(1, "Required"),
		lastName: stringType().trim().min(1, "Required"),
		email: stringType().trim().email("Enter a valid email"),
		phone: stringType().trim().min(7, "Enter a valid phone")
	}),
	objectType({
		year: coerce.number({ invalid_type_error: "Enter a year" }).int().min(1950, "Enter a valid year").max(2030, "Enter a valid year"),
		make: stringType().trim().min(1, "Required"),
		model: stringType().trim().min(1, "Required")
	}),
	objectType({ service: stringType().min(1, "Choose a service") }),
	objectType({})
];
function QuotePage() {
	const search = Route.useSearch();
	const [step, setStep] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const [f, setF] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		year: "",
		make: "",
		model: "",
		color: "",
		service: search.service && serviceBySlug(search.service) ? search.service : "",
		date: "",
		time: "",
		condition: "",
		notes: ""
	});
	const submit = useServerFn(submitQuoteRequest);
	const set = (k) => (e) => setF((p) => ({
		...p,
		[k]: e.target.value
	}));
	function next() {
		const schema = stepSchemas[step];
		if (schema) {
			const r = schema.safeParse(f);
			if (!r.success) {
				setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
				return;
			}
		}
		setErrors({});
		setStep((s) => s + 1);
	}
	async function onSubmit() {
		setBusy(true);
		try {
			const r = await submit({ data: {
				contact: {
					firstName: f.firstName,
					lastName: f.lastName,
					email: f.email,
					phone: f.phone
				},
				vehicle: {
					year: Number(f.year),
					make: f.make,
					model: f.model,
					color: f.color
				},
				serviceSlug: f.service,
				preferredDate: f.date,
				preferredTime: f.time,
				condition: f.condition,
				notes: f.notes
			} });
			setDone({
				service: r.service,
				estimate: r.estimate
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	const svc = serviceBySlug(f.service);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-site grid gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-12 lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:col-span-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-primary",
					children: "Request a quote"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl leading-none text-navy",
					children: "Tell us about your vehicle."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-slate",
					children: "Share a few details and our team will review your vehicle and follow up using the contact information you provide."
				}),
				svc && !done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 hidden rounded-md border bg-surface p-5 lg:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-slate",
							children: "Selected"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-bold text-navy",
							children: svc.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-slate",
							children: [
								"From ",
								money(svc.priceFrom),
								" · ~",
								svc.durationHours,
								" hrs"
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-8",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "rounded-md border bg-surface p-8 md:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 break-words font-display text-4xl text-navy sm:text-5xl",
						children: [
							"Request received, ",
							f.firstName,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-lg text-slate",
						children: [
							"Your request has been recorded. No text or email confirmation was sent. A specialist will review your ",
							f.year,
							" ",
							f.make,
							" ",
							f.model,
							" and follow up using the contact details you provided."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, { rows: [
							["Service", done.service],
							["Estimated starting value", money(done.estimate)],
							["Preferred", [f.date, f.time].filter(Boolean).join(" · ")]
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "cta",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								search: { service: f.service },
								children: "Book a time now"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "cta-outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Back to home"
							})
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
					steps: STEPS,
					current: step
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 min-h-[380px] sm:mt-10",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 0,
							title: "Your details",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "First name",
										htmlFor: "fn",
										error: errors.firstName,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "fn",
											autoComplete: "given-name",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.firstName,
											onChange: set("firstName"),
											placeholder: "John"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Last name",
										htmlFor: "ln",
										error: errors.lastName,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "ln",
											autoComplete: "family-name",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.lastName,
											onChange: set("lastName"),
											placeholder: "Smith"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										htmlFor: "em",
										error: errors.email,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "em",
											type: "email",
											autoComplete: "email",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.email,
											onChange: set("email"),
											placeholder: "john@example.com"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										htmlFor: "ph",
										error: errors.phone,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "ph",
											type: "tel",
											autoComplete: "tel",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.phone,
											onChange: set("phone"),
											placeholder: "(214) 555-0123"
										})
									})
								]
							})
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 1,
							title: "Your vehicle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Year",
										htmlFor: "yr",
										error: errors.year,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "yr",
											inputMode: "numeric",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.year,
											onChange: set("year"),
											placeholder: "2024"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Make",
										htmlFor: "mk",
										error: errors.make,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "mk",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.make,
											onChange: set("make"),
											placeholder: "BMW"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Model",
										htmlFor: "md",
										error: errors.model,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "md",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.model,
											onChange: set("model"),
											placeholder: "M4"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Color",
										htmlFor: "cl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "cl",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.color,
											onChange: set("color"),
											placeholder: "Black"
										})
									})
								]
							})
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepPanel, {
							k: 2,
							title: "Which service?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2",
								children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
									selected: f.service === s.slug,
									onClick: () => setF((p) => ({
										...p,
										service: s.slug
									})),
									title: s.name,
									meta: `From ${money(s.priceFrom)}`
								}, s.slug))
							}), errors.service && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs font-medium text-destructive",
								role: "alert",
								children: errors.service
							})]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 3,
							title: "Preferences",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Preferred date",
										htmlFor: "dt",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "dt",
											type: "date",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.date,
											onChange: set("date")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Preferred time",
										htmlFor: "tm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "tm",
											className: "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
											value: f.time,
											onChange: set("time"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "No preference"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Morning" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Midday" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Afternoon" })
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Vehicle condition",
										htmlFor: "cd",
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											id: "cd",
											className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
											children: [
												"Excellent",
												"Good",
												"Fair",
												"Needs attention"
											].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
												selected: f.condition === c,
												onClick: () => setF((p) => ({
													...p,
													condition: c
												})),
												title: c
											}, c))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Additional notes",
										htmlFor: "nt",
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "nt",
											rows: 4,
											className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 h-auto py-2`,
											value: f.notes,
											onChange: set("notes"),
											placeholder: "Swirl marks on the hood, new car, etc."
										})
									})
								]
							})
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 4,
							title: "Review your request",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, { rows: [
								["Name", `${f.firstName} ${f.lastName}`],
								["Contact", `${f.email} · ${f.phone}`],
								["Vehicle", `${f.year} ${f.make} ${f.model}${f.color ? ` · ${f.color}` : ""}`],
								["Service", svc?.name ?? ""],
								["Preferred", [f.date, f.time].filter(Boolean).join(" · ")],
								["Condition", f.condition],
								["Notes", f.notes]
							] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-t pt-6 sm:flex sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => setStep((s) => s - 1),
						disabled: step === 0 || busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back"]
					}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "cta",
						size: "lg",
						onClick: next,
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "cta",
						size: "lg",
						onClick: onSubmit,
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Submitting"] }) : "Submit request"
					})]
				})
			] })
		})]
	}) });
}
//#endregion
export { QuotePage as component };
