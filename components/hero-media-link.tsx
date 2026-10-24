"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps a project-card hero/screenshot. Hover adds a soft glow; click opens
 * the live site in a new tab when `href` is set.
 */
export function HeroMediaLink({
  href,
  label,
  className,
  children,
}: {
  href?: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "group/hero block rounded-[inherit] outline-none transition-[transform,filter,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:brightness-[1.03] hover:saturate-[1.08]",
        "hover:shadow-[0_0_0_3px_rgba(255,255,255,0.35),0_12px_36px_rgba(0,0,0,0.18)]",
        "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {children}
    </a>
  );
}
