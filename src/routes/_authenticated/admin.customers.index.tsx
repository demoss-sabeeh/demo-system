import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageTitle, RowsSkeleton, EmptyState, ErrorState, inputSm, selectCls } from "@/components/admin/ui";
import { RowDelete } from "@/components/admin/delete";
import { deleteCustomer } from "@/lib/actions";
import { useCustomers } from "@/lib/admin-data";
import { fmtDate, fullName, vehicleName } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/customers/")({ component: Customers });

function Customers() {
  const c = useCustomers();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent");
  const rows = useMemo(() => {
    const t = q.toLowerCase();
    const r = (c.data ?? []).filter((x) => !t || `${x.first_name} ${x.last_name} ${x.email} ${x.phone}`.toLowerCase().includes(t));
    return r.sort((a, b) => (sort === "name" ? a.last_name.localeCompare(b.last_name) : sort === "vehicles" ? b.vehicles.length - a.vehicles.length : +new Date(b.created_at) - +new Date(a.created_at)));
  }, [c.data, q, sort]);
  return (
    <div className="space-y-5">
      <PageTitle title="Customers" subtitle={`${c.data?.length ?? 0} customers`} />
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-[220px] flex-1"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate" /><input aria-label="Search customers" className={`${inputSm} pl-8`} placeholder="Name, email or phone" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <select aria-label="Sort" className={selectCls} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Newest</option><option value="name">Name</option><option value="vehicles">Most vehicles</option></select>
      </div>
      <div className="overflow-hidden rounded-md border bg-surface">
        {c.isLoading ? <div className="p-4"><RowsSkeleton /></div> : c.isError ? <ErrorState error={c.error} retry={() => c.refetch()} /> : rows.length === 0 ? <EmptyState title="No customers found" /> : (
          <ul className="divide-y">
            {rows.map((x) => {
              const last = [...x.appointments].sort((a, b) => +new Date(b.starts_at) - +new Date(a.starts_at))[0];
              return (
                <li key={x.id} className="flex items-start md:items-center">
                  <Link to="/admin/customers/$id" params={{ id: x.id }} className="grid min-w-0 flex-1 gap-1 py-3 pl-4 hover:bg-secondary/40 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-3"><p className="font-bold text-navy">{fullName(x)}</p><p className="text-xs text-slate">{x.city}</p></div>
                    <p className="truncate text-sm text-slate md:col-span-3">{x.email}<span className="md:hidden"> · {x.phone}</span></p>
                    <p className="hidden text-sm text-slate md:col-span-2 md:block">{x.phone}</p>
                    <p className="truncate text-sm text-navy md:col-span-3">{x.vehicles.map(vehicleName).join(", ") || "—"}</p>
                    <p className="tabular text-xs text-slate md:col-span-1 md:text-right">{last ? fmtDate(last.starts_at) : "—"}</p>
                  </Link>
                  <RowDelete className="px-1 pt-2 md:pt-0" kind="Customer" name={fullName(x)} detail={`This also removes their ${x.vehicles.length} vehicle(s) and all of their leads, quotes, appointments, messages and follow-ups.`} onConfirm={() => deleteCustomer(x.id)} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
