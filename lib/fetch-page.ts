import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import {
  brandFromPage,
  parseHtmlMetadata,
  ScrapeError,
  type ScrapePayload,
} from "@/lib/metadata";

const MAX_BYTES = 750_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8_000;

export async function scrapeUrl(rawUrl: string): Promise<ScrapePayload> {
  const start = parsePublicUrl(rawUrl);
  const { html, finalUrl } = await fetchHtml(start);
  const meta = parseHtmlMetadata(html, finalUrl);
  const hostname = new URL(finalUrl).hostname;
  return {
    sourceUrl: start.toString(),
    finalUrl,
    title: meta.title,
    description: meta.description,
    siteName: meta.siteName,
    image: meta.image,
    themeColor: meta.themeColor,
    brand: brandFromPage(meta.themeColor, hostname),
  };
}

export function parsePublicUrl(rawUrl: string): URL {
  if (!rawUrl || rawUrl.length > 2000) {
    throw new ScrapeError("Enter an http or https URL.");
  }
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new ScrapeError("That URL could not be read.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ScrapeError("Only http and https URLs can be read.");
  }
  if (url.username || url.password) {
    throw new ScrapeError("URLs with a username or password are not allowed.");
  }
  assertHostname(url.hostname);
  return url;
}

async function fetchHtml(initial: URL): Promise<{ html: string; finalUrl: string }> {
  let current = initial;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublicHost(current.hostname);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(current, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent": "NicheleapBot/1.0 (+https://nicheleap.com)",
        },
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) {
          throw new ScrapeError("The site redirected without a destination.", 502);
        }
        current = parsePublicUrl(new URL(location, current).toString());
        continue;
      }

      if (!response.ok) {
        throw new ScrapeError(`The site responded with ${response.status}.`, 502);
      }

      const type = response.headers.get("content-type") ?? "";
      if (type && !/text\/html|application\/xhtml\+xml/i.test(type)) {
        throw new ScrapeError("That URL did not return an HTML page.", 422);
      }

      const html = await readLimited(response, MAX_BYTES);
      return { html, finalUrl: current.toString() };
    } catch (error) {
      if (error instanceof ScrapeError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new ScrapeError("The site took too long to answer.", 504);
      }
      throw new ScrapeError("The site could not be reached.", 502);
    } finally {
      clearTimeout(timer);
    }
  }
  throw new ScrapeError("That URL redirected too many times.", 502);
}

async function readLimited(response: Response, max: number): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let html = "";
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      throw new ScrapeError("That page is too large to read.", 422);
    }
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();
  return html;
}

function assertHostname(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (!host || host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".localhost")) {
    throw new ScrapeError("That host is not available to the scraper.", 403);
  }
  if (
    host === "localhost" ||
    host === "metadata.google.internal" ||
    host === "0.0.0.0" ||
    /^\d+$/.test(host) ||
    /^0x[0-9a-f.]+$/i.test(host)
  ) {
    throw new ScrapeError("That host is not available to the scraper.", 403);
  }
  if (isIP(host) && isBlockedAddress(host)) {
    throw new ScrapeError("That host is not available to the scraper.", 403);
  }
}

async function assertPublicHost(hostname: string) {
  assertHostname(hostname);
  const host = hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) return;
  let records: { address: string }[];
  try {
    records = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw new ScrapeError("That host could not be resolved.", 400);
  }
  if (records.length === 0 || records.some((record) => isBlockedAddress(record.address))) {
    throw new ScrapeError("That host is not available to the scraper.", 403);
  }
}

export function isBlockedAddress(address: string): boolean {
  const ip = address.toLowerCase().replace(/^::ffff:/, "");
  if (ip === "::1" || ip === "::" || ip === "0.0.0.0") return true;
  if (ip.startsWith("fe80:") || ip.startsWith("fc") || ip.startsWith("fd")) return true;
  const parts = ip.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return false;
  }
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}
