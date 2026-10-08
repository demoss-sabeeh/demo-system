import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge, selectCls } from "./ui";
import { useInvalidate, type Appointment } from "@/lib/admin-data";
import { DeleteButton } from "./delete";
import { setAppointmentStatus, deleteAppointment } from "@/lib/actions";
import { APPT_STATUSES, fmtDate, fmtTime, fullName, label, vehicleName } from "@/lib/format";

export function AppointmentSheet({ appt, onClose }: { appt: Appointment | null; onClose: () => void }) {
  const invalidate = useInvalidate();
  async function change(s: string) {
    if (!appt) return;
    try {
      await setAppointmentStatus(appt, s);
      await invalidate();
      toast.success(`Appointment ${label(s).toLowerCase()}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }
  return (
    <Sheet open={!!appt} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetTitle className="text-navy">Appointment</SheetTitle>
        {appt && (
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-2xl font-extrabold text-navy">{appt.service?.name}</p>
              <p className="text-sm text-slate">{fmtDate(appt.starts_at, { weekday: "long", month: "long", day: "numeric" })} · {fmtTime(appt.starts_at)} · ~{appt.duration_hours} hrs</p>
              <div className="mt-2"><StatusBadge status={appt.status} /></div>
            </div>
            <dl className="divide-y rounded-md border text-sm">
              <div className="flex justify-between px-3 py-2"><dt className="text-slate">Customer</dt><dd><Link to="/admin/customers/$id" params={{ id: appt.customer_id }} className="font-semibold text-primary">{fullName(appt.customer)}</Link></dd></div>
              <div className="flex justify-between px-3 py-2"><dt className="text-slate">Vehicle</dt><dd>{appt.vehicle_id ? <Link to="/admin/vehicles/$id" params={{ id: appt.vehicle_id }} className="font-semibold text-primary">{vehicleName(appt.vehicle)}</Link> : "—"}</dd></div>
              <div className="flex justify-between gap-4 px-3 py-2"><dt className="text-slate">Location</dt><dd className="text-right text-navy">{appt.location}</dd></div>
              <div className="flex justify-between px-3 py-2"><dt className="text-slate">Phone</dt><dd className="text-navy">{appt.customer?.phone}</dd></div>
            </dl>
            <div>
              <label htmlFor="appt-status" className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-slate">Status</label>
              <select id="appt-status" className={`${selectCls} w-full`} value={appt.status} onChange={(e) => change(e.target.value)}>
                {APPT_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
              </select>
              <p className="mt-2 text-xs text-slate">Completing an appointment updates vehicle history and schedules a post-service follow-up.</p>
            </div>
            {appt.lead_id && <Link to="/admin/leads/$id" params={{ id: appt.lead_id }} className="text-sm font-semibold text-primary">Open lead →</Link>}
            <div className="border-t pt-4"><DeleteButton kind="Appointment" name={`${appt.service?.name ?? "Appointment"} · ${fullName(appt.customer)} · ${fmtDate(appt.starts_at)} ${fmtTime(appt.starts_at)}`} onConfirm={() => deleteAppointment(appt.id)} onDeleted={onClose} label="Delete appointment" /></div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
