import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { h as Plus, v as Pencil } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { h as money } from "./format-DLdEZFeI.mjs";
import { C as useServices, _ as useInvalidate, i as PageTitle, o as RowsSkeleton } from "./admin-data-Bn9IN1fZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as deleteService, n as RowDelete } from "./actions-DJdb8WbE.mjs";
import { t as Switch } from "./switch-BS6bDcIJ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CciCQZTh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.services-CsYX3ZA2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Services() {
	const s = useServices();
	const invalidate = useInvalidate();
	const [d, setD] = (0, import_react.useState)(null);
	async function save() {
		if (!d || !d.name.trim()) return;
		const row = {
			name: d.name.trim(),
			short_description: d.short_description,
			price_from: d.price_from,
			duration_hours: d.duration_hours
		};
		const { error } = d.id ? await supabase.from("services").update(row).eq("id", d.id) : await supabase.from("services").insert({
			...row,
			slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now() % 1e3,
			sort: (s.data?.length ?? 0) + 1
		});
		if (error) return toast.error(error.message);
		toast.success(d.id ? "Service updated" : "Service created");
		setD(null);
		invalidate();
	}
	async function toggle(x) {
		const { error } = await supabase.from("services").update({ active: !x.active }).eq("id", x.id);
		if (error) return toast.error(error.message);
		toast.success(`${x.name} ${x.active ? "deactivated" : "activated"}`);
		invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
				title: "Services",
				subtitle: "Your service menu, pricing and durations.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setD({
						name: "",
						short_description: "",
						price_from: 0,
						duration_hours: 2
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New service"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border bg-surface",
				children: s.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsSkeleton, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: s.data?.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `grid min-w-0 grid-cols-2 items-center gap-2 px-4 py-3 md:grid-cols-[repeat(11,minmax(0,1fr))_auto_auto] ${x.active ? "" : "opacity-55"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2 min-w-0 md:col-span-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-navy",
									children: x.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "break-words text-xs text-slate md:truncate",
									children: x.short_description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular text-sm font-semibold text-navy md:col-span-2",
								children: money(x.price_from)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular text-sm text-slate md:col-span-2",
								children: [x.duration_hours, " hours"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: x.active,
									onCheckedChange: () => toggle(x),
									"aria-label": `Toggle ${x.name}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate",
									children: x.active ? "Active" : "Inactive"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "justify-self-start",
								onClick: () => setD({
									id: x.id,
									name: x.name,
									short_description: x.short_description,
									price_from: x.price_from,
									duration_hours: Number(x.duration_hours)
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowDelete, {
								className: "justify-self-end",
								kind: "Service",
								name: x.name,
								detail: "Services used by leads, quotes or appointments can’t be deleted — deactivate them instead.",
								onConfirm: () => deleteService(x.id)
							})
						]
					}, x.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!d,
				onOpenChange: (o) => !o && setD(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-navy",
						children: d?.id ? "Edit service" : "New service"
					}) }),
					d && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold uppercase tracking-wider text-slate",
								children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:h-9 sm:text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary mt-1`,
									value: d.name,
									onChange: (e) => setD({
										...d,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-bold uppercase tracking-wider text-slate",
								children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:h-9 sm:text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary mt-1`,
									value: d.short_description,
									onChange: (e) => setD({
										...d,
										short_description: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold uppercase tracking-wider text-slate",
									children: ["Price from ($)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:h-9 sm:text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary mt-1`,
										value: d.price_from,
										onChange: (e) => setD({
											...d,
											price_from: Math.max(0, Number(e.target.value))
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-bold uppercase tracking-wider text-slate",
									children: ["Duration (hrs)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: .5,
										step: .5,
										className: `h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:h-9 sm:text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary mt-1`,
										value: d.duration_hours,
										onChange: (e) => setD({
											...d,
											duration_hours: Math.max(.5, Number(e.target.value))
										})
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						disabled: !d?.name.trim(),
						children: "Save"
					}) })
				] })
			})
		]
	});
}
//#endregion
export { Services as component };
