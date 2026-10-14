import { useState, type ReactNode } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { inputSm, selectCls } from "./ui";
import { bookAppointment, createFollowUp, createQuote, sendMessage, updateQuote } from "@/lib/actions";
import { useInvalidate, useServices, type Quote } from "@/lib/admin-data";
import { FU_TYPES, localToIso, money } from "@/lib/format";
import { TIME_SLOTS } from "@/lib/knowledge";

type Ctx = { lead_id?: string | null; customer_id: string; vehicle_id?: string | null; service_id?: string | null; customerName?: string; estimated_value?: number };

function useRun(onDone: () => void) {
  const invalidate = useInvalidate();
  const [busy, setBusy] = useState(false);
  return {
    busy,
    run: async (fn: () => Promise<unknown>, ok: string) => {
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
    },
  };
}

function Shell({ open, onOpenChange, title, desc, children, footer }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; desc?: string; children: ReactNode; footer: ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-navy">{title}</DialogTitle>
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const L = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => <label htmlFor={htmlFor} className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate">{children}</label>;

export function BookDialog({ open, onOpenChange, ctx }: { open: boolean; onOpenChange: (o: boolean) => void; ctx: Ctx }) {
  const services = useServices();
  const [serviceId, setServiceId] = useState(ctx.service_id ?? "");
  const [date, setDate] = useState(() => new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10));
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const { busy, run } = useRun(() => onOpenChange(false));
  const svc = services.data?.find((s) => s.id === (serviceId || ctx.service_id));
  return (
    <Shell open={open} onOpenChange={onOpenChange} title="Book appointment" desc={ctx.customerName}
      footer={<Button disabled={busy || !svc} onClick={() => run(() => bookAppointment({ ...ctx, service_id: svc!.id, starts_at: localToIso(date, time), duration_hours: Number(svc!.duration_hours), serviceName: svc!.name }), "Appointment booked")}>{busy && <Loader2 className="animate-spin" />}Confirm booking</Button>}>
      <div><L htmlFor="b-svc">Service</L>
        <select id="b-svc" className={`${selectCls} w-full`} value={serviceId || ctx.service_id || ""} onChange={(e) => setServiceId(e.target.value)}>
          <option value="" disabled>Select…</option>
          {services.data?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><L htmlFor="b-date">Date</L><input id="b-date" type="date" className={inputSm} value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div><L htmlFor="b-time">Time</L><select id="b-time" className={`${selectCls} w-full`} value={time} onChange={(e) => setTime(e.target.value)}>{TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}</select></div>
      </div>
      <p className="text-xs text-slate">Confirmation SMS and a 24-hour reminder are created automatically.</p>
    </Shell>
  );
}

type Item = { description: string; quantity: number; unit_price: number };

export function QuoteDialog({ open, onOpenChange, ctx, quote }: { open: boolean; onOpenChange: (o: boolean) => void; ctx?: Ctx; quote?: Quote }) {
  const services = useServices();
  const svcDefault = services.data?.find((s) => s.id === (quote?.service_id ?? ctx?.service_id));
  const [items, setItems] = useState<Item[] | null>(quote ? quote.items.sort((a, b) => a.sort - b.sort).map(({ description, quantity, unit_price }) => ({ description, quantity, unit_price })) : null);
  const [discount, setDiscount] = useState(quote?.discount ?? 0);
  const [notes, setNotes] = useState(quote?.notes ?? "");
  const { busy, run } = useRun(() => onOpenChange(false));
  const list: Item[] = items ?? (svcDefault ? (ctx?.estimated_value ? [{ description: svcDefault.name, quantity: 1, unit_price: ctx.estimated_value }] : [{ description: svcDefault.name, quantity: 1, unit_price: svcDefault.price_from }, { description: "Paint decontamination & prep", quantity: 1, unit_price: 150 }]) : [{ description: "", quantity: 1, unit_price: 0 }]);
  const setItem = (i: number, p: Partial<Item>) => setItems(list.map((it, j) => (j === i ? { ...it, ...p } : it)));
  const subtotal = list.reduce((a, i) => a + i.quantity * i.unit_price, 0);
  const valid = list.every((i) => i.description.trim() && i.quantity > 0);

  function save(status: string) {
    const clean = list.filter((i) => i.description.trim());
    if (quote) return run(() => updateQuote(quote.id, { discount, notes, status }, clean), "Quote updated");
    return run(() => createQuote({ ...ctx!, service_id: ctx!.service_id ?? svcDefault?.id, items: clean, discount, notes, status }), status === "sent" ? "Quote created and sent" : "Draft saved");
  }

  return (
    <Shell open={open} onOpenChange={onOpenChange} title={quote ? `Edit ${quote.number}` : "Create quote"} desc={ctx?.customerName}
      footer={<>
        <Button variant="outline" disabled={busy || !valid} onClick={() => save(quote?.status ?? "draft")}>Save {quote ? "" : "draft"}</Button>
        <Button disabled={busy || !valid} onClick={() => save("sent")}>{busy && <Loader2 className="animate-spin" />}Save & send</Button>
      </>}>
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate">Line items</p>
        {list.map((it, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] items-end gap-2 border-b pb-3 sm:grid-cols-[minmax(0,1fr)_60px_90px_36px] sm:border-0 sm:pb-0">
            <input aria-label="Description" className={`${inputSm} col-span-3 sm:col-span-1`} value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} placeholder="Description" />
            <label className="min-w-0"><span className="mb-1 block text-xs text-slate sm:hidden">Quantity</span><input aria-label="Quantity" type="number" min={1} className={inputSm} value={it.quantity} onChange={(e) => setItem(i, { quantity: Math.max(1, Number(e.target.value)) })} /></label>
            <label className="min-w-0"><span className="mb-1 block text-xs text-slate sm:hidden">Unit price ($)</span><input aria-label="Unit price" type="number" min={0} className={inputSm} value={it.unit_price} onChange={(e) => setItem(i, { unit_price: Math.max(0, Number(e.target.value)) })} /></label>
            <Button variant="ghost" size="icon" className="h-11 w-11 sm:h-9 sm:w-9" aria-label="Remove item" onClick={() => setItems(list.filter((_, j) => j !== i))} disabled={list.length === 1}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setItems([...list, { description: "", quantity: 1, unit_price: 0 }])}><Plus /> Add item</Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><L htmlFor="q-disc">Discount ($)</L><input id="q-disc" type="number" min={0} className={inputSm} value={discount} onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))} /></div>
        <div className="text-right"><p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate">Total</p><p className="tabular text-2xl font-extrabold text-navy">{money(subtotal - discount)}</p><p className="text-xs text-slate">Subtotal {money(subtotal)}</p></div>
      </div>
      <div><L htmlFor="q-notes">Notes</L><textarea id="q-notes" rows={2} className={`${inputSm} h-auto py-2`} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
    </Shell>
  );
}

export function MessageDialog({ open, onOpenChange, ctx }: { open: boolean; onOpenChange: (o: boolean) => void; ctx: Ctx }) {
  const [body, setBody] = useState("");
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const { busy, run } = useRun(() => { setBody(""); onOpenChange(false); });
  return (
    <Shell open={open} onOpenChange={onOpenChange} title="Send message" desc={`${ctx.customerName ?? ""} · delivery is simulated in demo mode`}
      footer={<Button disabled={busy || !body.trim()} onClick={() => run(() => sendMessage({ customer_id: ctx.customer_id, lead_id: ctx.lead_id, channel, body: body.trim() }), "Message sent")}>Send</Button>}>
      <div className="flex gap-2">{(["sms", "email"] as const).map((c) => <Button key={c} size="sm" variant={channel === c ? "navy" : "outline"} onClick={() => setChannel(c)}>{c.toUpperCase()}</Button>)}</div>
      <textarea aria-label="Message" rows={4} maxLength={600} className={`${inputSm} h-auto py-2`} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type your message…" />
    </Shell>
  );
}

export function FollowUpDialog({ open, onOpenChange, ctx }: { open: boolean; onOpenChange: (o: boolean) => void; ctx: Ctx }) {
  const [type, setType] = useState("no_response");
  const [reason, setReason] = useState("Check in on quote and availability");
  const [date, setDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const { busy, run } = useRun(() => onOpenChange(false));
  return (
    <Shell open={open} onOpenChange={onOpenChange} title="Create follow-up" desc={ctx.customerName}
      footer={<Button disabled={busy || !reason.trim()} onClick={() => run(() => createFollowUp({ ...ctx, type, reason, next_contact_at: localToIso(date, "10:00 AM") }), "Follow-up scheduled")}>Schedule</Button>}>
      <div><L htmlFor="f-type">Type</L><select id="f-type" className={`${selectCls} w-full`} value={type} onChange={(e) => setType(e.target.value)}>{Object.entries(FU_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
      <div><L htmlFor="f-reason">Reason</L><input id="f-reason" className={inputSm} value={reason} onChange={(e) => setReason(e.target.value)} /></div>
      <div><L htmlFor="f-date">Next contact</L><input id="f-date" type="date" className={inputSm} value={date} onChange={(e) => setDate(e.target.value)} /></div>
    </Shell>
  );
}
