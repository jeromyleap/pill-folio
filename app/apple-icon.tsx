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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 148,
            height: 110,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 28,
              width: 96,
              height: 42,
              borderRadius: 999,
              border: `5px solid ${INK}`,
              background: "linear-gradient(90deg, #f6dc8e 0 50%, #fffaf3 50% 100%)",
              transform: "rotate(-18deg)",
              boxShadow: "4px 5px 0 rgba(60,51,43,0.18)",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: 7,
              paddingLeft: 14,
            }}
          >
            <div
              style={{
                width: 22,
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 36,
              width: 96,
              height: 42,
              borderRadius: 999,
              border: `5px solid ${INK}`,
              background: "linear-gradient(90deg, #d9c8f0 0 50%, #f3c3cf 50% 100%)",
              transform: "rotate(18deg)",
              boxShadow: "4px 5px 0 rgba(60,51,43,0.18)",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: 7,
              paddingLeft: 14,
            }}
          >
            <div
              style={{
                width: 22,
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
