"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { Project } from "@/data/projects";
import { PillSpill } from "@/components/pill-spill";

export function Compartment({
  project,
  open,
  reduce,
  onSelect,
}: {
  project: Project;
  open: boolean;
  reduce: boolean;
  onSelect: () => void;
}) {
  const [hover, setHover] = useState(false);
  const tilt = open ? -112 : hover ? -14 : 0;

  return (
    <button
      id={`day-${project.id}`}
      type="button"
      aria-expanded={open}
      aria-controls="project-card"
      aria-label={`${project.dayLabel}: ${project.title}`}
      onClick={onSelect}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      className="relative block h-[88px] w-full cursor-pointer rounded-xl text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:h-[138px] lg:h-[156px]"
      style={{ perspective: "800px" }}
    >
      <span
        className="absolute inset-0 rounded-xl border-2 border-ink/70"
        style={{
          backgroundColor: project.theme.well,
          boxShadow: "inset 0 8px 14px rgba(60, 51, 43, 0.08)",
        }}
      />
      <PillSpill open={open} theme={project.theme} reduce={reduce} />
      <motion.span
        aria-hidden
        className="absolute inset-0 block"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
        initial={false}
        animate={
          reduce
            ? { opacity: open ? 0 : 1, rotateX: 0 }
            : { opacity: 1, rotateX: tilt }
        }
        transition={
          reduce
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 210, damping: 20 }
        }
      >
        <span
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-ink"
          style={{
            backgroundColor: project.theme.lid,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <span className="pointer-events-none absolute inset-x-1 top-1 h-1/3 rounded-t-lg bg-white/45" />
          <span className="relative font-display text-[13px] leading-none sm:text-xl">
            {project.shortLabel}
          </span>
          <span className="relative mt-1 hidden text-[10px] font-extrabold tracking-[0.14em] uppercase sm:block">
            {project.lidName}
          </span>
          <span
            className="absolute -bottom-1 left-1/2 hidden h-2 w-5 -translate-x-1/2 rounded-b-full border-2 border-t-0 border-ink sm:block"
            style={{ backgroundColor: project.theme.deep }}
          />
        </span>
        <span
          className="absolute inset-0 rounded-xl border-2 border-ink"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.28), transparent 40%), ${project.theme.deep}`,
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </motion.span>
    </button>
  );
}
