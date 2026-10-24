import type { Project } from "@/data/projects";

export function WeekIndex({
  projects,
  activeId,
  onSelect,
}: {
  projects: Project[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (projects.length === 0) return null;

  return (
    <section className="mx-auto mt-12 w-full max-w-3xl px-4 pb-16">
      <h2 className="font-display text-2xl sm:text-3xl">Written out, for the record</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        Same seven compartments, listed in order. Open one if the lids are feeling shy.
      </p>
      <ul className="mt-5 space-y-2">
        {projects.map((project) => {
          const open = project.id === activeId;
          return (
            <li key={project.id}>
              <button
                type="button"
                aria-pressed={open}
                onClick={() => onSelect(project.id)}
                className="flex w-full items-center gap-3 rounded-2xl border-2 border-ink bg-paper px-3 py-3 text-left shadow-[3px_3px_0_rgba(60,51,43,0.08)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink font-display"
                  style={{ backgroundColor: project.theme.lid }}
                >
                  {project.shortLabel}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold tracking-[0.16em] text-ink-soft uppercase">
                    {project.dayLabel}
                  </span>
                  <span className="block truncate font-display text-lg leading-tight">
                    {project.title}
                  </span>
                </span>
                <span className="ml-auto hidden text-sm font-semibold text-ink-soft sm:block">
                  {open ? "Close" : "Open"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
