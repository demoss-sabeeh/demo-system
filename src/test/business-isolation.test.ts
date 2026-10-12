import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const migration = readFileSync(path.join(root, "drizzle/migrations/0003_business_data_isolation.sql"), "utf8");
const intakeMigration = readFileSync(path.join(root, "drizzle/migrations/0004_atomic_public_intake.sql"), "utf8");
const policyTest = readFileSync(path.join(root, "drizzle/tests/0003_business_data_isolation.sql"), "utf8");
const publicFunctions = readFileSync(path.join(root, "src/lib/public.functions.ts"), "utf8");
const intake = readFileSync(path.join(root, "src/lib/intake.server.ts"), "utf8");
const adminRoute = readFileSync(path.join(root, "src/routes/_authenticated/admin.tsx"), "utf8");
const automationsRoute = readFileSync(path.join(root, "src/routes/_authenticated/admin.automations.tsx"), "utf8");
const quoteRoute = readFileSync(path.join(root, "src/routes/quote.tsx"), "utf8");
const viteConfig = readFileSync(path.join(root, "vite.config.ts"), "utf8");
const packageJson = readFileSync(path.join(root, "package.json"), "utf8");

const businessTables = [
  "services",
  "customers",
  "vehicles",
  "leads",
  "lead_activities",
  "quotes",
  "quote_items",
  "appointments",
  "messages",
  "follow_ups",
  "automations",
  "automation_runs",
  "notifications",
];

describe("business data isolation", () => {
  it("adds deny-by-default ownership policies for each business table", () => {
    expect(migration).toContain("create table public.business_members");
    expect(migration).toContain("constraint business_members_one_business_per_user_key unique (user_id)");
    expect(migration).toContain("where user_id = auth.uid()");
    for (const table of businessTables) {
      expect(migration).toContain(`'${table}'`);
    }
    expect(migration.match(/create policy "Business member select"/g)).toHaveLength(1);
    expect(migration.match(/create policy "Business member insert"/g)).toHaveLength(1);
    expect(migration.match(/create policy "Business member update"/g)).toHaveLength(1);
    expect(migration.match(/create policy "Business member delete"/g)).toHaveLength(1);
    expect(migration).toContain("using (business_id = (select public.current_business_id()))");
    expect(migration).toContain("with check (business_id = (select public.current_business_id()))");
  });

  it("leaves historical rows unassigned and enforces same-business relationships", () => {
    expect(migration).toMatch(/add column business_id uuid references public\.businesses\(id\)/i);
    expect(migration).not.toMatch(/update public\.\w+\s+set business_id/i);
    expect(migration).not.toMatch(/add column business_id uuid not null/i);
    for (const table of [
      "vehicles_business_customer_fkey",
      "leads_business_customer_fkey",
      "lead_activities_business_lead_fkey",
      "quotes_business_customer_fkey",
      "quote_items_business_quote_fkey",
      "appointments_business_customer_fkey",
      "messages_business_customer_fkey",
      "follow_ups_business_customer_fkey",
      "automation_runs_business_automation_fkey",
    ]) {
      expect(migration).toContain(table);
    }
  });

  it("scopes privileged public operations to server configuration", () => {
    expect(publicFunctions).toContain('process.env["OPERANTSCALE_PUBLIC_BUSINESS_ID"]');
    expect(publicFunctions).toContain("z.string().uuid().safeParse(businessId)");
    expect(publicFunctions).not.toMatch(/data\.business_id|data\.businessId/);
    expect(publicFunctions).toContain('.eq("business_id", businessId)');
    expect(intake).toContain('.eq("business_id", businessId)');
    expect(intake).not.toMatch(/\.from\("customers"\)\s*\.select\(/);
    expect(intake).not.toMatch(/\.ilike\("email"|\.from\("customers"\)[\s\S]*?\.update\(/);
  });

  it("does not expose production demo writes or claim simulated messages were sent", () => {
    expect(adminRoute).not.toContain("RunDemoButton");
    expect(automationsRoute).not.toContain("RunDemoButton");
    expect(publicFunctions).not.toContain("runInstantResponse");
    expect(publicFunctions).not.toMatch(/\.from\("messages"\)\.insert/);
    expect(intakeMigration).toContain("'requested'");
    expect(intakeMigration).toContain("'New appointment request'");
    expect(quoteRoute).not.toContain("instant confirmation by text");
  });

  it("routes public writes through atomic server-role-only database functions", () => {
    expect(publicFunctions).toContain('db.rpc("submit_public_quote_request"');
    expect(publicFunctions).toContain('db.rpc("submit_public_booking_request"');
    expect(publicFunctions).not.toMatch(/\.from\("(customers|vehicles|leads|appointments|notifications|lead_activities)"\)\s*\.insert/);
    expect(intakeMigration).toContain("pg_advisory_xact_lock");
    expect(intakeMigration).toContain("appointments_prevent_overlap");
    expect(intakeMigration).toContain("set search_path = pg_catalog, public");
    expect(intakeMigration).toMatch(/revoke all privileges on function public\.submit_public_quote_request[\s\S]*from public, anon, authenticated/i);
    expect(intakeMigration).toMatch(/revoke all privileges on function public\.submit_public_booking_request[\s\S]*from public, anon, authenticated/i);
    expect(intakeMigration).toMatch(/grant execute on function public\.submit_public_quote_request[\s\S]*to service_role/i);
    expect(intakeMigration).toMatch(/grant execute on function public\.submit_public_booking_request[\s\S]*to service_role/i);
    expect(policyTest).toContain("Failed public quote left a partial customer record");
    expect(policyTest).toContain("Overlapping appointment was permitted");
  });

  it("provides disposable-database tests for negative operations on all owned tables", () => {
    for (const table of businessTables) {
      expect(policyTest).toContain(`'${table}'`);
    }
    expect(policyTest).toContain("Cross-business SELECT was permitted");
    expect(policyTest).toContain("Cross-business UPDATE was permitted");
    expect(policyTest).toContain("Cross-business DELETE affected rows");
    expect(policyTest).toContain("Business or membership SELECT isolation failed");
    expect(policyTest.match(/assert_denied\(\$query\$/g)).toHaveLength(businessTables.length + 8);
    expect(policyTest).toContain("Cross-business relationship was permitted");
    expect(policyTest).toContain("CRUD service");
    expect(policyTest).toContain("update public.quotes set status = 'sent'");
    expect(policyTest).toContain("delete from public.appointments where id = _appointment");
    expect(policyTest.trimEnd().endsWith("rollback;")).toBe(true);
  });

  it("targets Nitro's Vercel preset and supported Node 24 runtime", () => {
    expect(viteConfig).toContain('preset: "vercel"');
    expect(packageJson).toContain('"node": ">=24.0 <25"');
  });
});
