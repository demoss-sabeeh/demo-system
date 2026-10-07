# OperantScale — Detailing Business OS Demo

A demo for selling to detailers. It has two separate parts: the Apex Auto Detailing public website (light, premium) and the OperantScale admin dashboard (behind sign-in). Both share one database. A customer's journey runs from inquiry through lead, quote, booking, reminder, follow-up and reactivation.

## Platform notes
- The brief asks for Next.js. Lovable runs on TanStack Start, which also uses React, TypeScript, Tailwind, shadcn and Framer Motion. The code structure maps closely to Next.js, so a later GitHub Copilot hardening pass still works.
- Supabase is provided through Lovable Cloud: Postgres, Auth and RLS.
- The AI assistant runs on Lovable AI and is grounded in a structured knowledge file. If the AI is unavailable, a deterministic demo mode takes over.
- Twilio, Resend and Google Calendar actions are simulated. The Integrations page shows each one as Connected or Not connected.

## Design system
- Palette from the brief: warm white #FAF9F7, navy #0B2545, blue #0066FF, soft blue #6B9DF5, mist #C8D2DE, slate #53657A, all as oklch tokens.
- Typography: Instrument Serif (or a similar refined display face) for headlines on the public site, with Manrope for UI and body text, plus tabular numerals.
- Tight radii, hairline borders, minimal shadows, no gradients and no glass effects.
- Generated automotive imagery: a hero image and 8 gallery cars.

## Phase 1 — Foundation
- Enable Cloud and create the schema: businesses, users/profiles, customers, vehicles, services, leads, lead_activities, quotes, quote_items, appointments, messages, follow_ups, automations, automation_runs, notifications. Includes foreign keys, indexes, constraints and RLS (public insert-only through server functions; admin read/write when authenticated).
- Seed data meets the brief's minimums, including the John Smith / 2024 BMW M4 / Ceramic Coating / $1,200 story.
- A server-side "Reset demo" function restores the seeded state.

## Phase 2 — Public website
- Pages: Home (hero "Premium Auto Detailing, Done Right."), Services index plus one page per service (7), Gallery, About, FAQ, Contact. Each page has its own SEO metadata, and the site includes a sitemap and LocalBusiness structured data.
- 5-step quote wizard that creates a real lead, customer, vehicle and activity.
- 6-step booking flow with available time slots that creates a real appointment.
- Floating AI assistant chat grounded in the knowledge file, able to hand off to quote or booking.

## Phase 3 — Admin core
- Sign-in, protected layout, persistent or collapsible sidebar, mobile drawer, and a "DEMO MODE · APEX" banner with Reset.
- Overview ("Good morning, Mike."), KPIs computed from records, recent leads, upcoming appointments, activity feed.
- Leads table with search and filters; drag-and-drop Pipeline Kanban that saves changes; Lead workspace with timeline and actions (Qualify, Quote, Book, Message, Follow-up, Complete).

## Phase 4 — Records and operations
- Customers, Vehicles (service history, next recommended service), Quotes (line items, preview, send/accept/decline), Appointments plus Calendar (day/week/month views, status changes), unified Messages inbox with a customer context panel, Follow-ups.

## Phase 5 — Automation and the demo moment
- Automation Center: 6 automations with a node-style workflow view and Active/Paused toggles.
- "Run Demo": a 20–40 second animated sequence that writes real records step by step, with Skip and Reset.
- Analytics: charts computed only from records, with no ROI figures. Also Services management and Settings, including Integrations.

## Phase 6 — Quality pass
- Run end-to-end tests 1–8 from the brief, including mobile and checks for no overflow, sign-in gating and empty, loading and error states.

## Scope note
This is a very large build. I'll deliver it in the phases above, checking that each phase works before moving on. Phases 1–3 come first so the main sales story works from start to finish early.
