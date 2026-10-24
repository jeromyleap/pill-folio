"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

import type { Project } from "@/data/projects";
import { peachyBrief as brief } from "@/data/peachy-clean";
import { useCardFocus } from "@/components/use-card-focus";
import { cn } from "@/lib/utils";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#B2AC88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6]";

const sageBorder = "border border-[#B2AC88]/30";

const label = "text-[11px] font-semibold tracking-[0.2em] text-[#6f6a4f] uppercase";

export function PeachyCleanCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const studyId = useId();
  const reduce = useReducedMotion() ?? false;
  const { cardRef, closeRef } = useCardFocus<HTMLDivElement>(project.id);
  const [studyOpen, setStudyOpen] = useState(false);

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="region"
      aria-labelledby={titleId}
      className="scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-[#FAF9F6] font-peachy-sans text-[#5A5A40] shadow-[0_18px_40px_rgba(60,51,43,0.16)]"
    >
      <div className={cn("flex items-center justify-between gap-3 border-x-0 border-t-0 bg-white px-4 py-3 sm:px-5", sageBorder)}>
        <div className="flex min-w-0 items-center gap-3">
          {project.logo ? (
            // Cropped copy of the Peachy Clean badge.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt="Peachy Clean badge"
              className="size-12 shrink-0 rounded-full ring-2 ring-[#FFCB9A]"
            />
          ) : null}
          <div className="min-w-0">
            <p className={cn(label, "truncate")}>
              <span className="hidden sm:inline">
                {project.dayLabel}
                <span className="px-1.5 text-[#B2AC88]">/</span>
              </span>
              {project.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-1 truncate font-peachy-serif text-2xl leading-none sm:text-3xl"
            >
              {project.title}
            </h2>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full bg-[#FAF9F6] text-[#5A5A40] transition-colors hover:bg-[#FFCB9A]/30",
            sageBorder,
            focusRing,
          )}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <figure className={cn("self-start overflow-hidden rounded-[22px] bg-white shadow-[0_14px_34px_rgba(90,90,64,0.12)]", sageBorder)}>
          <div className="aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={project.screenshotAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </figure>

        <div className="flex flex-col gap-4">
          <div>
            <p className={label}>{brief.tagline}</p>
            <p className="mt-2 font-peachy-serif text-[1.9rem] leading-tight sm:text-4xl">
              Warm, pristine,{" "}
              <span className="box-decoration-clone rounded-md bg-[#FFCB9A]/50 px-1.5">effortlessly polished</span>.
            </p>
          </div>
          <p className="text-[15px] leading-relaxed text-[#5A5A40]/85">{project.description}</p>

          <div>
            <p className={label}>Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className={cn("rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#5A5A40]", sageBorder)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 rounded-full bg-[#FFCB9A] px-5 text-sm font-semibold text-[#5A5A40] shadow-[0_8px_24px_rgba(255,203,154,0.55)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                  focusRing,
                )}
              >
                {brief.cta}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            <button
              type="button"
              aria-expanded={studyOpen}
              aria-controls={studyId}
              onClick={() => setStudyOpen((open) => !open)}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-[#5A5A40] transition-colors hover:bg-[#B2AC88]/15",
                sageBorder,
                focusRing,
              )}
            >
              {studyOpen ? "Hide case study" : "Read the case study"}
              <ChevronDown className={cn("size-4 transition-transform", studyOpen && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {studyOpen ? (
          <motion.div
            id={studyId}
            key="study"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <CaseStudy />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CaseStudy() {
  return (
    <div className="space-y-8 border-t border-[#B2AC88]/30 px-4 py-6 sm:px-5">
      <p className="max-w-3xl font-peachy-serif text-lg leading-relaxed">{brief.summary}</p>

      <section>
        <h3 className="font-peachy-serif text-2xl">Creative direction</h3>
        <dl className="mt-3 grid gap-3 md:grid-cols-3">
          {brief.direction.map((item) => (
            <div key={item.label} className={cn("rounded-2xl bg-white px-4 py-4", sageBorder)}>
              <dt className={label}>{item.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="font-peachy-serif text-2xl">Under the polish</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {brief.capabilities.map((item) => (
            <li key={item.title} className={cn("rounded-2xl bg-white px-4 py-4", sageBorder)}>
              <p className="flex items-center gap-2 font-semibold">
                <span aria-hidden className="size-2 rounded-full bg-[#FFCB9A]" />
                {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5A5A40]/85">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-peachy-serif text-2xl">The palette</h3>
          <p className="text-[12px] text-[#5A5A40]/90">OKLCH tokens with hex fallbacks · WCAG AA</p>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brief.palette.map((swatch) => (
            <li key={swatch.hex} className={cn("overflow-hidden rounded-2xl bg-white", sageBorder)}>
              <div
                className="h-14 border-b border-[#B2AC88]/20"
                style={{ backgroundColor: swatch.hex }}
              />
              <div className="px-3 py-2.5">
                <p className="text-[13px] font-semibold">{swatch.name}</p>
                <p className="text-[11px] text-[#5A5A40]/90">{swatch.role}</p>
                <p className="mt-1 font-mono text-[11px]">{swatch.hex}</p>
                <p className="font-mono text-[10px] text-[#5A5A40]/90">oklch({swatch.oklch})</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
