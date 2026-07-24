import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Amaze PMS — Integrated Facility Management, delivered in-house";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social-share card (1200×630), generated at build time with the
 * Satoshi display font so link previews match the site's identity.
 */
export default async function OpengraphImage() {
  const [black, medium] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Satoshi-Black.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Satoshi-Medium.ttf")),
  ]);

  const readouts = [
    ["UPTIME", "99.4%"],
    ["SITES", "200+"],
    ["WORKFORCE", "15,000+"],
    ["COVERAGE", "PAN-INDIA"],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B0D0E",
          color: "#F4F2EE",
          fontFamily: "Satoshi",
          position: "relative",
        }}
      >
        {/* corner ticks */}
        <div style={{ position: "absolute", top: 36, left: 36, width: 22, height: 22, borderTop: "2px solid rgba(255,176,32,0.6)", borderLeft: "2px solid rgba(255,176,32,0.6)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 36, right: 36, width: 22, height: 22, borderBottom: "2px solid rgba(255,176,32,0.6)", borderRight: "2px solid rgba(255,176,32,0.6)", display: "flex" }} />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#FFB020", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, backgroundColor: "#0B0D0E", display: "flex" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>AMAZE</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#7C8A93", letterSpacing: 3 }}>
              IFM // IN-HOUSE
            </div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.0 }}>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#FFB020", letterSpacing: 4, marginBottom: 20, display: "flex" }}>
            INTEGRATED FACILITY MANAGEMENT
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -3, display: "flex" }}>We keep</div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -3, color: "#FFB020", display: "flex" }}>
            20 million sq.ft
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -3, display: "flex" }}>running.</div>
        </div>

        {/* readout strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, borderTop: "1px solid #20262A", paddingTop: 28 }}>
          {readouts.map(([label, value]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: "#FFB020", display: "flex" }} />
              <div style={{ fontSize: 18, fontWeight: 500, color: "#7C8A93", letterSpacing: 2, display: "flex" }}>
                {label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#F4F2EE", display: "flex" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: black, weight: 900, style: "normal" },
        { name: "Satoshi", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
