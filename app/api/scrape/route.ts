import { NextResponse, type NextRequest } from "next/server";

import { scrapeUrl } from "@/lib/fetch-page";
import { ScrapeError } from "@/lib/metadata";

const hits = new Map<string, number[]>();

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  return respond(url, clientIp(request));
}

export async function POST(request: NextRequest) {
  let url: string | null = null;
  try {
    const body = (await request.json()) as { url?: unknown };
    url = typeof body.url === "string" ? body.url : null;
  } catch {
    return NextResponse.json(
      { error: "Send JSON like { \"url\": \"https://example.com\" }." },
      { status: 400 },
    );
  }
  return respond(url, clientIp(request));
}

async function respond(url: string | null, ip: string) {
  if (!allow(ip)) {
    return NextResponse.json(
      { error: "Too many reads from this address. Try again in a minute." },
      { status: 429, headers: { "cache-control": "no-store" } },
    );
  }
  if (!url) {
    return NextResponse.json(
      { error: "Pass a url query parameter or a JSON body with a url field." },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  try {
    const payload = await scrapeUrl(url);
    return NextResponse.json(payload, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    if (error instanceof ScrapeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status, headers: { "cache-control": "no-store" } },
      );
    }
    return NextResponse.json(
      { error: "Could not read that page." },
      { status: 502, headers: { "cache-control": "no-store" } },
    );
  }
}

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 60_000);
  if (recent.length >= 30) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "local";
}
