import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Consistent section header: mono readout eyebrow, display heading, optional
 * lede. Used across every section so headings share one rhythm.
 */
export function SectionHeader({
  code,
  title,
  lede,
  align = "left",
  className,
  as = "h2",
  id,
}: {
  /** Mono readout, e.g. "SEC-02 // SERVICES". */
  code: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  const Heading = as;
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-amber" />
          <span className="font-mono text-micro uppercase tracking-widest text-amber">
            {code}
          </span>
        </div>
      </Reveal>
      <Reveal index={1}>
        <Heading
          id={id}
          className="text-balance font-display text-3xl font-bold tracking-tight text-bone-100 sm:text-4xl"
        >
          {title}
        </Heading>
      </Reveal>
      {lede && (
        <Reveal index={2}>
          <p
            className={cn(
              "mt-5 text-lg text-bone-300",
              align === "center" && "mx-auto max-w-prose",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
