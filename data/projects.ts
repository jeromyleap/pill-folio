/**
 * Nicheleap weekly planner.
 *
 * Edit this file to change copy, links, tech tags, or colors.
 * Drop a real screenshot in /public and set `screenshot` to its path
 * (or to a remote image URL). Leave `screenshot` unset to keep the
 * illustrated stand-in. Gallery tiles work the same way via `image`.
 */

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type ProjectKind = "project" | "education" | "about";

export type IllustrationId =
  | "education"
  | "memory"
  | "wristed"
  | "healthscout"
  | "fluxo"
  | "peachy"
  | "about";

export type GalleryIllustration = "crowd" | "azul" | "cooking";

export type ThemeTokens = {
  lid: string;
  deep: string;
  well: string;
  cream: string;
  pills: [string, string, string];
};

export type Highlight = {
  label: string;
  detail: string;
};

export type GalleryItem = {
  id: string;
  caption: string;
  detail: string;
  illustration: GalleryIllustration;
  /** Optional real photo. Replaces the illustration when set. */
  image?: string;
  tilt: number;
};

export type Project = {
  id: string;
  day: Weekday;
  dayLabel: string;
  shortLabel: string;
  lidName: string;
  title: string;
  eyebrow: string;
  description: string;
  value: string;
  tech: string[];
  liveUrl?: string;
  /** Public path or absolute image URL. Swap anytime. */
  screenshot?: string;
  screenshotAlt: string;
  logo?: string;
  theme: ThemeTokens;
  kind: ProjectKind;
  illustration: IllustrationId;
  highlights?: Highlight[];
  gallery?: GalleryItem[];
};

export const projects: Project[] = [
  {
    id: "education",
    day: "sunday",
    dayLabel: "Sunday",
    shortLabel: "Su",
    lidName: "Resume",
    title: "Education & Resume",
    eyebrow: "Colorado Technical University",
    description:
      "BS in Computer Science & Software Engineering at Colorado Technical University. Pharmacy leadership sits beside the degree: patient-facing work, where the line is long, the handoff has to be clear, and the day still has to stay orderly.",
    value: "School, and the pharmacy floor that taught me to keep a crowded day calm.",
    tech: ["Computer Science", "Software Engineering", "Pharmacy leadership"],
    screenshotAlt: "Illustrated diploma, mortarboard, and pharmacy bottle",
    theme: {
      lid: "#c5dbb8",
      deep: "#6f9468",
      well: "#e7f2e1",
      cream: "#f4faef",
      pills: ["#8fb583", "#f6dc8e", "#fffaf3"],
    },
    kind: "education",
    illustration: "education",
    highlights: [
      {
        label: "Degree",
        detail: "BS, Computer Science & Software Engineering",
      },
      {
        label: "School",
        detail: "Colorado Technical University",
      },
      {
        label: "Background",
        detail:
          "Pharmacy leadership — patient-facing operations and careful handoffs",
      },
    ],
  },
  {
    id: "memory-thread",
    day: "monday",
    dayLabel: "Monday",
    shortLabel: "Mo",
    lidName: "Memory",
    title: "The Memory Thread",
    eyebrow: "Audio guestbook · Family archive",
    description:
      "An ad-free, installable family archive and audio guestbook. Guests scan a QR code and leave a voice message, photos, a song, or a candle — no app download, no login.",
    value: "Built for quiet moments.",
    tech: ["React 19", "TypeScript", "Firebase", "PWA"],
    liveUrl: "https://thememorythread.org",
    screenshot: "/screenshots/memory-thread.png",
    screenshotAlt:
      "The Memory Thread — living family archives and audio guestbooks",
    logo: "/brand/memory-thread-logo.png",
    theme: {
      lid: "#d9c8f0",
      deep: "#8d74b5",
      well: "#f3ecfb",
      cream: "#f8f4fc",
      pills: ["#b9a0dc", "#f0b8c8", "#fffaf3"],
    },
    kind: "project",
    illustration: "memory",
  },
  {
    id: "wristed",
    day: "tuesday",
    dayLabel: "Tuesday",
    shortLabel: "Tu",
    lidName: "Wristed",
    title: "Wristed",
    eyebrow: "AI × Fashion Tech",
    description:
      "An AI stylist for your wrist. Turn an outfit photo into custom smartwatch face designs that match your look.",
    value: "Match your watch to your outfit.",
    tech: ["React", "TypeScript", "OpenAI", "PostgreSQL"],
    liveUrl: "https://wristed.app",
    screenshot: "/screenshots/wristed.jpg",
    screenshotAlt:
      "Wristed smartwatch face artwork shown on a watch with purple styling.",
    logo: "/brand/wristed-icon.png",
    theme: {
      lid: "#f8c8a8",
      deep: "#e08a62",
      well: "#fff1e8",
      cream: "#fff8f3",
      pills: ["#f0a67e", "#f6dc8e", "#fffaf3"],
    },
    kind: "project",
    illustration: "wristed",
  },
  {
    id: "healthscout",
    day: "wednesday",
    dayLabel: "Wednesday",
    shortLabel: "We",
    lidName: "Scout",
    title: "HealthScout",
    eyebrow: "Travel healthcare intelligence",
    description:
      "Transparent, profession-specific hospital intelligence and assignment ratings for travel healthcare workers — real ratings from real professionals on staffing, culture, and safety.",
    value: "Know before you go.",
    tech: ["React 19", "TypeScript", "Firebase", "Gemini API"],
    liveUrl: "https://ais-pre-lq62uljssqt7a4nbks2uun-391818798699.us-east1.run.app",
    screenshot: "/screenshots/healthscout.jpg",
    screenshotAlt:
      "HealthScout home screen: “Know before you go.” above rated hospital cards for Mayo Clinic, New York-Presbyterian, and Cedars-Sinai",
    logo: "/brand/healthscout-crest.jpg",
    theme: {
      lid: "#b9d7e8",
      deep: "#5e93ad",
      well: "#e7f4fa",
      cream: "#f4fafc",
      pills: ["#7eb6ce", "#c5dbb8", "#fffaf3"],
    },
    kind: "project",
    illustration: "healthscout",
  },
  {
    id: "fluxo",
    day: "thursday",
    dayLabel: "Thursday",
    shortLabel: "Th",
    lidName: "Fluxo",
    title: "Fluxo",
    eyebrow: "Clinic revenue engine",
    description:
      "Fluxo intercepts appointment cancellations through EHR connections and refills the empty slot from the patient waitlist — 24/7, with zero staff overhead.",
    value: "Canceled slots, refilled on their own.",
    tech: ["React 19", "TypeScript", "MCP", "Twilio"],
    liveUrl: "https://fluxo-studio-2.ai.studio/",
    screenshotAlt: "Illustrated envelopes, calendar slot, and coins for Fluxo",
    theme: {
      lid: "#f3c3cf",
      deep: "#c47288",
      well: "#fdeef2",
      cream: "#fff7f8",
      pills: ["#e7a0b4", "#f6dc8e", "#fffaf3"],
    },
    kind: "project",
    illustration: "fluxo",
  },
  {
    id: "peachy-clean",
    day: "friday",
    dayLabel: "Friday",
    shortLabel: "Fr",
    lidName: "Peachy",
    title: "Peachy Clean",
    eyebrow: "peachycleanstp.com",
    description:
      "Scheduling and client management for Peachy Clean, a local cleaning business. The web app is the crew's desk — who is coming, when, and how a client gets back in.",
    value: "The scheduling desk for a local cleaning business.",
    tech: ["Scheduling", "Client management", "Local business"],
    liveUrl: "https://peachycleanstp.com",
    logo: "/brand/peachy-clean.png",
    screenshotAlt: "Illustrated weekly schedule for Peachy Clean",
    theme: {
      lid: "#f7e2a0",
      deep: "#cfa548",
      well: "#fff8e2",
      cream: "#fffbf0",
      pills: ["#f0c85a", "#f4c4a8", "#fffaf3"],
    },
    kind: "project",
    illustration: "peachy",
  },
  {
    id: "about",
    day: "saturday",
    dayLabel: "Saturday",
    shortLabel: "Sa",
    lidName: "About",
    title: "About Me",
    eyebrow: "Jeromy",
    description:
      "I'm Jeromy. I study computer science and software engineering, and I build niche products under the name nicheleap. Away from the editor I photograph from the crowd as crowd-side j, cook at home, and share the place with my dog, Azul.",
    value: "Crowd-side photos, Azul, and whatever is on the stove.",
    tech: ["crowd-side j", "Azul", "Home cooking"],
    screenshotAlt: "Illustrated scenes of photography, Azul, and home cooking",
    theme: {
      lid: "#aedfd0",
      deep: "#4f9a87",
      well: "#eef9f5",
      cream: "#f5fcf9",
      pills: ["#7cc4ad", "#f6dc8e", "#d9c8f0"],
    },
    kind: "about",
    illustration: "about",
    gallery: [
      {
        id: "crowd",
        caption: "crowd-side j",
        detail: "Photography from inside the crowd, not the barricade.",
        illustration: "crowd",
        tilt: -2,
      },
      {
        id: "azul",
        caption: "Azul",
        detail: "The dog who supervises the kitchen and the keyboard.",
        illustration: "azul",
        tilt: 1.6,
      },
      {
        id: "cooking",
        caption: "Home cooking",
        detail: "Weeknight pots, herbs, and the good butter.",
        illustration: "cooking",
        tilt: -1.2,
      },
    ],
  },
];

export function stackLabel(kind: ProjectKind): string {
  if (kind === "education") return "On the resume";
  if (kind === "about") return "Close to home";
  return "In the build";
}
