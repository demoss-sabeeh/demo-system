import { i as __toESM } from "../_runtime.mjs";
import { b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { C as Menu, E as LogOut, F as Contact, G as ChartColumn, I as Columns3, J as CalendarDays, K as Car, N as ExternalLink, O as LayoutGrid, Q as BellRing, Y as CalendarClock, a as Users, b as MessagesSquare, d as Settings, i as Workflow, j as FileText, r as Wrench } from "../_libs/lucide-react.mjs";
import { n as SheetContent, r as SheetTitle, t as Sheet } from "./sheet-BFMX6gd5.mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { t as OperantMark } from "./OperantMark-BVvioElz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CoROIMww.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		group: "Capture",
		items: [
			{
				to: "/admin",
				label: "Overview",
				icon: LayoutGrid,
				exact: true
			},
			{
				to: "/admin/leads",
				label: "Leads",
				icon: Users
			},
			{
				to: "/admin/pipeline",
				label: "Pipeline",
				icon: Columns3
			}
		]
	},
	{
		group: "Manage",
		items: [
			{
				to: "/admin/customers",
				label: "Customers",
				icon: Contact
			},
			{
				to: "/admin/vehicles",
				label: "Vehicles",
				icon: Car
			},
			{
				to: "/admin/messages",
				label: "Messages",
				icon: MessagesSquare
			}
		]
	},
	{
		group: "Convert",
		items: [
			{
				to: "/admin/quotes",
				label: "Quotes",
				icon: FileText
			},
			{
				to: "/admin/appointments",
				label: "Appointments",
				icon: CalendarClock
			},
			{
				to: "/admin/calendar",
				label: "Calendar",
				icon: CalendarDays
			}
		]
	},
	{
		group: "Retain",
		items: [{
			to: "/admin/follow-ups",
			label: "Follow-ups",
			icon: BellRing
		}, {
			to: "/admin/automations",
			label: "Automations",
			icon: Workflow
		}]
	},
	{
		group: "Business",
		items: [
			{
				to: "/admin/services",
				label: "Services",
				icon: Wrench
			},
			{
				to: "/admin/analytics",
				label: "Analytics",
				icon: ChartColumn
			},
			{
				to: "/admin/settings",
				label: "Settings",
				icon: Settings
			}
		]
	}
];
function SideNav({ onNavigate, collapsed = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex-1 space-y-5 overflow-y-auto px-3 py-4",
		"aria-label": "Admin",
		children: NAV.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-muted/60",
			children: g.group
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-0.5",
			children: g.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: it.to,
				onClick: onNavigate,
				activeOptions: { exact: "exact" in it && it.exact },
				title: collapsed ? it.label : void 0,
				className: cn("flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", collapsed && "justify-center"),
				activeProps: { className: "bg-sidebar-accent text-sidebar-accent-foreground [&_svg]:text-sidebar-primary" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-4 w-4 shrink-0" }),
					" ",
					!collapsed && it.label
				]
			}) }, it.to))
		})] }, g.group))
	});
}
function AdminLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [mobile, setMobile] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const nav = useNavigate();
	async function signOut() {
		await supabase.auth.signOut();
		nav({ to: "/auth" });
	}
	const footer = (c = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 border-t border-sidebar-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			target: "_blank",
			className: cn("flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground hover:bg-sidebar-accent", c && "justify-center"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }),
				" ",
				!c && "Customer website"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: signOut,
			className: cn("flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground hover:bg-sidebar-accent", c && "justify-center"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
				" ",
				!c && "Sign out"
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("sticky top-0 hidden h-dvh shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 lg:flex", collapsed ? "w-16" : "w-60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCollapsed((c) => !c),
						className: cn("flex h-14 items-center border-b border-sidebar-border px-4 text-navy-foreground", collapsed && "justify-center px-0"),
						"aria-label": "Toggle sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperantMark, { compact: collapsed })
					}),
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-3 mt-3 rounded-md border border-sidebar-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold uppercase tracking-[0.16em] text-sky",
							children: "Workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-navy-foreground",
							children: "Apex Auto Detailing"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, { collapsed }),
					footer(collapsed)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobile,
				onOpenChange: setMobile,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "flex w-72 flex-col border-sidebar-border bg-sidebar p-0 text-sidebar-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "flex h-14 items-center border-b border-sidebar-border px-4 text-navy-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperantMark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, { onNavigate: () => setMobile(false) }),
						footer()
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-surface/95 px-4 backdrop-blur md:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-11 w-11 lg:hidden",
								onClick: () => setMobile(true),
								"aria-label": "Open navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded border border-warning/30 bg-warning-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-warning",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-warning" }), " Demo mode"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden truncate text-sm font-bold text-navy sm:inline",
								children: "Apex Auto Detailing"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-[1400px] flex-1 p-4 md:p-6 lg:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-page-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}, pathname)
				})]
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
