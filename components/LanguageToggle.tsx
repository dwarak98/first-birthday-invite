import type { Locale } from "@/lib/event";
import { copyFor } from "@/lib/copy";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);

  return (
    <nav aria-label="Language">
      <div className="inline-flex rounded-full border border-gold/30 p-0.5">
        <a
          href="/"
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide transition ${
            locale === "en" ? "bg-ink text-white" : "text-muted hover:text-ink"
          }`}
        >
          EN
        </a>
        <a
          href="/?lang=ta"
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide transition ${
            locale === "ta" ? "bg-ink text-white" : "text-muted hover:text-ink"
          }`}
        >
          TA
        </a>
      </div>
      <span className="sr-only">{copy.switchHint}</span>
    </nav>
  );
}
