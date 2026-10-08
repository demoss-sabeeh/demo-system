import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, MessageSquareText, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askAssistant } from "@/lib/public.functions";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string; action?: "quote" | "book" | null };

const SUGGESTIONS = ["I have a 2024 BMW M4. How much is ceramic coating?", "Can I come Friday?", "What are your hours?"];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I'm the Apex assistant. Ask me about services, pricing, timing or availability." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"ai" | "demo" | null>(null);
  const ask = useServerFn(askAssistant);
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const resize = () => {
      if (!viewport || !dialogRef.current) return;
      const covered = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      dialogRef.current.style.setProperty("--assistant-bottom", `${covered > 100 ? covered + 8 : 80}px`);
      dialogRef.current.style.setProperty("--assistant-height", `${Math.max(120, viewport.height - (covered > 100 ? 16 : 96))}px`);
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user" as const, content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const r = await ask({ data: { messages: next.slice(1).map(({ role, content }) => ({ role, content })) } });
      setMode(r.mode);
      setMsgs((m) => [...m, { role: "assistant", content: r.reply, action: r.action }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Sorry — I couldn't reach the assistant. Please call (214) 555-0199 or request a quote." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Apex assistant"
            className="fixed inset-x-3 bottom-[var(--assistant-bottom,80px)] z-50 flex max-h-[min(70dvh,var(--assistant-height,70dvh))] flex-col overflow-hidden rounded-lg border bg-surface shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--navy)_40%,transparent)] sm:inset-x-auto sm:right-6 sm:w-[380px]"
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-navy-foreground">
              <div className="min-w-0">
                <p className="text-sm font-bold">Apex Assistant</p>
                <p className="text-[11px] text-navy-muted">Answers from Apex's service guide{mode === "demo" ? " · demo mode" : ""}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close assistant" className="h-11 w-11 shrink-0 hover:bg-sidebar-accent hover:text-navy-foreground"><X className="h-4 w-4" /></Button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm [overflow-wrap:anywhere]">
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "user" ? (
                    <p className="max-w-[85%] rounded-lg rounded-br-sm bg-navy px-3 py-2 text-navy-foreground">{m.content}</p>
                  ) : (
                    <div className="max-w-[92%] text-foreground [&_p]:leading-relaxed">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                      {m.action && (
                        <Button asChild size="sm" variant={m.action === "book" ? "navy" : "default"} className="mt-2">
                          {m.action === "book" ? <Link to="/book">Book appointment</Link> : <Link to="/quote">Request a quote</Link>}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {busy && (
                <div className="flex gap-1 py-2" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate" style={{ animationDelay: `${d * 150}ms` }} />)}
                </div>
              )}
              {msgs.length === 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <Button variant="outline" key={s} onClick={() => send(s)} className="h-auto min-h-11 whitespace-normal rounded-md px-3 py-2 text-left text-xs text-slate hover:border-primary hover:text-primary">{s}</Button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex shrink-0 items-end gap-2 border-t p-3">
              <label htmlFor="assistant-input" className="sr-only">Message</label>
              <textarea
                id="assistant-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask about a service…"
                className="max-h-28 min-h-11 min-w-0 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-base outline-none focus:border-primary sm:text-sm"
              />
              <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={!input.trim() || busy} aria-label="Send"><ArrowUp /></Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="navy"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Chat with Apex"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-navy-foreground shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        {open ? <X className="h-4 w-4" /> : <MessageSquareText className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Apex"}</span>
      </Button>
    </>
  );
}
