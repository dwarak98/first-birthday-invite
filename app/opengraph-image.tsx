import { ImageResponse } from "next/og";
import { copyFor } from "@/lib/copy";

export const alt = "First birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const copy = copyFor("en");
  const [first, ...rest] = copy.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4a1f28",
        }}
      >
        <div
          style={{
            width: 920,
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff8f1",
            borderRadius: 28,
            border: "1px solid #c4a06a",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#9c3d45",
            }}
          >
            {copy.scriptEyebrow}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 72,
              color: "#3a1c1a",
              lineHeight: 1,
            }}
          >
            {first}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 36,
              color: "#3a1c1a",
            }}
          >
            {rest.join(" ")}
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#9c3d45",
              color: "#fff8f1",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1 }}>1</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.15,
              }}
            >
              <div>First</div>
              <div>Birthday</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 24,
              color: "#3a1c1a",
            }}
          >
            {`${copy.date} · ${copy.time}`}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 22,
              color: "#7a564e",
            }}
          >
            {copy.venueName}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
