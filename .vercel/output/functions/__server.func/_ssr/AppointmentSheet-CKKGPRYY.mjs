import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SheetContent, r as SheetTitle, t as Sheet } from "./sheet-BFMX6gd5.mjs";
import { d as fmtTime, f as fullName, l as fmtDate, p as label, t as APPT_STATUSES, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, s as StatusBadge } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { m as setAppointmentStatus, o as deleteAppointment, t as DeleteButton } from "./actions-DJdb8WbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppointmentSheet-CKKGPRYY.js
var import_jsx_runtime = require_jsx_runtime();
function AppointmentSheet({ appt, onClose }) {
	const invalidate = useInvalidate();
	async function change(s) {
		if (!appt) return;
		try {
			await setAppointmentStatus(appt, s);
			await invalidate();
			toast.success(`Appointment ${label(s).toLowerCase()}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Update failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: !!appt,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "text-navy",
				children: "Appointment"
			}), appt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-extrabold text-navy",
							children: appt.service?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-slate",
							children: [
								fmtDate(appt.starts_at, {
									weekday: "long",
									month: "long",
									day: "numeric"
								}),
								" · ",
								fmtTime(appt.starts_at),
								" · ~",
								appt.duration_hours,
								" hrs"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: appt.status })
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "divide-y rounded-md border text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Customer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/customers/$id",
									params: { id: appt.customer_id },
									className: "font-semibold text-primary",
									children: fullName(appt.customer)
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Vehicle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: appt.vehicle_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/vehicles/$id",
									params: { id: appt.vehicle_id },
									className: "font-semibold text-primary",
									children: vehicleName(appt.vehicle)
								}) : "—" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-navy",
									children: appt.location
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-navy",
									children: appt.customer?.phone
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "appt-status",
							className: "mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "appt-status",
							className: `h-11 min-w-0 max-w-full rounded-md border border-input bg-surface px-2.5 text-base sm:h-9 sm:text-sm text-navy outline-none focus:border-primary w-full`,
							value: appt.status,
							onChange: (e) => change(e.target.value),
							children: APPT_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: label(s)
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-slate",
							children: "Completing an appointment updates vehicle history and schedules a post-service follow-up."
						})
					] }),
					appt.lead_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/leads/$id",
						params: { id: appt.lead_id },
						className: "text-sm font-semibold text-primary",
						children: "Open lead →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
							kind: "Appointment",
							name: `${appt.service?.name ?? "Appointment"} · ${fullName(appt.customer)} · ${fmtDate(appt.starts_at)} ${fmtTime(appt.starts_at)}`,
							onConfirm: () => deleteAppointment(appt.id),
							onDeleted: onClose,
							label: "Delete appointment"
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { AppointmentSheet as t };
