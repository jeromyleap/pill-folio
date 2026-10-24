"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/data/projects";
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
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <section
          id="planner"
          className="mx-auto flex w-full max-w-[1040px] min-h-0 flex-1 flex-col justify-center px-3 py-1 sm:px-6 sm:py-1.5 lg:py-1"
        >
          <div className="stage-circle relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[32px] border-[3px] border-ink px-3 pt-5 pb-4 sm:rounded-[48px] sm:px-8 sm:pt-6 sm:pb-5 lg:max-h-[calc(100dvh-5.25rem)] lg:flex-none lg:px-9 lg:pt-5 lg:pb-4">
            <div
              aria-hidden
              className="stage-disc pointer-events-none absolute top-[48%] left-1/2 aspect-square w-[min(122%,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/20"
            />
            <div className="relative z-10 mx-auto max-w-xl shrink-0 text-center">
              <p className="text-[10px] font-extrabold tracking-[0.22em] text-ink-soft uppercase sm:text-xs">
                nicheleap.com
              </p>
              <h1 className="mt-1.5 font-display text-[2.35rem] leading-[0.95] text-ink sm:text-5xl lg:text-[3.1rem]">
                Have a day.
              </h1>
              <p className="mx-auto mt-1.5 max-w-lg text-sm leading-snug text-ink-soft sm:mt-2 sm:text-[0.95rem] sm:leading-relaxed">
                A weekly pill box for the work I keep close.
              </p>
            </div>

            {projects.length === 0 ? (
              <p className="relative z-10 mt-6 rounded-3xl border-[3px] border-dashed border-ink bg-paper px-6 py-10 text-center text-ink-soft">
                The planner is empty. Add a day in <code>data/projects.ts</code>.
              </p>
            ) : (
              <>
                <div className="relative -mx-3 mt-1 min-h-[300px] flex-1 sm:-mx-8 sm:min-h-[360px] lg:-mx-9 lg:mt-1 lg:h-[min(58dvh,540px)] lg:flex-none">
                  {/* Taller paint area than the layout slot so orbit/zoom have vertical headroom. */}
                  <div className="absolute inset-x-0 -top-8 -bottom-6 z-[1] sm:-top-10 sm:-bottom-8 lg:-top-12 lg:-bottom-10">
                    <PillBox3D
                      projects={projects}
                      activeId={activeId}
                      reduce={reduce}
                      onSelect={select}
                      onClear={() => setActiveId(null)}
                      fallback={
                        <div className="flex h-full items-center px-3 sm:px-8 lg:px-9">
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
                </div>
                <div className="relative z-10 mx-auto mt-2.5 w-full max-w-2xl shrink-0 sm:mt-3">
                  <DayChips projects={projects} activeId={activeId} onSelect={select} />
                </div>
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
              duration: reduce ? 0.12 : 0.4,
              delay: reduce ? 0.45 : 1.05,
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
                      : { opacity: 0, scale: 0.12, y: 72, filter: "blur(10px)" }
                  }
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.7, y: 28, filter: "blur(5px)" }
                  }
                  transition={
                    reduce
                      ? { duration: 0.18, delay: 0.45 }
                      : {
                          type: "spring",
                          stiffness: 88,
                          damping: 22,
                          mass: 1.35,
                          delay: 1.2,
                        }
                  }
                  style={{ transformOrigin: "50% 58%" }}
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
