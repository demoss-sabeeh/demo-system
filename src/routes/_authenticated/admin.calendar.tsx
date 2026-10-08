import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTitle, RowsSkeleton } from "@/components/admin/ui";
import { AppointmentSheet } from "@/components/admin/AppointmentSheet";
import { useAppointments, type Appointment } from "@/lib/admin-data";
import { dayKey, fmtTime, statusTone } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_authenticated/admin/calendar")({ component: CalendarPage });

type View = "day" | "week" | "month";
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
const startOfWeek = (d: Date) => addDays(d, -((d.getDay() + 6) % 7));
const toneCls: Record<string, string> = { success: "border-l-success bg-success-soft", primary: "border-l-primary bg-accent", warning: "border-l-warning bg-warning-soft", danger: "border-l-destructive bg-danger-soft", neutral: "border-l-slate bg-muted", info: "border-l-sky bg-info-soft", navy: "border-l-navy bg-info-soft" };

function Chip({ a, onClick, compact }: { a: Appointment; onClick: () => void; compact?: boolean }) {
  return (
    <button onClick={onClick} className={cn("w-full rounded-sm border-l-2 px-1.5 py-1 text-left text-[11px] leading-tight hover:opacity-80", toneCls[statusTone[a.status] ?? "neutral"], a.status === "cancelled" && "line-through opacity-60")}>
      <span className="tabular font-bold text-navy">{fmtTime(a.starts_at)}</span> <span className="text-navy">{a.customer?.first_name} {compact ? "" : a.customer?.last_name}</span>
      {!compact && <span className="block truncate text-slate">{a.service?.name}</span>}
    </button>
  );
}

function CalendarPage() {
  const a = useAppointments();
  const isMobile = useIsMobile();
  const [selectedView, setView] = useState<View | null>(null);
  const view = selectedView ?? (isMobile ? "day" : "week");
  const [anchor, setAnchor] = useState(() => new Date());
  const [sel, setSel] = useState<string | null>(null);
  const byDay = useMemo(() => (a.data ?? []).reduce<Record<string, Appointment[]>>((acc, x) => ((acc[dayKey(x.starts_at)] ??= []).push(x), acc), {}), [a.data]);
  const today = dayKey(new Date());
  const step = view === "day" ? 1 : view === "week" ? 7 : 30;
  const days = view === "day" ? [anchor] : view === "week" ? Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(anchor), i)) : (() => {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const s = startOfWeek(first);
    return Array.from({ length: 42 }, (_, i) => addDays(s, i));
  })();
  const title = view === "month" ? anchor.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : view === "week" ? `Week of ${days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : anchor.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const current = sel ? a.data?.find((x) => x.id === sel) ?? null : null;

  return (
    <div className="space-y-5">
      <PageTitle title="Calendar" subtitle={title} actions={
        <>
          <div className="flex w-full rounded-md border bg-surface p-0.5 sm:w-auto">{(["day", "week", "month"] as View[]).map((v) => <Button variant={view === v ? "navy" : "ghost"} size="sm" aria-pressed={view === v} key={v} onClick={() => setView(v)} className="h-11 flex-1 capitalize sm:h-8 sm:flex-none">{v}</Button>)}</div>
          <Button variant="outline" size="icon" aria-label="Previous" onClick={() => setAnchor(addDays(anchor, -step))}><ChevronLeft /></Button>
          <Button variant="outline" size="sm" onClick={() => setAnchor(new Date())}>Today</Button>
          <Button variant="outline" size="icon" aria-label="Next" onClick={() => setAnchor(addDays(anchor, step))}><ChevronRight /></Button>
        </>
      } />
      {a.isLoading ? <RowsSkeleton /> : view === "day" ? (
        <div className="rounded-md border bg-surface">
          {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((h) => {
            const list = (byDay[dayKey(anchor)] ?? []).filter((x) => Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(new Date(x.starts_at))) === h);
            return (
              <div key={h} className="flex min-h-14 border-b last:border-0">
                <span className="tabular w-16 shrink-0 border-r px-2 py-2 text-[11px] text-slate">{h > 12 ? h - 12 : h}:00 {h >= 12 ? "PM" : "AM"}</span>
                <div className="flex flex-1 flex-wrap gap-2 p-1.5">{list.map((x) => <div key={x.id} className="w-full sm:w-64"><Chip a={x} onClick={() => setSel(x.id)} /></div>)}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className={cn("grid min-w-[700px] grid-cols-7 gap-px overflow-hidden rounded-md border bg-border")}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="bg-secondary/60 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate">{d}</div>)}
            {days.map((d) => {
              const k = dayKey(d);
              const list = byDay[k] ?? [];
              const out = view === "month" && d.getMonth() !== anchor.getMonth();
              return (
                <div key={k} className={cn("bg-surface p-1.5", view === "week" ? "min-h-[360px]" : "min-h-[104px]", out && "bg-muted/60")}>
                  <p className={cn("tabular mb-1 text-xs font-bold", k === today ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground" : out ? "text-mist" : "text-navy")}>{d.getDate()}</p>
                  <div className="space-y-1">
                    {list.slice(0, view === "month" ? 3 : 10).map((x) => <Chip key={x.id} a={x} compact={view === "month"} onClick={() => setSel(x.id)} />)}
                    {view === "month" && list.length > 3 && <button onClick={() => { setAnchor(d); setView("day"); }} className="text-[10px] font-semibold text-primary">+{list.length - 3} more</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <p className="text-xs text-slate">Times shown in Central Time (Dallas).</p>
      <AppointmentSheet appt={current} onClose={() => setSel(null)} />
    </div>
  );
}
