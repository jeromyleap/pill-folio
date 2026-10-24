"use client";

import { useEffect, useRef } from "react";

/** Scrolls an opened card into view if needed and moves focus to its close button. */
export function useCardFocus<Card extends HTMLElement>(key: string) {
  const cardRef = useRef<Card>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const hidden = rect.top > window.innerHeight - 120 || rect.bottom < 80;
    if (hidden) {
      card.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
    closeRef.current?.focus({ preventScroll: true });
  }, [key]);

  return { cardRef, closeRef };
}
