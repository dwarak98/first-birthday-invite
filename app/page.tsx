import type { Metadata } from "next";
import { Invitation } from "@/components/Invitation";
import { copyFor } from "@/lib/copy";
import { siteUrl, type Locale } from "@/lib/event";

function localeFrom(lang: string | string[] | undefined): Locale {
  const value = Array.isArray(lang) ? lang[0] : lang;
  return value === "ta" ? "ta" : "en";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = localeFrom(lang);
  const copy = copyFor(locale);

  return {
    title: copy.ogTitle,
    description: copy.ogDescription,
    openGraph: {
      type: "website",
      locale: locale === "ta" ? "ta_IN" : "en_IN",
      url: siteUrl(),
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { lang } = await searchParams;
  const locale = localeFrom(lang);

  return (
    <main>
      <Invitation locale={locale} />
    </main>
  );
}
