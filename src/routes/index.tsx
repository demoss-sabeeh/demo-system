import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck, ClipboardList, CalendarCheck, Search, Sparkles, MessageSquareText, Gauge, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroVideo } from "@/components/site/HeroVideo";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SERVICES, BUSINESS } from "@/lib/knowledge";
import { GALLERY } from "@/lib/gallery";
import { money } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DetailingOS — Premium Car Detailing in Dallas, TX" },
      { name: "description", content: "Paint correction, ceramic coating, PPF and full detailing in Dallas. Request an itemized quote or book online." },
      { property: "og:title", content: "DetailingOS — Exceptional Care for Every Finish" },
      { property: "og:description", content: "Paint correction, ceramic coating, PPF and full detailing in Dallas, Texas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const SERVICE_IMAGES: Record<string, number> = {
  "full-detail": 4, "ceramic-coating": 0, "paint-correction": 2, "paint-protection-film": 5, "interior-detail": 7, "maintenance-detail": 3,
};

const HOME_FAQ = [
  { q: "How do I choose the right detailing service?", a: "Start with the result you want. Full Detail resets a daily driver, Paint Correction removes swirls and haze, Ceramic Coating adds long-term gloss and protection, and PPF guards against rock chips. Not sure? Request a quote and we'll recommend a package for your vehicle." },
  { q: "How long does a typical appointment take?", a: `It depends on the service: about ${SERVICES[5].durationHours} hours for a Maintenance Detail, ${SERVICES[0].durationHours} for a Full Detail, ${SERVICES[1].durationHours} for Ceramic Coating and up to ${SERVICES[3].durationHours} for Paint Protection Film. Your quote confirms the exact time.` },
  { q: "What's the difference between ceramic coating and paint correction?", a: "Paint correction is machine polishing that removes defects like swirls and light scratches. Ceramic coating is a protective layer applied on top. Because a coating locks in whatever is underneath, most vehicles benefit from some correction first." },
  { q: "How do I request a quote?", a: "Use the Get a Quote form. Tell us about your vehicle, its condition and the services you're interested in, and you'll receive an itemized quote." },
  { q: "How can I book an appointment?", a: "Choose Book an Appointment, pick your services and add-ons, then select an available date and time. You'll receive a confirmation once it's scheduled." },
  { q: "How should I prepare my vehicle?", a: "Remove personal items from the cabin and trunk. There's no need to wash the vehicle beforehand." },
  { q: "How can I contact the studio?", a: `Call ${BUSINESS.phone}, email ${BUSINESS.email}, or visit us at ${BUSINESS.address}.` },
];

// Demo placeholders — replace with real customer reviews before going live.
const REVIEWS = [
  { name: "Sample customer", service: "Ceramic Coating", text: "The quote was itemized and easy to follow, and the finish came back with incredible depth." },
  { name: "Sample customer", service: "Paint Correction", text: "Swirl marks I'd lived with for years were gone. They walked me through the paint inspection first." },
  { name: "Sample customer", service: "Interior Detail", text: "Booking online took a minute and the cabin came back looking and smelling new." },
];

function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const shots = GALLERY.slice(0, 5);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="container-site grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow animate-rise text-primary">Detailing studio · {BUSINESS.city}</p>
            <h1 className="mt-5 animate-rise font-display text-[3.1rem] leading-[0.95] text-navy [animation-delay:80ms] sm:text-6xl lg:text-[5rem]">
              Exceptional care for <em className="text-primary">every finish.</em>
            </h1>
            <p className="mt-6 max-w-md animate-rise text-lg leading-relaxed text-slate [animation-delay:160ms]">
              Hand detailing, paint correction, ceramic coating and paint protection film — prepared carefully, quoted clearly and finished under studio lighting.
            </p>
            <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <Button asChild variant="cta" size="lg"><Link to="/quote">Get a quote <ArrowRight /></Link></Button>
              <Button asChild variant="cta-outline" size="lg"><Link to="/book">Book an appointment</Link></Button>
            </div>
            <dl className="mt-10 grid max-w-md animate-rise grid-cols-3 border-t pt-5 [animation-delay:320ms]">
              {[["From", money(SERVICES[5].priceFrom)], ["Services", String(SERVICES.length)], ["Booking", "Online"]].map(([k, v]) => (
                <div key={k}><dt className="eyebrow text-slate">{k}</dt><dd className="mt-1 text-lg font-bold text-navy tabular">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-7">
            <HeroVideo className="aspect-[4/3] animate-reveal rounded-md sm:aspect-[16/10] lg:aspect-[5/4]" />
            <div className="absolute bottom-5 left-5 max-w-[70%] text-navy-foreground">
              <p className="eyebrow text-sky">In the studio</p>
              <p className="mt-1 text-sm font-semibold sm:text-base">Every surface finished by hand</p>
            </div>
            <div className="absolute -left-4 top-8 hidden animate-drift rounded-md border bg-surface px-4 py-3 shadow-sm md:block">
              <p className="eyebrow text-slate">Ceramic Coating</p>
              <p className="mt-1 text-sm font-bold text-navy">From {money(SERVICES[1].priceFrom)} · ~{SERVICES[1].durationHours} hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b bg-surface">
        <div className="container-site grid grid-cols-2 lg:grid-cols-4">
          {[
            [Sparkles, "Professional detailing", "Hand wash to full correction"],
            [ClipboardList, "Itemized quotes", "Know the price before we start"],
            [CalendarCheck, "Online booking", "Pick a time that suits you"],
            [Search, "Careful inspection", "Checked under studio lighting"],
          ].map(([Icon, t, d], i) => {
            const I = Icon as typeof Sparkles;
            return (
              <div key={i} className="flex min-w-0 items-start gap-3 border-b px-3 py-5 odd:pl-0 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(odd)]:border-r">
                <I className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0"><p className="text-sm font-bold text-navy">{t as string}</p><p className="mt-0.5 text-xs text-slate">{d as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section className="container-site py-20 md:py-24">
        <SectionHead eyebrow="Services" title="Care at every level." link={{ to: "/services", label: "All services" }}>
          From a maintenance wash to full-body film, each service starts with an inspection and a clear recommendation.
        </SectionHead>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group block">
              <div className="overflow-hidden rounded-md bg-muted">
                <img src={GALLERY[SERVICE_IMAGES[s.slug] ?? 0].src} alt="" loading="lazy" width={1200} height={912} className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-b pb-4">
                <h3 className="text-lg font-bold text-navy">{s.name}</h3>
                <span className="shrink-0 text-sm font-semibold text-navy tabular">From {money(s.priceFrom)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">{s.short}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y bg-surface">
        <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-md">
              <img src={GALLERY[1].src} alt={`${GALLERY[1].car} after ${GALLERY[1].work.toLowerCase()}`} loading="lazy" width={1200} height={912} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <p className="eyebrow text-primary">Why DetailingOS</p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">The details that matter, handled properly.</h2>
            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {[
                [Gauge, "Paint measured first", "Paint depth is checked before any correction so we remove defects, not clear coat."],
                [ShieldCheck, "Surface-specific care", "Paint, leather, trim and glass each get the products and process they need."],
                [Sparkles, "Recommendations for your car", "We suggest the package that fits its condition and how you drive it."],
                [MessageSquareText, "Clear communication", "Itemized quotes, confirmations and reminders before your visit."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Gauge;
                return (
                  <div key={t as string} className="border-t pt-5">
                    <dt className="flex items-center gap-2 font-bold text-navy"><I className="h-4 w-4 text-primary" /> {t as string}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate">{d as string}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-sky">How it works</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">From inquiry to showroom finish.</h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Request a quote", "Tell us about your vehicle and the result you want."],
              ["Get a recommendation", "We confirm the right package and send an itemized quote."],
              ["Choose your time", "Pick an available slot online. Reminders are sent before your visit."],
              ["Drive away refreshed", "We inspect the finished work with you and suggest your next maintenance."],
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

      {/* Gallery */}
      <section className="container-site py-20 md:py-24">
        <SectionHead eyebrow="Recent work" title="Finished in the studio." link={{ to: "/gallery", label: "View all work" }} />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {shots.map((g, i) => (
            <button
              key={g.car}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${g.car} — ${g.work}`}
              className={`group relative overflow-hidden rounded-md text-left ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img src={g.src} alt={`${g.car} — ${g.work}`} loading="lazy" width={1200} height={912} className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3 pt-10 text-xs text-navy-foreground">
                <span className="block font-bold">{g.car}</span><span className="text-navy-foreground/80">{g.work}</span>
              </span>
            </button>
          ))}
        </div>
        <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
          <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 bg-navy p-0 [&>button]:hidden">
            {lightbox !== null && (
              <>
                <DialogTitle className="sr-only">{shots[lightbox].car}</DialogTitle>
                <img src={shots[lightbox].src} alt={`${shots[lightbox].car} — ${shots[lightbox].work}`} className="max-h-[75vh] w-full object-contain" />
                <div className="flex items-center justify-between gap-3 p-3 text-navy-foreground">
                  <p className="min-w-0 truncate text-sm"><b>{shots[lightbox].car}</b> · {shots[lightbox].work}</p>
                  <div className="flex shrink-0 gap-1">
                    <Button size="icon" variant="ghost" className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground" aria-label="Previous image" onClick={() => setLightbox((lightbox + shots.length - 1) % shots.length)}><ChevronLeft /></Button>
                    <Button size="icon" variant="ghost" className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground" aria-label="Next image" onClick={() => setLightbox((lightbox + 1) % shots.length)}><ChevronRight /></Button>
                    <Button size="icon" variant="ghost" className="text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground" aria-label="Close" onClick={() => setLightbox(null)}><X /></Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Reviews */}
      <section className="border-y bg-surface">
        <div className="container-site py-20 md:py-24">
          <SectionHead eyebrow="Reviews" title="What customers notice.">
            Sample reviews shown for this demo. Replace them with real customer feedback before launch.
          </SectionHead>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="flex flex-col justify-between border-t-2 border-navy pt-6">
                <blockquote className="font-display text-2xl leading-snug text-navy">“{r.text}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-navy">{r.name} · {r.service}</span>
                  <span className="rounded-sm bg-muted px-2 py-0.5 font-semibold text-slate">Demo review</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-primary">About the studio</p>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">A careful process, start to finish.</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-slate">
            DetailingOS is a detailing studio in {BUSINESS.city}, serving {BUSINESS.serviceArea}. Each vehicle is inspected before work begins, prepared properly, and checked again before it goes home.
          </p>
          <Button asChild variant="cta-outline" className="mt-8"><Link to="/about">More about us <ArrowRight /></Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-6">
          <img src={GALLERY[6].src} alt={`${GALLERY[6].car} — ${GALLERY[6].work}`} loading="lazy" width={1200} height={912} className="aspect-[3/4] w-full rounded-md object-cover" />
          <img src={GALLERY[2].src} alt={`${GALLERY[2].car} — ${GALLERY[2].work}`} loading="lazy" width={1200} height={912} className="mt-10 aspect-[3/4] w-full rounded-md object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-primary">FAQ</p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Good questions.</h2>
            <Link to="/faq" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">See all questions →</Link>
          </div>
          <Accordion type="single" collapsible className="lg:col-span-8">
            {HOME_FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="py-5 text-left text-base font-bold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-slate">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-site pb-20 md:pb-24">
        <div className="grid items-center gap-8 rounded-md bg-navy px-6 py-12 text-navy-foreground md:grid-cols-[minmax(0,1fr)_auto] md:px-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Your vehicle deserves the right care.</h2>
            <p className="mt-3 max-w-lg text-navy-muted">Get an itemized quote, or pick a time and book your visit online.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="lg"><Link to="/quote">Get a quote</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-navy-muted/40 bg-transparent text-navy-foreground hover:bg-sidebar-accent hover:text-navy-foreground"><Link to="/book">Book an appointment</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHead({ eyebrow, title, link, children }: { eyebrow: string; title: string; link?: { to: "/services" | "/gallery"; label: string }; children?: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="max-w-2xl">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">{title}</h2>
        {children && <p className="mt-4 leading-relaxed text-slate">{children}</p>}
      </div>
      {link && <Link to={link.to} className="text-sm font-semibold text-primary hover:underline">{link.label} →</Link>}
    </div>
  );
}
