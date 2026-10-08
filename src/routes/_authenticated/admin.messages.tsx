import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Bot, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageTitle, RowsSkeleton, EmptyState, StatusBadge, inputSm } from "@/components/admin/ui";
import { BookDialog, QuoteDialog, FollowUpDialog } from "@/components/admin/dialogs";
import { useAppointments, useInvalidate, useLeads, useMessages, type Message } from "@/lib/admin-data";
import { sendMessage, setLeadStatus } from "@/lib/actions";
import { fmtDateTime, fmtTime, fullName, timeAgo, vehicleName } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/messages")({ component: Inbox });

const ICON = { sms: MessageSquare, email: Mail, ai: Bot };

function Inbox() {
  const msgs = useMessages();
  const leads = useLeads();
  const appts = useAppointments();
  const invalidate = useInvalidate();
  const [channel, setChannel] = useState<"" | "sms" | "email" | "ai">("");
  const [sel, setSel] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [dlg, setDlg] = useState<null | "quote" | "book" | "fu">(null);

  const threads = useMemo(() => {
    const m = new Map<string, Message[]>();
    for (const x of msgs.data ?? []) if (!channel || x.channel === channel) (m.get(x.customer_id) ?? m.set(x.customer_id, []).get(x.customer_id)!).push(x);
    return [...m.entries()].map(([cid, list]) => ({ cid, list, last: list[list.length - 1] })).sort((a, b) => +new Date(b.last.created_at) - +new Date(a.last.created_at));
  }, [msgs.data, channel]);

  const active = threads.find((t) => t.cid === sel);
  const lead = leads.data?.find((l) => l.customer_id === sel);
  const appt = appts.data?.find((a) => a.customer_id === sel && new Date(a.starts_at).getTime() > Date.now());
  const ctx = active ? { customer_id: active.cid, lead_id: lead?.id, vehicle_id: lead?.vehicle_id, service_id: lead?.service_id, customerName: fullName(active.last.customer) } : null;

  async function send() {
    if (!active || !body.trim()) return;
    try {
      await sendMessage({ customer_id: active.cid, lead_id: lead?.id, channel: active.last.channel === "email" ? "email" : "sms", body: body.trim() });
      setBody("");
      invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Send failed");
    }
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Messages" subtitle="SMS, email and AI assistant conversations in one inbox. Delivery is simulated in demo mode." />
      <div className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-md border bg-surface lg:min-h-[560px] lg:grid-cols-[300px_minmax(0,1fr)_260px]">
        <aside className={cn("min-w-0 border-r", active && "hidden lg:block")}>
          <div className="flex gap-1 border-b p-2">
            {(["", "sms", "email", "ai"] as const).map((c) => <button key={c || "all"} onClick={() => setChannel(c)} className={cn("rounded px-2.5 py-1 text-xs font-semibold", channel === c ? "bg-navy text-navy-foreground" : "text-slate hover:bg-secondary")}>{c ? (c === "ai" ? "AI" : c.toUpperCase()) : "All"}</button>)}
          </div>
          {msgs.isLoading ? <div className="p-3"><RowsSkeleton rows={6} /></div> : threads.length === 0 ? <EmptyState title="No conversations" /> : (
            <ul className="max-h-[520px] divide-y overflow-y-auto">
              {threads.map((t) => {
                const I = ICON[t.last.channel as keyof typeof ICON];
                return (
                  <li key={t.cid}>
                    <button onClick={() => setSel(t.cid)} className={cn("w-full px-3 py-2.5 text-left hover:bg-secondary/50", sel === t.cid && "bg-accent")}>
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><span className="min-w-0 truncate text-sm font-bold text-navy">{fullName(t.last.customer)}</span><span className="shrink-0 text-[10px] text-slate">{timeAgo(t.last.created_at)}</span></div>
                      <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-slate"><I className="h-3 w-3 shrink-0" /><span className="min-w-0 truncate">{t.last.body}</span></p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
        <section className={cn("flex min-w-0 flex-col", !active && "hidden lg:flex")}>
          {!active ? <div className="m-auto"><EmptyState title="Select a conversation" /></div> : (
            <>
              <header className="flex items-center gap-2 border-b px-4 py-3">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSel(null)} aria-label="Back"><ArrowLeft /></Button>
                <p className="font-bold text-navy">{fullName(active.last.customer)}</p>
              </header>
              <div className="max-h-[45dvh] min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-4 lg:max-h-[440px]">
                {active.list.map((m) => (
                  <div key={m.id} className={cn("flex", m.direction === "outbound" && "justify-end")}>
                    <div className={cn("min-w-0 max-w-[90%] break-words rounded-md px-3 py-2 text-sm [overflow-wrap:anywhere] sm:max-w-[78%]", m.direction === "outbound" ? "bg-navy text-navy-foreground" : "bg-secondary text-navy")}>
                      <p>{m.body}</p>
                      <p className={cn("mt-1 text-[10px]", m.direction === "outbound" ? "text-navy-muted" : "text-slate")}>{m.channel === "ai" ? "AI assistant" : m.channel.toUpperCase()}{m.automated ? " · automated" : ""} · {fmtTime(m.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t p-3">
                <input aria-label="Reply" className={inputSm} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a reply…" />
                <Button type="submit" disabled={!body.trim()}><Send /> Send</Button>
              </form>
            </>
          )}
        </section>
        <aside className="hidden border-l p-4 lg:block">
          {active && ctx ? (
            <div className="space-y-4 text-sm">
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Customer</p><Link to="/admin/customers/$id" params={{ id: active.cid }} className="font-bold text-primary">{ctx.customerName}</Link><p className="text-xs text-slate">{active.last.customer?.phone}</p></div>
              {lead && <>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Vehicle</p><p className="font-semibold text-navy">{vehicleName(lead.vehicle)}</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Service</p><p className="font-semibold text-navy">{lead.service?.name}</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Lead status</p><StatusBadge status={lead.status} /></div>
              </>}
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Next appointment</p><p className="text-navy">{appt ? fmtDateTime(appt.starts_at) : "None"}</p></div>
              <div className="grid gap-1.5 border-t pt-4">
                <Button size="sm" variant="outline" disabled={!lead} onClick={() => setDlg("quote")}>Create quote</Button>
                <Button size="sm" onClick={() => setDlg("book")}>Book appointment</Button>
                <Button size="sm" variant="outline" disabled={!lead} onClick={async () => { await setLeadStatus(lead!, "qualified"); invalidate(); toast.success("Lead qualified"); }}>Qualify lead</Button>
                <Button size="sm" variant="outline" onClick={() => setDlg("fu")}>Create follow-up</Button>
              </div>
            </div>
          ) : <p className="text-sm text-slate">Customer context appears here.</p>}
        </aside>
      </div>
      {ctx && <>
        {dlg === "quote" && <QuoteDialog open onOpenChange={(o) => setDlg(o ? "quote" : null)} ctx={ctx} />}
        <BookDialog open={dlg === "book"} onOpenChange={(o) => setDlg(o ? "book" : null)} ctx={ctx} />
        <FollowUpDialog open={dlg === "fu"} onOpenChange={(o) => setDlg(o ? "fu" : null)} ctx={ctx} />
      </>}
    </div>
  );
}
