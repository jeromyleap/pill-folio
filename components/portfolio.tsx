"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/data/projects";
import { Capsule } from "@/components/capsule";
import { DayChips } from "@/components/day-chips";
import { PillPlanner } from "@/components/pill-planner";
import { ProjectCard } from "@/components/project-card";
import { ScatteredCardPills } from "@/components/scattered-card-pills";
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

  useEffect(() => {
    if (!activeId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
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
    <div className="flex min-h-full flex-col">
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
                <p className="relative mt-5 flex items-center justify-center gap-2 text-center text-sm text-ink-soft">
                  <span aria-hidden className="inline-flex items-center">
                    <Capsule a="#c5dbb8" b="#fffaf3" className="-rotate-12" />
                    <Capsule a="#d9c8f0" b="#f8c8a8" className="-ml-1 rotate-12" />
                  </span>
                  Pick a lid — the day spills out over the box.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />

      <AnimatePresence>
        {active ? (
          <motion.div
            key="spill-overlay"
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain px-3 py-6 sm:items-center sm:px-6 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduce ? 0.12 : 0.28,
              delay: reduce ? 0.35 : 0.55,
            }}
          >
            <button
              type="button"
              aria-label="Close project card"
              className="absolute inset-0 bg-[#3c332b]/45 backdrop-blur-[2px]"
              onClick={close}
            />
            <div className="relative z-10 my-auto w-full max-w-[960px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  id="project-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label={active.title}
                  className="relative"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.28, y: 36, filter: "blur(6px)" }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.72, y: 18, filter: "blur(4px)" }
                  }
                  transition={
                    reduce
                      ? { duration: 0.15, delay: 0.35 }
                      : {
                          // Wait for the 3D spill (pills release ~0.12–0.35s) before the card pops.
                          type: "spring",
                          stiffness: 160,
                          damping: 24,
                          mass: 1.05,
                          delay: 0.62,
                        }
                  }
                  style={{ transformOrigin: "50% 35%" }}
                >
                  <ScatteredCardPills theme={active.theme} />
                  <ProjectCard project={active} onClose={close} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
