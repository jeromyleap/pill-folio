import { cn } from "@/lib/utils";

export function Capsule({
  a,
  b,
  className,
}: {
  a: string;
  b: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block h-3 w-7 overflow-hidden rounded-full border-2 border-ink shadow-[1px_2px_0_rgba(60,51,43,0.18)]",
        className,
      )}
      style={{ background: `linear-gradient(90deg, ${a} 0 50%, ${b} 50% 100%)` }}
    >
      <span className="absolute top-px left-1 h-1 w-2 rounded-full bg-white/80" />
    </span>
  );
}
