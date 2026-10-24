import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function DayChips({
  projects,
  activeId,
  onSelect,
}: {
  projects: Project[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  function moveFocus(index: number, direction: 1 | -1) {
    const next = (index + direction + projects.length) % projects.length;
    document.getElementById(`chip-${projects[next].id}`)?.focus();
  }

  return (
    <div role="group" aria-label="Days of the week" className="grid grid-cols-7 gap-1.5 sm:gap-2">
      {projects.map((project, index) => {
        const open = project.id === activeId;
        return (
          <button
            key={project.id}
            id={`chip-${project.id}`}
            type="button"
            aria-pressed={open}
            aria-controls="project-panel"
            aria-label={`${project.dayLabel}: ${project.title}`}
            onClick={() => onSelect(project.id)}
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
            className={cn(
              "flex flex-col items-center rounded-2xl border-2 border-ink px-1 py-1.5 text-ink transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:py-2",
              open
                ? "-translate-y-0.5 shadow-[0_3px_0_#3c332b]"
                : "shadow-[0_2px_0_rgba(60,51,43,0.25)] hover:-translate-y-0.5",
            )}
            style={{ backgroundColor: open ? project.theme.lid : "#fffaf3" }}
          >
            <span className="font-display text-sm leading-none sm:text-base">
              {project.shortLabel}
            </span>
            <span className="mt-1 hidden max-w-full truncate text-[10px] font-extrabold tracking-[0.12em] uppercase sm:block">
              {project.lidName}
            </span>
            <span
              aria-hidden
              className="mt-1 h-1.5 w-5 rounded-full border border-ink"
              style={{ backgroundColor: project.theme.lid }}
            />
          </button>
        );
      })}
    </div>
  );
}
