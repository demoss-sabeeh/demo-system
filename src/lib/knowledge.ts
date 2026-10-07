// Structured knowledge source for the public site and the AI assistant.
// The assistant may only answer from this data.

export const BUSINESS = {
  name: "Apex Auto Detailing",
  city: "Dallas, Texas",
  address: "2211 Commerce St, Dallas, TX 75201",
  phone: "(214) 555-0199",
  email: "studio@apexdetailing.example",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  serviceArea: "Dallas, Plano, Frisco, Highland Park, Irving and Southlake",
};

export type ServiceInfo = {
  slug: string;
  name: string;
  short: string;
  description: string;
  ideal: string;
  includes: string[];
  durationHours: number;
  priceFrom: number;
  priceTo: number;
};

export const SERVICES: ServiceInfo[] = [
  { slug: "full-detail", name: "Full Detail", short: "Complete interior and exterior reset for daily drivers and weekend cars.", description: "A meticulous top-to-bottom detail: hand wash, decontamination, machine-applied sealant, and a full interior deep clean with steam and leather care.", ideal: "Owners who want their vehicle back to showroom condition before a sale, trip, or season change.", includes: ["Two-bucket hand wash and foam pre-soak", "Iron and tar decontamination", "Clay bar treatment", "6-month paint sealant", "Interior vacuum, steam and shampoo", "Leather clean and condition", "Glass, trim and tire dressing"], durationHours: 4, priceFrom: 349, priceTo: 549 },
  { slug: "ceramic-coating", name: "Ceramic Coating", short: "Multi-year gloss and protection bonded to your paint.", description: "Professional-grade ceramic coating applied in a controlled studio after full paint preparation. Delivers deep gloss, hydrophobic protection and easier maintenance for years.", ideal: "Owners of new or well-kept vehicles who want long-term protection and less time washing.", includes: ["Paint preparation", "Surface decontamination", "Paint correction where required", "Ceramic coating application", "Wheel faces and glass coating", "Final inspection under studio lighting"], durationHours: 6, priceFrom: 899, priceTo: 2400 },
  { slug: "paint-correction", name: "Paint Correction", short: "Remove swirls, haze and light scratches with machine polishing.", description: "Single- or multi-stage machine polishing to restore clarity and depth. Every vehicle is paint-depth measured before correction begins.", ideal: "Dark-colored vehicles with visible swirl marks, or anyone preparing for ceramic coating.", includes: ["Paint depth measurement", "Test spot to set the process", "One- to three-stage machine polish", "Panel wipe and inspection", "Sealant top coat"], durationHours: 8, priceFrom: 499, priceTo: 1500 },
  { slug: "paint-protection-film", name: "Paint Protection Film", short: "Self-healing film against rock chips and road debris.", description: "Precision-cut, self-healing urethane film installed on high-impact areas or the full vehicle. Nearly invisible and backed by manufacturer warranty.", ideal: "Performance and highway-driven vehicles exposed to rock chips.", includes: ["Front-end or full-body coverage options", "Computer-cut patterns", "Wrapped edges where possible", "Self-healing top coat", "Post-install inspection"], durationHours: 12, priceFrom: 1800, priceTo: 6500 },
  { slug: "interior-detail", name: "Interior Detail", short: "Deep clean and protection for every interior surface.", description: "Steam cleaning, extraction, and conditioning for seats, carpets, and trim. Ideal for family vehicles and lease returns.", ideal: "Families, pet owners, and lease returns.", includes: ["Full vacuum and compressed-air blowout", "Steam clean of vents and crevices", "Carpet and seat extraction", "Leather clean and condition", "Interior UV protectant", "Odor treatment"], durationHours: 3, priceFrom: 199, priceTo: 349 },
  { slug: "maintenance-detail", name: "Maintenance Detail", short: "Keep coated and protected vehicles looking new.", description: "A safe maintenance wash and refresh designed for vehicles that already have coating or PPF. Recommended every 4–6 weeks.", ideal: "Existing ceramic coating and PPF customers.", includes: ["pH-neutral hand wash", "Coating-safe decontamination", "Ceramic booster top-up", "Quick interior refresh", "Wheel and tire clean"], durationHours: 2, priceFrom: 129, priceTo: 199 },
  { slug: "fleet-detailing", name: "Fleet / Commercial Detailing", short: "Scheduled detailing for company vehicles and dealer inventory.", description: "Recurring on-site or in-studio detailing for fleets, dealerships, and commercial vehicles with consolidated invoicing.", ideal: "Dealerships, property managers, and service companies with 5+ vehicles.", includes: ["On-site or in-studio service", "Recurring schedule", "Per-vehicle condition notes", "Consolidated monthly invoicing"], durationHours: 2, priceFrom: 79, priceTo: 149 },
];

export const FAQ = [
  { q: "How long does ceramic coating last?", a: "Our professional coatings are designed for multi-year protection when maintained with regular maintenance details. We'll recommend a package based on your vehicle and how it's driven." },
  { q: "Do I need paint correction before ceramic coating?", a: "Coating locks in whatever is underneath, so most vehicles receive at least a light polish. We inspect the paint under studio lighting and only recommend correction when it's needed." },
  { q: "How should I prepare my vehicle?", a: "Remove personal items from the cabin and trunk. No need to wash beforehand — decontamination is part of every service." },
  { q: "Do you offer mobile service?", a: "Maintenance and interior details can be performed on-site within our service area. Coating, correction and PPF are performed in our climate-controlled studio." },
  { q: "What is your cancellation policy?", a: "Please give us at least 24 hours' notice to reschedule or cancel so we can offer the time to another client." },
  { q: "How do I get an exact price?", a: "Pricing depends on vehicle size and paint condition. Request a quote with your vehicle details and we'll reply with a recommendation." },
];

export const POLICIES = [
  "Appointments are available Monday–Saturday during business hours.",
  "Studio services (coating, correction, PPF) are performed at 2211 Commerce St, Dallas.",
  "Final pricing is confirmed after an in-person paint inspection.",
  "Please provide 24 hours' notice to reschedule or cancel.",
];

export const TIME_SLOTS = ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"];

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function knowledgeAsText() {
  return [
    `Business: ${BUSINESS.name}, ${BUSINESS.address}. Phone ${BUSINESS.phone}. Serves ${BUSINESS.serviceArea}.`,
    `Hours: ${BUSINESS.hours.map((h) => `${h.day} ${h.time}`).join("; ")}.`,
    "Services:",
    ...SERVICES.map((s) => `- ${s.name}: from $${s.priceFrom} (typical range $${s.priceFrom}–$${s.priceTo}), about ${s.durationHours} hours. ${s.description} Includes: ${s.includes.join(", ")}. Ideal for: ${s.ideal}`),
    "FAQ:",
    ...FAQ.map((f) => `- Q: ${f.q} A: ${f.a}`),
    "Policies:",
    ...POLICIES.map((p) => `- ${p}`),
    `Booking: appointment start times are ${TIME_SLOTS.join(", ")}. Customers can book at /book or request a quote at /quote.`,
  ].join("\n");
}
