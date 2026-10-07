import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES, serviceBySlug } from "@/lib/knowledge";
import { money } from "@/lib/format";
import { GALLERY } from "@/lib/gallery";

const IMG: Record<string, number> = { "full-detail": 4, "ceramic-coating": 0, "paint-correction": 2, "paint-protection-film": 5, "interior-detail": 7, "maintenance-detail": 3, "fleet-detailing": 1 };

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = serviceBySlug(params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service not found — Apex Auto Detailing" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.name} in Dallas — Apex Auto Detailing` },
        { name: "description", content: `${s.short} Starting at ${money(s.priceFrom)}.` },
        { property: "og:title", content: `${s.name} — Apex Auto Detailing` },
        { property: "og:description", content: s.short },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout><div className="container-site py-24"><h1 className="font-display text-5xl text-navy">Service not found</h1><Link to="/services" className="mt-4 inline-block text-primary">View all services</Link></div></SiteLayout>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const img = GALLERY[IMG[s.slug] ?? 0];
  const others = SERVICES.filter((o) => o.slug !== s.slug).slice(0, 3);
  return (
    <SiteLayout>
      <section className="border-b">
        <div className="container-site grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <Link to="/services" className="eyebrow text-slate hover:text-primary">← Services</Link>
            <h1 className="mt-5 animate-rise font-display text-6xl leading-none text-navy md:text-7xl">{s.name}</h1>
            <p className="mt-6 animate-rise text-lg leading-relaxed text-slate">{s.description}</p>
            <dl className="mt-8 grid grid-cols-2 border-y py-5">
              <div><dt className="eyebrow text-slate">Starting at</dt><dd className="mt-1 text-2xl font-bold text-navy">{money(s.priceFrom)}</dd><dd className="text-xs text-slate">Typical {money(s.priceFrom)}–{money(s.priceTo)}</dd></div>
              <div><dt className="eyebrow text-slate">Duration</dt><dd className="mt-1 text-2xl font-bold text-navy">~{s.durationHours} hours</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg"><Link to="/quote" search={{ service: s.slug }}>Request a quote</Link></Button>
              <Button asChild variant="cta-outline" size="lg"><Link to="/book" search={{ service: s.slug }}>Book appointment</Link></Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <img src={img.src} alt={`${img.car} — ${s.name}`} width={1200} height={912} className="aspect-[4/3] w-full animate-reveal rounded-md object-cover" />
          </div>
        </div>
      </section>
      <section className="container-site grid gap-12 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">What's included</p>
          <ul className="mt-5 space-y-3">
            {s.includes.map((i) => (
              <li key={i} className="flex gap-3 border-b pb-3 text-navy"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary">Ideal for</p>
          <p className="mt-5 font-display text-3xl leading-snug text-navy">{s.ideal}</p>
          <div className="mt-10">
            <p className="eyebrow text-slate">Other services</p>
            <ul className="mt-3 divide-y border-y">
              {others.map((o) => (
                <li key={o.slug}><Link to="/services/$slug" params={{ slug: o.slug }} className="flex justify-between py-3 text-sm font-semibold text-navy hover:text-primary">{o.name}<span className="text-slate">From {money(o.priceFrom)}</span></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
