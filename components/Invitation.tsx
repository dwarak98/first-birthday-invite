import type { ReactNode } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RsvpForm } from "@/components/RsvpForm";
import { copyFor } from "@/lib/copy";
import { event, type Locale } from "@/lib/event";

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-8">
      <p className="text-xs font-medium tracking-widest text-muted uppercase">
        {label}
      </p>
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function Invitation({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const tamil = locale === "ta";
  const age = tamil ? event.ageTa : event.ageEn;

  return (
    <div
      className={`min-h-screen bg-bg ${tamil ? "font-tamil" : ""}`}
    >
      <div className="mx-auto w-full max-w-lg px-6 py-10 sm:py-16">
        <header className="mb-14 flex items-start justify-between gap-6">
          <p className="pt-1 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {copy.scriptEyebrow}
          </p>
          <LanguageToggle locale={locale} />
        </header>

        <section className="mb-14">
          <h1 className="text-[2.5rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {copy.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{age}</p>
          <p className="mt-8 max-w-md text-[15px] leading-7 text-muted">
            {copy.intro}
          </p>
          <p className="mt-10 text-sm text-muted">
            {copy.fromLabel},{" "}
            <span className="font-medium text-ink">{copy.hosts}</span>
          </p>
        </section>

        <section className="space-y-8 border-t border-faint pt-10">
          <DetailRow label={copy.whenLabel}>
            <p className="font-medium">{copy.date}</p>
            <p className="mt-0.5 text-muted">{copy.time}</p>
          </DetailRow>

          <DetailRow label={copy.whereLabel}>
            <p className="font-medium">{copy.venueName}</p>
            <p className="mt-1 text-muted">{copy.venueAddress}</p>
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-faint underline-offset-4 transition hover:decoration-ink"
            >
              {copy.mapsCta}
              <span aria-hidden>→</span>
            </a>
          </DetailRow>

          <DetailRow label={copy.expectLabel}>
            <ul className="space-y-1.5">
              {copy.expect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DetailRow>
        </section>

        <section
          id="rsvp"
          className="mt-14 border-t border-faint pt-12"
        >
          <h2 className="text-xl font-medium tracking-tight text-ink">
            {copy.rsvpTitle}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            {copy.rsvpLead}
          </p>
          <div className="mt-8">
            <RsvpForm locale={locale} />
          </div>
        </section>

        <p className="mt-14 text-center text-xs text-muted/80">{copy.footer}</p>
      </div>
    </div>
  );
}
