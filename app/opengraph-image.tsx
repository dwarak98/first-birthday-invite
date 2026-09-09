import { ImageResponse } from "next/og";
import { copyFor } from "@/lib/copy";
import { event } from "@/lib/event";

export const alt = "First birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const copy = copyFor("en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f7f7f5",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6b6b6b",
            fontFamily: "sans-serif",
          }}
        >
          {copy.scriptEyebrow}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 72,
            fontWeight: 500,
            color: "#111111",
            fontFamily: "sans-serif",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {copy.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#6b6b6b",
            fontFamily: "sans-serif",
          }}
        >
          {event.ageEn}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 26,
            color: "#111111",
            fontFamily: "sans-serif",
          }}
        >
          {`${copy.date} · ${copy.time}`}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 24,
            color: "#6b6b6b",
            fontFamily: "sans-serif",
          }}
        >
          {copy.venueName}
        </div>
      </div>
    ),
    { ...size },
  );
}
