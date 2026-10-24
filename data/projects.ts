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
    eyebrow: "thememorythread.org",
    description:
      "Digital archival UX for a private family archive. The Memory Thread is an ad-free sanctuary and audio guestbook for voices, stories, and photographs, with sovereign backups. Memory threads are the product. Supabase is part of the stack underneath.",
    value: "A private place for voices, stories, and photographs to stay in the family.",
    tech: ["Supabase", "Archival UX", "Audio guestbook", "Memory threads"],
    liveUrl: "https://thememorythread.org",
    screenshot: "/screenshots/memory-thread.png",
    screenshotAlt:
      "The Memory Thread — living family archives and audio guestbooks",
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
    eyebrow: "wristed.app",
    description:
      "A custom smartwatch face generator. Upload an outfit photo and Wristed designs faces to match — a PWA for Apple Watch, Samsung Galaxy Watch, and the rest of the wrist. The live app calls itself an AI stylist for your wrist.",
    value: "Watch faces cut to match the outfit in the photo.",
    tech: ["PWA", "Watch faces", "Outfit matching"],
    liveUrl: "https://wristed.app",
    screenshot: "/screenshots/wristed.jpg",
    screenshotAlt:
      "Apple Watch with a Wristed-styled watch face, shown with gold bracelets",
    theme: {
      lid: "#f6dc8e",
      deep: "#d4a84a",
      well: "#fff6dc",
      cream: "#fffaf0",
      pills: ["#f0c85a", "#f4c4a8", "#fffaf3"],
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
    eyebrow: "Healthcare product",
    description:
      "A specialized healthcare application. This compartment holds that product on its own — a focused clinical tool, kept apart from the revenue and waitlist messaging in Fluxo.",
    value: "A healthcare product with a narrow, specialized job.",
    tech: ["Healthcare", "Product design"],
    screenshotAlt: "Illustrated clinic cottage and compass for HealthScout",
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
    eyebrow: "Healthcare operations",
    description:
      "Automated healthcare revenue recovery and waitlist messaging. Fluxo sends the notes that bring a balance current and the notes that fill an open appointment slot.",
    value: "Balances and open slots, followed up without the scramble.",
    tech: ["Revenue recovery", "Waitlist messaging", "Healthcare"],
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
      lid: "#f8cbb3",
      deep: "#e08a62",
      well: "#fff1e8",
      cream: "#fff8f3",
      pills: ["#f0a67e", "#f6dc8e", "#c5dbb8"],
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
      lid: "#d7efe4",
      deep: "#6eaa96",
      well: "#f3fbf7",
      cream: "#f7fffb",
      pills: ["#8ec9b4", "#f6dc8e", "#d9c8f0"],
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
