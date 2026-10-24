"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col items-start justify-center px-6 py-24">
      <p className="text-xs font-extrabold tracking-[0.18em] text-ink-soft uppercase">
        nicheleap
      </p>
      <h1 className="mt-3 font-display text-4xl">The lid stuck.</h1>
      <p className="mt-3 text-ink-soft">
        Something on the page failed to open. The planner is still here when you try again.
      </p>
      <Button
        type="button"
        onClick={reset}
        className="mt-6 h-11 rounded-full border-2 border-ink px-4"
      >
        Try again
      </Button>
    </main>
  );
}
