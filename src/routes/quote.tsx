import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Field, OptionCard, StepPanel, Stepper, Summary, inputCls } from "@/components/site/Wizard";
import { SERVICES, serviceBySlug } from "@/lib/knowledge";
import { money } from "@/lib/format";
import { submitQuoteRequest } from "@/lib/public.functions";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s.service === "string" ? { service: s.service } : {}),
  head: () => ({
    meta: [
      { title: "Request a Detailing Quote — Apex Auto Detailing Dallas" },
      { name: "description", content: "Tell us about your vehicle and get a ceramic coating, paint correction or PPF quote from Apex in Dallas." },
      { property: "og:title", content: "Request a Quote — Apex Auto Detailing" },
      { property: "og:description", content: "Get a detailing recommendation for your vehicle." },
    ],
  }),
  component: QuotePage,
});

const STEPS = ["Contact", "Vehicle", "Service", "Preferences", "Review"];

const stepSchemas = [
  z.object({ firstName: z.string().trim().min(1, "Required"), lastName: z.string().trim().min(1, "Required"), email: z.string().trim().email("Enter a valid email"), phone: z.string().trim().min(7, "Enter a valid phone") }),
  z.object({ year: z.coerce.number({ invalid_type_error: "Enter a year" }).int().min(1950, "Enter a valid year").max(2030, "Enter a valid year"), make: z.string().trim().min(1, "Required"), model: z.string().trim().min(1, "Required") }),
  z.object({ service: z.string().min(1, "Choose a service") }),
  z.object({}),
];

type Form = { firstName: string; lastName: string; email: string; phone: string; year: string; make: string; model: string; color: string; service: string; date: string; time: string; condition: string; notes: string };

function QuotePage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ service: string; estimate: number } | null>(null);
  const [f, setF] = useState<Form>({ firstName: "", lastName: "", email: "", phone: "", year: "", make: "", model: "", color: "", service: search.service && serviceBySlug(search.service) ? search.service : "", date: "", time: "", condition: "", notes: "" });
  const submit = useServerFn(submitQuoteRequest);
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  function next() {
    const schema = stepSchemas[step];
    if (schema) {
      const r = schema.safeParse(f);
      if (!r.success) {
        setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
        return;
      }
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  async function onSubmit() {
    setBusy(true);
    try {
      const r = await submit({
        data: {
          contact: { firstName: f.firstName, lastName: f.lastName, email: f.email, phone: f.phone },
          vehicle: { year: Number(f.year), make: f.make, model: f.model, color: f.color },
          serviceSlug: f.service,
          preferredDate: f.date,
          preferredTime: f.time,
          condition: f.condition,
          notes: f.notes,
        },
      });
      setDone({ service: r.service, estimate: r.estimate });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const svc = serviceBySlug(f.service);

  return (
    <SiteLayout>
      <section className="container-site grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <aside className="lg:col-span-4">
          <p className="eyebrow text-primary">Request a quote</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-navy">Tell us about your vehicle.</h1>
          <p className="mt-4 text-slate">You'll receive an instant confirmation by text, followed by a personal recommendation from our team.</p>
          {svc && !done && (
            <div className="mt-8 hidden rounded-md border bg-surface p-5 lg:block">
              <p className="eyebrow text-slate">Selected</p>
              <p className="mt-1 text-lg font-bold text-navy">{svc.name}</p>
              <p className="text-sm text-slate">From {money(svc.priceFrom)} · ~{svc.durationHours} hrs</p>
            </div>
          )}
        </aside>
        <div className="lg:col-span-8">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-md border bg-surface p-8 md:p-12">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <h2 className="mt-5 font-display text-5xl text-navy">Request received, {f.firstName}.</h2>
              <p className="mt-4 max-w-lg text-slate">We've sent a confirmation to {f.phone}. A specialist will review your {f.year} {f.make} {f.model} and follow up with a {done.service} recommendation.</p>
              <div className="mt-6 max-w-md"><Summary rows={[["Service", done.service], ["Estimated starting value", money(done.estimate)], ["Preferred", [f.date, f.time].filter(Boolean).join(" · ")]]} /></div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg"><Link to="/book" search={{ service: f.service }}>Book a time now</Link></Button>
                <Button asChild variant="cta-outline" size="lg"><Link to="/">Back to home</Link></Button>
              </div>
            </motion.div>
          ) : (
            <>
              <Stepper steps={STEPS} current={step} />
              <div className="mt-10 min-h-[380px]">
                {step === 0 && (
                  <StepPanel k={0} title="Your details">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="First name" htmlFor="fn" error={errors.firstName}><input id="fn" autoComplete="given-name" className={inputCls} value={f.firstName} onChange={set("firstName")} placeholder="John" /></Field>
                      <Field label="Last name" htmlFor="ln" error={errors.lastName}><input id="ln" autoComplete="family-name" className={inputCls} value={f.lastName} onChange={set("lastName")} placeholder="Smith" /></Field>
                      <Field label="Email" htmlFor="em" error={errors.email}><input id="em" type="email" autoComplete="email" className={inputCls} value={f.email} onChange={set("email")} placeholder="john@example.com" /></Field>
                      <Field label="Phone" htmlFor="ph" error={errors.phone}><input id="ph" type="tel" autoComplete="tel" className={inputCls} value={f.phone} onChange={set("phone")} placeholder="(214) 555-0123" /></Field>
                    </div>
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
                  <StepPanel k={2} title="Which service?">
                    <div className="grid gap-2">
                      {SERVICES.map((s) => (
                        <OptionCard key={s.slug} selected={f.service === s.slug} onClick={() => setF((p) => ({ ...p, service: s.slug }))} title={s.name} meta={`From ${money(s.priceFrom)}`} />
                      ))}
                    </div>
                    {errors.service && <p className="mt-2 text-xs font-medium text-destructive" role="alert">{errors.service}</p>}
                  </StepPanel>
                )}
                {step === 3 && (
                  <StepPanel k={3} title="Preferences">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Preferred date" htmlFor="dt"><input id="dt" type="date" className={inputCls} value={f.date} onChange={set("date")} /></Field>
                      <Field label="Preferred time" htmlFor="tm">
                        <select id="tm" className={inputCls} value={f.time} onChange={set("time")}>
                          <option value="">No preference</option><option>Morning</option><option>Midday</option><option>Afternoon</option>
                        </select>
                      </Field>
                      <Field label="Vehicle condition" htmlFor="cd" className="sm:col-span-2">
                        <div id="cd" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {["Excellent", "Good", "Fair", "Needs attention"].map((c) => (
                            <OptionCard key={c} selected={f.condition === c} onClick={() => setF((p) => ({ ...p, condition: c }))} title={c} />
                          ))}
                        </div>
                      </Field>
                      <Field label="Additional notes" htmlFor="nt" className="sm:col-span-2">
                        <textarea id="nt" rows={4} className={`${inputCls} h-auto py-2`} value={f.notes} onChange={set("notes")} placeholder="Swirl marks on the hood, new car, etc." />
                      </Field>
                    </div>
                  </StepPanel>
                )}
                {step === 4 && (
                  <StepPanel k={4} title="Review your request">
                    <Summary rows={[
                      ["Name", `${f.firstName} ${f.lastName}`],
                      ["Contact", `${f.email} · ${f.phone}`],
                      ["Vehicle", `${f.year} ${f.make} ${f.model}${f.color ? ` · ${f.color}` : ""}`],
                      ["Service", svc?.name ?? ""],
                      ["Preferred", [f.date, f.time].filter(Boolean).join(" · ")],
                      ["Condition", f.condition],
                      ["Notes", f.notes],
                    ]} />
                  </StepPanel>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || busy}><ArrowLeft /> Back</Button>
                {step < 4 ? (
                  <Button variant="cta" size="lg" onClick={next}>Continue <ArrowRight /></Button>
                ) : (
                  <Button variant="cta" size="lg" onClick={onSubmit} disabled={busy}>{busy ? <><Loader2 className="animate-spin" /> Submitting</> : "Submit request"}</Button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
