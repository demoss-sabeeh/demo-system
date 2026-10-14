import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as serviceBySlug, r as SERVICES, t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { D as LoaderCircle, Y as CalendarClock, it as ArrowLeft, rt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as coerce, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as getAvailability, n as SiteLayout, o as useServerFn, r as createBooking } from "./SiteLayout-B_CPnTr7.mjs";
import { h as money, s as TZ } from "./format-DLdEZFeI.mjs";
import { t as Skeleton } from "./skeleton-Dok039NC.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Summary, i as Stepper, n as OptionCard, r as StepPanel, t as Field } from "./Wizard-Owx_W0mg.mjs";
import { t as Route } from "./book-GnGdkTa5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-Bp2SmT0R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Service",
	"Vehicle",
	"Date",
	"Time",
	"Contact",
	"Confirm"
];
function nextDays(n) {
	const out = [];
	const base = /* @__PURE__ */ new Date();
	for (let i = 1; i <= n; i++) {
		const d = new Date(base.getTime() + i * 864e5);
		const key = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
		const dow = new Intl.DateTimeFormat("en-US", {
			timeZone: TZ,
			weekday: "short"
		}).format(d);
		out.push({
			key,
			dow,
			day: new Intl.DateTimeFormat("en-US", {
				timeZone: TZ,
				day: "numeric"
			}).format(d),
			mon: new Intl.DateTimeFormat("en-US", {
				timeZone: TZ,
				month: "short"
			}).format(d),
			sunday: dow === "Sun"
		});
	}
	return out;
}
function BookPage() {
	const search = Route.useSearch();
	const [step, setStep] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const [f, setF] = (0, import_react.useState)({
		service: search.service && serviceBySlug(search.service) ? search.service : "",
		year: "",
		make: "",
		model: "",
		color: "",
		date: "",
		time: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		notes: ""
	});
	const set = (k) => (e) => setF((p) => ({
		...p,
		[k]: e.target.value
	}));
	const days = (0, import_react.useMemo)(() => nextDays(14), []);
	const avail = useServerFn(getAvailability);
	const book = useServerFn(createBooking);
	const slots = useQuery({
		queryKey: [
			"availability",
			f.date,
			f.service
		],
		queryFn: () => avail({ data: {
			date: f.date,
			serviceSlug: f.service
		} }),
		enabled: !!f.date && !!f.service && step === 3
	});
	const svc = serviceBySlug(f.service);
	const checks = {
		0: () => f.service ? {} : { service: "Choose a service" },
		1: () => {
			const r = objectType({
				year: coerce.number().int().min(1950).max(2030),
				make: stringType().trim().min(1),
				model: stringType().trim().min(1)
			}).safeParse(f);
			return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), "Required"]));
		},
		2: () => f.date ? {} : { date: "Choose a date" },
		3: () => f.time ? {} : { time: "Choose a time" },
		4: () => {
			const r = objectType({
				firstName: stringType().trim().min(1, "Required"),
				lastName: stringType().trim().min(1, "Required"),
				email: stringType().email("Enter a valid email"),
				phone: stringType().trim().min(7, "Enter a valid phone")
			}).safeParse(f);
			return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]));
		}
	};
	function next() {
		const e = checks[step]?.() ?? {};
		setErrors(e);
		if (Object.keys(e).length === 0) setStep((s) => s + 1);
	}
	async function confirm() {
		setBusy(true);
		try {
			const r = await book({ data: {
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
				date: f.date,
				time: f.time,
				notes: f.notes
			} });
			setDone({ location: r.location });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not book. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	const dateLabel = f.date ? new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		timeZone: "UTC"
	}).format(/* @__PURE__ */ new Date(`${f.date}T12:00:00Z`)) : "";
	const rows = [
		["Customer", `${f.firstName} ${f.lastName}`],
		["Vehicle", `${f.year} ${f.make} ${f.model}`],
		["Service", svc ? `${svc.name} · ~${svc.durationHours} hrs` : ""],
		["Date", dateLabel],
		["Time", f.time],
		["Location", done?.location ?? `Apex Studio — ${BUSINESS.address}`]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-site grid gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-12 lg:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:col-span-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-primary",
					children: "Book online"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-5xl leading-none text-navy",
					children: "Choose your time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-slate",
					children: "Choose an available time to request. The appointment is not confirmed until the team contacts you."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-8",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .98
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "rounded-md border bg-surface p-8 md:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-10 w-10 text-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 break-words font-display text-4xl text-navy sm:text-5xl",
						children: "Request received."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-slate",
						children: [
							"Your requested time is not confirmed yet. The team will contact you at ",
							f.phone,
							" to confirm availability."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 max-w-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, { rows })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "cta-outline",
						size: "lg",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Back to home"
						})
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
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepPanel, {
							k: 0,
							title: "Select a service",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2",
								children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
									selected: f.service === s.slug,
									onClick: () => setF((p) => ({
										...p,
										service: s.slug
									})),
									title: s.name,
									meta: `From ${money(s.priceFrom)} · ~${s.durationHours} hrs`
								}, s.slug))
							}), errors.service && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-destructive",
								role: "alert",
								children: errors.service
							})]
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
							title: "Pick a date",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2 sm:grid-cols-7",
								children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: d.sunday,
									onClick: () => setF((p) => ({
										...p,
										date: d.key,
										time: ""
									})),
									"aria-pressed": f.date === d.key,
									className: cn("rounded-md border bg-surface py-3 text-center transition-colors", f.date === d.key ? "border-primary bg-accent ring-2 ring-primary/15" : "hover:border-navy/30", d.sunday && "cursor-not-allowed opacity-35"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] font-bold uppercase tracking-wider text-slate",
											children: d.dow
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xl font-bold text-navy",
											children: d.day
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] text-slate",
											children: d.mon
										})
									]
								}, d.key))
							}), errors.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-destructive",
								role: "alert",
								children: errors.date
							})]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StepPanel, {
							k: 3,
							title: `Available on ${dateLabel}`,
							children: [slots.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: [
									0,
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14" }, i))
							}) : slots.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-destructive",
								children: ["Couldn't load availability. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "underline",
									onClick: () => slots.refetch(),
									children: "Retry"
								})]
							}) : slots.data?.slots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: slots.data.slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
									disabled: !s.available,
									selected: f.time === s.time,
									onClick: () => setF((p) => ({
										...p,
										time: s.time
									})),
									title: s.time,
									meta: s.available ? "Available" : "Unavailable"
								}, s.time))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate",
								children: "We're closed that day. Please choose another date."
							}), errors.time && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-destructive",
								role: "alert",
								children: errors.time
							})]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 4,
							title: "Contact information",
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
											onChange: set("firstName")
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
											onChange: set("lastName")
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
											onChange: set("email")
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
											onChange: set("phone")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Notes",
										htmlFor: "nt",
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "nt",
											rows: 3,
											className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 h-auto py-2`,
											value: f.notes,
											onChange: set("notes")
										})
									})
								]
							})
						}),
						step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPanel, {
							k: 5,
							title: "Review appointment request",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, { rows })
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
					}), step < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "cta",
						size: "lg",
						onClick: next,
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "cta",
						size: "lg",
						className: "h-auto min-h-12 whitespace-normal px-3 py-3 sm:px-7",
						onClick: confirm,
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Submitting"] }) : "Submit appointment request"
					})]
				})
			] })
		})]
	}) });
}
//#endregion
export { BookPage as component };
