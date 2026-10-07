import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles as _unused, Clock, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES, BUSINESS } from "@/lib/knowledge";
import { GALLERY, HERO_IMAGE } from "@/lib/gallery";
import { money } from "@/lib/format";

void _unused;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Auto Detailing — Premium Car Detailing in Dallas, TX" },
      { name: "description", content: "Ceramic coating, paint correction, PPF and full detailing in Dallas. Request a quote or book online with Apex Auto Detailing." },
      { property: "og:title", content: "Apex Auto Detailing — Premium Auto Detailing, Done Right." },
      { property: "og:description", content: "Ceramic coating, paint correction, PPF and full detailing in Dallas, Texas." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoWash",
          name: BUSINESS.name,
          telephone: BUSINESS.phone,
          address: { "@type": "PostalAddress", streetAddress: "2211 Commerce St", addressLocality: "Dallas", addressRegion: "TX", postalCode: "75201", addressCountry: "US" },
          openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00"],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="container-site grid items-end gap-10 pb-14 pt-14 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow animate-rise text-primary">Dallas · Ceramic Coating · Paint Correction · PPF</p>
            <h1 className="mt-5 animate-rise font-display text-[3.4rem] leading-[0.95] text-navy [animation-delay:80ms] md:text-[5.2rem]">
              Premium Auto Detailing, <em className="text-primary">Done Right.</em>
            </h1>
            <p className="mt-6 max-w-md animate-rise text-lg leading-relaxed text-slate [animation-delay:160ms]">
              Professional detailing, paint correction, ceramic coating, and protection services for vehicles that deserve more.
            </p>
            <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
              <Button asChild variant="cta" size="lg"><Link to="/quote">Get a quote <ArrowRight /></Link></Button>
              <Button asChild variant="cta-outline" size="lg"><Link to="/book">Book an appointment</Link></Button>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="animate-reveal overflow-hidden rounded-md">
              <img src={HERO_IMAGE} alt="Black BMW M4 with fresh ceramic coating in the Apex studio" width={1920} height={1088} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="absolute -left-3 top-8 hidden animate-drift rounded-md border bg-surface px-4 py-3 shadow-sm md:block">
              <p className="eyebrow text-slate">Ceramic Coating</p>
              <p className="mt-1 text-sm font-bold text-navy">From {money(899)} · ~6 hrs</p>
            </div>
            <div className="absolute -bottom-4 right-6 hidden animate-drift rounded-md border bg-surface px-4 py-3 shadow-sm [animation-delay:1.5s] md:block">
              <p className="flex items-center gap-1.5 text-sm font-bold text-navy"><ShieldCheck className="h-4 w-4 text-primary" /> Studio inspected</p>
              <p className="text-xs text-slate">Paint-depth measured before work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof row */}
      <section className="border-b bg-surface">
        <div className="container-site grid grid-cols-2 divide-x md:grid-cols-4">
          {[
            [ShieldCheck, "Climate-controlled studio"],
            [Clock, "Book online in 60 seconds"],
            [Star, "Inspection under studio lighting"],
            [ArrowRight, "Clear pricing before we start"],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Clock;
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-5 text-sm font-semibold text-navy first:pl-0">
                <I className="h-4 w-4 shrink-0 text-primary" /> {t as string}
              </div>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section className="container-site py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-primary">Services</p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Care at every level.</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">All services →</Link>
        </div>
        <div className="mt-10 grid border-t md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group border-b p-6 transition-colors hover:bg-surface md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <p className="tabular text-xs font-bold text-slate">0{i + 1}</p>
              <h3 className="mt-6 text-xl font-bold text-navy">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.short}</p>
              <p className="mt-6 flex items-center justify-between text-sm">
                <span className="font-semibold text-navy">From {money(s.priceFrom)}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-sky">How it works</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">From inquiry to showroom finish.</h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Request a quote", "Tell us about your vehicle and the result you want. You'll hear back right away."],
              ["Get a recommendation", "We confirm the right package and send a clear, itemized quote."],
              ["Book your time", "Pick an available slot online. Reminders are sent before your visit."],
              ["Drive away protected", "We inspect under studio lighting and recommend your next maintenance."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-sidebar-border pt-5">
                <span className="tabular text-xs font-bold text-sky">STEP 0{i + 1}</span>
                <p className="mt-2 text-lg font-bold">{t}</p>
                <p className="mt-1 text-sm text-navy-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="container-site py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl text-navy md:text-5xl">Recent work.</h2>
          <Link to="/gallery" className="text-sm font-semibold text-primary hover:underline">View gallery →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.slice(1, 5).map((g) => (
            <figure key={g.car} className="group overflow-hidden rounded-md">
              <img src={g.src} alt={`${g.car} — ${g.work}`} loading="lazy" width={1200} height={912} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <figcaption className="pt-2 text-xs"><span className="font-bold text-navy">{g.car}</span> <span className="text-slate">· {g.work}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-surface">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <h2 className="max-w-xl font-display text-4xl text-navy md:text-5xl">Ready when you are.</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg"><Link to="/quote">Get a quote</Link></Button>
            <Button asChild variant="cta-outline" size="lg"><Link to="/book">Book appointment</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
