/**
 * Wristed brand brief, used by the Tuesday card.
 *
 * Accuracy rules from the brief: present Wristed as a web app, don't claim
 * automatic watch syncing or universal device support, don't promise
 * speed, pricing, or that every design is freshly generated (results are
 * cached by color and style), and don't list planned upgrades as shipped.
 */

export const wristedBrand = {
  colors: {
    background: "#272A32",
    raised: "#2C2F38",
    accent: "#7B5CFA",
    violet: "#8B5CF6",
    lavender: "#C4B5FD",
    softViolet: "#A78BFA",
    pink: "#EC4899",
    text: "#F1F5F9",
    supporting: "#A8B0BD",
    muted: "#8C95A3",
    border: "rgba(255,255,255,0.10)",
  },
  ctaGradient: "linear-gradient(135deg, #8B5CF6, #7B5CFA)",
  headlineGradient: "linear-gradient(90deg, #C4B5FD, #A78BFA, #EC4899)",
};

export const wristedCaseStudy = {
  tagline: "Your AI Stylist for Your Wrist.",
  cta: "View live app",
  overview:
    "Wristed brings personal style to smartwatch customization. Upload an outfit photo, and AI analyzes its colors and mood to create coordinated watch face artwork. The full-stack web app combines multimodal AI, image generation, subscription billing, and a community style gallery in a fashion-focused experience.",
  howItWorks: [
    { step: "Upload your fit", detail: "Snap or pick a photo of today's outfit." },
    { step: "Get styled", detail: "AI reads the colors and mood of your look." },
    {
      step: "Wear it",
      detail: "Download a design and set it as a photo watch face in your watch's companion app.",
    },
  ],
  features: [
    {
      title: "Outfit-matched artwork",
      detail: "Photo analysis feeds coordinated watch face artwork built around your outfit's palette.",
    },
    {
      title: "Square and circular previews",
      detail: "Each styling session lays out five designs on both watch shapes before you download.",
    },
    {
      title: "Restyle your way",
      detail: "Restyle a session and nudge the aesthetic until it feels like your style.",
    },
    {
      title: "Community style gallery",
      detail: "Share looks, follow other stylists, comment, and save designs into collections.",
    },
  ],
  engineering: [
    "Multimodal pipeline: GPT-4o reads the outfit photo, gpt-image-1 paints the artwork.",
    "Candidate designs generate in parallel within a styling session.",
    "Color- and style-based caching keeps AI costs in check, with tier-aware usage and cache policies.",
    "Relational modeling in PostgreSQL and Drizzle for follows, comments, and collections.",
    "Full-stack integration across UI, REST APIs, database, object storage, and Stripe billing.",
  ],
  stack: [
    {
      group: "Frontend",
      items: [
        "React 18",
        "TypeScript",
        "Vite 7",
        "Wouter",
        "TanStack Query 5",
        "Tailwind CSS 3",
        "shadcn/ui · Radix",
        "Framer Motion",
        "React Hook Form · Zod",
      ],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express 5", "TypeScript", "REST · shared validation", "PostgreSQL", "Drizzle ORM"],
    },
    {
      group: "AI & infrastructure",
      items: [
        "OpenAI API",
        "GPT-4o",
        "gpt-image-1",
        "Object Storage",
        "Stripe",
        "Replit Autoscale",
        "Replit Auth · OIDC",
      ],
    },
  ],
  note: "Designs are image backgrounds for compatible photo watch faces, applied through your watch's companion app. They aren't watch apps or complications.",
};

/** Illustrative looks for the preview strip, not real app output. */
export const wristedLooks = [
  {
    name: "Aurora",
    outfit: ["#3b2a6b", "#8B5CF6", "#e9e3ff"],
    art: "radial-gradient(120% 90% at 20% 15%, #C4B5FD 0%, transparent 45%), radial-gradient(90% 80% at 85% 90%, #EC4899 0%, transparent 50%), linear-gradient(160deg, #3b1f8f, #694CFA 55%, #1d1640)",
  },
  {
    name: "Denim",
    outfit: ["#2f4a73", "#9cb8d9", "#f4f1ea"],
    art: "radial-gradient(100% 70% at 75% 20%, #cfe0f2 0%, transparent 50%), repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 6px, transparent 6px 14px), linear-gradient(200deg, #5b7fb0, #2a3f63)",
  },
  {
    name: "Blush",
    outfit: ["#f5c6d6", "#c96b8f", "#fff4ec"],
    art: "radial-gradient(80% 80% at 30% 30%, #ffe3ec 0%, transparent 55%), radial-gradient(70% 70% at 80% 80%, #EC4899 0%, transparent 60%), linear-gradient(150deg, #f7b7cc, #b6457a)",
  },
  {
    name: "Citrus",
    outfit: ["#f2b632", "#e2632b", "#1f2a24"],
    art: "radial-gradient(60% 60% at 70% 30%, #ffe08a 0%, transparent 60%), conic-gradient(from 200deg at 30% 75%, #e2632b, #f2b632, #e2632b)",
  },
  {
    name: "Sage",
    outfit: ["#8fa98a", "#e8e1cf", "#4a5a46"],
    art: "radial-gradient(90% 60% at 50% 0%, #dfe9d6 0%, transparent 60%), repeating-radial-gradient(circle at 50% 120%, rgba(255,255,255,0.08) 0 4px, transparent 4px 12px), linear-gradient(180deg, #8fa98a, #3f4f3c)",
  },
];
