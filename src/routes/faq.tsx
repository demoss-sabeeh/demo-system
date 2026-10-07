import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/lib/knowledge";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ceramic Coating, Paint Correction & PPF | Apex" },
      { name: "description", content: "Answers about ceramic coating longevity, paint correction, preparation and booking at Apex Auto Detailing." },
      { property: "og:title", content: "FAQ — Apex Auto Detailing" },
      { property: "og:description", content: "Common questions about our detailing services." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="FAQ" title="Questions, answered." />
      <section className="container-site max-w-3xl py-12">
        <Accordion type="single" collapsible className="border-t">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="py-5 text-left text-lg font-bold text-navy">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-slate">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
