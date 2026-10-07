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

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

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
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Apex assistant"
            className="fixed inset-x-3 bottom-20 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-lg border bg-surface shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--navy)_40%,transparent)] sm:inset-x-auto sm:right-6 sm:w-[380px]"
          >
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-navy-foreground">
              <div>
                <p className="text-sm font-bold">Apex Assistant</p>
                <p className="text-[11px] text-navy-muted">Answers from Apex's service guide{mode === "demo" ? " · demo mode" : ""}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded p-1 hover:bg-sidebar-accent"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
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
                    <button key={s} onClick={() => send(s)} className="rounded-full border px-3 py-1.5 text-left text-xs text-slate hover:border-primary hover:text-primary">{s}</button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 border-t p-3">
              <label htmlFor="assistant-input" className="sr-only">Message</label>
              <textarea
                id="assistant-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Ask about a service…"
                className="max-h-28 min-h-9 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || busy} aria-label="Send"><ArrowUp /></Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Chat with Apex"}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-navy-foreground shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        {open ? <X className="h-4 w-4" /> : <MessageSquareText className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Apex"}</span>
      </button>
    </>
  );
}
