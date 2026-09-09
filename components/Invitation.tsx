import { FloralDivider } from "@/components/FloralDivider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RsvpForm } from "@/components/RsvpForm";
import { copyFor } from "@/lib/copy";
import { event, type Locale } from "@/lib/event";

export function Invitation({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const tamil = locale === "ta";

  return (
    <div className={`mx-auto w-full max-w-xl px-4 py-8 sm:py-12 ${tamil ? "font-tamil" : ""}`}>
      <LanguageToggle locale={locale} />

      <article className="invite-card mt-6 overflow-hidden rounded-[2rem] border-[6px] border-double border-gold bg-white/80 px-6 py-10 shadow-[0_20px_50px_rgba(122,46,58,0.12)] sm:px-10">
        <p
          className={`text-center text-5xl text-maroon sm:text-6xl ${tamil ? "font-tamil font-semibold" : "font-script"}`}
        >
          {copy.scriptEyebrow}
        </p>
        <FloralDivider />
        <h1
          className={`text-center text-4xl font-semibold leading-tight text-ink sm:text-5xl ${tamil ? "font-tamil" : "font-display"}`}
        >
          {copy.headline}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-center text-lg leading-relaxed text-ink/80">
          {copy.intro}
        </p>
        <p className="mt-6 text-center text-sm uppercase tracking-[0.25em] text-gold">
          {copy.fromLabel}
        </p>
        <p className={`mt-1 text-center text-2xl text-maroon ${tamil ? "font-tamil font-semibold" : "font-display"}`}>
          {copy.hosts}
        </p>
      </article>

      <section className="mt-8 grid gap-4">
        <div className="rounded-3xl border border-gold/25 bg-white/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {copy.whenLabel}
          </p>
          <p className={`mt-2 text-2xl text-ink ${tamil ? "font-tamil font-semibold" : "font-display"}`}>
            {copy.date}
          </p>
          <p className="mt-1 text-lg text-ink/80">{copy.time}</p>
        </div>

        <div className="rounded-3xl border border-gold/25 bg-white/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {copy.whereLabel}
          </p>
          <p className={`mt-2 text-2xl text-ink ${tamil ? "font-tamil font-semibold" : "font-display"}`}>
            {copy.venueName}
          </p>
          <p className="mt-1 text-lg leading-relaxed text-ink/80">
            {copy.venueAddress}
          </p>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-full border border-maroon/30 px-4 py-2 text-sm font-semibold text-maroon hover:bg-maroon hover:text-white"
          >
            {copy.mapsCta}
          </a>
        </div>

        <div className="rounded-3xl border border-gold/25 bg-white/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {copy.expectLabel}
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-ink/85">
            {copy.expect.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="rsvp" className="mt-8 rounded-3xl border border-gold/25 bg-white/90 p-6 shadow-sm sm:p-8">
        <h2 className={`text-center text-3xl text-ink ${tamil ? "font-tamil font-semibold" : "font-display"}`}>
          {copy.rsvpTitle}
        </h2>
        <p className="mx-auto mt-2 mb-6 max-w-md text-center text-ink/75">
          {copy.rsvpLead}
        </p>
        <RsvpForm locale={locale} />
      </section>

      <p className="mt-8 text-center text-sm text-ink/55">{copy.footer}</p>
    </div>
  );
}
