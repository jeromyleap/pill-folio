/**
 * HealthScout brand brief, used by the Wednesday card.
 *
 * The live demo is a Google AI Studio preview deployment; swap `liveUrl`
 * in data/projects.ts when a production domain exists.
 */

export const healthScoutDesign = {
  colors: [
    { name: "Primary emerald", hex: "#059669" },
    { name: "Accent emerald", hex: "#10b981" },
    { name: "Zinc 950", hex: "#09090b" },
    { name: "Slate canvas", hex: "#f8fafc" },
  ],
  fonts: [
    { name: "Inter", role: "Primary UI", className: "font-healthscout font-semibold" },
  ],
} as const;

export const healthScoutCaseStudy = {
  role: "Lead Full-Stack Architect & Product Designer",
  cta: "Open live demo",
  audience: [
    "Travel nurses",
    "Pharmacy techs",
    "Radiology techs",
    "Surgical techs",
    "Allied health",
    "Clinical recruiters",
  ],
  problem:
    "Travel clinicians accept 13-week contracts at unfamiliar facilities with incomplete or misleading information about floor ratios, culture, break coverage, charting systems, and physical safety. Generic employer review sites lump every healthcare worker together and miss the realities of each profession.",
  solution:
    "HealthScout is a community rating and intelligence platform for traveling clinicians: ratings calibrated to each specialty, verified contract submissions, recruiter reputation tracking, safety advisories, and an admin moderation portal.",
  disciplines: [
    {
      id: "rn",
      label: "RN / Nursing",
      criteria: ["Patient-to-nurse ratios", "CNA and tech support", "Break relief policies"],
    },
    {
      id: "pharmacy",
      label: "Pharmacy techs",
      criteria: ["Cleanroom airflow standards", "Pyxis / Omnicell inventory accuracy", "Restock velocity"],
    },
    {
      id: "radiology",
      label: "Radiology",
      criteria: ["PACS / EMR integration", "Modality maintenance", "On-call expectations"],
    },
  ],
  features: [
    {
      title: "Verified worker badges",
      detail: "A state license and assignment verification workflow puts a trust badge on community reviews.",
    },
    {
      title: "Facility directory",
      detail: "Search hospitals by trauma level, bed count, charting system (Epic, Cerner, Meditech), and state.",
    },
    {
      title: "Recruiter accountability",
      detail: "Traveler ratings on pay transparency, stipends, and communication once on assignment.",
    },
    {
      title: "Moderation portal",
      detail: "Restricted admin tools for reviewer verification triage, report moderation, and facility management.",
    },
    {
      title: "AI review synthesis",
      detail: "Gemini summarizes reviews and reads safety sentiment across a facility's reports.",
    },
    {
      title: "Built for shift breaks",
      detail: "Card layouts tuned for reading and posting on a phone between patients.",
    },
  ],
  stack: [
    {
      group: "Frontend",
      items: ["React 19", "TypeScript 5.8", "Vite 6.2", "Tailwind CSS v4", "Motion 12", "Lucide"],
    },
    {
      group: "Backend & AI",
      items: ["Node.js", "Express 4.21", "tsx", "Google Gemini API"],
    },
    {
      group: "Data",
      items: ["Cloud Firestore", "react-firebase-hooks", "better-sqlite3"],
    },
  ],
};
