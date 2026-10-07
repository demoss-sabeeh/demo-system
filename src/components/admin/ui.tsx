import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { label, statusTone, type Tone } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const TONES: Record<Tone, string> = {
  neutral: "bg-muted text-slate border-border",
  info: "bg-info-soft text-navy border-mist",
  primary: "bg-accent text-accent-foreground border-sky/40",
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/25",
  danger: "bg-danger-soft text-destructive border-destructive/20",
  navy: "bg-navy text-navy-foreground border-navy",
};
const DOT: Record<Tone, string> = { neutral: "bg-slate", info: "bg-sky", primary: "bg-primary", success: "bg-success", warning: "bg-warning", danger: "bg-destructive", navy: "bg-sky" };

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = statusTone[status] ?? "neutral";
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]", TONES[tone], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} aria-hidden />
      {label(status)}
    </span>
  );
}

export function PageTitle({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight text-navy md:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className, bodyClass }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; bodyClass?: string }) {
  return (
    <section className={cn("rounded-md border bg-surface", className)}>
      {title && (
        <header className="flex items-center justify-between gap-2 border-b px-4 py-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate">{title}</h2>
          {action}
        </header>
      )}
      <div className={cn("p-4", bodyClass)}>{children}</div>
    </section>
  );
}

export function Kpi({ label, value, hint, icon: Icon }: { label: string; value: ReactNode; hint?: string; icon: LucideIcon }) {
  return (
    <div className="rounded-md border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate">{label}</p>
        <Icon className="h-4 w-4 text-primary" aria-hidden />
      </div>
      <p className="tabular mt-3 text-3xl font-extrabold text-navy">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate">{hint}</p>}
    </div>
  );
}

export function EmptyState({ title, body, action, icon: Icon = Inbox }: { title: string; body?: string; action?: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <Icon className="h-6 w-6 text-mist" aria-hidden />
      <p className="mt-3 font-semibold text-navy">{title}</p>
      {body && <p className="mt-1 max-w-xs text-sm text-slate">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ error, retry }: { error: unknown; retry?: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center" role="alert">
      <AlertTriangle className="h-6 w-6 text-destructive" />
      <p className="mt-3 font-semibold text-navy">Couldn't load this data</p>
      <p className="mt-1 text-sm text-slate">{error instanceof Error ? error.message : "Please try again."}</p>
      {retry && <Button variant="outline" size="sm" className="mt-4" onClick={retry}>Retry</Button>}
    </div>
  );
}

export function RowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-11 w-full" />)}
    </div>
  );
}

export type TimelineItem = { id: string; title: string; detail?: string; at: string; type?: string };
export function Timeline({ items, fmt }: { items: TimelineItem[]; fmt: (d: string) => string }) {
  if (!items.length) return <EmptyState title="No activity yet" />;
  return (
    <ol className="relative space-y-4 pl-5 before:absolute before:left-[5px] before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-border">
      {items.map((i) => (
        <li key={i.id} className="relative">
          <span className={cn("absolute -left-5 top-1 h-[11px] w-[11px] rounded-full border-2 border-surface", i.type === "auto_response" || i.type === "reminder" ? "bg-sky" : i.type === "booked" || i.type === "completed" ? "bg-success" : i.type === "lost" ? "bg-destructive" : "bg-primary")} />
          <p className="tabular text-[11px] font-semibold text-slate">{fmt(i.at)}</p>
          <p className="text-sm font-semibold text-navy">{i.title}</p>
          {i.detail && <p className="text-xs text-slate">{i.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

export const selectCls = "h-9 rounded-md border border-input bg-surface px-2.5 text-sm text-navy outline-none focus:border-primary";
export const inputSm = "h-9 w-full rounded-md border border-input bg-surface px-3 text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-primary";
