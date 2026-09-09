import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copyFor } from "@/lib/copy";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/event";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const copy = copyFor(locale);
  const url = `${siteUrl()}/${locale}`;

  return {
    title: copy.ogTitle,
    description: copy.ogDescription,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl()}/en`,
        ta: `${siteUrl()}/ta`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ta" ? "ta_IN" : "en_IN",
      url,
      title: copy.ogTitle,
      description: copy.ogDescription,
      siteName: copy.ogTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <div lang={locale}>{children}</div>;
}
