import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarCheck2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Field, OptionCard, StepPanel, Stepper, Summary, inputCls } from "@/components/site/Wizard";
import { SERVICES, serviceBySlug, BUSINESS } from "@/lib/knowledge";
import { localToIso, money, TZ } from "@/lib/format";
import { createBooking, getAvailability } from "@/lib/public.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s.service === "string" ? { service: s.service } : {}),
  head: () => ({
    meta: [
      { title: "Book a Detailing Appointment Online — Apex Auto Detailing" },
      { name: "description", content: "Choose a service and an available time at the Apex detailing studio in Dallas. Instant confirmation." },
      { property: "og:title", content: "Book an Appointment — Apex Auto Detailing" },
      { property: "og:description", content: "Pick an available time online." },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Service", "Vehicle", "Date", "Time", "Contact", "Confirm"];

function nextDays(n: number) {
  const out: { key: string; dow: string; day: string; mon: string; sunday: boolean }[] = [];
  const base = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(base.getTime() + i * 86400000);
    const key = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
    const dow = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(d);
    out.push({ key, dow, day: new Intl.DateTimeFormat("en-US", { timeZone: TZ, day: "numeric" }).format(d), mon: new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short" }).format(d), sunday: dow === "Sun" });
  }
  return out;
}

function BookPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ location: string } | null>(null);
  const [f, setF] = useState({ service: search.service && serviceBySlug(search.service) ? search.service : "", year: "", make: "", model: "", color: "", date: "", time: "", firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));
  const days = useMemo(() => nextDays(14), []);
  const avail = useServerFn(getAvailability);
  const book = useServerFn(createBooking);
  const slots = useQuery({ queryKey: ["availability", f.date], queryFn: () => avail({ data: { date: f.date } }), enabled: !!f.date && step === 3 });
  const svc = serviceBySlug(f.service);

  const checks: Record<number, () => Record<string, string>> = {
    0: () => (f.service ? {} : { service: "Choose a service" }),
    1: () => {
      const r = z.object({ year: z.coerce.number().int().min(1950).max(2030), make: z.string().trim().min(1), model: z.string().trim().min(1) }).safeParse(f);
      return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), "Required"]));
    },
    2: () => (f.date ? {} : { date: "Choose a date" }),
    3: () => (f.time ? {} : { time: "Choose a time" }),
    4: () => {
      const r = z.object({ firstName: z.string().trim().min(1, "Required"), lastName: z.string().trim().min(1, "Required"), email: z.string().email("Enter a valid email"), phone: z.string().trim().min(7, "Enter a valid phone") }).safeParse(f);
      return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]));
    },
  };

  function next() {
    const e = checks[step]?.() ?? {};
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  }

  async function confirm() {
    setBusy(true);
    try {
      const r = await book({
        data: {
          contact: { firstName: f.firstName, lastName: f.lastName, email: f.email, phone: f.phone },
          vehicle: { year: Number(f.year), make: f.make, model: f.model, color: f.color },
          serviceSlug: f.service,
          date: f.date,
          time: f.time,
          startsAt: localToIso(f.date, f.time),
          notes: f.notes,
        },
      });
      setDone({ location: r.location });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not book. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const dateLabel = f.date ? new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${f.date}T12:00:00Z`)) : "";
  const rows: [string, string][] = [
    ["Customer", `${f.firstName} ${f.lastName}`],
    ["Vehicle", `${f.year} ${f.make} ${f.model}`],
    ["Service", svc ? `${svc.name} · ~${svc.durationHours} hrs` : ""],
    ["Date", dateLabel],
    ["Time", f.time],
    ["Location", done?.location ?? `Apex Studio — ${BUSINESS.address}`],
  ];

  return (
    <SiteLayout>
      <section className="container-site grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <aside className="lg:col-span-4">
          <p className="eyebrow text-primary">Book online</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-navy">Choose your time.</h1>
          <p className="mt-4 text-slate">Real-time availability. You'll receive a confirmation and a reminder before your visit.</p>
        </aside>
        <div className="lg:col-span-8">
          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-md border bg-surface p-8 md:p-12">
              <CalendarCheck2 className="h-10 w-10 text-success" />
              <h2 className="mt-5 font-display text-5xl text-navy">Appointment confirmed.</h2>
              <p className="mt-3 text-slate">A confirmation was sent to {f.phone}. We'll send a reminder 24 hours before.</p>
              <div className="mt-8 max-w-lg"><Summary rows={rows} /></div>
              <Button asChild variant="cta-outline" size="lg" className="mt-8"><Link to="/">Back to home</Link></Button>
            </motion.div>
          ) : (
            <>
              <Stepper steps={STEPS} current={step} />
              <div className="mt-10 min-h-[380px]">
                {step === 0 && (
                  <StepPanel k={0} title="Select a service">
                    <div className="grid gap-2">
                      {SERVICES.map((s) => <OptionCard key={s.slug} selected={f.service === s.slug} onClick={() => setF((p) => ({ ...p, service: s.slug }))} title={s.name} meta={`From ${money(s.priceFrom)} · ~${s.durationHours} hrs`} />)}
                    </div>
                    {errors.service && <p className="mt-2 text-xs text-destructive" role="alert">{errors.service}</p>}
                  </StepPanel>
                )}
                {step === 1 && (
                  <StepPanel k={1} title="Your vehicle">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Year" htmlFor="yr" error={errors.year}><input id="yr" inputMode="numeric" className={inputCls} value={f.year} onChange={set("year")} placeholder="2024" /></Field>
                      <Field label="Make" htmlFor="mk" error={errors.make}><input id="mk" className={inputCls} value={f.make} onChange={set("make")} placeholder="BMW" /></Field>
                      <Field label="Model" htmlFor="md" error={errors.model}><input id="md" className={inputCls} value={f.model} onChange={set("model")} placeholder="M4" /></Field>
                      <Field label="Color" htmlFor="cl"><input id="cl" className={inputCls} value={f.color} onChange={set("color")} placeholder="Black" /></Field>
                    </div>
                  </StepPanel>
                )}
                {step === 2 && (
                  <StepPanel k={2} title="Pick a date">
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {days.map((d) => (
                        <button key={d.key} type="button" disabled={d.sunday} onClick={() => setF((p) => ({ ...p, date: d.key, time: "" }))} aria-pressed={f.date === d.key}
                          className={cn("rounded-md border bg-surface py-3 text-center transition-colors", f.date === d.key ? "border-primary bg-accent ring-2 ring-primary/15" : "hover:border-navy/30", d.sunday && "cursor-not-allowed opacity-35")}>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate">{d.dow}</span>
                          <span className="block text-xl font-bold text-navy">{d.day}</span>
                          <span className="block text-[10px] text-slate">{d.mon}</span>
                        </button>
                      ))}
                    </div>
                    {errors.date && <p className="mt-2 text-xs text-destructive" role="alert">{errors.date}</p>}
                  </StepPanel>
                )}
                {step === 3 && (
                  <StepPanel k={3} title={`Available on ${dateLabel}`}>
                    {slots.isLoading ? (
                      <div className="grid gap-2 sm:grid-cols-2">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-14" />)}</div>
                    ) : slots.isError ? (
                      <p className="text-destructive">Couldn't load availability. <button className="underline" onClick={() => slots.refetch()}>Retry</button></p>
                    ) : slots.data?.slots.length ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {slots.data.slots.map((s) => <OptionCard key={s.time} disabled={!s.available} selected={f.time === s.time} onClick={() => setF((p) => ({ ...p, time: s.time }))} title={s.time} meta={s.available ? "Available" : "Booked"} />)}
                      </div>
                    ) : (
                      <p className="text-slate">We're closed that day. Please choose another date.</p>
                    )}
                    {errors.time && <p className="mt-2 text-xs text-destructive" role="alert">{errors.time}</p>}
                  </StepPanel>
                )}
                {step === 4 && (
                  <StepPanel k={4} title="Contact information">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="First name" htmlFor="fn" error={errors.firstName}><input id="fn" autoComplete="given-name" className={inputCls} value={f.firstName} onChange={set("firstName")} /></Field>
                      <Field label="Last name" htmlFor="ln" error={errors.lastName}><input id="ln" autoComplete="family-name" className={inputCls} value={f.lastName} onChange={set("lastName")} /></Field>
                      <Field label="Email" htmlFor="em" error={errors.email}><input id="em" type="email" autoComplete="email" className={inputCls} value={f.email} onChange={set("email")} /></Field>
                      <Field label="Phone" htmlFor="ph" error={errors.phone}><input id="ph" type="tel" autoComplete="tel" className={inputCls} value={f.phone} onChange={set("phone")} /></Field>
                      <Field label="Notes" htmlFor="nt" className="sm:col-span-2"><textarea id="nt" rows={3} className={`${inputCls} h-auto py-2`} value={f.notes} onChange={set("notes")} /></Field>
                    </div>
                  </StepPanel>
                )}
                {step === 5 && <StepPanel k={5} title="Confirm your appointment"><Summary rows={rows} /></StepPanel>}
              </div>
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || busy}><ArrowLeft /> Back</Button>
                {step < 5 ? (
                  <Button variant="cta" size="lg" onClick={next}>Continue <ArrowRight /></Button>
                ) : (
                  <Button variant="cta" size="lg" onClick={confirm} disabled={busy}>{busy ? <><Loader2 className="animate-spin" /> Confirming</> : "Confirm appointment"}</Button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
