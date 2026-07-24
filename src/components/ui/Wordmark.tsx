import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Amaze wordmark. A tight geometric lockup with an amber operational tick —
 * reads as a control-room label, not a generic logo. The tick is the one
 * considered detail: a hazard-tape square that anchors the mark.
 */
export function Wordmark({
  className,
  sublabel = true,
}: {
  className?: string;
  sublabel?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Amaze PMS — home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-card focus-visible:outline-none",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-6 w-6 place-items-center rounded-[5px] bg-amber transition-transform duration-micro ease-transform group-hover:rotate-[-6deg]"
      >
        <span className="h-2 w-2 rounded-[1px] bg-ink-900" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-black tracking-tight text-bone-200">
          AMAZE
        </span>
        {sublabel && (
          <span className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-widest text-slate-400">
            IFM // In-House
          </span>
        )}
      </span>
    </Link>
  );
}
