import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Play, RotateCcw, SkipForward, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEMO_STEPS, runDemoStep } from "@/lib/demo";
import { useInvalidate } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

const STEP_MS = 4200;

export function RunDemoButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)} className={className}><Play className="fill-current" /> Run demo</Button>
      <AnimatePresence>{open && <RunDemoOverlay onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function RunDemoOverlay({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(-1);
  const [running, setRunning] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const skip = useRef(false);
  const invalidate = useInvalidate();

  async function start() {
    setRunning(true);
    skip.current = false;
    let ctx: Awaited<ReturnType<typeof runDemoStep>> = {};
    try {
      for (let i = 0; i < DEMO_STEPS.length; i++) {
        setCurrent(i);
        const t0 = Date.now();
        ctx = await runDemoStep(DEMO_STEPS[i].key, ctx);
        if (ctx.leadId) setLeadId(ctx.leadId);
        invalidate();
        while (!skip.current && Date.now() - t0 < STEP_MS) await new Promise((r) => setTimeout(r, 100));
      }
      setCurrent(DEMO_STEPS.length);
      toast.success("Demo complete — John Smith is booked for Friday.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Demo failed");
    } finally {
      setRunning(false);
    }
  }

  const done = current >= DEMO_STEPS.length;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 p-4" role="dialog" aria-modal aria-label="Demo simulation">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-xl overflow-hidden rounded-lg bg-surface shadow-2xl">
        <div className="flex items-start justify-between bg-navy px-6 py-5 text-navy-foreground">
          <div>
            <p className="eyebrow text-sky">Live simulation</p>
            <p className="mt-1 text-lg font-bold">Watch what happens when a new customer wants ceramic coating.</p>
          </div>
          <button onClick={onClose} disabled={running} aria-label="Close" className="rounded p-1 hover:bg-sidebar-accent disabled:opacity-30"><X className="h-4 w-4" /></button>
        </div>
        <ol className="space-y-1 p-6">
          {DEMO_STEPS.map((s, i) => {
            const state = i < current || done ? "done" : i === current ? "active" : "todo";
            return (
              <li key={s.key} className={cn("flex gap-3 rounded-md p-2.5 transition-colors", state === "active" && "bg-accent")}>
                <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors", state === "done" ? "border-success bg-success text-primary-foreground" : state === "active" ? "border-primary text-primary" : "text-slate")}>
                  {state === "done" ? <Check className="h-3.5 w-3.5" /> : state === "active" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : i + 1}
                </span>
                <div>
                  <p className={cn("text-sm font-bold", state === "todo" ? "text-slate" : "text-navy")}>{s.label}</p>
                  <AnimatePresence>{state !== "todo" && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-slate">{s.detail}</motion.p>}</AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t px-6 py-4">
          <p className="text-xs text-slate">Writes real records to the demo workspace.</p>
          <div className="flex gap-2">
            {!running && !done && <Button onClick={start}><Play className="fill-current" /> Start</Button>}
            {running && <Button variant="outline" onClick={() => (skip.current = true)}><SkipForward /> Skip</Button>}
            {done && (
              <>
                <Button variant="outline" onClick={() => { setCurrent(-1); setLeadId(null); }}><RotateCcw /> Run again</Button>
                {leadId && <Button asChild onClick={onClose}><Link to="/admin/leads/$id" params={{ id: leadId }}>Open John's lead</Link></Button>}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
