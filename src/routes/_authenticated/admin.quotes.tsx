import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarPlus, Check, Pencil, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { PageTitle, StatusBadge, RowsSkeleton, EmptyState } from "@/components/admin/ui";
import { BookDialog, QuoteDialog } from "@/components/admin/dialogs";
import { useQuotes, useInvalidate, type Quote } from "@/lib/admin-data";
import { setQuoteStatus } from "@/lib/actions";
import { fmtDate, fullName, label, money, QUOTE_STATUSES, vehicleName } from "@/lib/format";
import { BUSINESS } from "@/lib/knowledge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/quotes")({
  validateSearch: (s: Record<string, unknown>): { open?: string } => (typeof s.open === "string" ? { open: s.open } : {}),
  component: Quotes,
});

const total = (q: Quote) => q.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - q.discount;

function Quotes() {
  const { open } = Route.useSearch();
  const nav = useNavigate({ from: "/admin/quotes" });
  const quotes = useQuotes();
  const [status, setStatus] = useState("");
  const rows = (quotes.data ?? []).filter((q) => !status || q.status === status);
  const selected = quotes.data?.find((q) => q.id === open);

  return (
    <div className="space-y-5">
      <PageTitle title="Quotes" subtitle="Create, send and track every quote." />
      <div className="flex flex-wrap gap-1.5">
        {["", ...QUOTE_STATUSES].map((s) => (
          <button key={s || "all"} onClick={() => setStatus(s)} className={cn("min-h-9 rounded border px-3 py-1 transition-colors text-xs font-semibold", status === s ? "border-navy bg-navy text-navy-foreground" : "bg-surface text-slate hover:text-navy")}>
            {s ? label(s) : "All"} <span className="opacity-60">{(quotes.data ?? []).filter((q) => !s || q.status === s).length}</span>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border bg-surface">
        {quotes.isLoading ? <div className="p-4"><RowsSkeleton /></div> : rows.length === 0 ? <EmptyState title="No quotes" body="Create a quote from any lead." /> : (
          <ul className="divide-y">
            {rows.map((q) => (
              <li key={q.id}>
                <button onClick={() => nav({ search: { open: q.id } })} className="grid w-full gap-1 px-4 py-3 text-left hover:bg-secondary/40 md:grid-cols-12 md:items-center">
                  <span className="tabular font-bold text-navy md:col-span-2">{q.number}</span>
                  <span className="text-sm text-navy md:col-span-3">{fullName(q.customer)}</span>
                  <span className="text-sm text-slate md:col-span-3">{vehicleName(q.vehicle)} · {q.service?.name}</span>
                  <span className="tabular text-sm font-semibold text-navy md:col-span-2 md:text-right">{money(total(q))}</span>
                  <span className="md:col-span-2 md:text-right"><StatusBadge status={q.status} /></span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Sheet open={!!selected} onOpenChange={(o) => !o && nav({ search: {} })}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetTitle className="sr-only">Quote preview</SheetTitle>
          {selected && <QuotePreview q={selected} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function QuotePreview({ q }: { q: Quote }) {
  const invalidate = useInvalidate();
  const [edit, setEdit] = useState(false);
  const [book, setBook] = useState(false);
  const sub = q.items.reduce((a, i) => a + i.quantity * i.unit_price, 0);
  async function act(s: string) {
    try {
      await setQuoteStatus(q, s);
      await invalidate();
      toast.success(`Quote ${label(s).toLowerCase()}${s === "sent" ? " — delivery simulated" : ""}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }
  return (
    <div className="space-y-5 pt-6">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setEdit(true)}><Pencil /> Edit</Button>
        <Button size="sm" onClick={() => act("sent")} disabled={q.status === "accepted"}><Send /> Send</Button>
        <Button size="sm" variant="outline" onClick={() => act("accepted")} disabled={q.status === "accepted"}><Check /> Accept</Button>
        <Button size="sm" variant="outline" onClick={() => act("declined")} disabled={q.status === "declined"}><X /> Decline</Button>
        {q.status === "accepted" && <Button size="sm" variant="navy" onClick={() => setBook(true)}><CalendarPlus /> Book appointment</Button>}
      </div>
      <article className="rounded-md border bg-surface p-4 sm:p-6">
        <header className="grid min-w-0 gap-3 border-b pb-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0"><p className="text-sm font-extrabold tracking-[0.18em] text-navy">APEX AUTO DETAILING</p><p className="text-xs text-slate">{BUSINESS.address}</p></div>
          <div className="text-right"><p className="tabular font-bold text-navy">{q.number}</p><StatusBadge status={q.status} /></div>
        </header>
        <div className="grid min-w-0 gap-4 py-4 text-sm sm:grid-cols-2">
          <div className="min-w-0 [overflow-wrap:anywhere]"><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Prepared for</p><p className="font-semibold text-navy">{fullName(q.customer)}</p><p className="text-slate">{q.customer?.email}</p></div>
          <div className="min-w-0 sm:text-right"><p className="text-[10px] font-bold uppercase tracking-wider text-slate">Vehicle</p><p className="font-semibold text-navy">{vehicleName(q.vehicle)}</p><p className="text-slate">Expires {fmtDate(q.expires_at ? q.expires_at + "T12:00:00Z" : null)}</p></div>
        </div>
        <table className="w-full text-sm">
          <thead className="border-y text-left text-[10px] font-bold uppercase tracking-wider text-slate"><tr><th className="py-2">Item</th><th className="py-2 text-right">Qty</th><th className="py-2 text-right">Amount</th></tr></thead>
          <tbody className="divide-y">{[...q.items].sort((a, b) => a.sort - b.sort).map((i) => <tr key={i.id}><td className="py-2 text-navy">{i.description}</td><td className="tabular py-2 text-right">{i.quantity}</td><td className="tabular py-2 text-right text-navy">{money(i.quantity * i.unit_price)}</td></tr>)}</tbody>
        </table>
        <dl className="ml-auto mt-4 w-48 space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-slate">Subtotal</dt><dd className="tabular">{money(sub)}</dd></div>
          {q.discount > 0 && <div className="flex justify-between"><dt className="text-slate">Discount</dt><dd className="tabular">−{money(q.discount)}</dd></div>}
          <div className="flex justify-between border-t pt-1 text-base font-extrabold text-navy"><dt>Total</dt><dd className="tabular">{money(sub - q.discount)}</dd></div>
        </dl>
        {q.notes && <p className="mt-4 border-t pt-3 text-xs text-slate">{q.notes}</p>}
      </article>
      {q.lead_id && <Link to="/admin/leads/$id" params={{ id: q.lead_id }} className="text-sm font-semibold text-primary">Open lead →</Link>}
      {edit && <QuoteDialog open onOpenChange={setEdit} quote={q} />}
      {book && <BookDialog open onOpenChange={setBook} ctx={{ lead_id: q.lead_id, customer_id: q.customer_id, vehicle_id: q.vehicle_id, service_id: q.service_id, customerName: fullName(q.customer) }} />}
    </div>
  );
}
