import { i as __toESM } from "../_runtime.mjs";
import { i as TIME_SLOTS } from "./knowledge-B7rJYZvr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { D as LoaderCircle, c as Trash2, h as Plus } from "../_libs/lucide-react.mjs";
import { h as money, m as localToIso, r as FU_TYPES } from "./format-DLdEZFeI.mjs";
import { C as useServices, _ as useInvalidate, l as inputSm, u as selectCls } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as updateQuote, a as createQuote, i as createFollowUp, r as bookAppointment } from "./actions-DJdb8WbE.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CciCQZTh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialogs-CRwRHSPf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useRun(onDone) {
	const invalidate = useInvalidate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	return {
		busy,
		run: async (fn, ok) => {
			setBusy(true);
			try {
				await fn();
				await invalidate();
				toast.success(ok);
				onDone();
			} catch (e) {
				toast.error(e instanceof Error ? e.message : "Something went wrong");
			} finally {
				setBusy(false);
			}
		}
	};
}
function Shell({ open, onOpenChange, title, desc, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90dvh] overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-navy",
					children: title
				}), desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: desc })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: footer })
			]
		})
	});
}
var L = ({ children, htmlFor }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	htmlFor,
	className: "mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
	children
});
function BookDialog({ open, onOpenChange, ctx }) {
	const services = useServices();
	const [serviceId, setServiceId] = (0, import_react.useState)(ctx.service_id ?? "");
	const [date, setDate] = (0, import_react.useState)(() => new Date(Date.now() + 1728e5).toISOString().slice(0, 10));
	const [time, setTime] = (0, import_react.useState)(TIME_SLOTS[1]);
	const { busy, run } = useRun(() => onOpenChange(false));
	const svc = services.data?.find((s) => s.id === (serviceId || ctx.service_id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		open,
		onOpenChange,
		title: "Book appointment",
		desc: ctx.customerName,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			disabled: busy || !svc,
			onClick: () => run(() => bookAppointment({
				...ctx,
				service_id: svc.id,
				starts_at: localToIso(date, time),
				duration_hours: Number(svc.duration_hours),
				serviceName: svc.name
			}), "Appointment booked"),
			children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Confirm booking"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
				htmlFor: "b-svc",
				children: "Service"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				id: "b-svc",
				className: `${selectCls} w-full`,
				value: serviceId || ctx.service_id || "",
				onChange: (e) => setServiceId(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					disabled: true,
					children: "Select…"
				}), services.data?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.id,
					children: s.name
				}, s.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
					htmlFor: "b-date",
					children: "Date"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "b-date",
					type: "date",
					className: inputSm,
					value: date,
					onChange: (e) => setDate(e.target.value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
					htmlFor: "b-time",
					children: "Time"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "b-time",
					className: `${selectCls} w-full`,
					value: time,
					onChange: (e) => setTime(e.target.value),
					children: TIME_SLOTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "This records the appointment in the workspace. Customer confirmation and reminders are not sent automatically."
			})
		]
	});
}
function QuoteDialog({ open, onOpenChange, ctx, quote }) {
	const svcDefault = useServices().data?.find((s) => s.id === (quote?.service_id ?? ctx?.service_id));
	const [items, setItems] = (0, import_react.useState)(quote ? quote.items.sort((a, b) => a.sort - b.sort).map(({ description, quantity, unit_price }) => ({
		description,
		quantity,
		unit_price
	})) : null);
	const [discount, setDiscount] = (0, import_react.useState)(quote?.discount ?? 0);
	const [notes, setNotes] = (0, import_react.useState)(quote?.notes ?? "");
	const { busy, run } = useRun(() => onOpenChange(false));
	const list = items ?? (svcDefault ? ctx?.estimated_value ? [{
		description: svcDefault.name,
		quantity: 1,
		unit_price: ctx.estimated_value
	}] : [{
		description: svcDefault.name,
		quantity: 1,
		unit_price: svcDefault.price_from
	}, {
		description: "Paint decontamination & prep",
		quantity: 1,
		unit_price: 150
	}] : [{
		description: "",
		quantity: 1,
		unit_price: 0
	}]);
	const setItem = (i, p) => setItems(list.map((it, j) => j === i ? {
		...it,
		...p
	} : it));
	const subtotal = list.reduce((a, i) => a + i.quantity * i.unit_price, 0);
	const valid = list.every((i) => i.description.trim() && i.quantity > 0);
	function save() {
		const clean = list.filter((i) => i.description.trim());
		if (quote) return run(() => updateQuote(quote.id, {
			discount,
			notes
		}, clean), "Quote updated");
		return run(() => createQuote({
			...ctx,
			service_id: ctx.service_id ?? svcDefault?.id,
			items: clean,
			discount,
			notes,
			status: "draft"
		}), "Draft saved");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		open,
		onOpenChange,
		title: quote ? `Edit ${quote.number}` : "Create quote",
		desc: ctx?.customerName,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			disabled: busy || !valid,
			onClick: save,
			children: ["Save ", quote ? "" : "draft"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: true,
			children: "Quote delivery unavailable"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "Save a draft here. Quote delivery is not connected, so this app cannot email or text the customer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
						children: "Line items"
					}),
					list.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] items-end gap-2 border-b pb-3 sm:grid-cols-[minmax(0,1fr)_60px_90px_36px] sm:border-0 sm:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Description",
								className: `${inputSm} col-span-3 sm:col-span-1`,
								value: it.description,
								onChange: (e) => setItem(i, { description: e.target.value }),
								placeholder: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs text-slate sm:hidden",
									children: "Quantity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Quantity",
									type: "number",
									min: 1,
									className: inputSm,
									value: it.quantity,
									onChange: (e) => setItem(i, { quantity: Math.max(1, Number(e.target.value)) })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs text-slate sm:hidden",
									children: "Unit price ($)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Unit price",
									type: "number",
									min: 0,
									className: inputSm,
									value: it.unit_price,
									onChange: (e) => setItem(i, { unit_price: Math.max(0, Number(e.target.value)) })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-11 w-11 sm:h-9 sm:w-9",
								"aria-label": "Remove item",
								onClick: () => setItems(list.filter((_, j) => j !== i)),
								disabled: list.length === 1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setItems([...list, {
							description: "",
							quantity: 1,
							unit_price: 0
						}]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add item"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
					htmlFor: "q-disc",
					children: "Discount ($)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "q-disc",
					type: "number",
					min: 0,
					className: inputSm,
					value: discount,
					onChange: (e) => setDiscount(Math.max(0, Number(e.target.value)))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.1em] text-slate",
							children: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular text-2xl font-extrabold text-navy",
							children: money(subtotal - discount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate",
							children: ["Subtotal ", money(subtotal)]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
				htmlFor: "q-notes",
				children: "Notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "q-notes",
				rows: 2,
				className: `${inputSm} h-auto py-2`,
				value: notes,
				onChange: (e) => setNotes(e.target.value)
			})] })
		]
	});
}
function MessageDialog({ open, onOpenChange, ctx }) {
	const [body, setBody] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("sms");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		open,
		onOpenChange,
		title: "Send message",
		desc: `${ctx.customerName ?? ""} · SMS/email delivery is not configured`,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: true,
			children: "Delivery unavailable"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: ["sms", "email"].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: channel === c ? "navy" : "outline",
					onClick: () => setChannel(c),
					children: c.toUpperCase()
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				"aria-label": "Message",
				rows: 4,
				maxLength: 600,
				className: `${inputSm} h-auto py-2`,
				value: body,
				onChange: (e) => setBody(e.target.value),
				placeholder: "Type your message…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate",
				children: "No message will be sent or recorded. Connect and verify a delivery provider before contacting customers."
			})
		]
	});
}
function FollowUpDialog({ open, onOpenChange, ctx }) {
	const [type, setType] = (0, import_react.useState)("no_response");
	const [reason, setReason] = (0, import_react.useState)("Check in on quote and availability");
	const [date, setDate] = (0, import_react.useState)(() => new Date(Date.now() + 864e5).toISOString().slice(0, 10));
	const { busy, run } = useRun(() => onOpenChange(false));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		open,
		onOpenChange,
		title: "Create follow-up",
		desc: ctx.customerName,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: busy || !reason.trim(),
			onClick: () => run(() => createFollowUp({
				...ctx,
				type,
				reason,
				next_contact_at: localToIso(date, "10:00 AM")
			}), "Follow-up scheduled"),
			children: "Schedule"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
				htmlFor: "f-type",
				children: "Type"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "f-type",
				className: `${selectCls} w-full`,
				value: type,
				onChange: (e) => setType(e.target.value),
				children: Object.entries(FU_TYPES).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: k,
					children: v
				}, k))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
				htmlFor: "f-reason",
				children: "Reason"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "f-reason",
				className: inputSm,
				value: reason,
				onChange: (e) => setReason(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
				htmlFor: "f-date",
				children: "Next contact"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "f-date",
				type: "date",
				className: inputSm,
				value: date,
				onChange: (e) => setDate(e.target.value)
			})] })
		]
	});
}
//#endregion
export { QuoteDialog as i, FollowUpDialog as n, MessageDialog as r, BookDialog as t };
