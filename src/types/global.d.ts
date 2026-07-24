import type Lenis from "lenis";

declare global {
  interface Window {
    /** Set by SmoothScrollProvider; used for programmatic anchor scrolling. */
    __lenis?: Lenis;
  }
}

export {};
