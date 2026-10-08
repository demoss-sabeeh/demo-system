import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, CalendarPlus, CheckCheck, FilePlus2, MessageSquarePlus, BellPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Panel, StatusBadge, Timeline, RowsSkeleton, ErrorState, selectCls } from "@/components/admin/ui";
import { BookDialog, FollowUpDialog, MessageDialog, QuoteDialog } from "@/components/admin/dialogs";
import { useInvalidate, useLead } from "@/lib/admin-data";
import { setLeadStatus, setAppointmentStatus } from "@/lib/actions";
import { fmtDate, fmtDateTime, fmtTime, fullName, label, LEAD_STATUSES, money, vehicleName, type LeadStatus } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/leads/$id")({ component: LeadWorkspace });

function LeadWorkspace() {
  const { id } = Route.useParams();
  const q = useLead(id);
  const invalidate = useInvalidate();
  const [dlg, setDlg] = useState<null | "book" | "quote" | "msg" | "fu">(null);

  if (q.isLoading) return <RowsSkeleton rows={8} />;
  if (q.isError || !q.data) return <ErrorState error={q.error} retry={() => q.refetch()} />;
  const { lead, activities, messages, quotes, appointments } = q.data;
  const name = fullName(lead.customer);
  const ctx = { lead_id: lead.id, customer_id: lead.customer_id, vehicle_id: lead.vehicle_id, service_id: lead.service_id, customerName: name };

  async function status(s: LeadStatus) {
    try {
      await setLeadStatus(lead, s);
      await invalidate();
      toast.success(`Lead moved to ${label(s)}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }
  async function complete() {
    const appt = appointments.find((a) => a.lead_id === lead.id && a.status !== "completed");
    try {
      if (appt) await setAppointmentStatus(appt, "completed");
      else await setLeadStatus(lead, "completed");
      await invalidate();
      toast.success("Marked completed — vehicle history updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }

  const stageIdx = LEAD_STATUSES.indexOf(lead.status as LeadStatus);

  return (
    <div className="space-y-5">
      <Link to="/admin/leads" className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy"><ArrowLeft className="h-3.5 w-3.5" /> Leads</Link>
      <div className="flex flex-col gap-4 rounded-md border bg-surface p-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-extrabold text-navy">{name}</h1><StatusBadge status={lead.status} /></div>
          <p className="mt-1 text-sm text-slate">{vehicleName(lead.vehicle)}{lead.vehicle?.color ? ` · ${lead.vehicle.color}` : ""} · <span className="font-semibold text-navy">{lead.service?.name}</span></p>
          <p className="tabular mt-3 text-3xl font-extrabold text-navy">{money(lead.estimated_value)} <span className="text-xs font-semibold text-slate">estimated value</span></p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => status("qualified")} disabled={stageIdx >= 2 && lead.status !== "lost"}><BadgeCheck /> Qualify</Button>
          <Button size="sm" variant="outline" onClick={() => setDlg("quote")}><FilePlus2 /> Create quote</Button>
          <Button size="sm" onClick={() => setDlg("book")}><CalendarPlus /> Book appointment</Button>
          <Button size="sm" variant="outline" onClick={() => setDlg("msg")}><MessageSquarePlus /> Send message</Button>
          <Button size="sm" variant="outline" onClick={() => setDlg("fu")}><BellPlus /> Follow-up</Button>
          <Button size="sm" variant="navy" onClick={complete} disabled={lead.status === "completed"}><CheckCheck /> Mark completed</Button>
        </div>
      </div>

      <ol className="grid grid-cols-7 gap-1" aria-label="Lead stage">
        {LEAD_STATUSES.map((s, i) => (
          <li key={s}>
            <button onClick={() => status(s)} className="w-full text-left" aria-current={lead.status === s}>
              <div className={cn("h-1 rounded-full", lead.status === "lost" ? (s === "lost" ? "bg-destructive" : "bg-border") : i <= stageIdx && s !== "lost" ? "bg-primary" : "bg-border")} />
              <span className={cn("mt-1.5 block truncate text-[10px] font-bold uppercase tracking-wider", lead.status === s ? "text-navy" : "text-slate")}>{label(s)}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <Panel title="Customer">
            <dl className="space-y-2 text-sm">
              {[["Name", <Link key="n" to="/admin/customers/$id" params={{ id: lead.customer_id }} className="font-semibold text-primary">{name}</Link>], ["Email", lead.customer?.email], ["Phone", lead.customer?.phone], ["Source", label(lead.source)], ["Created", fmtDateTime(lead.created_at)]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-3"><dt className="text-slate">{k}</dt><dd className="text-right text-navy">{v}</dd></div>
              ))}
            </dl>
          </Panel>
          <Panel title="Vehicle & request">
            <dl className="space-y-2 text-sm">
              {[["Vehicle", lead.vehicle_id ? <Link key="v" to="/admin/vehicles/$id" params={{ id: lead.vehicle_id }} className="font-semibold text-primary">{vehicleName(lead.vehicle)}</Link> : "—"], ["Color", lead.vehicle?.color || "—"], ["Service", lead.service?.name], ["Preferred", [lead.preferred_date && fmtDate(lead.preferred_date + "T12:00:00Z", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }), lead.preferred_time].filter(Boolean).join(" · ") || "—"], ["Condition", lead.vehicle_condition || "—"]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-3"><dt className="text-slate">{k}</dt><dd className="text-right text-navy">{v}</dd></div>
              ))}
            </dl>
            {lead.notes && <p className="mt-3 rounded bg-secondary p-2 text-xs text-navy">{lead.notes}</p>}
          </Panel>
          <Panel title="Move stage">
            <select aria-label="Lead status" className={`${selectCls} w-full`} value={lead.status} onChange={(e) => status(e.target.value as LeadStatus)}>
              {LEAD_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select>
          </Panel>
        </div>

        <Panel title="Activity timeline">
          <Timeline items={activities.map((a) => ({ id: a.id, title: a.title, detail: a.detail, at: a.created_at, type: a.type }))} fmt={(d) => `${fmtDate(d)} · ${fmtTime(d)}`} />
        </Panel>

        <div className="space-y-4">
          <Panel title="Conversation" bodyClass="max-h-[360px] space-y-2 overflow-y-auto">
            {messages.length === 0 ? <p className="text-sm text-slate">No messages yet.</p> : messages.map((m) => (
              <div key={m.id} className={cn("flex", m.direction === "outbound" ? "justify-end" : "")}>
                <div className={cn("max-w-[88%] rounded-md px-3 py-2 text-[13px]", m.direction === "outbound" ? "bg-navy text-navy-foreground" : "bg-secondary text-navy")}>
                  <p>{m.body}</p>
                  <p className={cn("mt-1 text-[10px]", m.direction === "outbound" ? "text-navy-muted" : "text-slate")}>{m.channel.toUpperCase()}{m.automated ? " · automated" : ""} · {fmtTime(m.created_at)}</p>
                </div>
              </div>
            ))}
          </Panel>
          <Panel title="Quotes" bodyClass="p-0">
            {quotes.length === 0 ? <p className="p-4 text-sm text-slate">No quotes yet.</p> : (
              <ul className="divide-y">{quotes.map((qq) => {
                const total = qq.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - qq.discount;
                return <li key={qq.id}><Link to="/admin/quotes" search={{ open: qq.id }} className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary/50"><span className="font-semibold text-navy">{qq.number}</span><span className="tabular text-navy">{money(total)}</span><StatusBadge status={qq.status} /></Link></li>;
              })}</ul>
            )}
          </Panel>
          <Panel title="Appointments" bodyClass="p-0">
            {appointments.length === 0 ? <p className="p-4 text-sm text-slate">No appointments yet.</p> : (
              <ul className="divide-y">{appointments.slice(0, 4).map((a) => <li key={a.id} className="flex items-center justify-between px-4 py-2.5 text-sm"><span className="text-navy">{fmtDateTime(a.starts_at)}</span><StatusBadge status={a.status} /></li>)}</ul>
            )}
          </Panel>
        </div>
      </div>

      <BookDialog open={dlg === "book"} onOpenChange={(o) => setDlg(o ? "book" : null)} ctx={ctx} />
      {dlg === "quote" && <QuoteDialog open onOpenChange={(o) => setDlg(o ? "quote" : null)} ctx={ctx} />}
      <MessageDialog open={dlg === "msg"} onOpenChange={(o) => setDlg(o ? "msg" : null)} ctx={ctx} />
      <FollowUpDialog open={dlg === "fu"} onOpenChange={(o) => setDlg(o ? "fu" : null)} ctx={ctx} />
    </div>
  );
}
