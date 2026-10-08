import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { PageTitle, RowsSkeleton, selectCls } from "@/components/admin/ui";
import { useLeads, useInvalidate, type Lead } from "@/lib/admin-data";
import { setLeadStatus } from "@/lib/actions";
import { fullName, label, LEAD_STATUSES, money, timeAgo, vehicleName, type LeadStatus } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/pipeline")({ component: Pipeline });

function Pipeline() {
  const leads = useLeads();
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  const [over, setOver] = useState<string | null>(null);

  async function move(lead: Lead, status: LeadStatus) {
    if (lead.status === status) return;
    qc.setQueryData<Lead[]>(["db", "leads"], (old) => old?.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    try {
      await setLeadStatus(lead, status);
      toast.success(`${fullName(lead.customer)} → ${label(status)}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Move failed");
    } finally {
      invalidate();
    }
  }

  const all = leads.data ?? [];
  return (
    <div className="space-y-5">
      <PageTitle title="Pipeline" subtitle="Drag cards between stages. Changes are saved instantly." />
      {leads.isLoading ? <RowsSkeleton /> : (
        <div className="-mx-4 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 pb-4 md:-mx-6 md:px-6 md:snap-none">
          <div className="flex min-w-max gap-3">
            {LEAD_STATUSES.map((s) => {
              const items = all.filter((l) => l.status === s);
              return (
                <section
                  key={s}
                  aria-label={label(s)}
                  onDragOver={(e) => { e.preventDefault(); setOver(s); }}
                  onDragLeave={() => setOver(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setOver(null);
                    const lead = all.find((l) => l.id === e.dataTransfer.getData("text/plain"));
                    if (lead) move(lead, s);
                  }}
                  className={cn("flex w-64 shrink-0 snap-start scroll-mx-4 flex-col rounded-md border bg-secondary/40 transition-colors", over === s && "border-primary bg-accent")}
                >
                  <header className="flex items-center justify-between border-b px-3 py-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">{label(s)} <span className="text-slate">{items.length}</span></span>
                    <span className="tabular text-[11px] font-semibold text-slate">{money(items.reduce((a, l) => a + l.estimated_value, 0))}</span>
                  </header>
                  <div className="min-h-[120px] flex-1 space-y-2 p-2">
                    {items.map((l) => (
                      <motion.article
                        layout
                        key={l.id}
                        draggable
                        onDragStart={(e) => (e as unknown as React.DragEvent).dataTransfer.setData("text/plain", l.id)}
                        className="cursor-grab rounded-md border bg-surface p-3 active:cursor-grabbing"
                      >
                        <Link to="/admin/leads/$id" params={{ id: l.id }} className="block text-sm font-bold text-navy hover:text-primary">{fullName(l.customer)}</Link>
                        <p className="mt-0.5 truncate text-xs text-slate">{vehicleName(l.vehicle)}</p>
                        <p className="truncate text-xs font-medium text-navy">{l.service?.name}</p>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="tabular font-bold text-navy">{money(l.estimated_value)}</span>
                          <span className="text-slate">{label(l.source)} · {timeAgo(l.created_at)}</span>
                        </div>
                        <select aria-label={`Move ${fullName(l.customer)}`} className={`${selectCls} mt-2 w-full md:hidden`} value={l.status} onChange={(e) => move(l, e.target.value as LeadStatus)}>
                          {LEAD_STATUSES.map((x) => <option key={x} value={x}>{label(x)}</option>)}
                        </select>
                      </motion.article>
                    ))}
                    {items.length === 0 && <p className="px-2 py-6 text-center text-xs text-slate">Drop leads here</p>}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
