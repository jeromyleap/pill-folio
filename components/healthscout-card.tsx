"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, ChevronDown, X } from "lucide-react";

import type { Project } from "@/data/projects";
import { healthScoutCaseStudy as brief, healthScoutDesign } from "@/data/healthscout";
import { useCardFocus } from "@/components/use-card-focus";
import { BrandDesign } from "@/components/brand-design";
import { HeroMediaLink } from "@/components/hero-media-link";
import { cn } from "@/lib/utils";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const meta = "text-[11px] font-medium tracking-wider text-[#64748b] uppercase";

export function HealthScoutCard({
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
      className="scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-[#f8fafc] font-healthscout text-[#09090b] shadow-[0_18px_40px_rgba(60,51,43,0.16)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {project.logo ? (
            // Local crop of the HealthScout shield crest.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo}
              alt="HealthScout shield crest"
              className="size-12 shrink-0 rounded-full object-cover ring-2 ring-[#10b981]/20"
            />
          ) : null}
          <div className="min-w-0">
            <p className={cn(meta, "truncate")}>
              <span className="hidden sm:inline">
                {project.dayLabel}
                <span className="px-1.5 text-[#e2e8f0]">/</span>
              </span>
              {project.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-0.5 truncate text-2xl leading-tight font-bold tracking-tight sm:text-[1.75rem]"
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
            "grid size-10 shrink-0 place-items-center rounded-full border border-[#e2e8f0] bg-white text-[#09090b] transition-colors hover:bg-[#f8fafc]",
            focusRing,
          )}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <figure className="self-start">
          <HeroMediaLink
            href={project.liveUrl}
            label={`Open live site: ${project.title}`}
            className="rounded-2xl hover:shadow-[0_0_0_2px_rgba(16,185,129,0.35),0_14px_36px_rgba(5,150,105,0.28)]"
          >
            <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_10px_30px_rgba(9,9,11,0.08)]">
              <div className="flex items-center gap-1.5 border-b border-[#e2e8f0] px-3 py-2">
                <span className="size-2.5 rounded-full bg-[#ef4444]/70" />
                <span className="size-2.5 rounded-full bg-[#f59e0b]/70" />
                <span className="size-2.5 rounded-full bg-[#10b981]/70" />
                <span className="ml-2 truncate rounded-full bg-[#f8fafc] px-2.5 py-0.5 text-[11px] text-[#64748b]">
                  HealthScout · live demo
                </span>
              </div>
              <div className="aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.screenshot}
                  alt={project.screenshotAlt}
                  className="h-full w-full object-cover object-top transition-[transform,filter] duration-300 group-hover/hero:scale-[1.02] motion-reduce:group-hover/hero:scale-100"
                />
              </div>
            </div>
          </HeroMediaLink>
        </figure>

        <div className="flex flex-col gap-4">
          <p className="text-[1.9rem] leading-tight font-bold tracking-tight sm:text-4xl">
            Know before you <span className="text-[#059669]">go.</span>
          </p>
          <p className="text-[15px] leading-relaxed text-[#3f3f46]">{project.description}</p>

          <div className="flex items-start gap-2 rounded-xl border border-[#10b981]/25 bg-[#ecfdf5] px-3 py-2.5">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#059669]" />
            <p className="text-[13px] leading-snug text-[#047857]">
              <span className="font-semibold">Role:</span> {brief.role}
            </p>
          </div>

          <div>
            <p className={meta}>Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-[13px] font-medium text-[#09090b]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <BrandDesign
            labelClassName={meta}
            colors={[...healthScoutDesign.colors]}
            fonts={[...healthScoutDesign.fonts]}
          />

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 rounded-full bg-[#059669] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(5,150,105,0.25)] transition-colors hover:bg-[#047857]",
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
                "inline-flex h-11 items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-5 text-sm font-semibold text-[#09090b] transition-colors hover:border-[#10b981]/40 hover:bg-[#ecfdf5]",
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
    <div className="space-y-7 border-t border-[#e2e8f0] px-4 py-6 sm:px-5">
      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-4">
          <p className={meta}>The problem</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#3f3f46]">{brief.problem}</p>
        </section>
        <section className="rounded-2xl border border-[#10b981]/25 bg-[#ecfdf5] px-4 py-4">
          <p className="text-[11px] font-medium tracking-wider text-[#047857] uppercase">The solution</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#09090b]">{brief.solution}</p>
        </section>
      </div>

      <DisciplineMatrix />

      <section>
        <h3 className="text-xl font-semibold text-[#18181b]">What travelers get</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brief.features.map((feature) => (
            <li key={feature.title} className="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3">
              <p className="font-medium text-[#18181b]">{feature.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#3f3f46]">{feature.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-[#18181b]">Who it serves</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {brief.audience.map((group) => (
            <li
              key={group}
              className="rounded-full border border-[#10b981]/25 bg-[#ecfdf5] px-3 py-1 text-[13px] font-medium text-[#047857]"
            >
              {group}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-[#18181b]">The stack</h3>
        <dl className="mt-3 grid gap-4 sm:grid-cols-3">
          {brief.stack.map((group) => (
            <div key={group.group}>
              <dt className={meta}>{group.group}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e2e8f0] bg-white px-2.5 py-0.5 text-[12px] font-medium text-[#09090b]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function DisciplineMatrix() {
  const [active, setActive] = useState(brief.disciplines[0].id);
  const discipline = brief.disciplines.find((item) => item.id === active) ?? brief.disciplines[0];

  return (
    <section className="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-[#18181b]">Ratings that fit the job</h3>
          <p className="mt-1 text-sm text-[#64748b]">
            Each discipline rates the things that make or break its shifts.
          </p>
        </div>
        <div
          role="group"
          aria-label="Clinical discipline"
          className="flex flex-wrap rounded-full border border-[#e2e8f0] bg-[#f8fafc] p-1"
        >
          {brief.disciplines.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === active}
              onClick={() => setActive(item.id)}
              className={cn(
                "h-8 rounded-full px-3 text-[13px] font-medium transition-colors",
                item.id === active
                  ? "bg-white text-[#047857] shadow-[0_1px_3px_rgba(9,9,11,0.12)]"
                  : "text-[#64748b] hover:text-[#09090b]",
                focusRing,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {discipline.criteria.map((criterion) => (
          <li
            key={criterion}
            className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2.5 text-sm font-medium text-[#18181b]"
          >
            <span className="size-2 shrink-0 rounded-full bg-[#10b981]" />
            {criterion}
          </li>
        ))}
      </ul>
    </section>
  );
}
