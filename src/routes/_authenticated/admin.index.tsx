import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, CalendarCheck, CalendarClock, FileText, UserPlus } from "lucide-react";
import { Kpi, Panel, PageTitle, RowsSkeleton, StatusBadge, EmptyState } from "@/components/admin/ui";
import { useAppointments, useFollowUps, useLeads, useQuotes, useRecentActivity } from "@/lib/admin-data";
import { dayKey, fmtDate, fmtTime, fullName, label, LEAD_STATUSES, money, timeAgo, vehicleName, FU_TYPES } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

function greeting() {
  const h = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(new Date()));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

function Overview() {
  const leads = useLeads();
  const quotes = useQuotes();
  const appts = useAppointments();
  const fus = useFollowUps();
  const activity = useRecentActivity();
  const today = dayKey(new Date());
  const weekAgo = Date.now() - 7 * 86400000;
  const L = leads.data ?? [];
  const upcoming = (appts.data ?? []).filter((a) => new Date(a.starts_at).getTime() > Date.now() - 3600000 && !["cancelled", "no_show", "completed"].includes(a.status)).slice(0, 6);
  const pendingFu = (fus.data ?? []).filter((f) => f.status === "pending" || f.status === "scheduled");

  return (
    <div className="space-y-6">
      <PageTitle title={`${greeting()}, Mike.`} subtitle="Here's what's happening with your detailing business." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
        <Kpi icon={UserPlus} label="New leads" value={L.filter((l) => l.status === "new").length} hint={`${L.filter((l) => new Date(l.created_at).getTime() > weekAgo).length} received this week`} />
        <Kpi icon={FileText} label="Open quotes" value={(quotes.data ?? []).filter((q) => ["draft", "sent", "viewed"].includes(q.status)).length} hint="Draft, sent or viewed" />
        <Kpi icon={CalendarCheck} label="Booked" value={(appts.data ?? []).filter((a) => ["confirmed", "requested"].includes(a.status) && new Date(a.starts_at).getTime() > Date.now()).length} hint="Upcoming appointments" />
        <Kpi icon={BellRing} label="Follow-ups" value={pendingFu.length} hint="Pending or scheduled" />
        <Kpi icon={CalendarClock} label="Today" value={(appts.data ?? []).filter((a) => dayKey(a.starts_at) === today && a.status !== "cancelled").length} hint="Appointments today" />
      </div>

      <Panel title="Lead pipeline" action={<Link to="/admin/pipeline" className="text-xs font-semibold text-primary">Open pipeline →</Link>}>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded border bg-border min-[480px]:grid-cols-4 sm:grid-cols-7 [&>*:last-child]:col-span-2 min-[480px]:[&>*:last-child]:col-span-1">
          {LEAD_STATUSES.map((s) => {
            const items = L.filter((l) => l.status === s);
            return (
              <Link key={s} to="/admin/leads" search={{ status: s }} className="bg-surface p-3 hover:bg-secondary">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate">{label(s)}</p>
                <p className="tabular mt-1 text-2xl font-extrabold text-navy">{items.length}</p>
                <p className="tabular text-[11px] text-slate">{money(items.reduce((a, l) => a + l.estimated_value, 0))}</p>
              </Link>
            );
          })}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Recent leads" className="lg:col-span-2" action={<Link to="/admin/leads" className="text-xs font-semibold text-primary">All leads →</Link>} bodyClass="p-0">
          {leads.isLoading ? <div className="p-4"><RowsSkeleton rows={5} /></div> : (
            <ul className="divide-y">
              {L.slice(0, 7).map((l) => (
                <li key={l.id}>
                  <Link to="/admin/leads/$id" params={{ id: l.id }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/60">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-navy">{fullName(l.customer)}</p>
                      <p className="truncate text-xs text-slate">{vehicleName(l.vehicle)} · {l.service?.name}</p>
                    </div>
                    <span className="tabular hidden text-sm font-semibold text-navy sm:block">{money(l.estimated_value)}</span>
                    <StatusBadge status={l.status} />
                    <span className="tabular w-14 text-right text-[11px] text-slate">{timeAgo(l.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Recent activity" bodyClass="p-0">
          <ul className="divide-y">
            {(activity.data ?? []).slice(0, 9).map((a) => (
              <li key={a.id} className="px-4 py-2.5">
                <p className="text-sm font-semibold text-navy">{a.title}</p>
                <p className="text-xs text-slate">{fullName(a.customer)} · {timeAgo(a.created_at)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Upcoming appointments" action={<Link to="/admin/calendar" className="text-xs font-semibold text-primary">Calendar →</Link>} bodyClass="p-0">
          {upcoming.length === 0 ? <EmptyState title="No upcoming appointments" /> : (
            <ul className="divide-y">
              {upcoming.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="w-16 shrink-0 text-center"><p className="text-[10px] font-bold uppercase text-slate">{fmtDate(a.starts_at, { weekday: "short" })}</p><p className="tabular text-sm font-bold text-navy">{fmtTime(a.starts_at)}</p></div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-navy">{fullName(a.customer)}</p><p className="truncate text-xs text-slate">{vehicleName(a.vehicle)} · {a.service?.name}</p></div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Pending follow-ups" action={<Link to="/admin/follow-ups" className="text-xs font-semibold text-primary">All →</Link>} bodyClass="p-0">
          {pendingFu.length === 0 ? <EmptyState title="All caught up" /> : (
            <ul className="divide-y">
              {pendingFu.slice(0, 6).map((f) => (
                <li key={f.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-navy">{fullName(f.customer)} <span className="font-medium text-slate">· {FU_TYPES[f.type]}</span></p><p className="truncate text-xs text-slate">{f.reason}</p></div>
                  <span className="tabular text-[11px] text-slate">{fmtDate(f.next_contact_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
