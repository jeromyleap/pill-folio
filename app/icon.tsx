import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const INK = "#3c332b";

/** Favicon matching the dual-capsule mark in the site header. */
export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 28,
            height: 22,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 1,
              top: 5,
              width: 18,
              height: 9,
              borderRadius: 999,
              border: `1.5px solid ${INK}`,
              background: "linear-gradient(90deg, #f6dc8e 0 50%, #fffaf3 50% 100%)",
              transform: "rotate(-18deg)",
              boxShadow: "1px 1px 0 rgba(60,51,43,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 1,
              top: 7,
              width: 18,
              height: 9,
              borderRadius: 999,
              border: `1.5px solid ${INK}`,
              background: "linear-gradient(90deg, #d9c8f0 0 50%, #f3c3cf 50% 100%)",
              transform: "rotate(18deg)",
              boxShadow: "1px 1px 0 rgba(60,51,43,0.2)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
