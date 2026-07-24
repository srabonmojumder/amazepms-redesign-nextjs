import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a trailing arrow that nudges on hover. */
  withArrow?: boolean;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-ink-900 hover:bg-amber-300 shadow-[0_8px_30px_-12px_rgba(255,176,32,0.6)]",
  outline:
    "border border-ink-500 text-bone-200 hover:border-amber hover:text-amber bg-transparent",
  ghost: "text-bone-300 hover:text-bone-100 bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    withArrow = false,
    ...rest
  } = props;

  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-display font-semibold tracking-tight",
    "transition-all duration-micro ease-transform focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-micro ease-transform group-hover/btn:translate-x-0.5"
          fill="none"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
