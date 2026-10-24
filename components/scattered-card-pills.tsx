import type { ThemeTokens } from "@/data/projects";
import { Capsule } from "@/components/capsule";
import { cn } from "@/lib/utils";

/**
 * Edge capsules for an open project card. Colors come from the same
 * `theme.pills` trio the 3D compartment spills — solid halves so they read
 * like the toon pills that just left the box.
 */
const SPOTS = [
  { className: "-top-2 -left-1 rotate-[-28deg] sm:-top-3 sm:-left-3", tone: 0 },
  { className: "-top-1 right-6 rotate-[18deg] sm:-top-2 sm:right-10", tone: 1 },
  { className: "top-1/3 -right-2 rotate-[52deg] sm:-right-3", tone: 2 },
  { className: "-bottom-2 left-8 -rotate-[14deg] sm:-bottom-3 sm:left-14", tone: 0 },
  { className: "bottom-10 -left-2 rotate-[38deg] sm:bottom-14 sm:-left-3", tone: 1 },
] as const;

export function ScatteredCardPills({ theme }: { theme: ThemeTokens }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {SPOTS.map((spot) => {
        const color = theme.pills[spot.tone];
        return (
          <Capsule
            key={spot.className}
            a={color}
            b={color}
            className={cn(
              "absolute h-3.5 w-8 border-ink shadow-[2px_3px_0_rgba(60,51,43,0.22)]",
              spot.className,
            )}
          />
        );
      })}
    </div>
  );
}
