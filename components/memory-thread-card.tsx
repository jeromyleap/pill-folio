"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

import type { Project } from "@/data/projects";
import { memoryThreadCaseStudy as brief, memoryThreadDesign } from "@/data/memory-thread";
import { useCardFocus } from "@/components/use-card-focus";
import { BrandDesign } from "@/components/brand-design";
import { cn } from "@/lib/utils";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BRONZE_GRADIENT = "linear-gradient(135deg, #dfcca7, #c5ad7e)";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#dfcca7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

const kicker = "font-mono text-[11px] tracking-[0.18em] text-[#c5ad7e] uppercase";

export function MemoryThreadCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const notesId = useId();
  const reduce = useReducedMotion() ?? false;
  const { cardRef, closeRef } = useCardFocus<HTMLDivElement>(project.id);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="region"
      aria-labelledby={titleId}
      className="relative scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-[#020617] font-memory-sans text-[#f5f5f4] shadow-[0_18px_40px_rgba(60,51,43,0.16),0_0_80px_rgba(245,158,11,0.12)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#0b0f19] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {project.logo ? (
            // Local copy of the official site logo.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt="The Memory Thread logo"
              className="size-12 shrink-0 rounded-xl border border-[#c5ad7e]/25"
            />
          ) : null}
          <div className="min-w-0">
            <p className={cn(kicker, "truncate")}>
              <span className="hidden sm:inline">
                {project.dayLabel}
                <span className="px-1.5 text-[#94a3b8]">/</span>
              </span>
              {project.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-1 font-memory-serif text-[1.35rem] leading-tight font-semibold sm:text-3xl sm:leading-none"
            >
              {project.title}
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Candle reduce={reduce} />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={cn(
              "grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#f5f5f4] transition-colors hover:bg-white/10",
              focusRing,
            )}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <figure className="mx-auto w-full max-w-xl rotate-1 self-start lg:self-center rounded-[6px] bg-[#f5f5f4] p-2.5 pb-0 shadow-[0_18px_40px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:rotate-0 motion-reduce:rotate-0 motion-reduce:transition-none sm:p-3 sm:pb-0">
          <div className="aspect-[1200/630] overflow-hidden rounded-[2px] bg-[#0b0f19]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={project.screenshotAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="py-2.5 text-center font-memory-script text-2xl leading-none text-[#3a3226] sm:py-3 sm:text-[1.7rem]">
            {brief.inscription}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-4">
          <p className="font-memory-serif text-[1.9rem] leading-tight font-medium text-[#dfcca7] italic sm:text-4xl">
            {brief.tagline}
          </p>
          <p className="text-[15px] leading-relaxed text-[#cbd5e1]">
            {project.description}
          </p>


          <div>
            <p className={kicker}>Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#c5ad7e]/30 bg-[#0f172a] px-3 py-1 font-mono text-[12px] text-[#f5f5f4]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <BrandDesign
            tone="dark"
            labelClassName={kicker}
            colors={[...memoryThreadDesign.colors]}
            fonts={[...memoryThreadDesign.fonts]}
          />

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold text-[#020617] shadow-[0_8px_28px_rgba(197,173,126,0.25)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                  focusRing,
                )}
                style={{ backgroundImage: BRONZE_GRADIENT }}
              >
                {brief.cta}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            <button
              type="button"
              aria-expanded={notesOpen}
              aria-controls={notesId}
              onClick={() => setNotesOpen((open) => !open)}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 rounded-full border border-[#c5ad7e]/30 bg-white/[0.03] px-5 text-sm font-semibold text-[#f5f5f4] transition-colors hover:bg-white/[0.08]",
                focusRing,
              )}
            >
              {notesOpen ? "Close the archive notes" : "Read the archive notes"}
              <ChevronDown className={cn("size-4 transition-transform", notesOpen && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {notesOpen ? (
          <motion.div
            id={notesId}
            key="notes"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ArchiveNotes />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Candle({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="relative mr-1 hidden h-10 w-6 sm:block">
      <div className="absolute -top-3 left-1/2 size-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.35),transparent_65%)]" />
      <motion.div
        className="absolute top-0.5 left-1/2 h-4 w-2.5 -ml-[5px] origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(circle_at_50%_70%,#fff7d6_0%,#fbbf24_45%,#f59e0b_80%)]"
        animate={
          reduce
            ? undefined
            : { scaleY: [1, 1.12, 0.94, 1.06, 1], scaleX: [1, 0.92, 1.04, 0.96, 1], rotate: [0, -3, 2, -1, 0] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-[18px] left-1/2 h-[3px] w-px -translate-x-1/2 bg-[#3a3226]" />
      <div className="absolute top-[21px] left-1/2 h-[19px] w-3.5 -translate-x-1/2 rounded-t-[3px] bg-gradient-to-b from-[#f5f5f4] to-[#dfcca7]" />
    </div>
  );
}

function ArchiveNotes() {
  return (
    <div className="space-y-8 border-t border-white/[0.06] bg-[#0b0f19]/60 px-4 py-7 sm:px-6">
      <p className="max-w-3xl font-memory-serif text-lg leading-relaxed text-[#f5f5f4]/90">
        {brief.summary}
      </p>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {brief.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-[#0f172a] px-4 py-3">
            <dt className="font-mono text-[11px] tracking-[0.14em] text-[#94a3b8] uppercase">{stat.label}</dt>
            <dd className="mt-1 font-memory-serif text-3xl font-semibold text-[#dfcca7]">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h3 className="font-memory-serif text-2xl font-semibold">Why families keep it</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {brief.pillars.map((pillar) => (
            <li key={pillar.title} className="rounded-2xl border border-white/[0.06] bg-[#0f172a] px-4 py-4">
              <p className="font-memory-serif text-lg font-semibold text-[#dfcca7]">{pillar.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#cbd5e1]">{pillar.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-memory-serif text-2xl font-semibold">The stack</h3>
        <dl className="mt-4 grid gap-5 sm:grid-cols-3">
          {brief.stack.map((group) => (
            <div key={group.group}>
              <dt className={kicker}>{group.group}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-[#cbd5e1]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.06] pt-5 font-memory-serif text-[15px] text-[#cbd5e1] italic">
        {brief.themes.map((theme, index) => (
          <li key={theme} className="flex items-center gap-3">
            {index > 0 ? <span aria-hidden className="size-1 rounded-full bg-[#c5ad7e]" /> : null}
            {theme}
          </li>
        ))}
      </ul>
    </div>
  );
}
