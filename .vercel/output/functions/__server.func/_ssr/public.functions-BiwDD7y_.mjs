import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as knowledgeAsText, i as TIME_SLOTS, r as SERVICES, t as BUSINESS } from "./knowledge-B7rJYZvr.mjs";
import { a as numberType, i as literalType, n as coerce, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-BiwDD7y_.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var BUSINESS_TIME_ZONE = "America/Chicago";
var MAX_BOOKING_DAYS_AHEAD = 14;
var WEEKDAY_CLOSE_HOUR = 18;
var SATURDAY_CLOSE_HOUR = 16;
var datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
var timePattern = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
function dateParts(date) {
	const match = datePattern.exec(date);
	if (!match) throw new Error("Choose a valid appointment date.");
	const [, year, month, day] = match;
	const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	if (parsed.toISOString().slice(0, 10) !== date) throw new Error("Choose a valid appointment date.");
	return {
		year: Number(year),
		month: Number(month),
		day: Number(day),
		weekday: parsed.getUTCDay()
	};
}
function businessDateKey(date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: BUSINESS_TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(date);
	const part = (type) => parts.find((item) => item.type === type)?.value ?? "";
	return `${part("year")}-${part("month")}-${part("day")}`;
}
function bookingDayBounds(date) {
	const parts = dateParts(date);
	const nextDay = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 1)).toISOString().slice(0, 10);
	return {
		start: businessLocalToIso(date, "12:00 AM"),
		end: businessLocalToIso(nextDay, "12:00 AM"),
		weekday: parts.weekday
	};
}
function validateBookingDate(date, now = /* @__PURE__ */ new Date()) {
	const bounds = bookingDayBounds(date);
	const today = businessDateKey(now);
	const dayDifference = (Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 864e5;
	if (dayDifference < 1 || dayDifference > MAX_BOOKING_DAYS_AHEAD) throw new Error("Choose an appointment date within the next 14 days.");
	return bounds.weekday;
}
function businessLocalToIso(date, label) {
	const parts = dateParts(date);
	const match = timePattern.exec(label);
	if (!match) throw new Error("Choose a valid appointment time.");
	const hour12 = Number(match[1]);
	const minute = Number(match[2]);
	if (hour12 < 1 || hour12 > 12 || minute > 59) throw new Error("Choose a valid appointment time.");
	const hour = hour12 % 12 + (match[3].toUpperCase() === "PM" ? 12 : 0);
	const targetLocal = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute);
	let instant = targetLocal;
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone: BUSINESS_TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	});
	for (let attempt = 0; attempt < 3; attempt++) {
		const localParts = formatter.formatToParts(new Date(instant));
		const part = (type) => Number(localParts.find((item) => item.type === type)?.value);
		const adjustment = targetLocal - Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
		instant += adjustment;
		if (adjustment === 0) return new Date(instant).toISOString();
	}
	throw new Error("That appointment time is not valid in the business time zone.");
}
function validateBookingSlot(date, time, durationHours, now = /* @__PURE__ */ new Date()) {
	const weekday = validateBookingDate(date, now);
	if (weekday === 0) throw new Error("Appointments are not available on Sundays.");
	if (!(weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS).includes(time)) throw new Error("Choose an available appointment time.");
	if (!Number.isFinite(durationHours) || durationHours <= 0) throw new Error("The selected service has an invalid duration.");
	const startsAt = businessLocalToIso(date, time);
	const start = new Date(startsAt);
	if (start <= now) throw new Error("Choose a future appointment time.");
	const closesAt = new Date(businessLocalToIso(date, weekday === 6 ? `${(weekday === 6 ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR) - 12}:00 PM` : "6:00 PM"));
	if (start.getTime() + durationHours * 36e5 > closesAt.getTime()) throw new Error("This service is too long for the selected appointment time.");
	return startsAt;
}
function isSlotWithinBusinessHours(date, time, durationHours) {
	const { weekday } = bookingDayBounds(date);
	if (weekday === 0 || !Number.isFinite(durationHours) || durationHours <= 0) return false;
	if (!(weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS).includes(time)) return false;
	const closingTime = weekday === 6 ? `${(weekday === 6 ? SATURDAY_CLOSE_HOUR : WEEKDAY_CLOSE_HOUR) - 12}:00 PM` : "6:00 PM";
	const start = new Date(businessLocalToIso(date, time)).getTime();
	const end = new Date(businessLocalToIso(date, closingTime)).getTime();
	return start + durationHours * 36e5 <= end;
}
async function serviceBySlug(db, businessId, slug) {
	const { data, error } = await db.from("services").select("id,name,price_from,duration_hours").eq("business_id", businessId).eq("slug", slug).eq("active", true).maybeSingle();
	if (error) throw new Error("Could not load the requested service.");
	if (!data) throw new Error("Unknown service.");
	return data;
}
function configuredPublicBusinessId() {
	const businessId = process.env["OPERANTSCALE_PUBLIC_BUSINESS_ID"];
	if (!businessId || !stringType().uuid().safeParse(businessId).success) throw new Error("Public business is not configured.");
	return businessId;
}
var contact = objectType({
	firstName: stringType().trim().min(1).max(60),
	lastName: stringType().trim().min(1).max(60),
	email: stringType().trim().email().max(160),
	phone: stringType().trim().min(7).max(30)
});
var vehicle = objectType({
	year: coerce.number().int().min(1950).max(2030),
	make: stringType().trim().min(1).max(40),
	model: stringType().trim().min(1).max(60),
	color: stringType().trim().max(40).default("")
});
var quoteSchema = objectType({
	contact,
	vehicle,
	serviceSlug: stringType().max(60),
	preferredDate: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(literalType("")).refine((value) => !value || !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) && (/* @__PURE__ */ new Date(`${value}T00:00:00Z`)).toISOString().slice(0, 10) === value, "Choose a valid preferred date."),
	preferredTime: stringType().max(30).optional(),
	condition: stringType().max(40).optional(),
	notes: stringType().max(1e3).optional()
});
var submitQuoteRequest_createServerFn_handler = createServerRpc({
	id: "6caef2925de9e4e98c5044614bc5c918b332ef423a5a3d6cd6cd0e080281ab64",
	name: "submitQuoteRequest",
	filename: "src/lib/public.functions.ts"
}, (opts) => submitQuoteRequest.__executeServer(opts));
var submitQuoteRequest = createServerFn({ method: "POST" }).inputValidator((d) => quoteSchema.parse(d)).handler(submitQuoteRequest_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin: db } = await import("./client.server-KzwUIAkW.mjs");
	const businessId = configuredPublicBusinessId();
	const { data: result, error } = await db.rpc("submit_public_quote_request", {
		p_business_id: businessId,
		p_contact: data.contact,
		p_vehicle: data.vehicle,
		p_service_slug: data.serviceSlug,
		p_preferred_date: data.preferredDate || null,
		p_preferred_time: data.preferredTime || null,
		p_condition: data.condition || void 0,
		p_notes: data.notes ?? ""
	});
	if (error || !result) {
		console.error("[Public intake] Quote request failed", error?.code ?? "empty result");
		throw new Error("We couldn't submit your request. Please try again.");
	}
	const parsed = objectType({
		leadId: stringType().uuid(),
		service: stringType(),
		estimate: numberType().int()
	}).safeParse(result);
	if (!parsed.success) throw new Error("We couldn't submit your request. Please try again.");
	return parsed.data;
});
var getAvailability_createServerFn_handler = createServerRpc({
	id: "86129e4c7268f8be0cdf7a195a2f9016ecee01b3146fb26228660942afd10124",
	name: "getAvailability",
	filename: "src/lib/public.functions.ts"
}, (opts) => getAvailability.__executeServer(opts));
var getAvailability = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	date: stringType(),
	serviceSlug: stringType().max(60)
}).parse(d)).handler(getAvailability_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin: db } = await import("./client.server-KzwUIAkW.mjs");
	const businessId = configuredPublicBusinessId();
	const weekday = validateBookingDate(data.date);
	if (weekday === 0) return {
		slots: [],
		closed: true
	};
	const svc = await serviceBySlug(db, businessId, data.serviceSlug);
	const bounds = bookingDayBounds(data.date);
	const { data: rows, error } = await db.from("appointments").select("starts_at,duration_hours").eq("business_id", businessId).gte("starts_at", bounds.start).lt("starts_at", bounds.end).not("status", "in", "(cancelled,no_show)");
	if (error) throw new Error("Could not load appointment availability.");
	return {
		slots: (weekday === 6 ? TIME_SLOTS.slice(1, 3) : TIME_SLOTS).map((time) => {
			if (!isSlotWithinBusinessHours(data.date, time, svc.duration_hours)) return {
				time,
				available: false
			};
			const start = new Date(validateBookingSlot(data.date, time, svc.duration_hours));
			const end = start.getTime() + svc.duration_hours * 36e5;
			return {
				time,
				available: !(rows ?? []).some((appointment) => {
					const appointmentStart = new Date(appointment.starts_at).getTime();
					const appointmentEnd = appointmentStart + appointment.duration_hours * 36e5;
					return start.getTime() < appointmentEnd && appointmentStart < end;
				})
			};
		}),
		closed: false
	};
});
var bookingSchema = objectType({
	contact,
	vehicle,
	serviceSlug: stringType().max(60),
	date: stringType(),
	time: stringType().max(20),
	notes: stringType().max(1e3).optional()
});
var createBooking_createServerFn_handler = createServerRpc({
	id: "4d793d084f61da582101050f1afa312a70d12c1f84d8b3fe4c193412e1cacbd7",
	name: "createBooking",
	filename: "src/lib/public.functions.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).inputValidator((d) => bookingSchema.parse(d)).handler(createBooking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin: db } = await import("./client.server-KzwUIAkW.mjs");
	const businessId = configuredPublicBusinessId();
	const svc = await serviceBySlug(db, businessId, data.serviceSlug);
	const startsAt = validateBookingSlot(data.date, data.time, svc.duration_hours);
	const { data: result, error } = await db.rpc("submit_public_booking_request", {
		p_business_id: businessId,
		p_contact: data.contact,
		p_vehicle: data.vehicle,
		p_service_slug: data.serviceSlug,
		p_date: data.date,
		p_time: data.time,
		p_starts_at: startsAt,
		p_notes: data.notes ?? ""
	});
	if (error || !result) {
		if (error?.message.includes("just booked")) throw new Error("That time was just booked. Please choose another slot.");
		console.error("[Public intake] Appointment request failed", error?.code ?? "empty result");
		throw new Error("We couldn't submit your appointment request. Please try again.");
	}
	const parsed = objectType({
		appointmentId: stringType().uuid(),
		location: stringType(),
		service: stringType()
	}).safeParse(result);
	if (!parsed.success) throw new Error("We couldn't submit your appointment request. Please try again.");
	return parsed.data;
});
function demoReply(history) {
	const last = history[history.length - 1]?.content.toLowerCase() ?? "";
	const svc = SERVICES.find((s) => last.includes(s.name.toLowerCase().split(" ")[0]) || last.includes(s.slug.split("-")[0])) ?? (last.includes("coat") ? SERVICES[1] : last.includes("ppf") || last.includes("film") ? SERVICES[3] : last.includes("swirl") || last.includes("polish") ? SERVICES[2] : void 0);
	const car = last.match(/(20\d\d)\s+([a-z-]+)\s+([a-z0-9-]+)/i);
	if (/(friday|monday|tuesday|wednesday|thursday|saturday|tomorrow|available|availability|book|appointment|schedule)/.test(last)) return {
		reply: "Let me help you find an available appointment. Our studio has openings at 8:00 AM, 10:00 AM, 1:00 PM and 3:00 PM on weekdays. Tap **Book appointment** below to pick a time.",
		action: "book"
	};
	if (/hour|open|close/.test(last)) return {
		reply: `We're open ${BUSINESS.hours.map((h) => `${h.day}: ${h.time}`).join(" · ")}.`,
		action: null
	};
	if (svc && /(how much|price|cost|\$)/.test(last)) {
		const who = car ? `vehicles like the ${car[2][0].toUpperCase()}${car[2].slice(1)} ${car[3].toUpperCase()}` : "most vehicles";
		return {
			reply: `Our ${svc.name.toLowerCase()} packages for ${who} start around $${svc.priceFrom}. The final recommendation depends on the condition of the paint. Would you like to request a quote?`,
			action: "quote"
		};
	}
	if (svc && /(how long|duration|time)/.test(last)) return {
		reply: `${svc.name} typically takes about ${svc.durationHours} hours. Larger vehicles or paint that needs correction can take longer.`,
		action: null
	};
	if (svc) return {
		reply: `**${svc.name}** — ${svc.description} It starts at $${svc.priceFrom} and takes about ${svc.durationHours} hours. Would you like a quote?`,
		action: "quote"
	};
	if (/prepare|before/.test(last)) return {
		reply: "Just remove personal items from the cabin and trunk — no need to wash beforehand. Decontamination is part of every service.",
		action: null
	};
	return {
		reply: "I can help with services, pricing ranges, timing, preparation and booking. For example: *“How much is ceramic coating on a 2024 BMW M4?”*",
		action: null
	};
}
var askAssistant_createServerFn_handler = createServerRpc({
	id: "89ac62f1516609b9e1b35c7159f82ca06a5c6c5a4d11e54d32c6b142adcb06ef",
	name: "askAssistant",
	filename: "src/lib/public.functions.ts"
}, (opts) => askAssistant.__executeServer(opts));
var askAssistant = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ messages: arrayType(objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().max(2e3)
})).min(1).max(30) }).parse(d)).handler(askAssistant_createServerFn_handler, async ({ data }) => {
	const key = process.env["LOVABLE_API_KEY"];
	if (!key) return {
		...demoReply(data.messages),
		mode: "demo"
	};
	try {
		const system = `You are the virtual assistant for ${BUSINESS.name} in Dallas, TX. Answer ONLY using the knowledge below. If the answer isn't in it, say you're not sure and offer to connect them with the team. Be concise (2-4 sentences), warm and professional. Quote prices as "starting around" ranges and note the final price depends on paint condition. Never invent availability; say you can help find a time. End your message with the tag [ACTION:quote] if the customer should request a quote, [ACTION:book] if they want to schedule, or nothing otherwise.\n\nKNOWLEDGE:\n${knowledgeAsText()}`;
		const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
			method: "POST",
			headers: {
				"Lovable-API-Key": key,
				Authorization: `Bearer ${key}`,
				"X-Lovable-AIG-SDK": "fetch",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: "openai/gpt-6-astra",
				instructions: system,
				input: data.messages.map((m) => ({
					role: m.role,
					content: m.content
				})),
				reasoning: { effort: "low" },
				store: false,
				stream: true
			})
		});
		if (!res.ok || !res.body) throw new Error(`gateway ${res.status}`);
		const reader = res.body.getReader();
		const dec = new TextDecoder();
		let buf = "";
		let text = "";
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			buf += dec.decode(value, { stream: true });
			const lines = buf.split("\n");
			buf = lines.pop() ?? "";
			for (const line of lines) {
				if (!line.startsWith("data:")) continue;
				const payload = line.slice(5).trim();
				if (!payload || payload === "[DONE]") continue;
				try {
					const ev = JSON.parse(payload);
					if (ev.type === "response.output_text.delta" && ev.delta) text += ev.delta;
				} catch {}
			}
		}
		text = text.trim();
		if (!text) throw new Error("empty");
		let action = null;
		const m = text.match(/\[ACTION:(quote|book)\]/i);
		if (m) {
			action = m[1].toLowerCase();
			text = text.replace(m[0], "").trim();
		}
		return {
			reply: text,
			action,
			mode: "ai"
		};
	} catch (e) {
		console.error("assistant fallback", e);
		return {
			...demoReply(data.messages),
			mode: "demo"
		};
	}
});
//#endregion
export { askAssistant_createServerFn_handler, createBooking_createServerFn_handler, getAvailability_createServerFn_handler, submitQuoteRequest_createServerFn_handler };
