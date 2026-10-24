"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

import type { Project } from "@/data/projects";
import { fluxoBrief, fluxoLog, fluxoSchedule } from "@/data/fluxo";
import { useCardFocus } from "@/components/use-card-focus";
import { cn } from "@/lib/utils";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#40E0D0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]";

const glass = "rounded-2xl border border-[#374151]/50 bg-[#1F2937]/50 backdrop-blur-md";

const monoLabel = "font-mono text-[11px] tracking-[0.14em] text-[#9CA3AF] uppercase";

/** Recovery phases shown by the schedule panel: open, matching, refilled. */
type Phase = 0 | 1 | 2;

export function FluxoCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const { cardRef, closeRef } = useCardFocus<HTMLDivElement>(project.id);

  return (
    <div
      ref={cardRef}
      id="project-card"
      role="region"
      aria-labelledby={titleId}
      className="scroll-mt-20 overflow-hidden rounded-[28px] border-[3px] border-ink bg-[#111827] font-fluxo text-[#F9FAFB] shadow-[0_18px_40px_rgba(60,51,43,0.16),0_0_60px_rgba(64,224,208,0.14)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#374151]/60 bg-[#0B0F19] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <FluxoMark className="size-12 shrink-0" />
          <div className="min-w-0">
            <p className={cn(monoLabel, "truncate")}>
              <span className="hidden sm:inline">
                {project.dayLabel}
                <span className="px-1.5 text-[#6B7280]">/</span>
              </span>
              {project.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-0.5 truncate text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.75rem]"
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
            "grid size-10 shrink-0 place-items-center rounded-full border border-[#374151] bg-[#1F2937] text-[#F9FAFB] transition-colors hover:border-[#40E0D0]/50",
            focusRing,
          )}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1fr_1fr] lg:gap-6">
        <RecoveryPanel />

        <div className="flex flex-col gap-4">
          <p className="text-[1.9rem] leading-[1.1] font-extrabold tracking-tighter sm:text-4xl">
            {fluxoBrief.tagline.lead}{" "}
            <span className="bg-gradient-to-r from-[#40E0D0] to-[#70F0E0] bg-clip-text text-transparent">
              {fluxoBrief.tagline.accent}
            </span>
          </p>
          <p className="text-[15px] leading-relaxed text-[#9CA3AF]">{project.description}</p>

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {fluxoBrief.facts.map((fact) => (
              <div
                key={fact.label}
                className={cn(glass, "px-3 py-2.5", fact.label === "Role" && "col-span-2 sm:col-span-1")}
              >
                <dt className={monoLabel}>{fact.label}</dt>
                <dd className="mt-1 text-[13px] leading-snug font-semibold text-[#F9FAFB]">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className={monoLabel}>Focus</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#30C0B0]/40 bg-[#40E0D0]/10 px-3 py-1 text-[13px] font-medium text-[#70F0E0]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {project.liveUrl ? (
            <div className="mt-auto pt-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 rounded-full bg-[#40E0D0] px-5 text-sm font-bold text-[#111827] shadow-[0_0_30px_rgba(64,224,208,0.25)] transition-colors hover:bg-[#70F0E0]",
                  focusRing,
                )}
              >
                {fluxoBrief.cta}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <ol className="grid gap-3 border-t border-[#374151]/60 bg-[#0B0F19]/60 px-4 py-5 sm:grid-cols-3 sm:px-5">
        {fluxoBrief.flow.map((item, index) => (
          <li key={item.step} className={cn(glass, "px-4 py-3")}>
            <p className="font-mono text-xs text-[#40E0D0]">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-1 font-bold tracking-tight">{item.step}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#9CA3AF]">{item.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FluxoMark({ className }: { className?: string }) {
  const glowId = useId();
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fluxo mark"
      className={className}
    >
      <defs>
        <filter id={glowId} x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.88 0 0 0 0 0.81 0 0 0 0.35 0" />
        </filter>
      </defs>
      <rect x="8" y="8" width="32" height="32" rx="10" fill="#40E0D0" opacity="0.3" filter={`url(#${glowId})`} />
      <rect x="6" y="6" width="36" height="36" rx="10" fill="#40E0D0" />
      <path
        d="M14 24H18L21 17L27 31L30 24H34"
        stroke="#111827"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RecoveryPanel() {
  const reduce = useReducedMotion() ?? false;
  const [tick, setTick] = useState<Phase>(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setTick((value) => ((value + 1) % 3) as Phase), 1800);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const phase: Phase = reduce ? 2 : tick;

  return (
    <figure className="self-start">
      <div aria-hidden className={cn(glass, "overflow-hidden shadow-[0_0_30px_rgba(64,224,208,0.12)]")}>
        <div className="flex items-center justify-between gap-2 border-b border-[#374151]/50 px-4 py-2.5">
          <p className="text-sm font-bold tracking-tight">Today&apos;s schedule</p>
          <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-[#40E0D0]">
            <span className="size-1.5 rounded-full bg-[#40E0D0] shadow-[0_0_8px_#40E0D0]" />
            SECURE_SYNC: ACTIVE
          </p>
        </div>

        <ul className="divide-y divide-[#374151]/40 px-2 py-1">
          {fluxoSchedule.map((slot) => (
            <li key={slot.time} className="flex items-center gap-3 px-2 py-2.5">
              <span className="w-12 shrink-0 font-mono text-[13px] text-[#9CA3AF]">{slot.time}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{slot.visit}</span>
              {slot.recovered ? <RecoveredStatus phase={phase} reduce={reduce} /> : <StatusPill tone="booked" />}
            </li>
          ))}
        </ul>

        <div className="border-t border-[#374151]/50 bg-[#0B0F19]/70 px-4 py-3">
          <p className={monoLabel}>Audit log</p>
          <ul className="mt-2 space-y-1 font-mono text-[11px] leading-relaxed">
            {fluxoLog.map((line, index) => (
              <li
                key={line.event}
                className={cn(
                  "flex gap-2 transition-opacity duration-300",
                  index <= phase ? "opacity-100" : "opacity-25",
                )}
              >
                <span className="text-[#6B7280]">{line.at}</span>
                <span className="text-[#F9FAFB]">{line.event}</span>
                <span className="truncate text-[#40E0D0]">{line.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-[#6B7280]">
        Illustrative flow: a canceled slot is matched from the waitlist and refilled. Sample
        schedule, not live clinic data.
      </figcaption>
    </figure>
  );
}

function RecoveredStatus({ phase, reduce }: { phase: Phase; reduce: boolean }) {
  const tone = phase === 0 ? "open" : phase === 1 ? "matching" : "refilled";
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={tone}
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <StatusPill tone={tone} />
      </motion.span>
    </AnimatePresence>
  );
}

function StatusPill({ tone }: { tone: "booked" | "open" | "matching" | "refilled" }) {
  const styles = {
    booked: "border-[#374151] text-[#9CA3AF]",
    open: "border-[#6B7280] text-[#F9FAFB]",
    matching: "border-[#30C0B0]/60 text-[#70F0E0]",
    refilled: "border-[#40E0D0] bg-[#40E0D0] text-[#111827] shadow-[0_0_14px_rgba(64,224,208,0.45)]",
  }[tone];
  const label = { booked: "Booked", open: "Canceled", matching: "Matching…", refilled: "Refilled" }[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2.5 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase",
        styles,
      )}
    >
      {label}
    </span>
  );
}
