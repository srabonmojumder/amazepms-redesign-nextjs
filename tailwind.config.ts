import type { Config } from "tailwindcss";

/**
 * Amaze PMS — "Operational Precision" design tokens.
 * Every value used across the site lives here. JSX carries zero magic values.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    // ------------------------------------------------------------------
    // COLOR — architectural charcoal base, single amber signal accent
    // ------------------------------------------------------------------
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      // Base surfaces — layered near-blacks, never pure #000
      ink: {
        DEFAULT: "#0B0D0E", // deepest — page background
        900: "#0B0D0E",
        800: "#121517", // raised surface
        700: "#181C1F", // card / panel surface
        600: "#20262A", // hairline borders on dark
        500: "#2A3237", // elevated stroke
      },

      // Primary/secondary text on dark
      bone: {
        DEFAULT: "#F4F2EE", // warm bone — light "human" sections
        50: "#FAF9F6",
        100: "#F4F2EE",
        200: "#E8EAEB", // primary text on dark
        300: "#B4BCC1", // body text on dark
      },

      slate: {
        DEFAULT: "#5A6B75", // brand cool slate (decorative / large text)
        400: "#7C8A93", // AA on ink (5.5:1)
        500: "#6E7F89", // AA on ink (4.7:1) — nudged up from #5A6B75 for small text
        600: "#44515A",
        700: "#333D44",
      },

      // The one accent — safety amber
      amber: {
        DEFAULT: "#FFB020",
        300: "#FFC65C",
        400: "#FFB020",
        500: "#F5A200",
        600: "#D98A00",
        700: "#8A5800", // dark amber for AA text on light (bone) sections
        glow: "rgba(255, 176, 32, 0.16)",
      },

      // Semantic status (used sparingly in live-ops readouts)
      signal: {
        active: "#48C78E",
        alert: "#FF5C5C",
      },

      white: "#FFFFFF",
      black: "#000000",
    },

    // ------------------------------------------------------------------
    // TYPOGRAPHY
    // ------------------------------------------------------------------
    fontFamily: {
      display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      body: ["var(--font-inter)", "system-ui", "sans-serif"],
      mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
    },

    // Fluid type scale — clamp() throughout, no fixed px in JSX
    fontSize: {
      "micro": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }], // 11px mono labels
      "caption": ["clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)", { lineHeight: "1.4" }],
      "sm": ["clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)", { lineHeight: "1.5" }],
      "base": ["clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)", { lineHeight: "1.65" }], // 17px body
      "lg": ["clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)", { lineHeight: "1.55" }],
      "xl": ["clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)", { lineHeight: "1.4" }],
      "2xl": ["clamp(1.5rem, 1.3rem + 1vw, 2rem)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
      "3xl": ["clamp(1.875rem, 1.5rem + 1.8vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      "4xl": ["clamp(2.5rem, 1.9rem + 3vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
      "5xl": ["clamp(3rem, 2rem + 5vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
      "6xl": ["clamp(3.5rem, 1.8rem + 8vw, 8rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
      "hero": ["clamp(3rem, 1rem + 10vw, 9.5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
    },

    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },

    letterSpacing: {
      tightest: "-0.04em",
      tighter: "-0.03em",
      tight: "-0.02em",
      normal: "0",
      wide: "0.04em",
      wider: "0.08em",
      widest: "0.12em", // mono technical labels
    },

    // ------------------------------------------------------------------
    // SPACING, LAYOUT, RADII, SHADOWS, MOTION
    // ------------------------------------------------------------------
    extend: {
      spacing: {
        section: "clamp(5rem, 3rem + 8vw, 10rem)", // vertical rhythm between sections
        gutter: "clamp(1.25rem, 0.5rem + 3vw, 4rem)", // page horizontal padding
      },
      maxWidth: {
        content: "88rem", // 1408px — main content cap
        prose: "42rem",
        readout: "20rem",
      },
      borderRadius: {
        card: "0.75rem",
        panel: "1rem",
        pill: "62.5rem",
      },
      borderColor: {
        DEFAULT: "#20262A",
      },
      backgroundImage: {
        // Blueprint technical grid — revealed on hover/scroll
        "blueprint": `linear-gradient(to right, rgba(90,107,117,0.09) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(90,107,117,0.09) 1px, transparent 1px)`,
        "blueprint-fine": `linear-gradient(to right, rgba(90,107,117,0.06) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(90,107,117,0.06) 1px, transparent 1px)`,
        "amber-radial": "radial-gradient(circle at center, rgba(255,176,32,0.14), transparent 60%)",
        "ink-fade": "linear-gradient(180deg, transparent 0%, #0B0D0E 92%)",
        "grain": "url('/textures/grain.svg')",
      },
      backgroundSize: {
        grid: "clamp(28px, 4vw, 56px) clamp(28px, 4vw, 56px)",
        "grid-fine": "16px 16px",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 24px 60px -24px rgba(0,0,0,0.7)",
        "amber-glow": "0 0 0 1px rgba(255,176,32,0.4), 0 8px 40px -8px rgba(255,176,32,0.35)",
        "lift": "0 32px 80px -32px rgba(0,0,0,0.85)",
        focus: "0 0 0 2px #0B0D0E, 0 0 0 4px #FFB020",
      },
      transitionTimingFunction: {
        // Motion tokens from the art direction
        entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
        transform: "cubic-bezier(0.65, 0, 0.35, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        base: "400ms",
        section: "800ms",
      },
      backdropBlur: {
        panel: "14px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-4%, 3%)" },
          "40%": { transform: "translate(-2%, -4%)" },
          "60%": { transform: "translate(3%, 2%)" },
          "80%": { transform: "translate(2%, -2%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.82)" },
        },
        "scan": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        grain: "grain-shift 8s steps(6) infinite",
        "pulse-dot": "pulse-dot 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        scan: "scan 4s cubic-bezier(0.65,0,0.35,1) infinite",
      },
      zIndex: {
        nav: "50",
        overlay: "60",
        modal: "70",
      },
    },
  },
  plugins: [],
};

export default config;
