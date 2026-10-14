import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn } from "./button-B2pxHB9K.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { _ as timeAgo, a as LEAD_STATUSES, f as fullName, h as money, p as label, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { _ as useInvalidate, i as PageTitle, o as RowsSkeleton, u as selectCls, y as useLeads } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as setLeadStatus, l as deleteLead, n as RowDelete } from "./actions-DJdb8WbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pipeline-ChiIIrbV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Pipeline() {
	const leads = useLeads();
	const qc = useQueryClient();
	const invalidate = useInvalidate();
	const [over, setOver] = (0, import_react.useState)(null);
	async function move(lead, status) {
		if (lead.status === status) return;
		qc.setQueryData(["db", "leads"], (old) => old?.map((l) => l.id === lead.id ? {
			...l,
			status
		} : l));
		try {
			await setLeadStatus(lead, status);
			toast.success(`${fullName(lead.customer)} → ${label(status)}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Move failed");
		} finally {
			invalidate();
		}
	}
	const all = leads.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			title: "Pipeline",
			subtitle: "Drag cards between stages. Changes are saved instantly."
		}), leads.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-4 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 pb-4 md:-mx-6 md:px-6 md:snap-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-max gap-3",
				children: LEAD_STATUSES.map((s) => {
					const items = all.filter((l) => l.status === s);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-label": label(s),
						onDragOver: (e) => {
							e.preventDefault();
							setOver(s);
						},
						onDragLeave: () => setOver(null),
						onDrop: (e) => {
							e.preventDefault();
							setOver(null);
							const lead = all.find((l) => l.id === e.dataTransfer.getData("text/plain"));
							if (lead) move(lead, s);
						},
						className: cn("flex w-64 shrink-0 snap-start scroll-mx-4 flex-col rounded-md border bg-secondary/40 transition-colors", over === s && "border-primary bg-accent"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center justify-between border-b px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold uppercase tracking-[0.12em] text-navy",
								children: [
									label(s),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate",
										children: items.length
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-[11px] font-semibold text-slate",
								children: money(items.reduce((a, l) => a + l.estimated_value, 0))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-[120px] flex-1 space-y-2 p-2",
							children: [items.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								layout: true,
								draggable: true,
								onDragStart: (e) => e.dataTransfer.setData("text/plain", l.id),
								className: "cursor-grab rounded-md border bg-surface p-3 active:cursor-grabbing",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "-mr-2 -mt-1.5 flex items-start justify-between gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/leads/$id",
											params: { id: l.id },
											className: "block min-w-0 pt-1.5 text-sm font-bold text-navy hover:text-primary",
											children: fullName(l.customer)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
											kind: "Lead",
											name: `${fullName(l.customer)} — ${l.service?.name ?? "lead"}`,
											detail: "Quotes, appointments and messages stay on the customer record.",
											onConfirm: () => deleteLead(l.id)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 truncate text-xs text-slate",
										children: vehicleName(l.vehicle)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-medium text-navy",
										children: l.service?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular font-bold text-navy",
											children: money(l.estimated_value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate",
											children: [
												label(l.source),
												" · ",
												timeAgo(l.created_at)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": `Move ${fullName(l.customer)}`,
										className: `${selectCls} mt-2 w-full md:hidden`,
										value: l.status,
										onChange: (e) => move(l, e.target.value),
										children: LEAD_STATUSES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: x,
											children: label(x)
										}, x))
									})
								]
							}, l.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 py-6 text-center text-xs text-slate",
								children: "Drop leads here"
							})]
						})]
					}, s);
				})
			})
		})]
	});
}
//#endregion
export { Pipeline as component };
