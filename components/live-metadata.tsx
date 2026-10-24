"use client";

import { useEffect, useState } from "react";

import type { ScrapePayload } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

const cache = new Map<string, ScrapePayload>();

export function LiveMetadata({
  url,
  previewActive,
  onPreview,
}: {
  url: string;
  previewActive: boolean;
  onPreview: (src: string | null) => void;
}) {
  const cached = cache.get(url) ?? null;
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    cached ? "ready" : "loading",
  );
  const [payload, setPayload] = useState<ScrapePayload | null>(cached);
  const [message, setMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (cache.has(url)) return;

    const controller = new AbortController();

    fetch(`/api/scrape?url=${encodeURIComponent(url)}`, { signal: controller.signal })
      .then(async (response) => {
        const body = (await response.json()) as ScrapePayload & { error?: string };
        if (!response.ok) throw new Error(body.error ?? "Could not read that page.");
        cache.set(url, body);
        setPayload(body);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Could not read that page.");
      });

    return () => controller.abort();
  }, [url, attempt]);

  if (status === "loading") {
    return (
      <p className="text-sm text-ink-soft" role="status">
        Reading the live page for title, description, and brand colors…
      </p>
    );
  }

  if (status === "error" || !payload) {
    return (
      <div className="rounded-2xl border-2 border-ink/20 bg-white/70 px-3 py-3" role="alert">
        <p className="text-sm text-ink">{message ?? "Could not read that page."}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-2 h-9 rounded-full border-2 border-ink bg-paper px-3"
          onClick={() => {
            setStatus("loading");
            setMessage(null);
            setAttempt((value) => value + 1);
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  const swatches = [
    payload.brand.lid,
    payload.brand.deep,
    payload.brand.well,
    payload.brand.pills[0],
    payload.brand.pills[1],
  ];

  return (
    <div className="rounded-2xl border-2 border-ink/15 bg-white/65 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
            Live brand tokens
          </p>
          <div className="mt-2 flex gap-1.5" aria-label="Colors from the live page">
            {swatches.map((color) => (
              <span
                key={color}
                className="size-5 rounded-full border-2 border-ink"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        {payload.image ? (
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-full border-2 border-ink bg-paper px-3"
            onClick={() => onPreview(previewActive ? null : payload.image)}
          >
            {previewActive ? "Show saved frame" : "Show live preview"}
          </Button>
        ) : null}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">
        {payload.brand.source === "theme-color"
          ? "Pastels mixed from the live theme color."
          : "The live theme color was missing or too dark, so this palette is pinned to the hostname."}
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-sm font-semibold">Live metadata</summary>
        <p className="mt-2 font-display text-base leading-snug">{payload.title ?? "No title found"}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {payload.description ?? "No description found."}
        </p>
      </details>
    </div>
  );
}
