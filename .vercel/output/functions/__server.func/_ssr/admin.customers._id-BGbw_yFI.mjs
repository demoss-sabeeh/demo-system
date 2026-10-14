import { i as __toESM } from "../_runtime.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { $ as BellPlus, K as Car, S as MessageSquarePlus, it as ArrowLeft, m as Save } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { d as fmtTime, f as fullName, h as money, l as fmtDate, u as fmtDateTime, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, a as Panel, c as Timeline, m as useCustomer, n as ErrorState, o as RowsSkeleton, s as StatusBadge } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as deleteCustomer, t as DeleteButton } from "./actions-DJdb8WbE.mjs";
import { t as Route } from "./admin.customers._id-BANMN3iW.mjs";
import { n as FollowUpDialog, r as MessageDialog } from "./dialogs-CRwRHSPf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._id-BGbw_yFI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomerProfile() {
	const { id } = Route.useParams();
	const q = useCustomer(id);
	const invalidate = useInvalidate();
	const nav = useNavigate();
	const [dlg, setDlg] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)(null);
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 8 });
	if (q.isError || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: q.error,
		retry: () => q.refetch()
	});
	const { customer, vehicles, leads, quotes, appointments, messages, activities } = q.data;
	const ctx = {
		customer_id: customer.id,
		lead_id: leads[0]?.id,
		customerName: fullName(customer)
	};
	const history = appointments.filter((a) => a.status === "completed");
	async function saveNotes() {
		const { error } = await supabase.from("customers").update({ notes: notes ?? "" }).eq("id", customer.id);
		if (error) return toast.error(error.message);
		toast.success("Notes saved");
		setNotes(null);
		invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/customers",
				className: "inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Customers"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-md border bg-surface p-5 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-extrabold text-navy",
						children: fullName(customer)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate",
						children: [
							customer.email,
							" · ",
							customer.phone,
							" · ",
							customer.city
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-slate",
						children: ["Customer since ", fmtDate(customer.created_at, {
							month: "long",
							year: "numeric"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDlg("msg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, {}), " Message"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setDlg("fu"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellPlus, {}), " Follow-up"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
							kind: "Customer",
							name: fullName(customer),
							detail: `This also removes ${vehicles.length} vehicle(s), ${leads.length} lead(s), ${quotes.length} quote(s), ${appointments.length} appointment(s) and ${messages.length} message(s).`,
							onConfirm: () => deleteCustomer(customer.id),
							onDeleted: () => nav({ to: "/admin/customers" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: `Vehicles (${vehicles.length})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: vehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/vehicles/$id",
									params: { id: v.id },
									className: "flex items-center gap-3 rounded-md border p-3 hover:border-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-navy",
										children: vehicleName(v)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate",
										children: v.color
									})] })]
								}, v.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Leads",
							bodyClass: "p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y",
								children: leads.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/admin/leads/$id",
									params: { id: l.id },
									className: "flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-secondary/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-navy",
											children: l.service?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular text-slate",
											children: money(l.estimated_value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status })
									]
								}) }, l.id))
							}), !leads.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-4 text-sm text-slate",
								children: "No leads."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
								title: "Appointments",
								bodyClass: "p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y",
									children: appointments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-2 px-4 py-2.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-navy",
											children: a.service?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate",
											children: fmtDateTime(a.starts_at)
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
									}, a.id))
								}), !appointments.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-4 text-sm text-slate",
									children: "No appointments."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
								title: "Quotes",
								bodyClass: "p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y",
									children: quotes.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin/quotes",
										search: { open: x.id },
										className: "flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-secondary/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-navy",
												children: x.number
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular",
												children: money(x.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - x.discount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })
										]
									}) }, x.id))
								}), !quotes.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-4 text-sm text-slate",
									children: "No quotes."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Service history",
							children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate",
								children: "No completed services yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: history.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-navy",
										children: [
											a.service?.name,
											" · ",
											vehicleName(a.vehicle)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate",
										children: fmtDate(a.starts_at, {
											month: "short",
											day: "numeric",
											year: "numeric"
										})
									})]
								}, a.id))
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Notes",
							action: notes !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: saveNotes,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), " Save"]
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								"aria-label": "Customer notes",
								rows: 3,
								className: "w-full resize-none rounded-md border bg-background p-2 text-sm text-navy outline-none focus:border-primary",
								value: notes ?? customer.notes,
								onChange: (e) => setNotes(e.target.value),
								placeholder: "Add a note…"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Messages",
							bodyClass: "max-h-72 space-y-2 overflow-y-auto",
							children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate",
								children: "No messages."
							}) : messages.slice(-8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `rounded px-2.5 py-1.5 text-xs ${m.direction === "outbound" ? "ml-6 bg-navy text-navy-foreground" : "mr-6 bg-secondary text-navy"}`,
								children: [m.body, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-[10px] opacity-70",
									children: [
										m.channel.toUpperCase(),
										" · ",
										fmtTime(m.created_at)
									]
								})]
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Activity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {
								items: activities.slice(0, 12).map((a) => ({
									id: a.id,
									title: a.title,
									detail: a.detail,
									at: a.created_at,
									type: a.type
								})),
								fmt: (d) => fmtDateTime(d)
							})
						})
					]
				})]
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
export { CustomerProfile as component };
