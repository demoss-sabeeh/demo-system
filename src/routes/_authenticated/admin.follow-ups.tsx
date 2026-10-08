import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageTitle, StatusBadge, RowsSkeleton, EmptyState, selectCls, inputSm } from "@/components/admin/ui";
import { RowDelete } from "@/components/admin/delete";
import { deleteFollowUp } from "@/lib/actions";
import { useFollowUps, useInvalidate } from "@/lib/admin-data";
import { supabase } from "@/integrations/supabase/client";
import { dayKey, fmtDate, FU_STATUSES, FU_TYPES, fullName, label, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/follow-ups")({ component: FollowUps });

function FollowUps() {
  const f = useFollowUps();
  const invalidate = useInvalidate();
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const rows = (f.data ?? []).filter((x) => (!status || x.status === status) && (!type || x.type === type) && (!date || (x.next_contact_at && dayKey(x.next_contact_at) === date)));

  async function update(id: string, s: string) {
    const { error } = await supabase.from("follow_ups").update({ status: s, ...(s === "completed" ? { last_contact_at: new Date().toISOString() } : {}) }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Follow-up ${label(s).toLowerCase()}`);
    invalidate();
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Follow-ups" subtitle="Quote nudges, reminders, post-service check-ins and reactivation — nothing slips." />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {FU_STATUSES.map((s) => <button key={s} onClick={() => setStatus(status === s ? "" : s)} className={`rounded-md border bg-surface p-3 text-left ${status === s ? "border-primary" : ""}`}><p className="text-[10px] font-bold uppercase tracking-wider text-slate">{label(s)}</p><p className="tabular text-2xl font-extrabold text-navy">{(f.data ?? []).filter((x) => x.status === s).length}</p></button>)}
      </div>
      <div className="flex flex-wrap gap-2">
        <select aria-label="Type" className={selectCls} value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{Object.entries(FU_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input type="date" aria-label="Next contact date" className={`${inputSm} sm:w-48`} value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="overflow-hidden rounded-md border bg-surface">
        {f.isLoading ? <div className="p-4"><RowsSkeleton /></div> : rows.length === 0 ? <EmptyState title="No follow-ups" body="You're all caught up." /> : (
          <ul className="divide-y">
            {rows.map((x) => (
              <li key={x.id} className="grid gap-2 px-4 py-3 md:grid-cols-12 md:items-center">
                <div className="md:col-span-3"><Link to="/admin/customers/$id" params={{ id: x.customer_id }} className="font-bold text-navy hover:text-primary">{fullName(x.customer)}</Link><p className="text-xs text-slate">{vehicleName(x.vehicle)}</p></div>
                <div className="min-w-0 md:col-span-3"><p className="text-sm font-semibold text-navy">{FU_TYPES[x.type]}</p><p className="text-xs text-slate">{x.reason}</p></div>
                <p className="tabular text-xs text-slate md:col-span-2">Last {fmtDate(x.last_contact_at)} · Next <span className="font-semibold text-navy">{fmtDate(x.next_contact_at)}</span></p>
                <div className="md:col-span-2 md:text-right"><StatusBadge status={x.status} /></div>
                <div className="flex items-center gap-1 md:col-span-2"><select aria-label="Update status" className={`${selectCls} min-w-0 flex-1`} value={x.status} onChange={(e) => update(x.id, e.target.value)}>{FU_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select><RowDelete kind="Follow-up" name={`${FU_TYPES[x.type] ?? "Follow-up"} · ${fullName(x.customer)}`} onConfirm={() => deleteFollowUp(x.id)} /></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
