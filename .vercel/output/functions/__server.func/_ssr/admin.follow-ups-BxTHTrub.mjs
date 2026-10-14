import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { c as dayKey, f as fullName, l as fmtDate, n as FU_STATUSES, p as label, r as FU_TYPES, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, g as useFollowUps, i as PageTitle, l as inputSm, o as RowsSkeleton, s as StatusBadge, t as EmptyState, u as selectCls } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as deleteFollowUp, n as RowDelete } from "./actions-DJdb8WbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.follow-ups-BxTHTrub.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FollowUps() {
	const f = useFollowUps();
	const invalidate = useInvalidate();
	const [status, setStatus] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const rows = (f.data ?? []).filter((x) => (!status || x.status === status) && (!type || x.type === type) && (!date || x.next_contact_at && dayKey(x.next_contact_at) === date));
	async function update(id, s) {
		const { error } = await supabase.from("follow_ups").update({
			status: s,
			...s === "completed" ? { last_contact_at: (/* @__PURE__ */ new Date()).toISOString() } : {}
		}).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success(`Follow-up ${label(s).toLowerCase()}`);
		invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Follow-ups",
				subtitle: "Quote nudges, reminders, post-service check-ins and reactivation — nothing slips."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: FU_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStatus(status === s ? "" : s),
					className: `rounded-md border bg-surface p-3 text-left ${status === s ? "border-primary" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold uppercase tracking-wider text-slate",
						children: label(s)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular text-2xl font-extrabold text-navy",
						children: (f.data ?? []).filter((x) => x.status === s).length
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": "Type",
					className: selectCls,
					value: type,
					onChange: (e) => setType(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All types"
					}), Object.entries(FU_TYPES).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k,
						children: v
					}, k))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					"aria-label": "Next contact date",
					className: `${inputSm} sm:w-48`,
					value: date,
					onChange: (e) => setDate(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border bg-surface",
				children: f.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {})
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No follow-ups",
					body: "You're all caught up."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: rows.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 px-4 py-3 md:grid-cols-12 md:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/customers/$id",
									params: { id: x.customer_id },
									className: "font-bold text-navy hover:text-primary",
									children: fullName(x.customer)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate",
									children: vehicleName(x.vehicle)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 md:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-navy",
									children: FU_TYPES[x.type]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate",
									children: x.reason
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular text-xs text-slate md:col-span-2",
								children: [
									"Last ",
									fmtDate(x.last_contact_at),
									" · Next ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-navy",
										children: fmtDate(x.next_contact_at)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2 md:text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									"aria-label": "Update status",
									className: `${selectCls} min-w-0 flex-1`,
									value: x.status,
									onChange: (e) => update(x.id, e.target.value),
									children: FU_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: label(s)
									}, s))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
									kind: "Follow-up",
									name: `${FU_TYPES[x.type] ?? "Follow-up"} · ${fullName(x.customer)}`,
									onConfirm: () => deleteFollowUp(x.id)
								})]
							})
						]
					}, x.id))
				})
			})
		]
	});
}
//#endregion
export { FollowUps as component };
