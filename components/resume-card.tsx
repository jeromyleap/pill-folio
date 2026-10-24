"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone, X } from "lucide-react";

import type { Project } from "@/data/projects";
import {
  resumeBrief,
  resumeCerts,
  resumeDesign,
  resumeEducation,
  resumeExperience,
  resumeProjects,
  resumeSkills,
} from "@/data/resume";
import { BrandDesign } from "@/components/brand-design";
import { Capsule } from "@/components/capsule";
import { ScreenshotFrame } from "@/components/screenshot-frame";
import { useCardFocus } from "@/components/use-card-focus";
import { cn } from "@/lib/utils";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#6f9468] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf3]";

const meta = "text-[11px] font-extrabold tracking-[0.18em] text-ink-soft uppercase";

const PILL_SPOTS = [
  { a: "#c5dbb8", b: "#f6dc8e", className: "absolute top-4 right-6 rotate-12 opacity-80" },
  { a: "#f3c3cf", b: "#d9c8f0", className: "absolute top-28 left-3 -rotate-6 opacity-70" },
  { a: "#b9d7e8", b: "#f8c8a8", className: "absolute right-10 bottom-16 rotate-[18deg] opacity-75" },
  { a: "#f7e2a0", b: "#aedfd0", className: "absolute bottom-8 left-1/3 -rotate-12 opacity-70" },
] as const;

export function ResumeCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const resumeId = useId();
  const reduce = useReducedMotion() ?? false;
  const { cardRef, closeRef } = useCardFocus<HTMLDivElement>(project.id);
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="region"
      aria-labelledby={titleId}
      className="scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-paper text-ink shadow-[0_18px_40px_rgba(60,51,43,0.16)]"
    >
      <div
        className="flex items-center justify-between gap-3 border-b-2 border-ink/10 px-4 py-3 sm:px-5"
        style={{ backgroundColor: project.theme.lid }}
      >
        <div className="min-w-0">
          <p className={meta}>
            <span className="hidden sm:inline">
              {project.dayLabel}
              <span className="px-1.5 opacity-50">/</span>
            </span>
            {project.eyebrow}
          </p>
          <h2 id={titleId} className="mt-1 truncate font-display text-2xl leading-none sm:text-3xl">
            {project.title}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-colors hover:bg-cream",
            focusRing,
          )}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <ScreenshotFrame
          alt={project.screenshotAlt}
          illustration={project.illustration}
          caption="Hero image coming soon"
          well={project.theme.well}
        />

        <div className="flex flex-col gap-4">
          <div>
            <p className={meta}>{resumeBrief.name}</p>
            <p className="mt-1 font-display text-[1.85rem] leading-tight sm:text-4xl">
              {resumeBrief.tagline}
            </p>
          </div>
          <p className="text-[15px] leading-relaxed text-ink">{project.description}</p>

          <div>
            <p className={meta}>Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-[13px] font-semibold"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <BrandDesign
            labelClassName={meta}
            colors={[...resumeDesign.colors]}
            fonts={[...resumeDesign.fonts]}
          />

          <div className="mt-auto pt-1">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={resumeId}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "inline-flex h-11 items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-5 text-sm font-semibold text-paper shadow-[3px_3px_0_#c5dbb8] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                focusRing,
              )}
            >
              {open ? "Hide full resume" : resumeBrief.cta}
              <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={resumeId}
            key="resume"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <FullResume />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FullResume() {
  return (
    <div className="relative border-t-[3px] border-ink bg-cream/50 px-4 py-7 sm:px-6">
      {PILL_SPOTS.map((pill) => (
        <Capsule key={pill.className} a={pill.a} b={pill.b} className={pill.className} />
      ))}

      <div className="relative space-y-7">
        <header className="rounded-[24px] border-[3px] border-ink bg-paper px-5 py-5 shadow-[4px_5px_0_rgba(60,51,43,0.1)]">
          <p className={meta}>Full resume</p>
          <h3 className="mt-1 font-display text-3xl leading-none sm:text-4xl">{resumeBrief.name}</h3>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-soft">
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {resumeBrief.location}
            </li>
            <li>
              <a
                href={`tel:${resumeBrief.phone.replace(/-/g, "")}`}
                className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
              >
                <Phone className="size-3.5" />
                {resumeBrief.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${resumeBrief.email}`}
                className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
              >
                <Mail className="size-3.5" />
                {resumeBrief.email}
              </a>
            </li>
            <li>
              <a
                href={resumeBrief.site}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                nicheleap.com
              </a>
            </li>
            <li>
              <a
                href={resumeBrief.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </header>

        <section className="rounded-[24px] border-[3px] border-ink bg-paper px-5 py-5">
          <h4 className="font-display text-2xl">Professional summary</h4>
          <p className="mt-2 text-[15px] leading-relaxed">{resumeBrief.summary}</p>
        </section>

        <section>
          <h4 className="font-display text-2xl">Technical skills</h4>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {resumeSkills.map((group) => (
              <div
                key={group.group}
                className="rounded-[22px] border-[3px] border-ink bg-paper px-4 py-4 shadow-[3px_3px_0_rgba(60,51,43,0.08)]"
              >
                <dt className={meta}>{group.group}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border-2 border-ink bg-[#fffaf3] px-2.5 py-0.5 text-[12px] font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h4 className="font-display text-2xl">Professional experience</h4>
          <ol className="mt-3 space-y-3">
            {resumeExperience.map((job) => (
              <li
                key={`${job.title}-${job.dates}`}
                className="rounded-[22px] border-[3px] border-ink bg-paper px-4 py-4 shadow-[3px_3px_0_rgba(60,51,43,0.08)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl leading-tight">{job.title}</p>
                  <p className="font-mono text-[12px] text-ink-soft">{job.dates}</p>
                </div>
                <p className="mt-1 text-sm font-semibold text-ink-soft">
                  {job.org} — {job.place}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ink" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h4 className="font-display text-2xl">Recent software projects</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {resumeProjects.map((item) => (
              <li
                key={item.name}
                className="rounded-[22px] border-[3px] border-ink bg-paper px-4 py-4 shadow-[3px_3px_0_rgba(60,51,43,0.08)]"
              >
                <p className="font-display text-lg leading-tight">{item.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-3 md:grid-cols-2">
          <section className="rounded-[22px] border-[3px] border-ink bg-paper px-4 py-4">
            <h4 className="font-display text-2xl">Education</h4>
            <ul className="mt-3 space-y-3">
              {resumeEducation.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <p className="text-sm text-ink-soft">{item.school}</p>
                  <p className="text-sm text-ink-soft">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-[22px] border-[3px] border-ink bg-paper px-4 py-4">
            <h4 className="font-display text-2xl">Certifications & licenses</h4>
            <ul className="mt-3 space-y-3">
              {resumeCerts.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <p className="text-sm text-ink-soft">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
