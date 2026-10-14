import { i as __toESM } from "../_runtime.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { nt as ArrowUpDown, p as Search } from "../_libs/lucide-react.mjs";
import { _ as timeAgo, a as LEAD_STATUSES, f as fullName, h as money, i as LEAD_SOURCES, p as label, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { C as useServices, i as PageTitle, l as inputSm, n as ErrorState, o as RowsSkeleton, s as StatusBadge, t as EmptyState, u as selectCls, y as useLeads } from "./admin-data-Bn9IN1fZ.mjs";
import { l as deleteLead, n as RowDelete } from "./actions-DJdb8WbE.mjs";
import { t as Route } from "./admin.leads.index-C4c_NlI_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.leads.index-Bqo3aw4N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LeadsPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/admin/leads/" });
	const leads = useLeads();
	const services = useServices();
	const [q, setQ] = (0, import_react.useState)(search.q ?? "");
	const [service, setService] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("created");
	const status = search.status ?? "";
	const rows = (0, import_react.useMemo)(() => {
		const t = q.toLowerCase();
		return (leads.data ?? []).filter((l) => !status || l.status === status).filter((l) => !service || l.service_id === service).filter((l) => !source || l.source === source).filter((l) => !t || `${fullName(l.customer)} ${l.customer?.email} ${vehicleName(l.vehicle)} ${l.service?.name}`.toLowerCase().includes(t)).sort((a, b) => sort === "value" ? b.estimated_value - a.estimated_value : +new Date(b.created_at) - +new Date(a.created_at));
	}, [
		leads.data,
		q,
		status,
		service,
		source,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Leads",
				subtitle: `${rows.length} of ${leads.data?.length ?? 0} leads`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[200px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "absolute left-2.5 top-2.5 h-4 w-4 text-slate",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": "Search leads",
							className: `${inputSm} pl-8`,
							placeholder: "Search customer, vehicle, service…",
							value: q,
							onChange: (e) => setQ(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Status",
						className: selectCls,
						value: status,
						onChange: (e) => navigate({ search: { status: e.target.value || void 0 } }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All statuses"
						}), LEAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Source",
						className: selectCls,
						value: source,
						onChange: (e) => setSource(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All sources"
						}), LEAD_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: label(s)
						}, s))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSort(sort === "created" ? "value" : "created"),
						className: `${selectCls} inline-flex items-center gap-1.5`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3.5 w-3.5" }),
							" ",
							sort === "created" ? "Newest" : "Highest value"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border bg-surface",
				children: leads.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {})
				}) : leads.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					error: leads.error,
					retry: () => leads.refetch()
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No leads match",
					body: "Try clearing a filter."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "hidden w-full text-sm md:table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b bg-secondary/50 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-slate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [[
							"Customer",
							"Vehicle",
							"Service",
							"Source",
							"Status",
							"Created",
							"Est. value"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-bold",
							children: h
						}, h)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Actions"
							})
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y",
						children: rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "cursor-pointer hover:bg-secondary/40",
							onClick: () => navigate({
								to: "/admin/leads/$id",
								params: { id: l.id }
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/leads/$id",
										params: { id: l.id },
										className: "font-bold text-navy hover:text-primary",
										children: fullName(l.customer)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-slate",
									children: vehicleName(l.vehicle)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-navy",
									children: l.service?.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 text-slate",
									children: label(l.source)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "tabular px-4 py-2.5 text-slate",
									children: timeAgo(l.created_at)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "tabular px-4 py-2.5 text-right font-semibold text-navy",
									children: money(l.estimated_value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
										kind: "Lead",
										name: `${fullName(l.customer)} — ${l.service?.name ?? "lead"}`,
										detail: "Quotes, appointments and messages stay on the customer record.",
										onConfirm: () => deleteLead(l.id)
									})
								})
							]
						}, l.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y md:hidden",
					children: rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/leads/$id",
							params: { id: l.id },
							className: "block min-w-0 flex-1 py-3 pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-navy",
										children: fullName(l.customer)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-xs text-slate",
									children: [
										vehicleName(l.vehicle),
										" · ",
										l.service?.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular mt-1 flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate",
										children: [
											label(l.source),
											" · ",
											timeAgo(l.created_at)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-navy",
										children: money(l.estimated_value)
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
							className: "px-1 pt-2",
							kind: "Lead",
							name: `${fullName(l.customer)} — ${l.service?.name ?? "lead"}`,
							detail: "Quotes, appointments and messages stay on the customer record.",
							onConfirm: () => deleteLead(l.id)
						})]
					}, l.id))
				})] })
			})
		]
	});
}
//#endregion
export { LeadsPage as component };
