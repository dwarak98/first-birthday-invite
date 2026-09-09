import type { Metadata } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import { siteUrl } from "@/lib/event";
import "./globals.css";

const sans = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "You're invited",
  description: "Join us for a first birthday celebration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${tamil.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
