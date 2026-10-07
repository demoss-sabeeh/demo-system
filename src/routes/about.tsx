import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Apex Auto Detailing — Dallas Detailing Studio" },
      { name: "description", content: "A climate-controlled Dallas studio focused on paint correction, ceramic coating and paint protection film." },
      { property: "og:title", content: "About — Apex Auto Detailing" },
      { property: "og:description", content: "Our approach to premium detailing in Dallas." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About" title="A studio built around the finish.">
        Apex is a Dallas detailing studio focused on paint correction, ceramic coating and paint protection film — with the same process on every vehicle.
      </PageHeader>
      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <img src={GALLERY[2].src} alt="Machine polishing an Audi RS5 hood" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full rounded-md object-cover" />
        <div className="space-y-8">
          {[
            ["Inspect first", "Every vehicle is inspected under studio lighting and paint-depth measured before we recommend anything."],
            ["Controlled environment", "Coatings and film are installed indoors, away from dust and Texas heat."],
            ["Clear communication", "You get a clear quote, a confirmed time, and a reminder before your visit."],
          ].map(([t, d]) => (
            <div key={t} className="border-t pt-5">
              <h2 className="text-xl font-bold text-navy">{t}</h2>
              <p className="mt-2 text-slate">{d}</p>
            </div>
          ))}
          <Button asChild variant="cta" size="lg"><Link to="/quote">Get a quote</Link></Button>
        </div>
      </section>
    </SiteLayout>
  );
}
