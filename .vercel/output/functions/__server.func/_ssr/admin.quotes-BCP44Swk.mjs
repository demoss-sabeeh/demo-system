import { i as __toESM } from "../_runtime.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { U as Check, f as Send, n as X, q as CalendarPlus, v as Pencil } from "../_libs/lucide-react.mjs";
import { n as SheetContent, r as SheetTitle, t as Sheet } from "./sheet-BFMX6gd5.mjs";
import { f as fullName, h as money, l as fmtDate, o as QUOTE_STATUSES, p as label, v as vehicleName } from "./format-DLdEZFeI.mjs";
import { _ as useInvalidate, i as PageTitle, o as RowsSkeleton, s as StatusBadge, t as EmptyState, x as useQuotes } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as deleteQuote, g as setQuoteStatus, n as RowDelete, t as DeleteButton } from "./actions-DJdb8WbE.mjs";
import { i as QuoteDialog, t as BookDialog } from "./dialogs-CRwRHSPf.mjs";
import { t as Route } from "./admin.quotes-DIEHk3Ne.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.quotes-BCP44Swk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var total = (q) => q.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - q.discount;
function Quotes() {
	const { open } = Route.useSearch();
	const nav = useNavigate({ from: "/admin/quotes" });
	const quotes = useQuotes();
	const [status, setStatus] = (0, import_react.useState)("");
	const rows = (quotes.data ?? []).filter((q) => !status || q.status === status);
	const selected = quotes.data?.find((q) => q.id === open);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Quotes",
				subtitle: "Create and manage quote records. Sending quotes is unavailable until email delivery is configured."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: ["", ...QUOTE_STATUSES].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStatus(s),
					className: cn("min-h-9 rounded border px-3 py-1 transition-colors text-xs font-semibold", status === s ? "border-navy bg-navy text-navy-foreground" : "bg-surface text-slate hover:text-navy"),
					children: [
						s ? label(s) : "All",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-60",
							children: (quotes.data ?? []).filter((q) => !s || q.status === s).length
						})
					]
				}, s || "all"))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border bg-surface",
				children: quotes.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {})
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No quotes",
					body: "Create a quote from any lead."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: rows.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => nav({ search: { open: q.id } }),
							className: "grid min-w-0 flex-1 gap-1 py-3 pl-4 text-left hover:bg-secondary/40 md:grid-cols-12 md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular font-bold text-navy md:col-span-2",
									children: q.number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-navy md:col-span-3",
									children: fullName(q.customer)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-slate md:col-span-3",
									children: [
										vehicleName(q.vehicle),
										" · ",
										q.service?.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular text-sm font-semibold text-navy md:col-span-2 md:text-right",
									children: money(total(q))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:col-span-2 md:text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: q.status })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
							className: "px-1 pt-2 md:pt-0",
							kind: "Quote",
							name: `${q.number} · ${fullName(q.customer)}`,
							onConfirm: () => deleteQuote(q.id)
						})]
					}, q.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!selected,
				onOpenChange: (o) => !o && nav({ search: {} }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					className: "w-full overflow-y-auto sm:max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Quote preview"
					}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuotePreview, {
						q: selected,
						onDeleted: () => nav({ search: {} })
					})]
				})
			})
		]
	});
}
function QuotePreview({ q, onDeleted }) {
	const invalidate = useInvalidate();
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [book, setBook] = (0, import_react.useState)(false);
	const sub = q.items.reduce((a, i) => a + i.quantity * i.unit_price, 0);
	async function act(s) {
		try {
			await setQuoteStatus(q, s);
			await invalidate();
			toast.success(`Quote ${label(s).toLowerCase()}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Update failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setEdit(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						disabled: true,
						title: "Email delivery is not configured",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), " Delivery unavailable"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => act("accepted"),
						disabled: q.status === "accepted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), " Accept"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => act("declined"),
						disabled: q.status === "declined",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), " Decline"]
					}),
					q.status === "accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "navy",
						onClick: () => setBook(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {}), " Book appointment"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
						kind: "Quote",
						name: `${q.number} · ${fullName(q.customer)}`,
						onConfirm: () => deleteQuote(q.id),
						onDeleted
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "No quote email is sent from this workspace. Do not mark a quote as sent until you send it through a verified provider or manually."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-md border bg-surface p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "grid min-w-0 gap-3 border-b pb-4 sm:grid-cols-[minmax(0,1fr)_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold tracking-[0.18em] text-navy",
								children: "APEX AUTO DETAILING"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate",
								children: BUSINESS.address
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular font-bold text-navy",
								children: q.number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: q.status })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid min-w-0 gap-4 py-4 text-sm sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 [overflow-wrap:anywhere]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-slate",
									children: "Prepared for"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-navy",
									children: fullName(q.customer)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate",
									children: q.customer?.email
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 sm:text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-slate",
									children: "Vehicle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-navy",
									children: vehicleName(q.vehicle)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-slate",
									children: ["Expires ", fmtDate(q.expires_at ? q.expires_at + "T12:00:00Z" : null)]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-y text-left text-[10px] font-bold uppercase tracking-wider text-slate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Item"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-right",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-right",
									children: "Amount"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: [...q.items].sort((a, b) => a.sort - b.sort).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-navy",
									children: i.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "tabular py-2 text-right",
									children: i.quantity
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "tabular py-2 text-right text-navy",
									children: money(i.quantity * i.unit_price)
								})
							] }, i.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "ml-auto mt-4 w-48 space-y-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular",
									children: money(sub)
								})]
							}),
							q.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-slate",
									children: "Discount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "tabular",
									children: ["−", money(q.discount)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between border-t pt-1 text-base font-extrabold text-navy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular",
									children: money(sub - q.discount)
								})]
							})
						]
					}),
					q.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 border-t pt-3 text-xs text-slate",
						children: q.notes
					})
				]
			}),
			q.lead_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/leads/$id",
				params: { id: q.lead_id },
				className: "text-sm font-semibold text-primary",
				children: "Open lead →"
			}),
			edit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDialog, {
				open: true,
				onOpenChange: setEdit,
				quote: q
			}),
			book && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookDialog, {
				open: true,
				onOpenChange: setBook,
				ctx: {
					lead_id: q.lead_id,
					customer_id: q.customer_id,
					vehicle_id: q.vehicle_id,
					service_id: q.service_id,
					customerName: fullName(q.customer)
				}
			})
		]
	});
}
//#endregion
export { Quotes as component };
