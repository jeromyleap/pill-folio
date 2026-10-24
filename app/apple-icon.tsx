import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#3c332b";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3e6d4",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 128,
            height: 56,
            borderRadius: 999,
            border: `6px solid ${INK}`,
            background: "linear-gradient(90deg, #f6dc8e 0 50%, #fffaf3 50% 100%)",
            boxShadow: `4px 6px 0 rgba(60,51,43,0.2)`,
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 8,
            paddingLeft: 18,
          }}
        >
          <div
            style={{
              width: 28,
              height: 12,
              borderRadius: 999,
              background: "rgba(255,255,255,0.85)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
