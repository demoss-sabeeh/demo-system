import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageTitle, StatusBadge, RowsSkeleton, EmptyState, selectCls, inputSm } from "@/components/admin/ui";
import { AppointmentSheet } from "@/components/admin/AppointmentSheet";
import { RowDelete } from "@/components/admin/delete";
import { deleteAppointment } from "@/lib/actions";
import { useAppointments, useServices, type Appointment } from "@/lib/admin-data";
import { APPT_STATUSES, dayKey, fmtDate, fmtTime, fullName, label, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/appointments")({ component: Appointments });

function Appointments() {
  const a = useAppointments();
  const services = useServices();
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [sel, setSel] = useState<Appointment | null>(null);
  const rows = useMemo(() => (a.data ?? []).filter((x) => (!status || x.status === status) && (!service || x.service_id === service) && (!date || dayKey(x.starts_at) === date)), [a.data, status, service, date]);
  const groups = rows.reduce<Record<string, Appointment[]>>((acc, x) => ((acc[dayKey(x.starts_at)] ??= []).push(x), acc), {});
  const current = sel ? a.data?.find((x) => x.id === sel.id) ?? null : null;
  return (
    <div className="space-y-5">
      <PageTitle title="Appointments" subtitle={`${rows.length} appointments`} />
      <div className="flex flex-wrap gap-2">
        <input type="date" aria-label="Date" className={`${inputSm} w-auto`} value={date} onChange={(e) => setDate(e.target.value)} />
        <select aria-label="Status" className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{APPT_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select>
        <select aria-label="Service" className={selectCls} value={service} onChange={(e) => setService(e.target.value)}><option value="">All services</option>{services.data?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
      </div>
      {a.isLoading ? <RowsSkeleton /> : rows.length === 0 ? <EmptyState title="No appointments" /> : (
        <div className="space-y-4">
          {Object.entries(groups).map(([d, list]) => (
            <section key={d} className="overflow-hidden rounded-md border bg-surface">
              <h2 className="border-b bg-secondary/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-navy">{fmtDate(list[0].starts_at, { weekday: "long", month: "long", day: "numeric" })}{d === dayKey(new Date()) && <span className="ml-2 text-primary">Today</span>}</h2>
              <ul className="divide-y">
                {list.map((x) => (
                  <li key={x.id} className="flex items-center">
                    <button onClick={() => setSel(x)} className="flex min-w-0 flex-1 items-center gap-4 py-2.5 pl-4 text-left hover:bg-secondary/40">
                      <span className="tabular w-16 text-sm font-bold text-navy">{fmtTime(x.starts_at)}</span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-navy">{fullName(x.customer)}</span><span className="block truncate text-xs text-slate">{vehicleName(x.vehicle)} · {x.service?.name}</span></span>
                      <StatusBadge status={x.status} />
                    </button>
                    <RowDelete className="px-1" kind="Appointment" name={`${x.service?.name ?? "Appointment"} · ${fullName(x.customer)} · ${fmtDate(x.starts_at)} ${fmtTime(x.starts_at)}`} onConfirm={() => deleteAppointment(x.id)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <AppointmentSheet appt={current} onClose={() => setSel(null)} />
    </div>
  );
}
