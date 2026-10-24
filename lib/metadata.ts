import type { ThemeTokens } from "@/data/projects";

export class ScrapeError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ScrapeError";
    this.status = status;
  }
}

export type ScrapePayload = {
  sourceUrl: string;
  finalUrl: string;
  title: string | null;
  description: string | null;
  siteName: string | null;
  image: string | null;
  themeColor: string | null;
  brand: ThemeTokens & {
    themeColor: string | null;
    source: "theme-color" | "hostname-palette";
  };
};

type Rgb = [number, number, number];

const WHITE: Rgb = [255, 255, 255];
const INK: Rgb = [60, 51, 43];
const CREAM: Rgb = [255, 250, 243];

const FALLBACKS: ThemeTokens[] = [
  {
    lid: "#c5dbb8",
    deep: "#6f9468",
    well: "#e7f2e1",
    cream: "#f4faef",
    pills: ["#8fb583", "#f6dc8e", "#fffaf3"],
  },
  {
    lid: "#d9c8f0",
    deep: "#8d74b5",
    well: "#f3ecfb",
    cream: "#f8f4fc",
    pills: ["#b9a0dc", "#f0b8c8", "#fffaf3"],
  },
  {
    lid: "#f6dc8e",
    deep: "#d4a84a",
    well: "#fff6dc",
    cream: "#fffaf0",
    pills: ["#f0c85a", "#f4c4a8", "#fffaf3"],
  },
  {
    lid: "#b9d7e8",
    deep: "#5e93ad",
    well: "#e7f4fa",
    cream: "#f4fafc",
    pills: ["#7eb6ce", "#c5dbb8", "#fffaf3"],
  },
  {
    lid: "#f3c3cf",
    deep: "#c47288",
    well: "#fdeef2",
    cream: "#fff7f8",
    pills: ["#e7a0b4", "#f6dc8e", "#fffaf3"],
  },
  {
    lid: "#f8cbb3",
    deep: "#e08a62",
    well: "#fff1e8",
    cream: "#fff8f3",
    pills: ["#f0a67e", "#f6dc8e", "#c5dbb8"],
  },
  {
    lid: "#d7efe4",
    deep: "#6eaa96",
    well: "#f3fbf7",
    cream: "#f7fffb",
    pills: ["#8ec9b4", "#f6dc8e", "#d9c8f0"],
  },
];

export function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, num: string) =>
      String.fromCodePoint(Number(num)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function readAttr(tag: string, name: string): string | null {
  const pattern = new RegExp(
    `${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    "i",
  );
  const match = tag.match(pattern);
  if (!match) return null;
  return match[1] ?? match[2] ?? null;
}

export function parseHtmlMetadata(html: string, pageUrl: string) {
  const meta = new Map<string, string>();
  for (const tag of html.match(/<meta\s+[^>]*>/gi) ?? []) {
    const key = readAttr(tag, "property") ?? readAttr(tag, "name");
    const content = readAttr(tag, "content");
    if (!key || !content) continue;
    const normalized = key.toLowerCase();
    if (!meta.has(normalized)) meta.set(normalized, decodeHtml(content.trim()));
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch
    ? decodeHtml(titleMatch[1]).replace(/\s+/g, " ").trim()
    : null;

  const imageRaw = meta.get("og:image") ?? meta.get("twitter:image") ?? null;
  let image: string | null = null;
  if (imageRaw) {
    try {
      image = new URL(imageRaw, pageUrl).href;
    } catch {
      image = null;
    }
  }

  return {
    title: nonempty(meta.get("og:title")) ?? nonempty(title),
    description:
      nonempty(meta.get("og:description")) ??
      nonempty(meta.get("description")) ??
      nonempty(meta.get("twitter:description")),
    siteName:
      nonempty(meta.get("og:site_name")) ?? nonempty(meta.get("application-name")),
    image,
    themeColor: normalizeHex(meta.get("theme-color")),
  };
}

function nonempty(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function normalizeHex(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  const hex = match[1];
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toLowerCase();
  }
  return `#${hex.toLowerCase()}`;
}

function hexToRgb(hex: string): Rgb | null {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  return [
    parseInt(normalized.slice(1, 3), 16),
    parseInt(normalized.slice(3, 5), 16),
    parseInt(normalized.slice(5, 7), 16),
  ];
}

function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, channel)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mix(a: Rgb, b: Rgb, amount: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * amount),
    Math.round(a[1] + (b[1] - a[1]) * amount),
    Math.round(a[2] + (b[2] - a[2]) * amount),
  ];
}

function luminance([r, g, b]: Rgb): number {
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function saturation([r, g, b]: Rgb): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

function hashSeed(seed: string): number {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function pastelize(rgb: Rgb): ThemeTokens {
  const lid = mix(rgb, WHITE, 0.58);
  const deep = mix(rgb, INK, 0.35);
  const well = mix(rgb, CREAM, 0.72);
  const cream = mix(rgb, WHITE, 0.86);
  const rotate = (amount: number): Rgb => {
    const [r, g, b] = rgb;
    return [
      Math.round(r * (1 - amount) + g * amount),
      Math.round(g * (1 - amount) + b * amount),
      Math.round(b * (1 - amount) + r * amount),
    ];
  };
  return {
    lid: rgbToHex(lid),
    deep: rgbToHex(deep),
    well: rgbToHex(well),
    cream: rgbToHex(cream),
    pills: [
      rgbToHex(mix(rgb, WHITE, 0.28)),
      rgbToHex(mix(rotate(0.45), WHITE, 0.5)),
      rgbToHex(CREAM),
    ] as [string, string, string],
  };
}

export function brandFromPage(themeColor: string | null, seed: string) {
  const fallback = FALLBACKS[hashSeed(seed) % FALLBACKS.length];
  const rgb = themeColor ? hexToRgb(themeColor) : null;
  const usable =
    rgb !== null && luminance(rgb) >= 0.18 && saturation(rgb) >= 0.18;
  const tokens = usable && rgb ? pastelize(rgb) : fallback;
  return {
    ...tokens,
    themeColor,
    source: usable ? ("theme-color" as const) : ("hostname-palette" as const),
  };
}
