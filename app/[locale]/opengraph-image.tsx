import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { copyFor } from "@/lib/copy";
import { isLocale, type Locale } from "@/lib/event";

export const alt = "First birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(name: string) {
  return readFile(join(process.cwd(), "public/fonts", name));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const copy = copyFor(locale);
  const tamil = locale === "ta";

  const [tamilRegular, tamilBold, script, display] = await Promise.all([
    loadFont("NotoSansTamil-Regular.ttf"),
    loadFont("NotoSansTamil-Bold.ttf"),
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
              fontSize: tamil ? 36 : 64,
              color: "#7a2e3a",
              fontFamily: tamil ? "Tamil" : "Script",
            }}
          >
            {copy.scriptEyebrow}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: tamil ? 52 : 58,
              color: "#3d2a2a",
              fontFamily: tamil ? "TamilBold" : "Display",
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
              fontFamily: tamil ? "TamilBold" : "Display",
            }}
          >
            {copy.date}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 24,
              color: "#3d2a2a",
              fontFamily: tamil ? "Tamil" : "Display",
            }}
          >
            {copy.time}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 22,
              color: "#5c4444",
              fontFamily: tamil ? "Tamil" : "Display",
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
      fonts: tamil
        ? [
            { name: "Tamil", data: tamilRegular, weight: 400, style: "normal" },
            { name: "TamilBold", data: tamilBold, weight: 700, style: "normal" },
          ]
        : [
            { name: "Script", data: script, weight: 400, style: "normal" },
            { name: "Display", data: display, weight: 600, style: "normal" },
          ],
    },
  );
}
