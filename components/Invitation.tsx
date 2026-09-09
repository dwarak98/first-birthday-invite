import { FirstBirthdayMark } from "@/components/FirstBirthdayMark";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RsvpForm } from "@/components/RsvpForm";
import { copyFor } from "@/lib/copy";
import { event, type Locale } from "@/lib/event";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return {
    first: parts[0] ?? name,
    rest: parts.slice(1).join(" "),
  };
}

function weekdayAndDate(value: string) {
  const [weekday, date] = value.split(",").map((part) => part.trim());
  if (!date) return { weekday: "", date: value };
  return { weekday, date };
}

function Corners() {
  return (
    <>
      <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t border-l border-gold/70" />
      <span className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t border-r border-gold/70" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/70" />
      <span className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-b border-r border-gold/70" />
    </>
  );
}

export function Invitation({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const tamil = locale === "ta";
  const { first, rest } = splitName(copy.name);
  const when = weekdayAndDate(copy.date);
  const age = tamil ? event.ageTa : event.ageEn;

  return (
    <div className={`invite-stage px-3 py-3 sm:px-4 sm:py-10 ${tamil ? "font-tamil" : ""}`}>
      <article className="poster relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[1.75rem]">
        <Corners />

        <div className="relative flex min-h-[calc(100svh-1.5rem)] flex-col px-5 pt-5 pb-5 sm:min-h-0 sm:px-8 sm:pt-7 sm:pb-6">
          <div className="flex items-center justify-between">
            <p
              className={`text-[10px] font-medium tracking-[0.28em] text-rose ${
                tamil ? "" : "uppercase"
              }`}
            >
              {copy.scriptEyebrow}
            </p>
            <LanguageToggle locale={locale} />
          </div>

          <div className="mt-2 flex min-h-[13rem] flex-1 items-center justify-center sm:min-h-[14rem] sm:flex-none">
            <FirstBirthdayMark
              title={age}
              className="h-full w-auto max-h-[18.5rem] max-w-[min(100%,18.5rem)]"
            />
          </div>

          <header className="mt-2 text-center">
            <h1
              className={`leading-[0.95] text-ink ${
                tamil
                  ? "text-[2.1rem] font-semibold"
                  : "font-display text-[2.85rem] font-medium tracking-tight sm:text-[3.4rem]"
              }`}
            >
              {first}
            </h1>
            {rest ? (
              <p
                className={`mt-0.5 text-ink/85 ${
                  tamil
                    ? "text-lg font-semibold"
                    : "font-display text-[1.65rem] font-normal tracking-tight sm:text-[1.85rem]"
                }`}
              >
                {rest}
              </p>
            ) : null}
            <p
              className={`mt-2 text-rose ${
                tamil
                  ? "text-sm font-semibold"
                  : "text-[12px] font-semibold tracking-[0.22em] uppercase"
              }`}
            >
              {copy.occasion}
            </p>
          </header>

          <section className="mt-3 grid grid-cols-2 divide-x divide-gold/25 overflow-hidden rounded-2xl bg-blush/55">
            <div className="px-3 py-3 text-center">
              <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                {copy.whenLabel}
              </p>
              {when.weekday ? (
                <p className="mt-1.5 text-[10px] font-medium tracking-[0.18em] text-rose uppercase">
                  {when.weekday}
                </p>
              ) : null}
              <p
                className={`mt-1 text-[15px] leading-snug text-ink ${tamil ? "font-semibold" : "font-display"}`}
              >
                {when.date}
              </p>
              <p className="mt-1 text-[12px] tracking-wide text-muted">{copy.time}</p>
            </div>
            <div className="px-3 py-3 text-center">
              <p className="text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                {copy.whereLabel}
              </p>
              <p
                className={`mt-1.5 text-[15px] leading-snug text-ink ${tamil ? "font-semibold" : "font-display"}`}
              >
                {copy.venueName}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-muted">
                {copy.venueAddress}
              </p>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-rose px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-maroon"
              >
                {copy.mapsCta}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </section>

          <p className="mt-3 text-center text-[13px] text-muted">
            {copy.fromLabel},{" "}
            <span className={`${tamil ? "font-semibold" : "font-display text-base"} text-ink`}>
              {copy.hosts}
            </span>
          </p>
          <div className="mx-auto mt-3 h-px w-full bg-gold/35" />
          <a
            href="#rsvp"
            className="rsvp-glow mt-4 inline-flex w-full items-center justify-center rounded-full bg-rose px-5 py-3.5 text-sm font-semibold tracking-wide text-white"
          >
            {copy.rsvpCta}
          </a>
        </div>

        <section id="rsvp" className="scroll-mt-6 px-5 pt-8 pb-7 sm:px-8 sm:pb-8">
          <h2
            className={`text-center text-2xl text-ink ${tamil ? "font-semibold" : "font-display"}`}
          >
            {copy.rsvpTitle}
          </h2>
          <p className="mx-auto mt-1 mb-4 max-w-[22rem] text-center text-[12px] leading-5 text-muted">
            {copy.rsvpLead}
          </p>
          <RsvpForm locale={locale} />
        </section>
      </article>
    </div>
  );
}
