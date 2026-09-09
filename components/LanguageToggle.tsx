import type { Locale } from "@/lib/event";
import { copyFor } from "@/lib/copy";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);

  return (
    <nav className="flex justify-center" aria-label="Language">
      <div className="inline-flex rounded-full border border-gold/40 bg-white/80 p-1 shadow-sm">
        <a
          href="/en"
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            locale === "en"
              ? "bg-maroon text-white"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          English
        </a>
        <a
          href="/ta"
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            locale === "ta"
              ? "bg-maroon text-white"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          தமிழ்
        </a>
      </div>
      <span className="sr-only">{copy.switchHint}</span>
    </nav>
  );
}
