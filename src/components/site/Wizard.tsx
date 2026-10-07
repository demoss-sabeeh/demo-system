import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex gap-1" aria-label="Progress">
      {steps.map((s, i) => (
        <li key={s} className="flex-1" aria-current={i === current ? "step" : undefined}>
          <div className={cn("h-0.5 w-full transition-colors", i <= current ? "bg-primary" : "bg-border")} />
          <p className={cn("mt-2 hidden items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] sm:flex", i === current ? "text-navy" : i < current ? "text-primary" : "text-muted-foreground")}>
            {i < current && <Check className="h-3 w-3" />} {s}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function StepPanel({ k, title, children }: { k: string | number; title: string; children: ReactNode }) {
  return (
    <motion.div key={k} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
      <h2 className="font-display text-4xl text-navy">{title}</h2>
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}

export function Field({ label, htmlFor, error, children, className }: { label: string; htmlFor: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-slate">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-destructive" role="alert">{error}</p>}
    </div>
  );
}

export const inputCls = "h-11 w-full rounded-md border border-input bg-surface px-3 text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";

export function OptionCard({ selected, onClick, title, meta, disabled }: { selected: boolean; onClick: () => void; title: string; meta?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-md border bg-surface px-4 py-3.5 text-left transition-colors",
        selected ? "border-primary ring-2 ring-primary/15" : "hover:border-navy/30",
        disabled && "cursor-not-allowed opacity-40 line-through",
      )}
    >
      <span className="font-semibold text-navy">{title}</span>
      {meta && <span className="text-sm text-slate">{meta}</span>}
    </button>
  );
}

export function Summary({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y rounded-md border bg-surface">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
          <dt className="text-slate">{k}</dt>
          <dd className="text-right font-semibold text-navy">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
