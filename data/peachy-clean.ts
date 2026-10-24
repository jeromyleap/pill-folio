/**
 * Peachy Clean brand brief, used by the Friday card.
 *
 * The brief covers positioning and the palette; it doesn't list a full
 * stack or results, so the card sticks to what it states.
 */

export const peachyBrief = {
  tagline: "Professional Cleaning Services",
  cta: "Visit Peachy Clean",
  summary:
    "A modern, high-touch Progressive Web App for a luxury residential and commercial cleaning service — warm editorial minimalism on the outside, automated scheduling, geospatial dispatch mapping, and dual-role access control underneath.",
  direction: [
    {
      label: "Positioning",
      detail: "Peachy Clean (PeachyCleanSTP) — professional cleaning services with a boutique, high-touch feel.",
    },
    {
      label: "Tone & mood",
      detail:
        "Warm, pristine, tranquil, trustworthy, and effortlessly polished — the calm of an upscale spa, not a clinical industrial service.",
    },
    {
      label: "Design archetype",
      detail: "Warm editorial and organic minimalism, steering clear of cold SaaS blues and harsh clinical whites.",
    },
  ],
  capabilities: [
    {
      title: "Automated scheduling",
      detail: "Scheduling algorithms that book and arrange cleanings automatically.",
    },
    {
      title: "Geospatial dispatch",
      detail: "Geospatial mapping for dispatching cleanings across residential and commercial jobs.",
    },
    {
      title: "Dual-role access",
      detail: "Role-based access control: two roles, each with its own views and permissions, behind one sign-in.",
    },
  ],
  palette: [
    { name: "Warm Cream", role: "Canvas", hex: "#FAF9F6", oklch: "0.98 0.01 85" },
    { name: "Peachy Gold", role: "Primary accent", hex: "#FFCB9A", oklch: "0.85 0.12 65" },
    { name: "French Sage", role: "Secondary", hex: "#B2AC88", oklch: "0.72 0.05 110" },
    { name: "Deep Olive", role: "Headings & text", hex: "#5A5A40", oklch: "0.35 0.05 110" },
    { name: "Pure White", role: "Surface", hex: "#FFFFFF", oklch: "1 0 0" },
    { name: "Alert", role: "Destructive", hex: "#DC2626", oklch: "0.577 0.245 27.3" },
  ],
};
