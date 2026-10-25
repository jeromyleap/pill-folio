"use client";

import { cn } from "@/lib/utils";

export type BrandSwatch = {
  hex: string;
  name: string;
};

export type BrandFont = {
  name: string;
  role: string;
  /** Tailwind font utility so the sample renders in that face. */
  className?: string;
};

/**
 * Compact brand strip: four color circles with hex under them, plus the
 * typefaces. Shared by every branded project card under Built with.
 */
export function BrandDesign({
  colors,
  fonts,
  tone = "light",
  labelClassName,
}: {
  colors: readonly BrandSwatch[];
  fonts: readonly BrandFont[];
  tone?: "light" | "dark";
  labelClassName?: string;
}) {
  const dark = tone === "dark";
  const label =
    labelClassName ??
    (dark
      ? "text-[11px] font-semibold tracking-[0.16em] text-[#A8B0BD] uppercase"
      : "text-[11px] font-medium tracking-wider text-[#64748b] uppercase");

  return (
    <div>
      <p className={label}>Design</p>
      <div className="mt-2 space-y-3">
        <ul className="flex flex-wrap gap-3">
          {colors.map((swatch) => (
            <li key={swatch.hex} className="flex w-12 flex-col items-center gap-1.5">
              <span
                title={swatch.name}
                aria-label={`${swatch.name} ${swatch.hex}`}
                className={cn(
                  "size-8 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
                  dark && "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]",
                )}
                style={{ backgroundColor: swatch.hex }}
              />
              <span
                className={cn(
                  "font-mono text-[9px] leading-none tracking-tight",
                  dark ? "text-[#A8B0BD]" : "text-[#64748b]",
                )}
              >
                {swatch.hex}
              </span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {fonts.map((font) => (
            <li key={`${font.role}-${font.name}`} className="min-w-0">
              <p
                className={cn(
                  "text-[15px] leading-tight font-bold",
                  // Script samples need room for flourishes — don't clip them.
                  font.className?.includes("script") ? "overflow-visible py-0.5" : "truncate",
                  dark ? "text-[#F1F5F9]" : "text-[#09090b]",
                  font.className,
                )}
              >
                {font.name}
              </p>
              <p
                className={cn(
                  "text-[11px] font-normal tracking-wide uppercase",
                  dark ? "text-[#8C95A3]" : "text-[#64748b]",
                )}
              >
                {font.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
