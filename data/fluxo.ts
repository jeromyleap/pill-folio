/**
 * Fluxo brand brief, used by the Thursday card.
 *
 * The brief doesn't list a tech stack or measured results, so the card
 * doesn't claim any. The schedule panel is an illustration of the flow,
 * not a capture of the product.
 */

export const fluxoBrief = {
  tagline: { lead: "Autonomous clinic", accent: "revenue engine." },
  cta: "View live demo",
  facts: [
    { label: "Role", value: "Founder & Full-Stack Architect" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Live demo · Pre-launch waitlist" },
  ],
  flow: [
    { step: "Cancellation lands", detail: "A patient cancels and the slot opens up." },
    { step: "Waitlist matched", detail: "Fluxo reaches out to patients waiting for an earlier visit." },
    { step: "Slot refilled", detail: "The opening is booked again without staff picking up the phone." },
  ],
};

export const fluxoSchedule = [
  { time: "9:00", visit: "Hygiene cleaning" },
  { time: "10:30", visit: "Crown prep", recovered: true },
  { time: "1:15", visit: "New patient exam" },
  { time: "3:45", visit: "Follow-up" },
];

export const fluxoLog = [
  { at: "10:02:14", event: "CANCEL_DETECTED", tag: "slot_1030" },
  { at: "10:02:15", event: "WAITLIST_MATCH", tag: "ENCRYPTED" },
  { at: "10:09:41", event: "SLOT_FILLED", tag: "SECURE_SYNC: ACTIVE" },
];
