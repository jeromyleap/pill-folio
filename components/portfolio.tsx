"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/data/projects";
import { PillPlanner } from "@/components/pill-planner";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WeekIndex } from "@/components/week-index";
import { cn } from "@/lib/utils";

export function Portfolio({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;
  const active = projects.find((project) => project.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;
    const id = activeId;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setActiveId(null);
      window.setTimeout(() => {
        document.getElementById(`day-${id}`)?.focus();
      }, 0);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  function select(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  function close() {
    const id = activeId;
    setActiveId(null);
    if (!id) return;
    window.setTimeout(() => {
      document.getElementById(`day-${id}`)?.focus();
    }, 0);
  }

  return (
    <div
      className="flex min-h-full flex-col"
      onClick={(event) => {
        if (!activeId) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("button, a, summary, #project-card")) return;
        close();
      }}
    >
      <SiteHeader />
      <main className="flex-1">
        <section
          id="planner"
          className={cn(
            "mx-auto mt-6 w-full max-w-[980px] px-3 sm:mt-10 sm:px-6",
            active && "relative z-[60]",
          )}
        >
          <div className="stage-circle relative mx-auto w-full rounded-[48px] border-[3px] border-ink px-3 pt-8 pb-10 sm:px-8 sm:pt-10 lg:aspect-square lg:max-w-[920px] lg:rounded-full lg:px-16 lg:pt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-4 rounded-[36px] border border-dashed border-ink/25 lg:rounded-full"
            />
            <div className="relative">
              <div className="mx-auto max-w-xl text-center">
                <p className="text-xs font-extrabold tracking-[0.22em] text-ink-soft uppercase">
                  nicheleap.com
                </p>
                <h1 className="mt-2 font-display text-4xl leading-[0.95] text-ink sm:text-6xl">
                  Open a day.
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                  A weekly pill box for the work I keep close — school, family archives,
                  watch faces, clinic tools, and a cleaning crew&apos;s schedule.
                </p>
              </div>

              <div className="mt-6">
                {projects.length === 0 ? (
                  <p className="rounded-3xl border-[3px] border-dashed border-ink bg-paper px-6 py-10 text-center text-ink-soft">
                    The planner is empty. Add a day in <code>data/projects.ts</code>.
                  </p>
                ) : (
                  <PillPlanner
                    projects={projects}
                    activeId={activeId}
                    reduce={reduce}
                    onSelect={select}
                  />
                )}
                <p className="mt-4 text-center text-sm text-ink-soft" aria-live="polite">
                  {active
                    ? `${active.dayLabel} is open — ${active.title}.`
                    : "Tap a lid. The pills spill, then the card. Arrow keys move between days."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={cn(active && "relative z-[60]")}>
          <WeekIndex projects={projects} activeId={activeId} onSelect={select} />
        </div>
      </main>
      <SiteFooter />

      <AnimatePresence>
        {active ? (
          <motion.div
            key="shade"
            className="fixed inset-0 z-50 bg-[#3c332b]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            className="fixed bottom-3 left-1/2 z-[70] w-[min(920px,calc(100%-1.5rem))]"
            initial={
              reduce
                ? { opacity: 0, x: "-50%" }
                : { opacity: 0, y: 72, scale: 0.97, x: "-50%" }
            }
            animate={
              reduce
                ? { opacity: 1, x: "-50%" }
                : { opacity: 1, y: 0, scale: 1, x: "-50%" }
            }
            exit={
              reduce
                ? { opacity: 0, x: "-50%" }
                : { opacity: 0, y: 36, scale: 0.98, x: "-50%" }
            }
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 280, damping: 26, delay: 0.05 }
            }
          >
            <ProjectCard project={active} onClose={close} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
