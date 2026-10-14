import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { T as Mail, Z as Bot, it as ArrowLeft, y as MessageSquare } from "../_libs/lucide-react.mjs";
import { _ as timeAgo, d as fmtTime, f as fullName, u as fmtDateTime, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, b as useMessages, d as useAppointments, i as PageTitle, o as RowsSkeleton, s as StatusBadge, t as EmptyState, y as useLeads } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as setLeadStatus, n as RowDelete, u as deleteMessage } from "./actions-DJdb8WbE.mjs";
import { i as QuoteDialog, n as FollowUpDialog, t as BookDialog } from "./dialogs-CRwRHSPf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.messages-DoIBv--q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICON = {
	sms: MessageSquare,
	email: Mail,
	ai: Bot
};
function Inbox() {
	const msgs = useMessages();
	const leads = useLeads();
	const appts = useAppointments();
	const invalidate = useInvalidate();
	const [channel, setChannel] = (0, import_react.useState)("");
	const [sel, setSel] = (0, import_react.useState)(null);
	const [dlg, setDlg] = (0, import_react.useState)(null);
	const threads = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const x of msgs.data ?? []) if (!channel || x.channel === channel) (m.get(x.customer_id) ?? m.set(x.customer_id, []).get(x.customer_id)).push(x);
		return [...m.entries()].map(([cid, list]) => ({
			cid,
			list,
			last: list[list.length - 1]
		})).sort((a, b) => +new Date(b.last.created_at) - +new Date(a.last.created_at));
	}, [msgs.data, channel]);
	const active = threads.find((t) => t.cid === sel);
	const lead = leads.data?.find((l) => l.customer_id === sel);
	const appt = appts.data?.find((a) => a.customer_id === sel && new Date(a.starts_at).getTime() > Date.now());
	const ctx = active ? {
		customer_id: active.cid,
		lead_id: lead?.id,
		vehicle_id: lead?.vehicle_id,
		service_id: lead?.service_id,
		customerName: fullName(active.last.customer)
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Messages",
				subtitle: "Message history and AI assistant conversations. SMS and email delivery are not configured."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-md border bg-surface lg:min-h-[560px] lg:grid-cols-[300px_minmax(0,1fr)_260px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: cn("min-w-0 border-r", active && "hidden lg:block"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 border-b p-2",
							children: [
								"",
								"sms",
								"email",
								"ai"
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setChannel(c),
								className: cn("rounded px-2.5 py-1 text-xs font-semibold", channel === c ? "bg-navy text-navy-foreground" : "text-slate hover:bg-secondary"),
								children: c ? c === "ai" ? "AI" : c.toUpperCase() : "All"
							}, c || "all"))
						}), msgs.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 6 })
						}) : threads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No conversations" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-[520px] divide-y overflow-y-auto",
							children: threads.map((t) => {
								const I = ICON[t.last.channel];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSel(t.cid),
									className: cn("w-full px-3 py-2.5 text-left hover:bg-secondary/50", sel === t.cid && "bg-accent"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 truncate text-sm font-bold text-navy",
											children: fullName(t.last.customer)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-[10px] text-slate",
											children: timeAgo(t.last.created_at)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-slate",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 truncate",
											children: t.last.body
										})]
									})]
								}) }, t.cid);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: cn("flex min-w-0 flex-col", !active && "hidden lg:flex"),
						children: !active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "m-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Select a conversation" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center gap-2 border-b px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									onClick: () => setSel(null),
									"aria-label": "Back",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-navy",
									children: fullName(active.last.customer)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-[45dvh] min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-4 lg:max-h-[440px]",
								children: active.list.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("group flex items-start gap-1", m.direction === "outbound" && "flex-row-reverse"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("min-w-0 max-w-[90%] break-words rounded-md px-3 py-2 text-sm [overflow-wrap:anywhere] sm:max-w-[78%]", m.direction === "outbound" ? "bg-navy text-navy-foreground" : "bg-secondary text-navy"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.body }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: cn("mt-1 text-[10px]", m.direction === "outbound" ? "text-navy-muted" : "text-slate"),
											children: [
												m.channel === "ai" ? "AI assistant" : m.channel.toUpperCase(),
												m.automated ? " · automated" : "",
												" · ",
												fmtTime(m.created_at)
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
										className: "opacity-60 transition-opacity group-hover:opacity-100",
										kind: "Message",
										name: `“${m.body.slice(0, 80)}${m.body.length > 80 ? "…" : ""}”`,
										detail: "Only this message is removed; the rest of the conversation stays.",
										onConfirm: () => deleteMessage(m.id)
									})]
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t p-3 text-sm text-slate",
								children: "Replies are unavailable until a verified SMS or email provider is configured."
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden border-l p-4 lg:block",
						children: active && ctx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate",
										children: "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/customers/$id",
										params: { id: active.cid },
										className: "font-bold text-primary",
										children: ctx.customerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate",
										children: active.last.customer?.phone
									})
								] }),
								lead && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate",
										children: "Vehicle"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-navy",
										children: vehicleName(lead.vehicle)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate",
										children: "Service"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-navy",
										children: lead.service?.name
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate",
										children: "Lead status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: lead.status })] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-slate",
									children: "Next appointment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-navy",
									children: appt ? fmtDateTime(appt.starts_at) : "None"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5 border-t pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											disabled: !lead,
											onClick: () => setDlg("quote"),
											children: "Create quote"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											onClick: () => setDlg("book"),
											children: "Book appointment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											disabled: !lead,
											onClick: async () => {
												await setLeadStatus(lead, "qualified");
												invalidate();
												toast.success("Lead qualified");
											},
											children: "Qualify lead"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => setDlg("fu"),
											children: "Create follow-up"
										})
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: "Customer context appears here."
						})
					})
				]
			}),
			ctx && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				dlg === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDialog, {
					open: true,
					onOpenChange: (o) => setDlg(o ? "quote" : null),
					ctx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDialog, {
					open: dlg === "book",
					onOpenChange: (o) => setDlg(o ? "book" : null),
					ctx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowUpDialog, {
					open: dlg === "fu",
					onOpenChange: (o) => setDlg(o ? "fu" : null),
					ctx
				})
			] })
		]
	});
}
//#endregion
export { Inbox as component };
