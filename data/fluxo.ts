/**
 * Fluxo brand brief, used by the Thursday card.
 *
 * Fluxo is pre-launch, so revenue and time-saved figures are presented as
 * the owner's projections, not measured results. The schedule panel is an
 * illustration of the flow, not a capture of the product.
 */

export const fluxoDesign = {
  colors: [
    { name: "Turquoise primary", hex: "#40E0D0" },
    { name: "Grey 950", hex: "#0B0F19" },
    { name: "Grey 900", hex: "#111827" },
    { name: "White", hex: "#FFFFFF" },
  ],
  fonts: [
    { name: "Inter", role: "Primary UI", className: "font-fluxo font-bold" },
    { name: "SF Mono", role: "Logs & metrics", className: "font-mono" },
  ],
} as const;

export const fluxoBrief = {
  tagline: { lead: "Autonomous clinic", accent: "revenue engine." },
  role: "Founder, Lead Product Engineer & System Architect",
  status: "Live demo · Pre-launch waitlist",
  cta: "View live demo",
  audience: "Medical & dental outpatient clinics",
};

export const fluxoCaseStudy = {
  problem: [
    "Outpatient medical and dental clinics see an average 12–18% cancellation and no-show rate.",
    "Every open 45-minute chair or specialty consult is $200–$450 in revenue that doesn't come back.",
    "Receptionists spend 2–3 hours a day dialing a paper waitlist, stuck in phone tag.",
    "By the time someone says yes, the slot has often already passed.",
  ],
  solution: [
    {
      step: "Listens",
      detail: "Subscribes to calendar webhooks from athenahealth, Epic, and Dentrix through the Model Context Protocol.",
    },
    {
      step: "Evaluates",
      detail: "Finds priority waitlisted patients who match provider availability, procedure length, and insurance.",
    },
    {
      step: "Dispatches",
      detail: "Texts those patients a conversational offer for the earliest open slot.",
    },
    {
      step: "Confirms & writes back",
      detail: "The first patient to confirm is booked straight into the EHR, locking the calendar with no human in the loop.",
    },
  ],
  pipeline: [
    "Patient cancels",
    "EHR webhook · athenahealth-mcp",
    "Keragon HIPAA orchestrator",
    "LLM priority reasoning",
    "Twilio SMS waitlist blast",
    "Patient replies “YES”",
    "Direct EHR calendar write",
  ],
  pipelineNote: "Target: slot filled in under 60 seconds.",
  decisions: [
    {
      title: "HIPAA and zero-PII exposure",
      detail:
        "Patient identifiers are tokenized and anonymized before anything reaches the reasoning model, so PHI never streams to a third-party LLM. Data is encrypted with AES-256 at rest and TLS 1.3 in transit, backed by Business Associate Agreements.",
    },
    {
      title: "MCP instead of months of EHR integration",
      detail:
        "A forked athenahealth-mcp server gives the agent a standard tool interface — get_open_slots(), query_waitlist(), book_appointment() — called deterministically instead of custom REST mapping per vendor.",
    },
    {
      title: "Agents that pay their own way",
      detail:
        "With the x402 protocol on Base, the agent holds a non-custodial USDC wallet and settles its own SMS routes, data enrichment, and compute per successful event, instead of the founder prepaying every API.",
    },
  ],
  features: [
    {
      title: "Revenue loss calculator",
      detail: "Sliders for cancellations per week and revenue per appointment, with loss = cancellations × 4 × revenue updating live.",
    },
    {
      title: "Agent activity ticker",
      detail: "A simulated live feed of cancellation alerts, waitlist outreach, and auto-booking playing out in about 45 seconds.",
    },
    {
      title: "Founder operations dashboard",
      detail: "Mission control for Base USDC agent fuel, x402 billing status, and real-time lead capture.",
    },
    {
      title: "Three-tier pricing",
      detail: "Starter at $49/mo + $15 per filled slot, Autonomous at $99/mo + $10 per filled slot, and custom Enterprise licensing.",
    },
  ],
  impact: [
    { value: "15–25", label: "filled slots / month" },
    { value: "$3.75k–$7.5k", label: "revenue restored / month" },
    { value: "~45 hrs", label: "phone tag saved / month" },
    { value: "1 slot", label: "covers the subscription" },
  ],
  stack: [
    {
      group: "Product",
      items: ["React 19", "TypeScript", "Vite 6", "Tailwind CSS v4", "Motion", "Lucide"],
    },
    {
      group: "Agent & EHR",
      items: ["Model Context Protocol", "athenahealth-mcp", "Keragon", "Claude 3.7", "Gemini 2.5", "Twilio"],
    },
    {
      group: "Growth & payments",
      items: ["Clay · Claygent", "Artisan Ava", "x402 protocol", "Base · USDC"],
    },
    {
      group: "Runtime",
      items: ["Node.js", "Express", "Docker", "Railway", "Google Cloud Run"],
    },
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
  { at: "10:02:58", event: "SLOT_FILLED", tag: "SECURE_SYNC: ACTIVE" },
];
