import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageTitle, Panel, RowsSkeleton } from "@/components/admin/ui";
import { useAppointments, useFollowUps, useLeads, useQuotes } from "@/lib/admin-data";
import { dayKey, fmtDate, label, LEAD_SOURCES, LEAD_STATUSES, QUOTE_STATUSES } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/analytics")({ component: Analytics });

const C = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Bars({ data, color = C[0], height = 200 }: { data: { name: string; value: number }[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-slate)" }} tickLine={false} axisLine={false} interval={0} />
        <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "var(--color-slate)" }} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: "var(--color-secondary)" }} contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }} />
        <Bar dataKey="value" radius={[3, 3, 0, 0]} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function HBar({ rows }: { rows: { name: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={r.name}>
          <div className="flex justify-between text-xs"><span className="font-semibold text-navy">{r.name}</span><span className="tabular text-slate">{r.value}</span></div>
          <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: C[i % 3] }} /></div>
        </li>
      ))}
    </ul>
  );
}

function Analytics() {
  const leads = useLeads();
  const quotes = useQuotes();
  const appts = useAppointments();
  const fus = useFollowUps();
  if (leads.isLoading || appts.isLoading) return <RowsSkeleton rows={8} />;
  const L = leads.data ?? [];
  const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() - (13 - i) * 86400000));
  const volume = days.map((d) => ({ name: fmtDate(d, { month: "numeric", day: "numeric" }), value: L.filter((l) => dayKey(l.created_at) === dayKey(d)).length }));
  const pipeline = LEAD_STATUSES.map((s) => ({ name: label(s), value: L.filter((l) => l.status === s).length }));
  const quoteStatus = QUOTE_STATUSES.map((s) => ({ name: label(s), value: (quotes.data ?? []).filter((q) => q.status === s).length }));
  const sources = LEAD_SOURCES.map((s) => ({ name: label(s), value: L.filter((l) => l.source === s).length })).sort((a, b) => b.value - a.value);
  const demand = Object.entries(L.reduce<Record<string, number>>((a, l) => ((a[l.service?.name ?? "Other"] = (a[l.service?.name ?? "Other"] ?? 0) + 1), a), {})).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  const apptDays = Array.from({ length: 21 }, (_, i) => new Date(Date.now() + (i - 10) * 86400000));
  const apptTrend = apptDays.map((d) => ({ name: fmtDate(d, { month: "numeric", day: "numeric" }), value: (appts.data ?? []).filter((a) => dayKey(a.starts_at) === dayKey(d) && a.status !== "cancelled").length }));
  const fuStatus = ["pending", "scheduled", "completed", "cancelled"].map((s) => ({ name: label(s), value: (fus.data ?? []).filter((f) => f.status === s).length }));

  return (
    <div className="space-y-5">
      <PageTitle title="Analytics" subtitle="Calculated live from the records in this workspace. No projected revenue or ROI is shown." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Lead volume · last 14 days"><Bars data={volume} /></Panel>
        <Panel title="Pipeline distribution"><Bars data={pipeline} color={C[2]} /></Panel>
        <Panel title="Booking volume · ±10 days"><Bars data={apptTrend} color={C[1]} /></Panel>
        <Panel title="Quote status">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quoteStatus} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 11, fill: "var(--color-slate)" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              <Bar dataKey="value" radius={[0, 3, 3, 0]}>{quoteStatus.map((_, i) => <Cell key={i} fill={C[i % 5]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Lead sources"><HBar rows={sources} /></Panel>
        <Panel title="Service demand"><HBar rows={demand} /></Panel>
        <Panel title="Follow-up activity"><HBar rows={fuStatus} /></Panel>
      </div>
    </div>
  );
}
