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
    <div className={`invite-stage min-h-screen px-4 py-8 sm:py-10 ${tamil ? "font-tamil" : ""}`}>
      <article className="poster relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[1.75rem] px-5 py-6 sm:px-8 sm:py-7">
        <Corners />

        <div className="relative flex items-center justify-between">
          <p className="text-[10px] font-medium tracking-[0.32em] text-rose uppercase">
            {copy.scriptEyebrow}
          </p>
          <LanguageToggle locale={locale} />
        </div>

        <header className="mt-6 text-center">
          <h1
            className={`leading-[0.95] text-ink ${
              tamil ? "text-[2.35rem] font-semibold" : "font-display text-[3.15rem] font-medium tracking-tight sm:text-[3.4rem]"
            }`}
          >
            {first}
          </h1>
          {rest ? (
            <p
              className={`mt-1 text-ink/85 ${
                tamil ? "text-xl font-semibold" : "font-display text-[1.85rem] font-normal tracking-tight"
              }`}
            >
              {rest}
            </p>
          ) : null}
        </header>

        <div className="mt-6 flex justify-center">
          <FirstBirthdayMark title={age} />
        </div>

        <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />

        <section className="mt-5 text-center">
          <p className="text-[10px] font-medium tracking-[0.28em] text-muted uppercase">
            {copy.whenLabel}
          </p>
          {when.weekday ? (
            <p className="mt-2 text-[11px] font-medium tracking-[0.22em] text-rose uppercase">
              {when.weekday}
            </p>
          ) : null}
          <p className={`mt-1 text-xl text-ink ${tamil ? "font-semibold" : "font-display"}`}>
            {when.date}
          </p>
          <p className="mt-1 text-sm tracking-wide text-muted">{copy.time}</p>
        </section>

        <section className="mt-6 rounded-2xl bg-blush/55 px-4 py-4 text-center">
          <p className="text-[10px] font-medium tracking-[0.28em] text-muted uppercase">
            {copy.whereLabel}
          </p>
          <p className={`mt-1.5 text-lg text-ink ${tamil ? "font-semibold" : "font-display"}`}>
            {copy.venueName}
          </p>
          <p className="mx-auto mt-1 max-w-[20rem] text-[12px] leading-5 text-muted">
            {copy.venueAddress}
          </p>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-xs font-medium text-white transition hover:bg-maroon"
          >
            {copy.mapsCta}
            <span aria-hidden>↗</span>
          </a>
        </section>

        <p className="mt-6 text-center text-[13px] text-muted">
          {copy.fromLabel},{" "}
          <span className={`${tamil ? "font-semibold" : "font-display text-base"} text-ink`}>
            {copy.hosts}
          </span>
        </p>

        <section id="rsvp" className="mt-5 border-t border-gold/25 pt-5">
          <h2 className={`text-center text-lg text-ink ${tamil ? "font-semibold" : "font-display"}`}>
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
