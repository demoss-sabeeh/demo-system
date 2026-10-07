import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Field, inputCls } from "@/components/site/Wizard";
import { OperantMark } from "@/components/admin/OperantMark";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — OperantScale Business OS" },
      { name: "description", content: "Sign in to the OperantScale detailing business dashboard." },
      { property: "og:title", content: "Sign in — OperantScale" },
      { property: "og:description", content: "Business dashboard sign-in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        if (data.session) nav({ to: "/admin" });
        else toast.success("Check your email to confirm your account, then sign in.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
    if (r.error) return toast.error("Google sign-in failed");
    if (r.redirected) return;
    nav({ to: "/admin" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-navy p-12 text-navy-foreground lg:flex">
        <OperantMark />
        <div>
          <p className="eyebrow text-sky">Detailing Business Operating System</p>
          <p className="mt-4 max-w-md font-display text-5xl leading-tight">One connected system for capturing, managing, converting, and retaining detailing customers.</p>
          <p className="mt-6 text-sm tracking-[0.2em] text-navy-muted">CAPTURE → MANAGE → CONVERT → RETAIN</p>
        </div>
        <p className="text-xs text-navy-muted">Demo workspace · Apex Auto Detailing (fictional)</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-navy lg:hidden"><OperantMark dark /></div>
          <h1 className="mt-8 font-display text-4xl text-navy">{mode === "in" ? "Sign in" : "Create account"}</h1>
          <p className="mt-2 text-sm text-slate">Access the Apex Auto Detailing demo workspace.</p>
          <Button variant="outline" className="mt-8 h-11 w-full" onClick={google}>Continue with Google</Button>
          <div className="my-6 flex items-center gap-3 text-xs text-slate"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email" htmlFor="email"><input id="email" type="email" required autoComplete="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label="Password" htmlFor="pw"><input id="pw" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
            <Button type="submit" className="h-11 w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}{mode === "in" ? "Sign in" : "Create account"}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate">
            {mode === "in" ? "New here? " : "Have an account? "}
            <button className="font-semibold text-primary" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "Create an account" : "Sign in"}</button>
          </p>
          <p className="mt-10 text-center text-xs"><Link to="/" className="text-slate hover:text-navy">← Back to Apex website</Link></p>
        </div>
      </div>
    </div>
  );
}
