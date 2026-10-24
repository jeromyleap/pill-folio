/**
 * The Memory Thread brand brief, used by the Monday card.
 *
 * Voice: poetic but grounded, no corporate hype. Traction figures come
 * straight from the owner's brief; update them here when they change.
 */

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
  challenges: [
    {
      title: "iOS black video frames",
      problem: "Mobile Safari won't paint frame 0 of inline video to save power.",
      solution:
        "Seek to the #t=0.001 media fragment on metadata load and extract a poster frame client-side with Canvas.",
    },
    {
      title: "PWA audio range stalls",
      problem: "Safari scrubs media with HTTP 206 range requests, which naive service-worker caches break.",
      solution: "sw.js passes every media streaming request straight through, so voice memos and video never stall.",
    },
    {
      title: "Floating header on WebKit",
      problem: "A transformed, animated header detaches position: fixed during momentum scroll.",
      solution: "Swapped Framer Motion translates for CSS top transitions and forced transform: none.",
    },
    {
      title: "Elder-friendly onboarding",
      problem: "SMS codes, passwords, and accounts stop relatives at the table.",
      solution: "A dual-token URL and passphrase scheme grants instant submission rights on QR scan.",
    },
    {
      title: "Permanence and ownership",
      problem: "An archive shouldn't depend on one service staying online.",
      solution: "A client-side archiver bundles audio, full-resolution photos, and metadata into an offline-viewable .zip.",
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

/** Decorative voice-memo waveform, as bar heights from 0 to 1. */
export const memoryWaveform = [
  0.25, 0.4, 0.62, 0.35, 0.78, 0.52, 0.9, 0.44, 0.66, 0.3, 0.55, 0.82, 0.48, 0.7, 0.38, 0.6,
  0.92, 0.5, 0.34, 0.72, 0.46, 0.58, 0.28, 0.64, 0.42, 0.3, 0.2,
];
