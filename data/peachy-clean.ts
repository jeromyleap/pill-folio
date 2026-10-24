/**
 * Peachy Clean brand brief, used by the Friday card.
 *
 * Palette tokens come from the brief. Heading/body faces match the live
 * site (editorial serif + Geist); the brief did not name typefaces.
 */

export const peachyDesign = {
  colors: [
    { name: "Warm Cream", hex: "#FAF9F6" },
    { name: "Peachy Gold", hex: "#FFCB9A" },
    { name: "French Sage", hex: "#B2AC88" },
    { name: "Deep Olive", hex: "#5A5A40" },
  ],
  fonts: [
    { name: "Georgia", role: "Headings", className: "font-peachy-serif" },
    { name: "Geist", role: "Body & UI", className: "font-peachy-sans font-semibold" },
  ],
} as const;

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
};
