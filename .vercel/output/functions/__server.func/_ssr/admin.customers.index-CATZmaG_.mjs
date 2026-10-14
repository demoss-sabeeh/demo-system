import { i as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { p as Search } from "../_libs/lucide-react.mjs";
import { f as fullName, l as fmtDate, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { h as useCustomers, i as PageTitle, l as inputSm, n as ErrorState, o as RowsSkeleton, t as EmptyState, u as selectCls } from "./admin-data-Bn9IN1fZ.mjs";
import { n as RowDelete, s as deleteCustomer } from "./actions-DJdb8WbE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers.index-CATZmaG_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Customers() {
	const c = useCustomers();
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("recent");
	const rows = (0, import_react.useMemo)(() => {
		const t = q.toLowerCase();
		return (c.data ?? []).filter((x) => !t || `${x.first_name} ${x.last_name} ${x.email} ${x.phone}`.toLowerCase().includes(t)).sort((a, b) => sort === "name" ? a.last_name.localeCompare(b.last_name) : sort === "vehicles" ? b.vehicles.length - a.vehicles.length : +new Date(b.created_at) - +new Date(a.created_at));
	}, [
		c.data,
		q,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Customers",
				subtitle: `${c.data?.length ?? 0} customers`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[220px] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-slate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": "Search customers",
						className: `${inputSm} pl-8`,
						placeholder: "Name, email or phone",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": "Sort",
					className: selectCls,
					value: sort,
					onChange: (e) => setSort(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "recent",
							children: "Newest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "vehicles",
							children: "Most vehicles"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border bg-surface",
				children: c.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {})
				}) : c.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					error: c.error,
					retry: () => c.refetch()
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No customers found" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: rows.map((x) => {
						const last = [...x.appointments].sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at))[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/customers/$id",
								params: { id: x.id },
								className: "grid min-w-0 flex-1 gap-1 py-3 pl-4 hover:bg-secondary/40 md:grid-cols-12 md:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "md:col-span-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-navy",
											children: fullName(x)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate",
											children: x.city
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-sm text-slate md:col-span-3",
										children: [x.email, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "md:hidden",
											children: [" · ", x.phone]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "hidden text-sm text-slate md:col-span-2 md:block",
										children: x.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-navy md:col-span-3",
										children: x.vehicles.map(vehicleName).join(", ") || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular text-xs text-slate md:col-span-1 md:text-right",
										children: last ? fmtDate(last.starts_at) : "—"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
								className: "px-1 pt-2 md:pt-0",
								kind: "Customer",
								name: fullName(x),
								detail: `This also removes their ${x.vehicles.length} vehicle(s) and all of their leads, quotes, appointments, messages and follow-ups.`,
								onConfirm: () => deleteCustomer(x.id)
							})]
						}, x.id);
					})
				})
			})
		]
	});
}
//#endregion
export { Customers as component };
