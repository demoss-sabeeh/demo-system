import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Car, MessageSquarePlus, BellPlus, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, StatusBadge, Timeline, RowsSkeleton, ErrorState } from "@/components/admin/ui";
import { FollowUpDialog, MessageDialog } from "@/components/admin/dialogs";
import { useCustomer, useInvalidate } from "@/lib/admin-data";
import { supabase } from "@/integrations/supabase/client";
import { fmtDate, fmtDateTime, fmtTime, fullName, money, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/customers/$id")({ component: CustomerProfile });

function CustomerProfile() {
  const { id } = Route.useParams();
  const q = useCustomer(id);
  const invalidate = useInvalidate();
  const [dlg, setDlg] = useState<null | "msg" | "fu">(null);
  const [notes, setNotes] = useState<string | null>(null);
  if (q.isLoading) return <RowsSkeleton rows={8} />;
  if (q.isError || !q.data) return <ErrorState error={q.error} retry={() => q.refetch()} />;
  const { customer, vehicles, leads, quotes, appointments, messages, activities } = q.data;
  const ctx = { customer_id: customer.id, lead_id: leads[0]?.id, customerName: fullName(customer) };
  const history = appointments.filter((a) => a.status === "completed");

  async function saveNotes() {
    const { error } = await supabase.from("customers").update({ notes: notes ?? "" }).eq("id", customer.id);
    if (error) return toast.error(error.message);
    toast.success("Notes saved");
    setNotes(null);
    invalidate();
  }

  return (
    <div className="space-y-5">
      <Link to="/admin/customers" className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy"><ArrowLeft className="h-3.5 w-3.5" /> Customers</Link>
      <div className="flex flex-col gap-4 rounded-md border bg-surface p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">{fullName(customer)}</h1>
          <p className="text-sm text-slate">{customer.email} · {customer.phone} · {customer.city}</p>
          <p className="mt-1 text-xs text-slate">Customer since {fmtDate(customer.created_at, { month: "long", year: "numeric" })}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setDlg("msg")}><MessageSquarePlus /> Message</Button>
          <Button size="sm" variant="outline" onClick={() => setDlg("fu")}><BellPlus /> Follow-up</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel title={`Vehicles (${vehicles.length})`}>
            <div className="grid gap-2 sm:grid-cols-2">
              {vehicles.map((v) => (
                <Link key={v.id} to="/admin/vehicles/$id" params={{ id: v.id }} className="flex items-center gap-3 rounded-md border p-3 hover:border-primary">
                  <Car className="h-5 w-5 text-primary" />
                  <div><p className="text-sm font-bold text-navy">{vehicleName(v)}</p><p className="text-xs text-slate">{v.color}</p></div>
                </Link>
              ))}
            </div>
          </Panel>
          <Panel title="Leads" bodyClass="p-0">
            <ul className="divide-y">{leads.map((l) => <li key={l.id}><Link to="/admin/leads/$id" params={{ id: l.id }} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-secondary/40"><span className="font-semibold text-navy">{l.service?.name}</span><span className="tabular text-slate">{money(l.estimated_value)}</span><StatusBadge status={l.status} /></Link></li>)}</ul>
            {!leads.length && <p className="p-4 text-sm text-slate">No leads.</p>}
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Appointments" bodyClass="p-0">
              <ul className="divide-y">{appointments.map((a) => <li key={a.id} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm"><div><p className="font-semibold text-navy">{a.service?.name}</p><p className="text-xs text-slate">{fmtDateTime(a.starts_at)}</p></div><StatusBadge status={a.status} /></li>)}</ul>
              {!appointments.length && <p className="p-4 text-sm text-slate">No appointments.</p>}
            </Panel>
            <Panel title="Quotes" bodyClass="p-0">
              <ul className="divide-y">{quotes.map((x) => <li key={x.id}><Link to="/admin/quotes" search={{ open: x.id }} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-secondary/40"><span className="font-semibold text-navy">{x.number}</span><span className="tabular">{money(x.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - x.discount)}</span><StatusBadge status={x.status} /></Link></li>)}</ul>
              {!quotes.length && <p className="p-4 text-sm text-slate">No quotes.</p>}
            </Panel>
          </div>
          <Panel title="Service history">
            {history.length === 0 ? <p className="text-sm text-slate">No completed services yet.</p> : (
              <ul className="space-y-2 text-sm">{history.map((a) => <li key={a.id} className="flex justify-between"><span className="text-navy">{a.service?.name} · {vehicleName(a.vehicle)}</span><span className="text-slate">{fmtDate(a.starts_at, { month: "short", day: "numeric", year: "numeric" })}</span></li>)}</ul>
            )}
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Notes" action={notes !== null && <Button size="sm" variant="ghost" onClick={saveNotes}><Save /> Save</Button>}>
            <textarea aria-label="Customer notes" rows={3} className="w-full resize-none rounded-md border bg-background p-2 text-sm text-navy outline-none focus:border-primary" value={notes ?? customer.notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add a note…" />
          </Panel>
          <Panel title="Messages" bodyClass="max-h-72 space-y-2 overflow-y-auto">
            {messages.length === 0 ? <p className="text-sm text-slate">No messages.</p> : messages.slice(-8).map((m) => (
              <p key={m.id} className={`rounded px-2.5 py-1.5 text-xs ${m.direction === "outbound" ? "ml-6 bg-navy text-navy-foreground" : "mr-6 bg-secondary text-navy"}`}>{m.body}<span className="mt-0.5 block text-[10px] opacity-70">{m.channel.toUpperCase()} · {fmtTime(m.created_at)}</span></p>
            ))}
          </Panel>
          <Panel title="Activity"><Timeline items={activities.slice(0, 12).map((a) => ({ id: a.id, title: a.title, detail: a.detail, at: a.created_at, type: a.type }))} fmt={(d) => fmtDateTime(d)} /></Panel>
        </div>
      </div>
      <MessageDialog open={dlg === "msg"} onOpenChange={(o) => setDlg(o ? "msg" : null)} ctx={ctx} />
      <FollowUpDialog open={dlg === "fu"} onOpenChange={(o) => setDlg(o ? "fu" : null)} ctx={ctx} />
    </div>
  );
}
