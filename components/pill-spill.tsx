"use client";

import { motion } from "framer-motion";

import type { ThemeTokens } from "@/data/projects";
import { Capsule } from "@/components/capsule";

const SPILL = [
  { x: -18, y: -26, r: -32, tone: 0 },
  { x: 8, y: -36, r: 18, tone: 1 },
  { x: 16, y: -10, r: 36, tone: 2 },
  { x: -8, y: 2, r: -14, tone: 1 },
  { x: 2, y: 10, r: 8, tone: 0 },
  { x: -14, y: 8, r: -42, tone: 2 },
] as const;

export function PillSpill({
  open,
  theme,
  reduce,
}: {
  open: boolean;
  theme: ThemeTokens;
  reduce: boolean;
}) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {SPILL.map((pill, index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-1/2"
          initial={false}
          animate={
            open
              ? { x: pill.x, y: pill.y, rotate: pill.r, opacity: 1, scale: 1 }
              : { x: 0, y: 10, rotate: 0, opacity: 0, scale: 0.5 }
          }
          transition={
            reduce
              ? { duration: 0.15 }
              : {
                  type: "spring",
                  stiffness: 340,
                  damping: 16,
                  delay: open ? 0.08 + index * 0.045 : 0,
                }
          }
        >
          <span className="-translate-x-1/2 -translate-y-1/2">
            <Capsule
              a={theme.pills[pill.tone]}
              b={pill.tone === 2 ? theme.cream : theme.lid}
              className="origin-center scale-90 sm:scale-100"
            />
          </span>
        </motion.span>
      ))}
    </span>
  );
}
