import type { ThemeTokens } from "@/data/projects";
import { Capsule } from "@/components/capsule";
import { cn } from "@/lib/utils";

const SPOTS = [
  { className: "-top-2 -left-1 rotate-[-28deg] sm:-top-3 sm:-left-3", pick: [0, 1] as const },
  { className: "-top-1 right-6 rotate-[18deg] sm:-top-2 sm:right-10", pick: [1, 2] as const },
  { className: "top-1/3 -right-2 rotate-[52deg] sm:-right-3", pick: [2, 0] as const },
  { className: "-bottom-2 left-8 -rotate-[14deg] sm:-bottom-3 sm:left-14", pick: [0, 2] as const },
] as const;

/** Decorative capsules perched on the edges of an open project card. */
export function ScatteredCardPills({ theme }: { theme: ThemeTokens }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {SPOTS.map((spot) => (
        <Capsule
          key={spot.className}
          a={theme.pills[spot.pick[0]]}
          b={theme.pills[spot.pick[1]]}
          className={cn("absolute h-3.5 w-8 shadow-[2px_3px_0_rgba(60,51,43,0.2)]", spot.className)}
        />
      ))}
    </div>
  );
}
