import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Ceramic Coating & PPF Work | Apex Auto Detailing" },
      { name: "description", content: "Selected ceramic coating, paint correction and paint protection film work from the Apex studio in Dallas." },
      { property: "og:title", content: "Gallery — Apex Auto Detailing" },
      { property: "og:description", content: "Selected detailing work from our Dallas studio." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Gallery" title="Finished in the studio." />
      <section className="container-site grid gap-x-4 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((g, i) => (
          <figure key={g.car} className={`group ${i === 0 ? "sm:col-span-2" : ""}`}>
            <div className="overflow-hidden rounded-md">
              <img src={g.src} alt={`${g.car} after ${g.work}`} loading={i < 2 ? "eager" : "lazy"} width={1200} height={912} className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`} />
            </div>
            <figcaption className="mt-3 grid min-w-0 gap-1 border-b pb-3 sm:flex sm:items-baseline sm:justify-between sm:gap-3">
              <span className="font-bold text-navy">{g.car}</span>
              <span className="text-sm text-slate">{g.work}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </SiteLayout>
  );
}
