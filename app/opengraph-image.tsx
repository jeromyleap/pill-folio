import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "nicheleap — Have a day. A weekly pill box for the work I keep close.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#3c332b";
const INK_SOFT = "#6d5e52";
const PAPER = "#fffaf3";
const CREAM = "#f3e6d4";

const LIDS = [
  { day: "Su", color: "#c5dbb8" },
  { day: "Mo", color: "#d9c8f0" },
  { day: "Tu", color: "#f8c8a8" },
  { day: "We", color: "#b9d7e8" },
  { day: "Th", color: "#f3c3cf" },
  { day: "Fr", color: "#f7e2a0" },
  { day: "Sa", color: "#aedfd0" },
] as const;

function Capsule({
  a,
  b,
  wide = 54,
  tall = 24,
}: {
  a: string;
  b: string;
  wide?: number;
  tall?: number;
}) {
  return (
    <div
      style={{
        width: wide,
        height: tall,
        borderRadius: 999,
        border: `3px solid ${INK}`,
        background: `linear-gradient(90deg, ${a} 0 50%, ${b} 50% 100%)`,
        boxShadow: `2px 3px 0 rgba(60,51,43,0.22)`,
        display: "flex",
        alignItems: "flex-start",
        paddingTop: 3,
        paddingLeft: 8,
      }}
    >
      <div
        style={{
          width: 14,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
}

export default async function Image() {
  const [fredokaBold, nunitoBold, nunitoExtra] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Fredoka-Bold.woff")),
    readFile(join(process.cwd(), "app/fonts/Nunito-Bold.woff")),
    readFile(join(process.cwd(), "app/fonts/Nunito-ExtraBold.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CREAM,
          fontFamily: "Nunito",
          color: INK,
          position: "relative",
        }}
      >
        {/* Soft stage glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse at 50% 42%, #fffaf3 0%, #f3e6d4 55%, #e8d5bc 100%)",
          }}
        />

        {/* Outer stage frame */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            display: "flex",
            flexDirection: "column",
            borderRadius: 48,
            border: `5px solid ${INK}`,
            background:
              "radial-gradient(circle at 50% 38%, #fffaf3 0%, #f7ead8 52%, #ecd8bf 100%)",
            boxShadow: "0 18px 0 rgba(60,51,43,0.12)",
            padding: "40px 52px 36px",
            overflow: "hidden",
          }}
        >
          {/* Dashed disc hint */}
          <div
            style={{
              position: "absolute",
              top: "46%",
              left: "50%",
              width: 520,
              height: 520,
              marginLeft: -260,
              marginTop: -260,
              borderRadius: 999,
              border: "3px dashed rgba(60,51,43,0.18)",
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: INK_SOFT,
              }}
            >
              nicheleap.com
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Fredoka",
                fontSize: 92,
                fontWeight: 700,
                lineHeight: 0.95,
                marginTop: 10,
                letterSpacing: "-0.02em",
              }}
            >
              Have a day.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: INK_SOFT,
                marginTop: 14,
                textAlign: "center",
              }}
            >
              A weekly pill box for the work I keep close.
            </div>
          </div>

          {/* Mini tray */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 34,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "16px 18px 14px",
                borderRadius: 28,
                border: `4px solid ${INK}`,
                background: PAPER,
                boxShadow: "5px 8px 0 rgba(60,51,43,0.16)",
              }}
            >
              {LIDS.map((lid) => (
                <div
                  key={lid.day}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 78,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 54,
                      borderRadius: 14,
                      border: `3px solid ${INK}`,
                      background: lid.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Fredoka",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {lid.day}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                    }}
                  >
                    <Capsule a={lid.color} b={PAPER} wide={40} tall={16} />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Capsule a="#c5dbb8" b="#fffaf3" />
              <Capsule a="#d9c8f0" b="#f8c8a8" />
              <Capsule a="#f7e2a0" b="#aedfd0" />
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 700,
                  color: INK_SOFT,
                  marginLeft: 6,
                }}
              >
                Seven days, one box
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fredoka",
          data: fredokaBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Nunito",
          data: nunitoBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Nunito",
          data: nunitoExtra,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
