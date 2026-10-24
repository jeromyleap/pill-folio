"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";

import { stackLabel, type Project } from "@/data/projects";
import { GalleryArt } from "@/components/illustrations";
import { LiveMetadata } from "@/components/live-metadata";
import { ScreenshotFrame } from "@/components/screenshot-frame";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const frameSrc = preview ?? project.screenshot;
  const frameCaption = preview
    ? "Live site preview"
    : project.screenshot
      ? "Saved screenshot"
      : "Illustrated preview";

  useEffect(() => {
    closeRef.current?.focus();
  }, [project.id]);

  function trapTab(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !cardRef.current) return;
    const focusable = [
      ...cardRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((node) => !node.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={trapTab}
      onClick={(event) => event.stopPropagation()}
      className="flex max-h-[min(46dvh,430px)] flex-col overflow-hidden rounded-[28px] border-[3px] border-ink bg-paper shadow-[0_24px_60px_rgba(60,51,43,0.22)] sm:max-h-[min(44vh,520px)]"
    >
      <div
        className="flex shrink-0 items-start justify-between gap-3 border-b-2 border-ink/10 px-4 py-3 sm:px-5"
        style={{ backgroundColor: project.theme.lid }}
      >
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold tracking-[0.18em] uppercase">
            {project.dayLabel}
            <span className="px-1.5 opacity-50">/</span>
            {project.eyebrow}
          </p>
          <h2 id={titleId} className="mt-1 truncate font-display text-2xl leading-none sm:text-3xl">
            {project.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {project.logo ? (
            // The mark is a local brand asset with its own dark field.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt=""
              className="size-11 rounded-full border-2 border-ink object-cover"
            />
          ) : null}
          <Button
            ref={closeRef}
            type="button"
            variant="outline"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            className="size-10 rounded-full border-2 border-ink bg-paper"
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
        <div className={cn("grid gap-5", project.kind === "about" ? "" : "lg:grid-cols-[1.05fr_0.95fr]")}>
          {project.kind !== "about" ? (
            <ScreenshotFrame
              src={frameSrc}
              alt={project.screenshotAlt}
              illustration={project.illustration}
              caption={frameCaption}
              well={project.theme.well}
            />
          ) : null}

          <div className="flex flex-col gap-4">
            <p
              className="rounded-2xl border-2 border-ink px-4 py-3 font-display text-lg leading-snug"
              style={{ backgroundColor: project.theme.cream }}
            >
              {project.value}
            </p>
            <p className="text-sm leading-relaxed text-ink sm:text-base">{project.description}</p>

            {project.highlights ? (
              <ol className="space-y-2">
                {project.highlights.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border-2 border-ink bg-white/70 px-4 py-3 shadow-[3px_3px_0_rgba(60,51,43,0.1)]"
                  >
                    <p className="text-[11px] font-extrabold tracking-[0.16em] text-ink-soft uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 font-display text-lg leading-snug">{item.detail}</p>
                  </li>
                ))}
              </ol>
            ) : null}

            <div>
              <p className="text-[11px] font-extrabold tracking-[0.16em] text-ink-soft uppercase">
                {stackLabel(project.kind)}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <li key={tag}>
                    <Badge
                      variant="outline"
                      className="h-7 border-2 border-ink bg-paper px-2.5 text-[12px] font-semibold text-ink"
                    >
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-11 rounded-full border-2 border-ink bg-ink px-4 text-paper shadow-[3px_3px_0_#c5dbb8]",
                  )}
                >
                  Visit site
                  <ArrowUpRight />
                </a>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-11 rounded-full border-2 border-ink bg-paper px-4"
                >
                  Back to the box
                </Button>
              )}
            </div>

            {project.liveUrl ? (
              <LiveMetadata
                url={project.liveUrl}
                previewActive={preview !== null}
                onPreview={setPreview}
              />
            ) : null}
          </div>
        </div>

        {project.gallery ? (
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {project.gallery.map((item) => (
              <li key={item.id} style={{ transform: `rotate(${item.tilt}deg)` }}>
                <figure className="rounded-[22px] border-[3px] border-ink bg-white p-2.5 shadow-[4px_5px_0_rgba(60,51,43,0.12)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-ink bg-[#fff6dc]">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.caption} className="h-full w-full object-cover" />
                    ) : (
                      <GalleryArt id={item.illustration} />
                    )}
                    {item.image ? null : (
                      <span className="absolute top-2 left-2 rounded-full border-2 border-ink bg-paper px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase">
                        Illustrated
                      </span>
                    )}
                  </div>
                  <figcaption className="px-1 pt-2 pb-1">
                    <p className="font-display text-lg leading-none">{item.caption}</p>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{item.detail}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
