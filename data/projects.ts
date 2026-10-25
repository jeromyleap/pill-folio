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
  /** Optional outbound link when the gallery tile is clicked. */
  href?: string;
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
    eyebrow: "Jeromy Allen Leap · Saint Petersburg, FL",
    description:
      "Software Engineering student at Colorado Technical University and a longtime pharmacy operations leader — bridging clinical workflows with modern full-stack web work.",
    value: "Software engineering student. Pharmacy ops leader.",
    tech: ["Python", "React", "TypeScript", "Node.js"],
    screenshot: "/screenshots/resume-hero.jpg",
    screenshotAlt:
      "Jeromy Allen Leap banner: Software Engineer & Healthcare Operations Leader, with laptop, pharmacy, and skill pills",
    theme: {
      lid: "#c5dbb8",
      deep: "#6f9468",
      well: "#e7f2e1",
      cream: "#f4faef",
      // Brand: Old Glory red / white / blue
      pills: ["#B22234", "#FFFFFF", "#3C3B6E"],
    },
    kind: "education",
    illustration: "education",
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
      // Brand: parchment / antique bronze / candle glow
      pills: ["#f5f5f4", "#c5ad7e", "#f59e0b"],
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
      // Brand: landing violet / lavender / pink
      pills: ["#7B5CFA", "#C4B5FD", "#EC4899"],
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
      // Brand: primary emerald / accent emerald / zinc
      pills: ["#059669", "#10b981", "#09090b"],
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
      // Brand: turquoise / grey 900 / white
      pills: ["#40E0D0", "#111827", "#FFFFFF"],
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
    eyebrow: "Luxury cleaning PWA",
    description:
      "A high-touch Progressive Web App for a luxury residential and commercial cleaning service, with automated scheduling, geospatial dispatch, and role-based access.",
    value: "Professional Cleaning Services",
    tech: ["PWA", "Tailwind CSS v4", "OKLCH tokens", "RBAC"],
    liveUrl: "https://peachycleanstp.com",
    logo: "/brand/peachy-clean.png",
    screenshot: "/screenshots/peachy-clean-home.jpg",
    screenshotAlt:
      "Peachy Clean homepage: “Spotless spaces, peaceful minds.” beside a welcome sign-in panel",
    theme: {
      lid: "#f7e2a0",
      deep: "#cfa548",
      well: "#fff8e2",
      cream: "#fffbf0",
      // Brand: peachy gold / french sage / deep olive
      pills: ["#FFCB9A", "#B2AC88", "#5A5A40"],
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
      "I'm Jeromy - a 20-year pharmacy operations vet turned software engineering student at Colorado Technical University. By day, I build full-stack tools and health-tech workflows; by night, I’m either pit-side shooting alternative and hardcore shows as crowdside.j, testing out weekend recipes on the stove, or hanging out in St. Petersburg with my partner DJ and our blue-nose pitbull, Azul.",
    value: "Rx for clean code and heavy riffs.",
    tech: ["concert photography", "technology", "Azul", "home cooking", "gamer"],
    screenshotAlt: "Photos of crowdside.j, Azul, and Me and DJ",
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
        caption: "crowdside.j",
        detail: "Photography from inside the crowd, not the barricade.",
        illustration: "crowd",
        image: "/about/crowdside-j.jpg",
        href: "https://www.tiktok.com/@crowdside.j",
        tilt: -2,
      },
      {
        id: "azul",
        caption: "Azul",
        detail: "The dog who supervises the kitchen and the keyboard.",
        illustration: "azul",
        image: "/about/azul.jpg",
        href: "https://www.tiktok.com/@azulthebull",
        tilt: 1.6,
      },
      {
        id: "me-and-dj",
        caption: "Me and DJ",
        detail: "Partner in life, my best friend. My forever concert buddy.",
        illustration: "cooking",
        image: "/about/me-and-dj.jpg",
        href: "https://www.facebook.com/jeromy.leap",
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
