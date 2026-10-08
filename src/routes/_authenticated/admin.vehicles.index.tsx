import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Car, Search } from "lucide-react";
import { PageTitle, RowsSkeleton, EmptyState, inputSm } from "@/components/admin/ui";
import { useVehicles } from "@/lib/admin-data";
import { fmtDate, fullName, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/vehicles/")({ component: Vehicles });

function Vehicles() {
  const v = useVehicles();
  const [q, setQ] = useState("");
  const rows = useMemo(() => (v.data ?? []).filter((x) => !q || `${vehicleName(x)} ${x.color} ${fullName(x.customer)}`.toLowerCase().includes(q.toLowerCase())), [v.data, q]);
  return (
    <div className="space-y-5">
      <PageTitle title="Vehicles" subtitle="Every vehicle, its owner and its service history." />
      <div className="relative max-w-md"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate" /><input aria-label="Search vehicles" className={`${inputSm} pl-8`} placeholder="Make, model, owner…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      {v.isLoading ? <RowsSkeleton /> : rows.length === 0 ? <EmptyState title="No vehicles found" /> : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((x) => {
            const done = x.appointments.filter((a) => a.status === "completed").sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at));
            return (
              <Link key={x.id} to="/admin/vehicles/$id" params={{ id: x.id }} className="rounded-md border bg-surface p-4 transition-colors hover:border-primary">
                <div className="flex items-start justify-between"><Car className="h-5 w-5 text-primary" /><span className="text-[11px] text-slate">{x.color}</span></div>
                <p className="mt-3 font-bold text-navy">{vehicleName(x)}</p>
                <p className="text-xs text-slate">Owner · {fullName(x.customer)}</p>
                <p className="mt-3 border-t pt-2 text-xs text-slate">Last service: <span className="font-semibold text-navy">{done[0] ? `${done[0].service?.name} · ${fmtDate(done[0].starts_at)}` : "None yet"}</span></p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
