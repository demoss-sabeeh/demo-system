import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-B2pxHB9K.mjs";
import { B as ChevronRight, P as Ellipsis, R as Circle, U as Check, c as Trash2 } from "../_libs/lucide-react.mjs";
import { a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { _ as useInvalidate } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Label2, c as Root2$1, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2$1, o as Portal2$1, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-DJdb8WbE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var stop = (e) => {
	e.stopPropagation();
	e.preventDefault?.();
};
function ConfirmDelete({ open, onOpenChange, kind, name, detail, onConfirm, onDeleted }) {
	const invalidate = useInvalidate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function run() {
		setBusy(true);
		try {
			await onConfirm();
			toast.success(`${kind} deleted`);
			onOpenChange(false);
			onDeleted?.();
			await invalidate();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : `Could not delete ${kind.toLowerCase()}`);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (o) => !busy && onOpenChange(o),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			onClick: stop,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, {
				className: "text-navy",
				children: [
					"Delete ",
					kind.toLowerCase(),
					"?"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-sm text-slate",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-navy [overflow-wrap:anywhere]",
						children: name
					}), " will be permanently deleted. This cannot be undone."] }), detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail })]
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
				disabled: busy,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "destructive",
				onClick: run,
				disabled: busy,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
					" ",
					busy ? "Deleting…" : "Delete"
				]
			})] })]
		})
	});
}
/** Row "⋯" menu with a Delete item; clicks never reach the row underneath. */
function RowDelete(props) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { className, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		onClick: stop,
		onKeyDown: (e) => e.stopPropagation(),
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "h-9 w-9 text-slate hover:text-navy",
				"aria-label": `Actions for ${props.kind.toLowerCase()}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
			align: "end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				className: "text-destructive focus:text-destructive",
				onSelect: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " Delete"]
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			...rest,
			open,
			onOpenChange: setOpen
		})]
	});
}
/** Outline "Delete" button for detail pages and sheets. */
function DeleteButton(props) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { label, ...rest } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: "outline",
		className: "text-destructive hover:text-destructive",
		onClick: () => setOpen(true),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
			" ",
			label ?? "Delete"
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
		...rest,
		open,
		onOpenChange: setOpen
	})] });
}
async function must(p) {
	const { data, error } = await p;
	if (error) throw new Error(error.message);
	return data;
}
async function logActivity(a) {
	await must(supabase.from("lead_activities").insert({
		...a,
		detail: a.detail ?? ""
	}));
}
var STATUS_TITLES = {
	new: "Moved to New",
	contacted: "Customer contacted",
	qualified: "Lead qualified",
	quoted: "Moved to Quoted",
	booked: "Moved to Booked",
	completed: "Service completed",
	lost: "Marked lost"
};
async function setLeadStatus(lead, status) {
	await must(supabase.from("leads").update({
		status,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", lead.id));
	await logActivity({
		lead_id: lead.id,
		customer_id: lead.customer_id,
		type: status,
		title: STATUS_TITLES[status]
	});
}
var quoteNumber = () => `Q-${(Date.now() % 1e5).toString().padStart(5, "0")}`;
async function createQuote(input) {
	if (input.status === "sent") throw new Error("Quote delivery is not configured. Save the quote as a draft and send it manually.");
	const number = quoteNumber();
	const quote = await must(supabase.from("quotes").insert({
		number,
		lead_id: input.lead_id ?? null,
		customer_id: input.customer_id,
		vehicle_id: input.vehicle_id ?? null,
		service_id: input.service_id ?? null,
		status: input.status ?? "draft",
		discount: input.discount ?? 0,
		notes: input.notes ?? "",
		expires_at: new Date(Date.now() + 12096e5).toISOString().slice(0, 10)
	}).select("id, number").single());
	if (input.items.length) await must(supabase.from("quote_items").insert(input.items.map((it, i) => ({
		...it,
		quote_id: quote.id,
		sort: i
	}))));
	await logActivity({
		lead_id: input.lead_id,
		customer_id: input.customer_id,
		type: "quote",
		title: "Quote created",
		detail: `${quote.number} prepared`
	});
	const total = Math.max(0, input.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - (input.discount ?? 0));
	if (input.lead_id) await must(supabase.from("leads").update({
		status: "quoted",
		estimated_value: total,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", input.lead_id));
	return quote;
}
async function updateQuote(id, patch, items) {
	if (patch.status === "sent") throw new Error("Quote delivery is not configured. Send the quote manually before updating its status.");
	await must(supabase.from("quotes").update(patch).eq("id", id));
	if (items) {
		await must(supabase.from("quote_items").delete().eq("quote_id", id));
		if (items.length) await must(supabase.from("quote_items").insert(items.map((it, i) => ({
			...it,
			quote_id: id,
			sort: i
		}))));
	}
}
async function setQuoteStatus(quote, status) {
	if (status === "sent") throw new Error("Quote delivery is not configured. Send the quote manually before updating its status.");
	await must(supabase.from("quotes").update({ status }).eq("id", quote.id));
	const titles = {
		sent: "Quote sent",
		accepted: "Quote accepted",
		declined: "Quote declined",
		viewed: "Quote viewed",
		expired: "Quote expired"
	};
	if (status !== "sent") await logActivity({
		lead_id: quote.lead_id,
		customer_id: quote.customer_id,
		type: "quote",
		title: titles[status] ?? "Quote updated",
		detail: quote.number
	});
	if (status === "declined" && quote.lead_id) await must(supabase.from("leads").update({ status: "lost" }).eq("id", quote.lead_id));
}
async function bookAppointment(input) {
	const appt = await must(supabase.from("appointments").insert({
		lead_id: input.lead_id ?? null,
		customer_id: input.customer_id,
		vehicle_id: input.vehicle_id ?? null,
		service_id: input.service_id ?? null,
		starts_at: input.starts_at,
		duration_hours: input.duration_hours,
		status: "confirmed"
	}).select("id").single());
	if (input.lead_id) await must(supabase.from("leads").update({
		status: "booked",
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", input.lead_id));
	await logActivity({
		lead_id: input.lead_id,
		customer_id: input.customer_id,
		type: "booked",
		title: "Appointment booked",
		detail: input.serviceName ?? ""
	});
	return appt;
}
async function setAppointmentStatus(a, status) {
	await must(supabase.from("appointments").update({ status }).eq("id", a.id));
	if (status === "completed") {
		await logActivity({
			lead_id: a.lead_id,
			customer_id: a.customer_id,
			type: "completed",
			title: "Service completed",
			detail: "Vehicle history updated"
		});
		if (a.lead_id) await must(supabase.from("leads").update({ status: "completed" }).eq("id", a.lead_id));
		await must(supabase.from("follow_ups").insert({
			customer_id: a.customer_id,
			vehicle_id: a.vehicle_id,
			lead_id: a.lead_id,
			type: "post_service",
			reason: "Post-service check-in and review request",
			next_contact_at: new Date(Date.now() + 864e5).toISOString(),
			status: "scheduled"
		}));
	}
}
async function createFollowUp(f) {
	await must(supabase.from("follow_ups").insert({
		customer_id: f.customer_id,
		type: f.type,
		reason: f.reason,
		next_contact_at: f.next_contact_at,
		vehicle_id: f.vehicle_id ?? null,
		lead_id: f.lead_id ?? null,
		status: "scheduled"
	}));
	await logActivity({
		lead_id: f.lead_id,
		customer_id: f.customer_id,
		type: "follow_up",
		title: "Follow-up created",
		detail: f.reason
	});
}
var rpc = (fn, id) => must(supabase.rpc(fn, { _id: id }));
var deleteLead = (id) => rpc("delete_lead", id);
var deleteVehicle = (id) => rpc("delete_vehicle", id);
var deleteCustomer = (id) => rpc("delete_customer", id);
var deleteService = (id) => rpc("delete_service", id);
async function deleteRow(table, id) {
	const rows = await must(supabase.from(table).delete().eq("id", id).select("id"));
	if (!rows || !rows.length) throw new Error("Record not found or already deleted");
}
var deleteAppointment = (id) => deleteRow("appointments", id);
var deleteFollowUp = (id) => deleteRow("follow_ups", id);
var deleteMessage = (id) => deleteRow("messages", id);
async function deleteQuote(id) {
	await must(supabase.from("quote_items").delete().eq("quote_id", id));
	const rows = await must(supabase.from("quotes").delete().eq("id", id).select("id"));
	if (!rows || !rows.length) throw new Error("Quote not found or already deleted");
}
//#endregion
export { updateQuote as _, createQuote as a, deleteFollowUp as c, deleteQuote as d, deleteService as f, setQuoteStatus as g, setLeadStatus as h, createFollowUp as i, deleteLead as l, setAppointmentStatus as m, RowDelete as n, deleteAppointment as o, deleteVehicle as p, bookAppointment as r, deleteCustomer as s, DeleteButton as t, deleteMessage as u };
