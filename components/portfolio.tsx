"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/data/projects";
import { Capsule } from "@/components/capsule";
import { DayChips } from "@/components/day-chips";
import { PillPlanner } from "@/components/pill-planner";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const PillBox3D = dynamic(() => import("@/components/pill-box-3d"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <p className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-[3px_3px_0_rgba(60,51,43,0.12)]">
        Setting out the week…
      </p>
    </div>
  ),
});

export function Portfolio({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;
  const active = projects.find((project) => project.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;
    const id = activeId;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setActiveId(null);
      document.getElementById(`chip-${id}`)?.focus({ preventScroll: true });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  function select(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  function close() {
    const id = activeId;
    setActiveId(null);
    if (id) document.getElementById(`chip-${id}`)?.focus({ preventScroll: true });
  }

  return (
    <div
      className="flex min-h-full flex-col"
      onClick={(event) => {
        if (!activeId) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("button, a, summary, canvas, #project-panel")) return;
        setActiveId(null);
      }}
    >
      <SiteHeader />
      <main className="flex-1">
        <section id="planner" className="mx-auto mt-6 w-full max-w-[1040px] px-3 sm:mt-10 sm:px-6">
          <div className="stage-circle relative overflow-hidden rounded-[40px] border-[3px] border-ink px-3 pt-8 pb-5 sm:rounded-[56px] sm:px-8 sm:pt-10 sm:pb-7">
            <div
              aria-hidden
              className="stage-disc pointer-events-none absolute top-[46%] left-1/2 aspect-square w-[min(118%,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/20"
            />
            <div className="relative mx-auto max-w-xl text-center">
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

            {projects.length === 0 ? (
              <p className="relative mt-6 rounded-3xl border-[3px] border-dashed border-ink bg-paper px-6 py-10 text-center text-ink-soft">
                The planner is empty. Add a day in <code>data/projects.ts</code>.
              </p>
            ) : (
              <>
                <div className="relative -mx-3 mt-2 h-[300px] sm:-mx-8 sm:h-[400px] lg:h-[460px]">
                  <PillBox3D
                    projects={projects}
                    activeId={activeId}
                    reduce={reduce}
                    onSelect={select}
                    onClear={() => setActiveId(null)}
                    fallback={
                      <div className="flex h-full items-center px-3 sm:px-8">
                        <div className="w-full">
                          <PillPlanner
                            projects={projects}
                            activeId={activeId}
                            reduce={reduce}
                            onSelect={select}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>
                <p className="relative text-center text-xs font-semibold text-ink-soft sm:text-sm">
                  Drag to spin · scroll or pinch to zoom · click a lid
                </p>
                <div className="relative mx-auto mt-4 max-w-2xl">
                  <DayChips projects={projects} activeId={activeId} onSelect={select} />
                </div>
              </>
            )}
          </div>
        </section>

        <section
          id="project-panel"
          aria-live="polite"
          className="mx-auto w-full max-w-[1040px] px-3 pt-6 pb-16 sm:px-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.98 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
                transition={
                  reduce
                    ? { duration: 0.15 }
                    : { type: "spring", stiffness: 260, damping: 26, delay: 0.12 }
                }
              >
                <ProjectCard project={active} onClose={close} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-dashed border-ink/40 bg-paper/60 px-6 py-10 text-center"
              >
                <span aria-hidden className="flex items-center">
                  <Capsule a="#c5dbb8" b="#fffaf3" className="-rotate-12" />
                  <Capsule a="#d9c8f0" b="#f8c8a8" className="-ml-1 rotate-12" />
                  <Capsule a="#b9d7e8" b="#f7e2a0" className="-ml-1 -rotate-6" />
                </span>
                <p className="font-display text-xl text-ink sm:text-2xl">No day open yet</p>
                <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                  Pick a lid on the box or a day above. Its project slides in here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
