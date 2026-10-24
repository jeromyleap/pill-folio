"use client";

import { useState } from "react";

import type { IllustrationId } from "@/data/projects";
import { HeroMediaLink } from "@/components/hero-media-link";
import { ProjectIllustration } from "@/components/illustrations";

export function ScreenshotFrame({
  src,
  alt,
  illustration,
  caption,
  well,
  href,
}: {
  src?: string;
  alt: string;
  illustration: IllustrationId;
  caption: string;
  well: string;
  href?: string;
}) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(src) && !broken;

  return (
    <figure>
      <HeroMediaLink
        href={showImage ? href : undefined}
        label={href ? `Open live site: ${alt}` : alt}
        className="rounded-[22px]"
      >
        <div className="overflow-hidden rounded-[22px] border-[3px] border-ink bg-paper shadow-[4px_6px_0_rgba(60,51,43,0.12)] transition-[box-shadow] duration-300 group-hover/hero:shadow-[4px_10px_0_rgba(60,51,43,0.16),0_0_28px_rgba(197,173,126,0.45)]">
          <div className="flex items-center gap-1.5 border-b-2 border-ink/15 bg-[#fffaf3] px-3 py-2">
            <span className="size-2.5 rounded-full border-2 border-ink bg-[#f3c3cf]" />
            <span className="size-2.5 rounded-full border-2 border-ink bg-[#f6dc8e]" />
            <span className="size-2.5 rounded-full border-2 border-ink bg-[#c5dbb8]" />
            <span className="ml-2 truncate text-[11px] font-semibold text-ink-soft">
              {caption}
            </span>
          </div>
          <div className="relative aspect-[16/10]" style={{ backgroundColor: well }}>
            {showImage ? (
              // Remote scrape previews are arbitrary URLs, so this stays a plain image.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover object-top transition-[filter,transform] duration-300 group-hover/hero:scale-[1.02] motion-reduce:group-hover/hero:scale-100"
                onError={() => setBroken(true)}
              />
            ) : (
              <ProjectIllustration id={illustration} />
            )}
          </div>
        </div>
      </HeroMediaLink>
      <figcaption className="mt-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
        {showImage ? (href ? `${caption} · click to visit` : caption) : "Illustrated stand-in"}
      </figcaption>
    </figure>
  );
}
