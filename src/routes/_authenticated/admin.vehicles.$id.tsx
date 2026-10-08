import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Car } from "lucide-react";
import { Panel, StatusBadge, RowsSkeleton, ErrorState } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/delete";
import { deleteVehicle } from "@/lib/actions";
import { useVehicle } from "@/lib/admin-data";
import { fmtDate, fmtDateTime, fullName, money, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/vehicles/$id")({ component: VehicleProfile });

const NEXT: Record<string, [string, number]> = {
  "ceramic-coating": ["Maintenance Detail", 42], "paint-protection-film": ["Maintenance Detail", 42], "paint-correction": ["Ceramic Coating", 14],
  "full-detail": ["Maintenance Detail", 60], "interior-detail": ["Full Detail", 90], "maintenance-detail": ["Maintenance Detail", 42], "fleet-detailing": ["Fleet / Commercial Detailing", 30],
};

function VehicleProfile() {
  const { id } = Route.useParams();
  const q = useVehicle(id);
  const nav = useNavigate();
  if (q.isLoading) return <RowsSkeleton rows={6} />;
  if (q.isError || !q.data) return <ErrorState error={q.error} retry={() => q.refetch()} />;
  const { vehicle, appointments, quotes } = q.data;
  const history = appointments.filter((a) => a.status === "completed");
  const last = history[0];
  const rec = last?.service ? NEXT[last.service.slug] : undefined;
  const nextDate = last && rec ? new Date(new Date(last.starts_at).getTime() + rec[1] * 86400000) : null;

  return (
    <div className="space-y-5">
      <Link to="/admin/vehicles" className="inline-flex items-center gap-1 text-xs font-semibold text-slate hover:text-navy"><ArrowLeft className="h-3.5 w-3.5" /> Vehicles</Link>
      <div className="rounded-md border bg-surface p-5">
        <div className="flex flex-wrap items-center gap-3"><Car className="h-6 w-6 text-primary" /><h1 className="min-w-0 flex-1 text-2xl font-extrabold text-navy">{vehicleName(vehicle)}</h1><DeleteButton kind="Vehicle" name={vehicleName(vehicle)} detail="Its leads, quotes and appointments stay on the customer record without a vehicle attached." onConfirm={() => deleteVehicle(vehicle.id)} onDeleted={() => nav({ to: "/admin/vehicles" })} /></div>
        <p className="mt-1 text-sm text-slate">Color · {vehicle.color || "—"} &nbsp;·&nbsp; Owner · {vehicle.customer && <Link to="/admin/customers/$id" params={{ id: vehicle.customer_id }} className="font-semibold text-primary">{fullName(vehicle.customer)}</Link>}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border bg-surface p-4"><p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate">Last service</p><p className="mt-2 text-lg font-bold text-navy">{last ? last.service?.name : "None yet"}</p><p className="text-sm text-slate">{last ? fmtDate(last.starts_at, { month: "long", day: "numeric", year: "numeric" }) : "—"}</p></div>
        <div className="rounded-md border border-primary/30 bg-accent p-4"><p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground">Next recommended</p><p className="mt-2 text-lg font-bold text-navy">{rec ? rec[0] : "Full Detail"}</p><p className="text-sm text-slate">{nextDate ? `Around ${fmtDate(nextDate, { month: "long", day: "numeric" })}` : "Book a first service"}</p></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Service history & appointments" bodyClass="p-0">
          {appointments.length === 0 ? <p className="p-4 text-sm text-slate">No appointments yet.</p> : (
            <ol className="divide-y">{appointments.map((a) => <li key={a.id} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm"><div><p className="font-semibold text-navy">{a.service?.name}</p><p className="text-xs text-slate">{fmtDateTime(a.starts_at)}</p></div><StatusBadge status={a.status} /></li>)}</ol>
          )}
        </Panel>
        <Panel title="Quotes" bodyClass="p-0">
          {quotes.length === 0 ? <p className="p-4 text-sm text-slate">No quotes.</p> : (
            <ul className="divide-y">{quotes.map((x) => <li key={x.id}><Link to="/admin/quotes" search={{ open: x.id }} className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary/40"><span className="font-semibold text-navy">{x.number} · {x.service?.name}</span><span className="tabular">{money(x.items.reduce((a, i) => a + i.quantity * i.unit_price, 0) - x.discount)}</span><StatusBadge status={x.status} /></Link></li>)}</ul>
          )}
        </Panel>
      </div>
      {vehicle.notes && <Panel title="Notes"><p className="text-sm text-navy">{vehicle.notes}</p></Panel>}
    </div>
  );
}
