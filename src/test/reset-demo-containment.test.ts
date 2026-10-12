import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const src = path.join(root, "src");
const migration = readFileSync(path.join(root, "drizzle/migrations/0002_contain_demo_reset.sql"), "utf8");

function applicationFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return applicationFiles(fullPath);
    return /\.(ts|tsx)$/.test(entry.name) && !/\.(test|spec)\.(ts|tsx)$/.test(entry.name)
      ? [fullPath]
      : [];
  });
}

describe("demo reset containment", () => {
  it("removes every application reference to the global reset RPC", () => {
    const references = applicationFiles(src).filter((file) => /reset_demo|resetDemo/.test(readFileSync(file, "utf8")));
    expect(references).toEqual([]);
  });

  it("revokes ordinary execution and drops the destructive function without changing data", () => {
    expect(migration).toMatch(/revoke all privileges on function public\.reset_demo\(\) from public, anon, authenticated/i);
    expect(migration).toMatch(/drop function public\.reset_demo\(\)/i);
    expect(migration).not.toMatch(/\b(truncate|delete\s+from|insert\s+into|update\s+\w+)\b/i);
  });

  it("leaves normal record actions available", () => {
    const actions = readFileSync(path.join(src, "lib/actions.ts"), "utf8");
    for (const action of ["setLeadStatus", "createQuote", "bookAppointment", "setAppointmentStatus", "deleteCustomer", "deleteVehicle"]) {
      expect(actions).toMatch(new RegExp(`(?:function\\s+${action}\\b|const\\s+${action}\\s*=)`));
    }
  });
});
