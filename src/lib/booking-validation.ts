import { TIME_SLOTS } from "./knowledge";

const BUSINESS_TIME_ZONE = "America/Chicago";
const MAX_BOOKING_DAYS_AHEAD = 14;
const WEEKDAY_CLOSE_HOUR = 18;
const SATURDAY_CLOSE_HOUR = 16;
const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const timePattern = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

function dateParts(date: string) {
  const match = datePattern.exec(date);
  if (!match) throw new Error("Choose a valid appointment date.");
  const [, year, month, day] = match;
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (parsed.toISOString().slice(0, 10) !== date) throw new Error("Choose a valid appointment date.");
  return { year: Number(year), month: Number(month), day: Number(day), weekday: parsed.getUTCDay() };
}

function businessDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function bookingDayBounds(date: string) {
  const parts = dateParts(date);
  const nextDay = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 1)).toISOString().slice(0, 10);
  return {
    start: businessLocalToIso(date, "12:00 AM"),
    end: businessLocalToIso(nextDay, "12:00 AM"),
    weekday: parts.weekday,
  };
}

export function validateBookingDate(date: string, now = new Date()) {
  const bounds = bookingDayBounds(date);
  const today = businessDateKey(now);
  const dayDifference = (Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000;
  if (dayDifference < 1 || dayDifference > MAX_BOOKING_DAYS_AHEAD) {
    throw new Error("Choose an appointment date within the next 14 days.");
  }
  return bounds.weekday;
}

export function businessLocalToIso(date: string, label: string) {
  const parts = dateParts(date);
  const match = timePattern.exec(label);
  if (!match) throw new Error("Choose a valid appointment time.");
  const hour12 = Number(match[1]);
  const minute = Number(match[2]);
  if (hour12 < 1 || hour12 > 12 || minute > 59) throw new Error("Choose a valid appointment time.");
  const hour = (hour12 % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
  const targetLocal = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute);
  let instant = targetLocal;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  for (let attempt = 0; attempt < 3; attempt++) {
    const localParts = formatter.formatToParts(new Date(instant));
    const part = (type: string) => Number(localParts.find((item) => item.type === type)?.value);
    const renderedLocal = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
    const adjustment = targetLocal - renderedLocal;
    instant += adjustment;
    if (adjustment === 0) return new Date(instant).toISOString();
  }
  throw new Error("That appointment time is not valid in the business time zone.");
}

export function validateBookingSlot(date: string, time: string, durationHours: number, now = new Date()) {
  const weekday = validateBookingDate(date, now);
  if (weekday === 0) throw new Error("Appointments are not available on Sundays.");

  const slots = weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS;
  if (!slots.includes(time)) throw new Error("Choose an available appointment time.");
  if (!Number.isFinite(durationHours) || durationHours <= 0) throw new Error("The selected service has an invalid duration.");

  const startsAt = businessLocalToIso(date, time);
  const start = new Date(startsAt);
  if (start <= now) throw new Error("Choose a future appointment time.");
  const closeHour = weekday === 6 ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR;
  const closingTime = weekday === 6 ? `${closeHour - 12}:00 PM` : "6:00 PM";
  const closesAt = new Date(businessLocalToIso(date, closingTime));
  if (start.getTime() + durationHours * 3_600_000 > closesAt.getTime()) {
    throw new Error("This service is too long for the selected appointment time.");
  }
  return startsAt;
}

export function isSlotWithinBusinessHours(date: string, time: string, durationHours: number) {
  const { weekday } = bookingDayBounds(date);
  if (weekday === 0 || !Number.isFinite(durationHours) || durationHours <= 0) return false;
  const slots = weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS;
  if (!slots.includes(time)) return false;
  const closeHour = weekday === 6 ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR;
  const closingTime = weekday === 6 ? `${closeHour - 12}:00 PM` : "6:00 PM";
  const start = new Date(businessLocalToIso(date, time)).getTime();
  const end = new Date(businessLocalToIso(date, closingTime)).getTime();
  return start + durationHours * 3_600_000 <= end;
}
