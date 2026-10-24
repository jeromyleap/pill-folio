"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

import type { Project } from "@/data/projects";
import { wristedBrand, wristedCaseStudy, wristedLooks } from "@/data/wristed";
import { useCardFocus } from "@/components/use-card-focus";
import { cn } from "@/lib/utils";

type Shape = "square" | "round";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#272A32]";

const eyebrowClass = "text-[11px] font-semibold tracking-[0.16em] text-[#A8B0BD] uppercase";

export function WristedCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const caseId = useId();
  const reduce = useReducedMotion();
  const { cardRef, closeRef } = useCardFocus<HTMLDivElement>(project.id);
  const [caseOpen, setCaseOpen] = useState(false);

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="region"
      aria-labelledby={titleId}
      className="scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-[#272A32] font-wristed-body text-[#F1F5F9] shadow-[0_18px_40px_rgba(60,51,43,0.16),0_0_70px_rgba(123,92,250,0.2)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#2C2F38] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {project.logo ? (
            // Local copy of the official app icon.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt="Wristed app icon"
              className="size-12 shrink-0 rounded-[14px] border border-white/10 shadow-[0_0_24px_rgba(139,92,246,0.35)]"
            />
          ) : null}
          <div className="min-w-0">
            <p className={eyebrowClass}>
              <span className="hidden sm:inline">
                {project.dayLabel}
                <span className="px-1.5 text-[#8C95A3]">/</span>
              </span>
              {project.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-0.5 truncate font-wristed-heading text-2xl leading-none font-extrabold tracking-tight sm:text-3xl"
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
            "grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-[#F1F5F9] transition-colors hover:bg-white/10",
            focusRing,
          )}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_40px_rgba(105,76,250,0.28)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={project.screenshotAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </figure>

        <div className="flex flex-col gap-4">
          <p
            className="bg-clip-text font-wristed-heading text-2xl leading-tight font-bold tracking-tight text-transparent sm:text-[1.75rem]"
            style={{ backgroundImage: wristedBrand.headlineGradient }}
          >
            {wristedCaseStudy.tagline}
          </p>
          <p className="text-[15px] leading-relaxed text-[#A8B0BD]">{project.description}</p>

          <div>
            <p className={eyebrowClass}>Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[13px] font-medium text-[#F1F5F9]"
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
                  "inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(123,92,250,0.4)] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                  focusRing,
                )}
                style={{ backgroundImage: wristedBrand.ctaGradient }}
              >
                {wristedCaseStudy.cta}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            <button
              type="button"
              aria-expanded={caseOpen}
              aria-controls={caseId}
              onClick={() => setCaseOpen((open) => !open)}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-[#F1F5F9] transition-colors hover:bg-white/10",
                focusRing,
              )}
            >
              {caseOpen ? "Hide case study" : "Read the case study"}
              <ChevronDown
                className={cn("size-4 transition-transform", caseOpen && "rotate-180")}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {caseOpen ? (
          <motion.div
            id={caseId}
            key="case"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
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
    <div className="space-y-7 border-t border-white/10 px-4 py-6 sm:px-5">
      <p className="max-w-3xl text-[15px] leading-relaxed text-[#A8B0BD]">
        {wristedCaseStudy.overview}
      </p>

      <ol className="grid gap-3 sm:grid-cols-3">
        {wristedCaseStudy.howItWorks.map((item, index) => (
          <li
            key={item.step}
            className="rounded-2xl border border-white/10 bg-[#2C2F38] px-4 py-3"
          >
            <p className="font-wristed-heading text-sm font-semibold text-[#C4B5FD]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 font-wristed-heading text-lg font-semibold tracking-tight">
              {item.step}
            </p>
            <p className="mt-1 text-sm leading-snug text-[#A8B0BD]">{item.detail}</p>
          </li>
        ))}
      </ol>

      <LookStrip />

      <section>
        <h3 className="font-wristed-heading text-xl font-bold tracking-tight">What it does</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {wristedCaseStudy.features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-[#2C2F38] px-4 py-3"
            >
              <p className="font-wristed-heading font-semibold tracking-tight">{feature.title}</p>
              <p className="mt-1 text-sm leading-snug text-[#A8B0BD]">{feature.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-wristed-heading text-xl font-bold tracking-tight">
          Under the hood
        </h3>
        <ul className="mt-3 space-y-2">
          {wristedCaseStudy.engineering.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-[#A8B0BD]">
              <span
                aria-hidden
                className="mt-[7px] size-1.5 shrink-0 rounded-full"
                style={{ backgroundImage: wristedBrand.ctaGradient }}
              />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-wristed-heading text-xl font-bold tracking-tight">Full stack</h3>
        <dl className="mt-3 grid gap-4 sm:grid-cols-3">
          {wristedCaseStudy.stack.map((group) => (
            <div key={group.group}>
              <dt className={eyebrowClass}>{group.group}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[12px] font-medium text-[#F1F5F9]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="rounded-2xl border border-white/10 bg-[#2C2F38] px-4 py-3 text-[13px] leading-relaxed text-[#A8B0BD]">
        {wristedCaseStudy.note}
      </p>
    </div>
  );
}

function LookStrip() {
  const [shape, setShape] = useState<Shape>("square");

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-wristed-heading text-xl font-bold tracking-tight">
            Five looks, two shapes
          </h3>
          <p className="mt-1 text-sm text-[#A8B0BD]">
            Each styling session lays out five designs in square and circular frames.
          </p>
        </div>
        <div
          role="group"
          aria-label="Watch frame shape"
          className="flex rounded-full border border-white/10 bg-white/5 p-1"
        >
          {(["square", "round"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={shape === option}
              onClick={() => setShape(option)}
              className={cn(
                "h-8 rounded-full px-3.5 text-[13px] font-semibold capitalize transition-colors",
                shape === option ? "text-white" : "text-[#A8B0BD] hover:text-[#F1F5F9]",
                focusRing,
              )}
              style={shape === option ? { backgroundImage: wristedBrand.ctaGradient } : undefined}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <ul className="-mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
        {wristedLooks.map((look) => (
          <li
            key={look.name}
            className="flex w-[118px] shrink-0 snap-start flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-[#2C2F38] px-3 pt-3 pb-2.5 sm:w-auto"
          >
            <div
              role="img"
              aria-label={`${look.name} outfit palette`}
              className="flex items-center gap-1"
            >
              {look.outfit.map((color) => (
                <span
                  key={color}
                  className="size-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div
              className={cn(
                "w-[78%] bg-[#14161b] p-[7%] shadow-[0_8px_20px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-[border-radius,aspect-ratio] duration-300 motion-reduce:transition-none",
                shape === "square" ? "aspect-[5/6] rounded-[26%]" : "aspect-square rounded-full",
              )}
            >
              <div
                className={cn(
                  "grid h-full w-full place-items-center transition-[border-radius] duration-300 motion-reduce:transition-none",
                  shape === "square" ? "rounded-[22%]" : "rounded-full",
                )}
                style={{ backgroundImage: look.art }}
              >
                <span className="font-wristed-heading text-lg font-semibold tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
                  10:09
                </span>
              </div>
            </div>
            <p className="font-wristed-heading text-sm font-semibold">{look.name}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-[#8C95A3]">
        Illustrative sample palettes, not saved app output.
      </p>
    </section>
  );
}
