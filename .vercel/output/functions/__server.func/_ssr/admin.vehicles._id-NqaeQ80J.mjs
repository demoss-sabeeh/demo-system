import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { K as Car, it as ArrowLeft } from "../_libs/lucide-react.mjs";
import { f as fullName, h as money, l as fmtDate, u as fmtDateTime, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { a as Panel, n as ErrorState, o as RowsSkeleton, s as StatusBadge, w as useVehicle } from "./admin-data-Bn9IN1fZ.mjs";
import { p as deleteVehicle, t as DeleteButton } from "./actions-DJdb8WbE.mjs";
import { t as Route } from "./admin.vehicles._id-m_OhtXba.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.vehicles._id-NqaeQ80J.js
var import_jsx_runtime = require_jsx_runtime();
var NEXT = {
	"ceramic-coating": ["Maintenance Detail", 42],
	"paint-protection-film": ["Maintenance Detail", 42],
	"paint-correction": ["Ceramic Coating", 14],
	"full-detail": ["Maintenance Detail", 60],
	"interior-detail": ["Full Detail", 90],
	"maintenance-detail": ["Maintenance Detail", 42],
	"fleet-detailing": ["Fleet / Commercial Detailing", 30]
};
function VehicleProfile() {
	const { id } = Route.useParams();
	const q = useVehicle(id);
	const nav = useNavigate();
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, { rows: 6 });
	if (q.isError || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: q.error,
		retry: () => q.refetch()
	});
	const { vehicle, appointments, quotes } = q.data;
	const last = appointments.filter((a) => a.status === "completed")[0];
	const rec = last?.service ? NEXT[last.service.slug] : void 0;
	const nextDate = last && rec ? new Date(new Date(last.starts_at).getTime() + rec[1] * 864e5) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/vehicles",
				className: "inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Vehicles"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "min-w-0 flex-1 text-2xl font-extrabold text-navy",
							children: vehicleName(vehicle)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
							kind: "Vehicle",
							name: vehicleName(vehicle),
							detail: "Its leads, quotes and appointments stay on the customer record without a vehicle attached.",
							onConfirm: () => deleteVehicle(vehicle.id),
							onDeleted: () => nav({ to: "/admin/vehicles" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-slate",
					children: [
						"Color · ",
						vehicle.color || "—",
						" \xA0·\xA0 Owner · ",
						vehicle.customer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/customers/$id",
							params: { id: vehicle.customer_id },
							className: "font-semibold text-primary",
							children: fullName(vehicle.customer)
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
							children: "Last service"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg font-bold text-navy",
							children: last ? last.service?.name : "None yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: last ? fmtDate(last.starts_at, {
								month: "long",
								day: "numeric",
								year: "numeric"
							}) : "—"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-primary/30 bg-accent p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground",
							children: "Next recommended"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg font-bold text-navy",
							children: rec ? rec[0] : "Full Detail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: nextDate ? `Around ${fmtDate(nextDate, {
								month: "long",
								day: "numeric"
							})}` : "Book a first service"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Service history & appointments",
					bodyClass: "p-0",
					children: appointments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-4 text-sm text-slate",
						children: "No appointments yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
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
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Quotes",
					bodyClass: "p-0",
					children: quotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-4 text-sm text-slate",
						children: "No quotes."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: quotes.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/quotes",
							search: { open: x.id },
							className: "flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-navy",
									children: [
										x.number,
										" · ",
										x.service?.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: money(x.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - x.discount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })
							]
						}) }, x.id))
					})
				})]
			}),
			vehicle.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-navy",
					children: vehicle.notes
				})
			})
		]
	});
}
//#endregion
export { VehicleProfile as component };
