import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { K as Car, p as Search } from "../_libs/lucide-react.mjs";
import { f as fullName, l as fmtDate, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { T as useVehicles, i as PageTitle, l as inputSm, o as RowsSkeleton, t as EmptyState } from "./admin-data-Bn9IN1fZ.mjs";
import { n as RowDelete, p as deleteVehicle } from "./actions-DJdb8WbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.vehicles.index-BR44uAS6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Vehicles() {
	const v = useVehicles();
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => (v.data ?? []).filter((x) => !q || `${vehicleName(x)} ${x.color} ${fullName(x.customer)}`.toLowerCase().includes(q.toLowerCase())), [v.data, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Vehicles",
				subtitle: "Every vehicle, its owner and its service history."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-slate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Search vehicles",
					className: `${inputSm} pl-8`,
					placeholder: "Make, model, owner…",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			v.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No vehicles found" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: rows.map((x) => {
					const done = x.appointments.filter((a) => a.status === "completed").sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/vehicles/$id",
						params: { id: x.id },
						className: "rounded-md border bg-surface p-4 transition-colors hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "-mr-2 -mt-2 flex items-center text-[11px] text-slate",
									children: [x.color, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
										kind: "Vehicle",
										name: vehicleName(x),
										detail: "Its leads, quotes and appointments stay on the customer record.",
										onConfirm: () => deleteVehicle(x.id)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-bold text-navy",
								children: vehicleName(x)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate",
								children: ["Owner · ", fullName(x.customer)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 border-t pt-2 text-xs text-slate",
								children: ["Last service: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-navy",
									children: done[0] ? `${done[0].service?.name} · ${fmtDate(done[0].starts_at)}` : "None yet"
								})]
							})
						]
					}, x.id);
				})
			})
		]
	});
}
//#endregion
export { Vehicles as component };
