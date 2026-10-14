import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as dayKey, d as fmtTime, f as fullName, l as fmtDate, p as label, t as APPT_STATUSES, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { C as useServices, d as useAppointments, i as PageTitle, l as inputSm, o as RowsSkeleton, s as StatusBadge, t as EmptyState, u as selectCls } from "./admin-data-Bn9IN1fZ.mjs";
import { n as RowDelete, o as deleteAppointment } from "./actions-DJdb8WbE.mjs";
import { t as AppointmentSheet } from "./AppointmentSheet-CKKGPRYY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.appointments-BNk1oqh1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Appointments() {
	const a = useAppointments();
	const services = useServices();
	const [status, setStatus] = (0, import_react.useState)("");
	const [service, setService] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [sel, setSel] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => (a.data ?? []).filter((x) => (!status || x.status === status) && (!service || x.service_id === service) && (!date || dayKey(x.starts_at) === date)), [
		a.data,
		status,
		service,
		date
	]);
	const groups = rows.reduce((acc, x) => ((acc[dayKey(x.starts_at)] ??= []).push(x), acc), {});
	const current = sel ? a.data?.find((x) => x.id === sel.id) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Appointments",
				subtitle: `${rows.length} appointments`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						"aria-label": "Date",
						className: `${inputSm} w-auto`,
						value: date,
						onChange: (e) => setDate(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Status",
						className: selectCls,
						value: status,
						onChange: (e) => setStatus(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All statuses"
						}), APPT_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: label(s)
						}, s))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Service",
						className: selectCls,
						value: service,
						onChange: (e) => setService(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All services"
						}), services.data?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					})
				]
			}),
			a.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No appointments" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: Object.entries(groups).map(([d, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-md border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "border-b bg-secondary/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-navy",
						children: [fmtDate(list[0].starts_at, {
							weekday: "long",
							month: "long",
							day: "numeric"
						}), d === dayKey(/* @__PURE__ */ new Date()) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-primary",
							children: "Today"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: list.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSel(x),
								className: "flex min-w-0 flex-1 items-center gap-4 py-2.5 pl-4 text-left hover:bg-secondary/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular w-16 text-sm font-bold text-navy",
										children: fmtTime(x.starts_at)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-bold text-navy",
											children: fullName(x.customer)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block truncate text-xs text-slate",
											children: [
												vehicleName(x.vehicle),
												" · ",
												x.service?.name
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
								className: "px-1",
								kind: "Appointment",
								name: `${x.service?.name ?? "Appointment"} · ${fullName(x.customer)} · ${fmtDate(x.starts_at)} ${fmtTime(x.starts_at)}`,
								onConfirm: () => deleteAppointment(x.id)
							})]
						}, x.id))
					})]
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentSheet, {
				appt: current,
				onClose: () => setSel(null)
			})
		]
	});
}
//#endregion
export { Appointments as component };
