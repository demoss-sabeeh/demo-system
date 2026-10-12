import { describe, expect, it } from "vitest";
import { bookingDayBounds, businessLocalToIso, isSlotWithinBusinessHours, validateBookingSlot } from "@/lib/booking-validation";

const now = new Date("2026-10-12T12:00:00.000Z");

describe("public booking validation", () => {
  it("converts business-local times correctly across daylight-saving offsets", () => {
    expect(businessLocalToIso("2026-10-13", "8:00 AM")).toBe("2026-10-13T13:00:00.000Z");
    expect(businessLocalToIso("2026-11-03", "8:00 AM")).toBe("2026-11-03T14:00:00.000Z");
    expect(bookingDayBounds("2026-10-13")).toEqual({
      start: "2026-10-13T05:00:00.000Z",
      end: "2026-10-14T05:00:00.000Z",
      weekday: 2,
    });
    expect(Date.parse(bookingDayBounds("2026-11-01").end) - Date.parse(bookingDayBounds("2026-11-01").start)).toBe(25 * 3_600_000);
    expect(Date.parse(bookingDayBounds("2026-03-08").end) - Date.parse(bookingDayBounds("2026-03-08").start)).toBe(23 * 3_600_000);
  });

  it("allows only future slots in the configured booking window and weekly schedule", () => {
    expect(validateBookingSlot("2026-10-13", "8:00 AM", 4, now)).toBe("2026-10-13T13:00:00.000Z");
    expect(() => validateBookingSlot("2026-10-27", "8:00 AM", 2, now)).toThrow("within the next 14 days");
    expect(() => validateBookingSlot("2026-10-12", "1:00 PM", 2, now)).toThrow("within the next 14 days");
    expect(() => validateBookingSlot("2026-10-18", "10:00 AM", 2, now)).toThrow("Sundays");
    expect(() => validateBookingSlot("2026-10-13", "9:00 AM", 2, now)).toThrow("available appointment time");
    expect(() => validateBookingSlot("2026-10-33", "8:00 AM", 2, now)).toThrow("valid appointment date");
  });

  it("rejects times that would run past closing, including long services", () => {
    expect(isSlotWithinBusinessHours("2026-10-17", "10:00 AM", 6.5)).toBe(false);
    expect(isSlotWithinBusinessHours("2026-10-17", "1:00 PM", 3)).toBe(true);
    expect(() => validateBookingSlot("2026-10-17", "1:00 PM", 4, now)).toThrow("too long");
    expect(isSlotWithinBusinessHours("2026-10-13", "8:00 AM", 12)).toBe(false);
  });
});
