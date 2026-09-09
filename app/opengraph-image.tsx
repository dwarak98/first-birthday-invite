import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { copyFor } from "@/lib/copy";

export const alt = "First birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(name: string) {
  return readFile(join(process.cwd(), "public/fonts", name));
}

export default async function OgImage() {
  const copy = copyFor("en");
  const [script, display] = await Promise.all([
    loadFont("GreatVibes-Regular.ttf"),
    loadFont("PlayfairDisplay-SemiBold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f4eadc",
          padding: 36,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fffaf3",
            border: "8px solid #b8893e",
            borderRadius: 28,
          }}
        >
          <div
            style={{
              fontSize: 64,
              color: "#7a2e3a",
              fontFamily: "Script",
            }}
          >
            {copy.scriptEyebrow}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 58,
              color: "#3d2a2a",
              fontFamily: "Display",
              textAlign: "center",
              paddingLeft: 48,
              paddingRight: 48,
              lineHeight: 1.2,
            }}
          >
            {copy.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#7a2e3a",
              fontFamily: "Display",
            }}
          >
            {copy.date}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 24,
              color: "#3d2a2a",
              fontFamily: "Display",
            }}
          >
            {copy.time}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 22,
              color: "#5c4444",
              fontFamily: "Display",
              textAlign: "center",
              paddingLeft: 40,
              paddingRight: 40,
            }}
          >
            {copy.venueName}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Script", data: script, weight: 400, style: "normal" },
        { name: "Display", data: display, weight: 600, style: "normal" },
      ],
    },
  );
}
