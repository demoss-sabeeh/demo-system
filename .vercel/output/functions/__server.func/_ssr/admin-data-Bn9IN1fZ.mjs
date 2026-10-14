import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { k as Inbox, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { g as statusTone, p as label } from "./format-DLdEZFeI.mjs";
import { t as Skeleton } from "./skeleton-Dok039NC.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-data-Bn9IN1fZ.js
var import_jsx_runtime = require_jsx_runtime();
var TONES = {
	neutral: "bg-muted text-slate border-border",
	info: "bg-info-soft text-navy border-mist",
	primary: "bg-accent text-accent-foreground border-sky/40",
	success: "bg-success-soft text-success border-success/25",
	warning: "bg-warning-soft text-warning border-warning/25",
	danger: "bg-danger-soft text-destructive border-destructive/20",
	navy: "bg-navy text-navy-foreground border-navy"
};
var DOT = {
	neutral: "bg-slate",
	info: "bg-sky",
	primary: "bg-primary",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-destructive",
	navy: "bg-sky"
};
function StatusBadge({ status, className }) {
	const tone = statusTone[status] ?? "neutral";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]", TONES[tone], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("h-1.5 w-1.5 rounded-full", DOT[tone]),
			"aria-hidden": true
		}), label(status)]
	});
}
function PageTitle({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight text-navy md:text-[28px]",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-slate",
				children: subtitle
			})]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		})]
	});
}
function Panel({ title, action, children, className, bodyClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-md border bg-surface", className),
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-2 border-b px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[11px] font-bold uppercase tracking-[0.12em] text-slate",
				children: title
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("p-4", bodyClass),
			children
		})]
	});
}
function Kpi({ label, value, hint, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4 text-primary",
					"aria-hidden": true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tabular mt-3 text-3xl font-extrabold text-navy",
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-slate",
				children: hint
			})
		]
	});
}
function EmptyState({ title, body, action, icon: Icon = Inbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-6 w-6 text-mist",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-semibold text-navy",
				children: title
			}),
			body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xs text-sm text-slate",
				children: body
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
			})
		]
	});
}
function ErrorState({ error, retry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center px-6 py-12 text-center",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-semibold text-navy",
				children: "Couldn't load this data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-slate",
				children: error instanceof Error ? error.message : "Please try again."
			}),
			retry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				className: "mt-4",
				onClick: retry,
				children: "Retry"
			})
		]
	});
}
function RowsSkeleton({ rows = 6 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		"aria-busy": "true",
		"aria-label": "Loading",
		children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-full" }, i))
	});
}
function Timeline({ items, fmt }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No activity yet" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "relative space-y-4 pl-5 before:absolute before:left-[5px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-border",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -left-5 top-1 h-[11px] w-[11px] rounded-full border-2 border-surface", i.type === "auto_response" || i.type === "reminder" ? "bg-sky" : i.type === "booked" || i.type === "completed" ? "bg-success" : i.type === "lost" ? "bg-destructive" : "bg-primary") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular text-[11px] font-semibold text-slate",
					children: fmt(i.at)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-navy",
					children: i.title
				}),
				i.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate",
					children: i.detail
				})
			]
		}, i.id))
	});
}
var selectCls = "h-11 min-w-0 max-w-full rounded-md border border-input bg-surface px-2.5 text-base sm:h-9 sm:text-sm text-navy outline-none focus:border-primary";
var inputSm = "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:h-9 sm:text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary";
var LIVE = { refetchInterval: 8e3 };
async function q(p) {
	const { data, error } = await p;
	if (error) throw new Error(error.message);
	return data;
}
var LEAD_SEL = "*, customer:customers(*), vehicle:vehicles(*), service:services(*)";
var useLeads = () => useQuery({
	queryKey: ["db", "leads"],
	queryFn: () => q(supabase.from("leads").select(LEAD_SEL).order("created_at", { ascending: false })),
	...LIVE
});
var useLead = (id) => useQuery({
	queryKey: [
		"db",
		"lead",
		id
	],
	queryFn: async () => {
		const lead = await q(supabase.from("leads").select(LEAD_SEL).eq("id", id).single());
		const [activities, messages, quotes, appointments] = await Promise.all([
			q(supabase.from("lead_activities").select("*").eq("lead_id", id).order("created_at")),
			q(supabase.from("messages").select("*, customer:customers(*)").eq("customer_id", lead.customer_id).order("created_at")),
			q(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("lead_id", id).order("created_at", { ascending: false })),
			q(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("customer_id", lead.customer_id).order("starts_at", { ascending: false }))
		]);
		return {
			lead,
			activities,
			messages,
			quotes,
			appointments
		};
	},
	...LIVE
});
var useCustomers = () => useQuery({
	queryKey: ["db", "customers"],
	queryFn: () => q(supabase.from("customers").select("*, vehicles(*), leads(id,status), appointments(id,starts_at)").order("created_at", { ascending: false }))
});
var useCustomer = (id) => useQuery({
	queryKey: [
		"db",
		"customer",
		id
	],
	queryFn: async () => {
		const [customer, vehicles, leads, quotes, appointments, messages, activities] = await Promise.all([
			q(supabase.from("customers").select("*").eq("id", id).single()),
			q(supabase.from("vehicles").select("*").eq("customer_id", id)),
			q(supabase.from("leads").select(LEAD_SEL).eq("customer_id", id).order("created_at", { ascending: false })),
			q(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("customer_id", id).order("created_at", { ascending: false })),
			q(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("customer_id", id).order("starts_at", { ascending: false })),
			q(supabase.from("messages").select("*, customer:customers(*)").eq("customer_id", id).order("created_at")),
			q(supabase.from("lead_activities").select("*").eq("customer_id", id).order("created_at", { ascending: false }))
		]);
		return {
			customer,
			vehicles,
			leads,
			quotes,
			appointments,
			messages,
			activities
		};
	}
});
var useVehicles = () => useQuery({
	queryKey: ["db", "vehicles"],
	queryFn: () => q(supabase.from("vehicles").select("*, customer:customers(*), appointments(id,starts_at,status,service:services(name))").order("created_at", { ascending: false }))
});
var useVehicle = (id) => useQuery({
	queryKey: [
		"db",
		"vehicle",
		id
	],
	queryFn: async () => {
		const [vehicle, appointments, quotes] = await Promise.all([
			q(supabase.from("vehicles").select("*, customer:customers(*)").eq("id", id).single()),
			q(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").eq("vehicle_id", id).order("starts_at", { ascending: false })),
			q(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").eq("vehicle_id", id).order("created_at", { ascending: false }))
		]);
		return {
			vehicle,
			appointments,
			quotes
		};
	}
});
var useQuotes = () => useQuery({
	queryKey: ["db", "quotes"],
	queryFn: () => q(supabase.from("quotes").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*), items:quote_items(*)").order("created_at", { ascending: false }))
});
var useAppointments = () => useQuery({
	queryKey: ["db", "appointments"],
	queryFn: () => q(supabase.from("appointments").select("*, customer:customers(*), vehicle:vehicles(*), service:services(*)").order("starts_at")),
	...LIVE
});
var useMessages = () => useQuery({
	queryKey: ["db", "messages"],
	queryFn: () => q(supabase.from("messages").select("*, customer:customers(*)").order("created_at")),
	...LIVE
});
var useFollowUps = () => useQuery({
	queryKey: ["db", "follow_ups"],
	queryFn: () => q(supabase.from("follow_ups").select("*, customer:customers(*), vehicle:vehicles(*)").order("next_contact_at"))
});
var useAutomations = () => useQuery({
	queryKey: ["db", "automations"],
	queryFn: () => q(supabase.from("automations").select("*").order("sort"))
});
var useAutomationRuns = () => useQuery({
	queryKey: ["db", "automation_runs"],
	queryFn: () => q(supabase.from("automation_runs").select("*, automation:automations(*), customer:customers(*)").order("created_at", { ascending: false }).limit(60)),
	...LIVE
});
var useServices = () => useQuery({
	queryKey: ["db", "services"],
	queryFn: () => q(supabase.from("services").select("*").order("sort"))
});
var useRecentActivity = () => useQuery({
	queryKey: ["db", "activity"],
	queryFn: () => q(supabase.from("lead_activities").select("*, customer:customers(*)").order("created_at", { ascending: false }).limit(14)),
	...LIVE
});
function useInvalidate() {
	const qc = useQueryClient();
	return () => qc.invalidateQueries({ queryKey: ["db"] });
}
//#endregion
export { useServices as C, useRecentActivity as S, useVehicles as T, useInvalidate as _, Panel as a, useMessages as b, Timeline as c, useAppointments as d, useAutomationRuns as f, useFollowUps as g, useCustomers as h, PageTitle as i, inputSm as l, useCustomer as m, ErrorState as n, RowsSkeleton as o, useAutomations as p, Kpi as r, StatusBadge as s, EmptyState as t, selectCls as u, useLead as v, useVehicle as w, useQuotes as x, useLeads as y };
