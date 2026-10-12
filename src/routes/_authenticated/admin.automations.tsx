import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Filter, Play, Clock } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { PageTitle, Panel, RowsSkeleton, StatusBadge } from "@/components/admin/ui";
import { RunDemoButton } from "@/components/admin/RunDemo";
import { useAutomationRuns, useAutomations, useInvalidate, type Automation } from "@/lib/admin-data";
import { supabase } from "@/integrations/supabase/client";
import { fullName, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/automations")({ component: Automations });

function Node({ kind, text, i }: { kind: "trigger" | "condition" | "delay" | "action"; text: string; i: number }) {
  const meta = { trigger: [Zap, "Trigger", "border-primary bg-accent"], condition: [Filter, "Condition", "border-warning/40 bg-warning-soft"], delay: [Clock, "Wait", "border-mist bg-muted"], action: [Play, "Action", "border-border bg-surface"] }[kind] as [typeof Zap, string, string];
  const [I, l, c] = meta;
  return (
    <>
      {i > 0 && (
        <svg className="mx-auto h-7 w-4" viewBox="0 0 16 28" aria-hidden><line x1="8" y1="0" x2="8" y2="28" stroke="var(--color-mist)" strokeWidth="2" strokeDasharray="4 4" className="animate-flow" /></svg>
      )}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className={cn("mx-auto flex w-full max-w-sm items-center gap-3 rounded-md border px-3 py-2.5", c)}>
        <I className="h-4 w-4 shrink-0 text-navy" />
        <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate">{l}</p><p className="text-sm font-semibold text-navy">{text}</p></div>
      </motion.div>
    </>
  );
}

function Flow({ a }: { a: Automation }) {
  const nodes: { kind: "trigger" | "condition" | "delay" | "action"; text: string }[] = [
    { kind: "trigger", text: a.trigger },
    ...a.conditions.map((t) => ({ kind: "condition" as const, text: t })),
    ...(a.delay ? [{ kind: "delay" as const, text: a.delay }] : []),
    ...a.actions.map((t) => ({ kind: "action" as const, text: t })),
  ];
  return <div className="py-2">{nodes.map((n, i) => <Node key={a.key + i} i={i} {...n} />)}</div>;
}

function Automations() {
  const autos = useAutomations();
  const runs = useAutomationRuns();
  const invalidate = useInvalidate();
  const [sel, setSel] = useState<string | null>(null);
  const current = autos.data?.find((a) => a.id === sel) ?? autos.data?.[0];

  async function toggle(a: Automation) {
    const status = a.status === "active" ? "paused" : "active";
    const { error } = await supabase.from("automations").update({ status }).eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success(`${a.name} ${status}`);
    invalidate();
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Automation Center" subtitle="The workflows running your customer journey in the background." actions={<RunDemoButton />} />
      {autos.isLoading ? <RowsSkeleton /> : (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-2">
            {autos.data?.map((a) => (
              <li key={a.id}>
                <div className={cn("flex items-start gap-3 rounded-md border bg-surface p-4 transition-colors", current?.id === a.id && "border-primary")}>
                  <button onClick={() => setSel(a.id)} className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-2"><p className="font-bold text-navy">{a.name}</p><StatusBadge status={a.status} /></div>
                    <p className="mt-1 text-sm text-slate">{a.description}</p>
                    <p className="mt-2 text-xs text-slate"><span className="font-semibold text-navy">When</span> {a.trigger}{a.delay ? ` · after ${a.delay}` : ""} → {a.actions.join(", ")}</p>
                  </button>
                  <Switch checked={a.status === "active"} onCheckedChange={() => toggle(a)} aria-label={`Toggle ${a.name}`} />
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            {current && <Panel title={`Workflow · ${current.name}`}><Flow a={current} /></Panel>}
            <Panel title="Recent runs" bodyClass="p-0">
              <ul className="max-h-72 divide-y overflow-y-auto">
                {(runs.data ?? []).slice(0, 20).map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
                    <div className="min-w-0"><p className="truncate font-semibold text-navy">{r.automation?.name}</p><p className="truncate text-xs text-slate">{r.summary || fullName(r.customer)}</p></div>
                    <div className="flex shrink-0 items-center gap-2"><StatusBadge status={r.status} /><span className="tabular text-[11px] text-slate">{timeAgo(r.created_at)}</span></div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      )}
    </div>
  );
}
