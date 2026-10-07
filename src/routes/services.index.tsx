import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/knowledge";
import { money } from "@/lib/format";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Detailing Services & Pricing — Apex Auto Detailing Dallas" },
      { name: "description", content: "Full detail, ceramic coating, paint correction, PPF, interior and fleet detailing in Dallas, with starting prices." },
      { property: "og:title", content: "Detailing Services — Apex Auto Detailing" },
      { property: "og:description", content: "Ceramic coating, paint correction, PPF and more in Dallas, TX." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Services" title="Every finish, handled precisely.">
        Demo pricing shown as starting points. Final pricing is confirmed after a paint inspection.
      </PageHeader>
      <section className="container-site py-12">
        <ul className="divide-y border-y">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid items-center gap-4 py-7 md:grid-cols-12">
                <h2 className="font-display text-3xl text-navy md:col-span-4">{s.name}</h2>
                <p className="text-sm text-slate md:col-span-5">{s.short}</p>
                <p className="tabular text-sm text-slate md:col-span-1">~{s.durationHours} hrs</p>
                <p className="flex items-center justify-between font-semibold text-navy md:col-span-2 md:justify-end md:gap-4">
                  From {money(s.priceFrom)} <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
