"use client";

import type { Project } from "@/data/projects";
import { Compartment } from "@/components/compartment";

export function PillPlanner({
  projects,
  activeId,
  reduce,
  onSelect,
}: {
  projects: Project[];
  activeId: string | null;
  reduce: boolean;
  onSelect: (id: string) => void;
}) {
  function moveFocus(index: number, direction: 1 | -1) {
    const next = (index + direction + projects.length) % projects.length;
    document.getElementById(`day-${projects[next].id}`)?.focus();
  }

  return (
    <div className="rounded-[28px] border-[3px] border-ink bg-[#f4e6d2] p-2 shadow-[0_14px_0_rgba(60,51,43,0.06),0_22px_40px_rgba(60,51,43,0.12)] sm:p-3">
      <div
        aria-hidden
        className="mx-1 mb-2 h-3 rounded-full border-2 border-ink bg-linear-to-b from-[#f8f1e6] to-[#d9c4a8] shadow-[inset_0_1px_0_white]"
      />
      <div
        role="group"
        aria-label="Days of the week"
        className="grid grid-cols-7 gap-1 rounded-2xl bg-[#e4cdae] p-1 sm:gap-1.5 sm:p-1.5"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={project.id === activeId ? "relative z-20" : "relative"}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveFocus(index, 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveFocus(index, -1);
              }
            }}
          >
            <Compartment
              project={project}
              open={project.id === activeId}
              reduce={reduce}
              onSelect={() => onSelect(project.id)}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-2xl border-2 border-ink bg-[#f7efe2] px-3 py-2 shadow-[inset_0_2px_0_rgba(255,255,255,0.75)]">
        <span className="font-display text-sm sm:text-base">nicheleap</span>
        <span className="text-[10px] font-extrabold tracking-[0.22em] text-ink-soft uppercase">
          Weekly
        </span>
        <span aria-hidden className="flex gap-1">
          <span className="size-2.5 rounded-full border-2 border-ink bg-[#f3c3cf]" />
          <span className="size-2.5 rounded-full border-2 border-ink bg-[#f6dc8e]" />
          <span className="size-2.5 rounded-full border-2 border-ink bg-[#c5dbb8]" />
        </span>
      </div>
    </div>
  );
}
