import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarClock, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Field, OptionCard, StepPanel, Stepper, Summary, inputCls } from "@/components/site/Wizard";
import { SERVICES, ADDONS, serviceBySlug, bookingCart, BUSINESS } from "@/lib/knowledge";
import { money, TZ } from "@/lib/format";
import { createBooking, getAvailability } from "@/lib/public.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s.service === "string" ? { service: s.service } : {}),
  head: () => ({
    meta: [
      { title: "Book a Detailing Appointment Online — DetailingOS" },
      { name: "description", content: "Choose a service and an available time at the DetailingOS detailing studio in Dallas. Instant confirmation." },
      { property: "og:title", content: "Book an Appointment — DetailingOS" },
      { property: "og:description", content: "Pick an available time online." },
    ],
  }),
  component: BookPage,
});

const MAX_VISIT_HOURS = 10;
const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const STEPS = ["Services", "Vehicle", "Date", "Time", "Contact", "Confirm"];

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
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ location: string } | null>(null);
  const [f, setF] = useState({ services: search.service && serviceBySlug(search.service) ? [search.service] : ([] as string[]), addons: [] as string[], year: "", make: "", model: "", color: "", date: "", time: "", firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const set = (k: "year" | "make" | "model" | "color" | "firstName" | "lastName" | "email" | "phone" | "notes") => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));
  const days = useMemo(() => nextDays(14), []);
  const avail = useServerFn(getAvailability);
  const book = useServerFn(createBooking);
  const slots = useQuery({ queryKey: ["availability", f.date, f.services, f.addons], queryFn: () => avail({ data: { date: f.date, serviceSlugs: f.services, addonSlugs: f.addons } }), enabled: !!f.date && f.services.length > 0 && step === 3, retry: 3, retryDelay: (n) => Math.min(1000 * 2 ** n, 5000) });
  const cart = bookingCart(f.services, f.addons);

  const checks: Record<number, () => Record<string, string | undefined>> = {
    0: () => (!f.services.length ? { service: "Choose at least one service" } : cart.durationHours > MAX_VISIT_HOURS ? { service: `This is about ${cart.durationHours} hours of work, more than one day. Remove a service, or request a quote for a multi-day visit.` } : {}),
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
          serviceSlugs: f.services,
          addonSlugs: f.addons,
          date: f.date,
          time: f.time,
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
    ["Services", cart.services.map((s) => s.name).join(", ")],
    ["Add-ons", cart.addons.length ? cart.addons.map((a) => a.name).join(", ") : "None"],
    ["Estimated time", `~${cart.durationHours} hrs`],
    ["Starting price", money(cart.price)],
    ["Date", dateLabel],
    ["Time", f.time],
    ["Location", done?.location ?? `DetailingOS Studio — ${BUSINESS.address}`],
  ];

  return (
    <SiteLayout>
      <section className="container-site grid gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-12 lg:py-16">
        <aside className="lg:col-span-4">
          <p className="eyebrow text-primary">Book online</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-navy">Choose your time.</h1>
          <p className="mt-4 text-slate">Choose an available time to request. The appointment is not confirmed until the team contacts you.</p>
        </aside>
        <div className="lg:col-span-8">
          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-md border bg-surface p-8 md:p-12">
              <CalendarClock className="h-10 w-10 text-success" />
              <h2 className="mt-5 break-words font-display text-4xl text-navy sm:text-5xl">Request received.</h2>
              <p className="mt-3 text-slate">Your requested time is not confirmed yet. The team will contact you at {f.phone} to confirm availability.</p>
              <div className="mt-8 max-w-lg"><Summary rows={rows} /></div>
              <Button asChild variant="cta-outline" size="lg" className="mt-8"><Link to="/">Back to home</Link></Button>
            </motion.div>
          ) : (
            <>
              <Stepper steps={STEPS} current={step} />
              <div className="mt-6 min-h-[380px] sm:mt-10">
                {step === 0 && (
                  <StepPanel k={0} title="Select services">
                    <p className="-mt-4 mb-4 text-sm text-slate">Choose one or more services for this visit.</p>
                    <div className="grid gap-2">
                      {SERVICES.map((s) => <OptionCard key={s.slug} selected={f.services.includes(s.slug)} onClick={() => setF((p) => ({ ...p, services: toggle(p.services, s.slug), time: "" }))} title={s.name} meta={`From ${money(s.priceFrom)} · ~${s.durationHours} hrs`} />)}
                    </div>
                    <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.12em] text-slate">Add-ons <span className="font-medium normal-case tracking-normal">(optional)</span></h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {ADDONS.map((a) => <OptionCard key={a.slug} selected={f.addons.includes(a.slug)} onClick={() => setF((p) => ({ ...p, addons: toggle(p.addons, a.slug), time: "" }))} title={a.name} meta={`+${money(a.price)}`} />)}
                    </div>
                    <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 rounded-md border bg-surface px-4 py-3" aria-live="polite">
                      <span className="text-sm text-slate">{f.services.length} service{f.services.length === 1 ? "" : "s"}{f.addons.length ? ` + ${f.addons.length} add-on${f.addons.length === 1 ? "" : "s"}` : ""} · ~{cart.durationHours} hrs</span>
                      <span className="font-bold text-navy">From {money(cart.price)}</span>
                    </div>
                    {errors.service && <p className="mt-2 text-sm text-destructive" role="alert">{errors.service}</p>}
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
                        {slots.data.slots.map((s) => <OptionCard key={s.time} disabled={!s.available} selected={f.time === s.time} onClick={() => setF((p) => ({ ...p, time: s.time }))} title={s.time} meta={s.available ? "Available" : "Unavailable"} />)}
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
                {step === 5 && <StepPanel k={5} title="Review appointment request"><Summary rows={rows} /></StepPanel>}
              </div>
              <div className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-t pt-6 sm:flex sm:justify-between">
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || busy}><ArrowLeft /> Back</Button>
                {step < 5 ? (
                  <Button variant="cta" size="lg" onClick={next}>Continue <ArrowRight /></Button>
                ) : (
                  <Button variant="cta" size="lg" className="h-auto min-h-12 whitespace-normal px-3 py-3 sm:px-7" onClick={confirm} disabled={busy}>{busy ? <><Loader2 className="animate-spin" /> Submitting</> : "Submit appointment request"}</Button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
