import type { Locale } from "@/lib/event";
import { copyFor } from "@/lib/copy";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);

  return (
    <nav className="shrink-0" aria-label="Language">
      <div className="inline-flex rounded-lg bg-accent-soft p-0.5">
        <a
          href="/"
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            locale === "en"
              ? "bg-surface text-ink shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          EN
        </a>
        <a
          href="/?lang=ta"
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            locale === "ta"
              ? "bg-surface text-ink shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          TA
        </a>
      </div>
      <span className="sr-only">{copy.switchHint}</span>
    </nav>
  );
}
