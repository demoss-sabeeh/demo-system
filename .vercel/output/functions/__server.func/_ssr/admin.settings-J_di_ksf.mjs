import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TIME_SLOTS, t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn } from "./button-B2pxHB9K.mjs";
import { C as useServices, a as Panel, i as PageTitle, l as inputSm, p as useAutomations } from "./admin-data-Bn9IN1fZ.mjs";
import { t as Switch } from "./switch-BS6bDcIJ.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-J_di_ksf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var INTEGRATIONS = [
	{
		name: "Supabase",
		desc: "Database and authentication",
		status: "Setup must be verified"
	},
	{
		name: "AI assistant",
		desc: "Optional website assistant",
		status: "Demo fallback available"
	},
	{
		name: "SMS provider",
		desc: "Customer text delivery",
		status: "Not configured"
	},
	{
		name: "Email provider",
		desc: "Quotes and confirmations",
		status: "Not configured"
	},
	{
		name: "Google Calendar",
		desc: "Sync appointments to staff calendars",
		status: "Not configured"
	}
];
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1 border-b py-3 last:border-0 sm:grid-cols-3 sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-navy",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:col-span-2",
			children
		})]
	});
}
function Toggle({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b py-3 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-navy",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: false,
			disabled: true,
			"aria-label": `${label} (not configurable yet)`
		})]
	});
}
function Settings() {
	const services = useServices();
	const autos = useAutomations();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Settings",
				subtitle: "These settings are display-only and are not saved by the application."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-warning/30 bg-warning-soft p-3 text-sm text-warning",
				children: "Replace the fictional Apex profile before launch. Configure integrations and business options outside this screen until persistent settings are implemented."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "profile",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "h-auto flex-wrap justify-start bg-secondary",
						children: [
							"profile",
							"hours",
							"services",
							"booking",
							"notifications",
							"ai",
							"automations",
							"integrations",
							"users"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: t,
							className: "capitalize",
							children: t === "ai" ? "AI Assistant" : t === "profile" ? "Business profile" : t === "hours" ? "Business hours" : t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "profile",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Business profile",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Business name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputSm,
										value: BUSINESS.name,
										readOnly: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Address",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputSm,
										value: BUSINESS.address,
										readOnly: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Phone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputSm,
										value: BUSINESS.phone,
										readOnly: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Service area",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputSm,
										value: BUSINESS.serviceArea,
										readOnly: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pt-3 text-xs text-slate",
									children: "These sample values are fictional and cannot be saved here."
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "hours",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Business hours",
							children: BUSINESS.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: h.day,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate",
									children: h.time
								})
							}, h.day))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "services",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Services",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y",
								children: services.data?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-navy",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: s.active ? "text-success" : "text-slate",
										children: s.active ? "Active" : "Inactive"
									})]
								}, s.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/services",
								className: "mt-3 inline-block text-sm font-semibold text-primary",
								children: "Manage services →"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "booking",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Booking settings",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Start times",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate",
										children: TIME_SLOTS.join(" · ")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Booking window",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate",
										children: "14 days ahead · closed Sundays"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Allow online booking from the website" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Require confirmation for PPF and correction" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notifications",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Notifications",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Notify team of new website inquiries" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Notify when a quote is viewed" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Daily appointment summary" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "ai",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "AI assistant",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, { label: "Show assistant on the website" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Knowledge source",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate",
										children: "Business info, services, pricing ranges, hours, FAQ, policies and booking rules."
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Guardrails",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate",
										children: "Answers only from the knowledge source; never invents availability or pricing. Falls back to a deterministic demo mode if AI is unavailable."
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "automations",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Automations",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y",
								children: autos.data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-navy",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize text-slate",
										children: a.status
									})]
								}, a.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/automations",
								className: "mt-3 inline-block text-sm font-semibold text-primary",
								children: "Open Automation Center →"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "integrations",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Integrations",
							bodyClass: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y",
								children: INTEGRATIONS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-navy",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate",
										children: i.desc
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate",
										children: i.status
									})]
								}, i.name))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-t px-4 py-3 text-xs text-slate",
								children: "Status is not automatically verified. Never enter secrets in this screen. SMS, email, and calendar delivery are unavailable until separately integrated and tested."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "users",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Users",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate",
								children: "User provisioning is not available in this screen. A trusted database operator must verify and provision the pilot owner and membership."
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Settings as component };
