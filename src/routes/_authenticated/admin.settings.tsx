import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageTitle, Panel, inputSm } from "@/components/admin/ui";
import { useAutomations, useServices } from "@/lib/admin-data";
import { BUSINESS, TIME_SLOTS } from "@/lib/knowledge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/settings")({ component: Settings });

const INTEGRATIONS = [
  { name: "Lovable Cloud database", desc: "Customers, leads, quotes and appointments", connected: true },
  { name: "AI assistant", desc: "Website assistant grounded in your service guide", connected: true },
  { name: "Twilio", desc: "Two-way SMS and missed-call recovery", connected: false },
  { name: "Resend", desc: "Transactional email for quotes and confirmations", connected: false },
  { name: "Google Calendar", desc: "Sync appointments to staff calendars", connected: false },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1 border-b py-3 last:border-0 sm:grid-cols-3 sm:items-center"><p className="text-sm font-semibold text-navy">{label}</p><div className="sm:col-span-2">{children}</div></div>;
}

function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return <div className="flex items-center justify-between border-b py-3 last:border-0"><span className="text-sm text-navy">{label}</span><Switch checked={on} onCheckedChange={setOn} aria-label={label} /></div>;
}

function Settings() {
  const services = useServices();
  const autos = useAutomations();
  return (
    <div className="space-y-5">
      <PageTitle title="Settings" subtitle="Workspace configuration for Apex Auto Detailing." />
      <Tabs defaultValue="profile">
        <TabsList className="h-auto flex-wrap justify-start bg-secondary">
          {["profile", "hours", "services", "booking", "notifications", "ai", "automations", "integrations", "users"].map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t === "ai" ? "AI Assistant" : t === "profile" ? "Business profile" : t === "hours" ? "Business hours" : t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="profile"><Panel title="Business profile">
          <Row label="Business name"><input className={inputSm} defaultValue={BUSINESS.name} /></Row>
          <Row label="Address"><input className={inputSm} defaultValue={BUSINESS.address} /></Row>
          <Row label="Phone"><input className={inputSm} defaultValue={BUSINESS.phone} /></Row>
          <Row label="Service area"><input className={inputSm} defaultValue={BUSINESS.serviceArea} /></Row>
          <div className="pt-3"><Button size="sm" onClick={() => toast.success("Profile saved (demo)")}>Save</Button></div>
        </Panel></TabsContent>
        <TabsContent value="hours"><Panel title="Business hours">{BUSINESS.hours.map((h) => <Row key={h.day} label={h.day}><p className="text-sm text-slate">{h.time}</p></Row>)}</Panel></TabsContent>
        <TabsContent value="services"><Panel title="Services">
          <ul className="divide-y">{services.data?.map((s) => <li key={s.id} className="flex justify-between py-2 text-sm"><span className="text-navy">{s.name}</span><span className={s.active ? "text-success" : "text-slate"}>{s.active ? "Active" : "Inactive"}</span></li>)}</ul>
          <Link to="/admin/services" className="mt-3 inline-block text-sm font-semibold text-primary">Manage services →</Link>
        </Panel></TabsContent>
        <TabsContent value="booking"><Panel title="Booking settings">
          <Row label="Start times"><p className="text-sm text-slate">{TIME_SLOTS.join(" · ")}</p></Row>
          <Row label="Booking window"><p className="text-sm text-slate">14 days ahead · closed Sundays</p></Row>
          <Toggle label="Allow online booking from the website" />
          <Toggle label="Require confirmation for PPF and correction" defaultOn={false} />
        </Panel></TabsContent>
        <TabsContent value="notifications"><Panel title="Notifications">
          <Toggle label="Notify team of new website inquiries" /><Toggle label="Notify when a quote is viewed" /><Toggle label="Daily appointment summary" />
        </Panel></TabsContent>
        <TabsContent value="ai"><Panel title="AI assistant">
          <Toggle label="Show assistant on the website" />
          <Row label="Knowledge source"><p className="text-sm text-slate">Business info, services, pricing ranges, hours, FAQ, policies and booking rules.</p></Row>
          <Row label="Guardrails"><p className="text-sm text-slate">Answers only from the knowledge source; never invents availability or pricing. Falls back to a deterministic demo mode if AI is unavailable.</p></Row>
        </Panel></TabsContent>
        <TabsContent value="automations"><Panel title="Automations">
          <ul className="divide-y">{autos.data?.map((a) => <li key={a.id} className="flex justify-between py-2 text-sm"><span className="text-navy">{a.name}</span><span className="capitalize text-slate">{a.status}</span></li>)}</ul>
          <Link to="/admin/automations" className="mt-3 inline-block text-sm font-semibold text-primary">Open Automation Center →</Link>
        </Panel></TabsContent>
        <TabsContent value="integrations"><Panel title="Integrations" bodyClass="p-0">
          <ul className="divide-y">{INTEGRATIONS.map((i) => (
            <li key={i.name} className="flex items-center justify-between gap-3 px-4 py-3">
              <div><p className="text-sm font-bold text-navy">{i.name}</p><p className="text-xs text-slate">{i.desc}</p></div>
              <span className={cn("rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", i.connected ? "border-success/30 bg-success-soft text-success" : "bg-muted text-slate")}>{i.connected ? "Connected" : "Not connected"}</span>
            </li>
          ))}</ul>
          <p className="border-t px-4 py-3 text-xs text-slate">Credentials are stored server-side and never displayed. SMS and email delivery are simulated until connected.</p>
        </Panel></TabsContent>
        <TabsContent value="users"><Panel title="Users">
          <Row label="Mike Torres"><p className="text-sm text-slate">Owner · full access</p></Row>
          <Row label="Front desk"><p className="text-sm text-slate">Staff · leads, messages, appointments</p></Row>
        </Panel></TabsContent>
      </Tabs>
    </div>
  );
}
