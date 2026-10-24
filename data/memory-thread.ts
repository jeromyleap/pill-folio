/**
 * The Memory Thread brand brief, used by the Monday card.
 *
 * Voice: poetic but grounded, no corporate hype. Traction figures come
 * straight from the owner's brief; update them here when they change.
 */

export const memoryThreadDesign = {
  colors: [
    { name: "Deep midnight", hex: "#020617" },
    { name: "Parchment", hex: "#f5f5f4" },
    { name: "Antique bronze", hex: "#c5ad7e" },
    { name: "Candle glow", hex: "#f59e0b" },
  ],
  fonts: [
    { name: "Playfair Display", role: "Headings & quotes", className: "font-memory-serif" },
    { name: "Inter", role: "Body & UI", className: "font-memory-sans" },
    { name: "Great Vibes", role: "Inscriptions", className: "font-memory-script text-2xl leading-none" },
  ],
} as const;

export const memoryThreadCaseStudy = {
  tagline: "Built for quiet moments.",
  inscription: "Preserved in light",
  cta: "Visit the sanctuary",
  summary:
    "The Memory Thread is an installable Progressive Web App and living family archive where families keep voices, stories, milestone celebrations, and memorials. It's a quiet alternative to ephemeral social feeds and to rented audio-guestbook phones: guests scan a tableside QR code and record a 30-second voice message, add photos, dedicate a Spotify song, or light a virtual candle.",
  stats: [
    { value: "1,200+", label: "families hosted" },
    { value: "14", label: "SEO article funnels" },
    { value: "100%", label: "ad-free" },
    { value: "<1.5s", label: "initial payload" },
  ],
  pillars: [
    {
      title: "The rotary-phone alternative",
      detail:
        "Replaces the $300 vintage-phone guestbook rental at weddings, anniversaries, and retirements. No shipping box, no dead batteries, no line at the reception — guests record on their own phones.",
    },
    {
      title: "A multi-sensory tapestry",
      detail:
        "Each thread weaves voice waveforms, Polaroid-style galleries, silent cinema clips, candle-lighting rituals, and Spotify dedications.",
    },
    {
      title: "Zero-login for every generation",
      detail:
        "URL and QR access with no app store, password, or profile. Grandparents scan and speak.",
    },
    {
      title: "Sovereign custody",
      detail:
        "Curators can export the whole thread as an offline .zip capsule with original audio, photos and video, and a self-contained HTML viewer.",
    },
  ],
  stack: [
    {
      group: "Frontend",
      items: [
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "Lucide",
        "Web Audio API",
        "MediaRecorder",
      ],
    },
    {
      group: "Server & delivery",
      items: ["Node.js", "Express", "SSR meta & JSON-LD", "Spotify Web API", "Vite 6", "esbuild"],
    },
    {
      group: "Data & PWA",
      items: ["Cloud Firestore", "Firestore rules", "Firebase Auth", "Service worker", "Installable PWA"],
    },
  ],
  themes: [
    "Data sovereignty",
    "Anti-ephemeral social design",
    "Accessible audio",
    "Editorial UI",
  ],
};
