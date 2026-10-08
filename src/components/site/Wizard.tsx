import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex scroll-mt-28 gap-1" aria-label="Progress">
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
  const panel = useRef<HTMLDivElement>(null);
  const previous = useRef(k);
  useEffect(() => {
    if (previous.current === k) return;
    previous.current = k;
    panel.current?.scrollIntoView({ block: "start", behavior: "instant" });
    panel.current?.focus({ preventScroll: true });
  }, [k]);
  return (
    <motion.div ref={panel} tabIndex={-1} key={k} className="scroll-mt-28 outline-none" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
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

export const inputCls = "h-11 min-w-0 w-full rounded-md border border-input bg-surface px-3 text-base sm:text-[15px] text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";

export function OptionCard({ selected, onClick, title, meta, disabled }: { selected: boolean; onClick: () => void; title: string; meta?: string; disabled?: boolean }) {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "grid h-auto min-h-12 w-full grid-cols-1 items-center justify-start gap-1 whitespace-normal rounded-md border bg-surface px-4 py-3.5 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3",
        selected ? "border-primary ring-2 ring-primary/15" : "hover:border-navy/30",
        disabled && "cursor-not-allowed opacity-40 line-through",
      )}
    >
      <span className="min-w-0 font-semibold text-navy">{title}</span>
      {meta && <span className="text-sm text-slate sm:text-right">{meta}</span>}
    </Button>
  );
}

export function Summary({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y rounded-md border bg-surface">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-4">
          <dt className="min-w-0 text-slate">{k}</dt>
          <dd className="min-w-0 break-words font-semibold text-navy [overflow-wrap:anywhere] sm:text-right">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
