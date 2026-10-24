"use client";

import { useEffect, useRef } from "react";

/** Moves focus to the card's close button when it opens (no page scroll). */
export function useCardFocus<Card extends HTMLElement>(key: string) {
  const cardRef = useRef<Card>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, [key]);

  return { cardRef, closeRef };
}
