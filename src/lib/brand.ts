/**
 * Central branding configuration.
 *
 * White-label onboarding: change these values (and the mark in
 * src/components/admin/DetailingMark.tsx) to rebrand the platform
 * for a paying client — no other code should need to change.
 */
export const BRAND = {
  /** Product / platform identity shown in the dashboard, auth screen and metadata. */
  productName: "DetailingOS",
  /** Agency providing the solution. */
  agencyName: "Operant Scale",
  /** Subtle footer attribution. */
  footerAttribution: "Demo powered by Operant Scale",
  /** Show the demo-mode indicator in the dashboard header. */
  demoMode: true,
  /** The fictional business whose sample data fills the demo. */
  demoBusiness: {
    name: "Apex Auto Detailing",
    disclaimer: "Apex Auto Detailing is a fictional business used for product demonstration.",
  },
} as const;
