import { i as __toESM } from "../_runtime.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { $ as BellPlus, M as FilePlusCorner, S as MessageSquarePlus, W as CheckCheck, et as BadgeCheck, it as ArrowLeft, q as CalendarPlus } from "../_libs/lucide-react.mjs";
import { a as LEAD_STATUSES, d as fmtTime, f as fullName, h as money, l as fmtDate, p as label, u as fmtDateTime, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, a as Panel, c as Timeline, n as ErrorState, o as RowsSkeleton, s as StatusBadge, u as selectCls, v as useLead } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as setLeadStatus, l as deleteLead, m as setAppointmentStatus, t as DeleteButton } from "./actions-DJdb8WbE.mjs";
import { i as QuoteDialog, n as FollowUpDialog, r as MessageDialog, t as BookDialog } from "./dialogs-CRwRHSPf.mjs";
import { t as Route } from "./admin.leads._id-CNqdH9fm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.leads._id-BKlr2xsz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LeadWorkspace() {
	const { id } = Route.useParams();
	const q = useLead(id);
	const invalidate = useInvalidate();
	const [dlg, setDlg] = (0, import_react.useState)(null);
	const nav = useNavigate();
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 8 });
	if (q.isError || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: q.error,
		retry: () => q.refetch()
	});
	const { lead, activities, messages, quotes, appointments } = q.data;
	const name = fullName(lead.customer);
	const ctx = {
		lead_id: lead.id,
		customer_id: lead.customer_id,
		vehicle_id: lead.vehicle_id,
		service_id: lead.service_id,
		customerName: name,
		estimated_value: lead.estimated_value
	};
	async function status(s) {
		try {
			await setLeadStatus(lead, s);
			await invalidate();
			toast.success(`Lead moved to ${label(s)}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Update failed");
		}
	}
	async function complete() {
		const appt = [...appointments].reverse().find((a) => a.lead_id === lead.id && a.status !== "completed" && a.status !== "cancelled");
		try {
			if (appt) await setAppointmentStatus(appt, "completed");
			else await setLeadStatus(lead, "completed");
			await invalidate();
			toast.success("Marked completed — vehicle history updated");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Update failed");
		}
	}
	const stageIdx = LEAD_STATUSES.indexOf(lead.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/leads",
				className: "inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Leads"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-md border bg-surface p-5 lg:flex-row lg:items-start lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-extrabold text-navy",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: lead.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-slate",
						children: [
							vehicleName(lead.vehicle),
							lead.vehicle?.color ? ` · ${lead.vehicle.color}` : "",
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-navy",
								children: lead.service?.name
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular mt-3 text-3xl font-extrabold text-navy",
						children: [
							money(lead.estimated_value),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-slate",
								children: "estimated value"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => status("qualified"),
							disabled: stageIdx >= 2 && lead.status !== "lost",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {}), " Qualify"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDlg("quote"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, {}), " Create quote"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setDlg("book"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {}), " Book appointment"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDlg("msg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, {}), " Send message"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDlg("fu"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellPlus, {}), " Follow-up"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "navy",
							onClick: complete,
							disabled: lead.status === "completed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, {}), " Mark completed"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
							kind: "Lead",
							name: `${name} — ${lead.service?.name ?? "lead"}`,
							detail: "Quotes, appointments, messages and follow-ups stay on the customer record.",
							onConfirm: () => deleteLead(lead.id),
							onDeleted: () => nav({ to: "/admin/leads" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid grid-cols-7 gap-1",
				"aria-label": "Lead stage",
				children: LEAD_STATUSES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => status(s),
					className: "w-full text-left",
					"aria-current": lead.status === s,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1 rounded-full", lead.status === "lost" ? s === "lost" ? "bg-destructive" : "bg-border" : i <= stageIdx && s !== "lost" ? "bg-primary" : "bg-border") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-1.5 block truncate text-[10px] font-bold uppercase tracking-wider", lead.status === s ? "text-navy" : "text-slate"),
						children: label(s)
					})]
				}) }, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Customer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "space-y-2 text-sm",
									children: [
										["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/customers/$id",
											params: { id: lead.customer_id },
											className: "font-semibold text-primary",
											children: name
										}, "n")],
										["Email", lead.customer?.email],
										["Phone", lead.customer?.phone],
										["Source", label(lead.source)],
										["Created", fmtDateTime(lead.created_at)]
									].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-slate",
											children: k
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right text-navy",
											children: v
										})]
									}, k))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
								title: "Vehicle & request",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "space-y-2 text-sm",
									children: [
										["Vehicle", lead.vehicle_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/vehicles/$id",
											params: { id: lead.vehicle_id },
											className: "font-semibold text-primary",
											children: vehicleName(lead.vehicle)
										}, "v") : "—"],
										["Color", lead.vehicle?.color || "—"],
										["Service", lead.service?.name],
										["Preferred", [lead.preferred_date && fmtDate(lead.preferred_date + "T12:00:00Z", {
											weekday: "short",
											month: "short",
											day: "numeric",
											timeZone: "UTC"
										}), lead.preferred_time].filter(Boolean).join(" · ") || "—"],
										["Condition", lead.vehicle_condition || "—"]
									].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-slate",
											children: k
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right text-navy",
											children: v
										})]
									}, k))
								}), lead.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 rounded bg-secondary p-2 text-xs text-navy",
									children: lead.notes
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Move stage",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									"aria-label": "Lead status",
									className: `${selectCls} w-full`,
									value: lead.status,
									onChange: (e) => status(e.target.value),
									children: LEAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: label(s)
									}, s))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Activity timeline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {
							items: activities.map((a) => ({
								id: a.id,
								title: a.title,
								detail: a.detail,
								at: a.created_at,
								type: a.type
							})),
							fmt: (d) => `${fmtDate(d)} · ${fmtTime(d)}`
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Conversation",
								bodyClass: "max-h-[360px] space-y-2 overflow-y-auto",
								children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate",
									children: "No messages yet."
								}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("flex", m.direction === "outbound" ? "justify-end" : ""),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("max-w-[88%] rounded-md px-3 py-2 text-[13px]", m.direction === "outbound" ? "bg-navy text-navy-foreground" : "bg-secondary text-navy"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.body }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: cn("mt-1 text-[10px]", m.direction === "outbound" ? "text-navy-muted" : "text-slate"),
											children: [
												m.channel.toUpperCase(),
												m.automated ? " · automated" : "",
												" · ",
												fmtTime(m.created_at)
											]
										})]
									})
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Quotes",
								bodyClass: "p-0",
								children: quotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-4 text-sm text-slate",
									children: "No quotes yet."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y",
									children: quotes.map((qq) => {
										const total = qq.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - qq.discount;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/quotes",
											search: { open: qq.id },
											className: "flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-navy",
													children: qq.number
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular text-navy",
													children: money(total)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: qq.status })
											]
										}) }, qq.id);
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Appointments",
								bodyClass: "p-0",
								children: appointments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-4 text-sm text-slate",
									children: "No appointments yet."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y",
									children: appointments.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between px-4 py-2.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-navy",
											children: fmtDateTime(a.starts_at)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
									}, a.id))
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDialog, {
				open: dlg === "book",
				onOpenChange: (o) => setDlg(o ? "book" : null),
				ctx
			}),
			dlg === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDialog, {
				open: true,
				onOpenChange: (o) => setDlg(o ? "quote" : null),
				ctx
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageDialog, {
				open: dlg === "msg",
				onOpenChange: (o) => setDlg(o ? "msg" : null),
				ctx
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowUpDialog, {
				open: dlg === "fu",
				onOpenChange: (o) => setDlg(o ? "fu" : null),
				ctx
			})
		]
	});
}
//#endregion
export { LeadWorkspace as component };
