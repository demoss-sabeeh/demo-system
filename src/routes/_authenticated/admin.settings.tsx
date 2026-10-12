import { createFileRoute, Link } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle, Panel, inputSm } from "@/components/admin/ui";
import { useAutomations, useServices } from "@/lib/admin-data";
import { BUSINESS, TIME_SLOTS } from "@/lib/knowledge";

export const Route = createFileRoute("/_authenticated/admin/settings")({ component: Settings });

const INTEGRATIONS = [
  { name: "Supabase", desc: "Database and authentication", status: "Setup must be verified" },
  { name: "AI assistant", desc: "Optional website assistant", status: "Demo fallback available" },
  { name: "SMS provider", desc: "Customer text delivery", status: "Not configured" },
  { name: "Email provider", desc: "Quotes and confirmations", status: "Not configured" },
  { name: "Google Calendar", desc: "Sync appointments to staff calendars", status: "Not configured" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1 border-b py-3 last:border-0 sm:grid-cols-3 sm:items-center"><p className="text-sm font-semibold text-navy">{label}</p><div className="sm:col-span-2">{children}</div></div>;
}

function Toggle({ label }: { label: string }) {
  return <div className="flex items-center justify-between border-b py-3 last:border-0"><span className="text-sm text-navy">{label}</span><Switch checked={false} disabled aria-label={`${label} (not configurable yet)`} /></div>;
}

function Settings() {
  const services = useServices();
  const autos = useAutomations();
  return (
    <div className="space-y-5">
      <PageTitle title="Settings" subtitle="These settings are display-only and are not saved by the application." />
      <p className="rounded-md border border-warning/30 bg-warning-soft p-3 text-sm text-warning">Replace the fictional Apex profile before launch. Configure integrations and business options outside this screen until persistent settings are implemented.</p>
      <Tabs defaultValue="profile">
        <TabsList className="h-auto flex-wrap justify-start bg-secondary">
          {["profile", "hours", "services", "booking", "notifications", "ai", "automations", "integrations", "users"].map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t === "ai" ? "AI Assistant" : t === "profile" ? "Business profile" : t === "hours" ? "Business hours" : t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="profile"><Panel title="Business profile">
          <Row label="Business name"><input className={inputSm} value={BUSINESS.name} readOnly /></Row>
          <Row label="Address"><input className={inputSm} value={BUSINESS.address} readOnly /></Row>
          <Row label="Phone"><input className={inputSm} value={BUSINESS.phone} readOnly /></Row>
          <Row label="Service area"><input className={inputSm} value={BUSINESS.serviceArea} readOnly /></Row>
          <p className="pt-3 text-xs text-slate">These sample values are fictional and cannot be saved here.</p>
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
          <Toggle label="Require confirmation for PPF and correction" />
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
              <span className="rounded border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate">{i.status}</span>
            </li>
          ))}</ul>
          <p className="border-t px-4 py-3 text-xs text-slate">Status is not automatically verified. Never enter secrets in this screen. SMS, email, and calendar delivery are unavailable until separately integrated and tested.</p>
        </Panel></TabsContent>
        <TabsContent value="users"><Panel title="Users">
          <p className="text-sm text-slate">User provisioning is not available in this screen. A trusted database operator must verify and provision the pilot owner and membership.</p>
        </Panel></TabsContent>
      </Tabs>
    </div>
  );
}
