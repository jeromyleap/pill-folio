import { Capsule } from "@/components/capsule";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 shrink-0 border-b-2 border-ink/15 bg-[#f6efe4]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 sm:px-6 sm:py-2">
        <a href="#planner" className="flex items-center gap-2 text-ink">
          <span aria-hidden className="flex items-center">
            <Capsule a="#f6dc8e" b="#fffaf3" className="-rotate-12" />
            <Capsule a="#d9c8f0" b="#f3c3cf" className="-ml-2 rotate-12" />
          </span>
          <span className="font-display text-xl leading-none tracking-tight sm:text-2xl">
            nicheleap
          </span>
        </a>
        <p className="text-right text-xs font-semibold text-ink-soft sm:text-sm">
          Seven days, one box
        </p>
      </div>
    </header>
  );
}
