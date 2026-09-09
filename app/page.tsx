import { copyFor } from "@/lib/copy";

export default function Home() {
  const en = copyFor("en");
  const ta = copyFor("ta");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 py-16">
      <p className="text-center font-script text-5xl text-maroon">You're invited</p>
      <h1 className="mt-3 text-center font-display text-4xl text-ink">
        {en.homeTitle}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-lg text-ink/75">
        {en.homeLead}
      </p>
      <p className="mx-auto mt-1 max-w-md text-center font-tamil text-lg text-ink/75">
        அழைப்பிதழை உங்கள் மொழியில் திறக்கவும்.
      </p>

      <div className="mt-10 grid gap-4">
        <a
          href="/en"
          className="rounded-3xl border border-gold/40 bg-white/90 px-6 py-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="block text-sm uppercase tracking-[0.25em] text-gold">
            English
          </span>
          <span className="mt-2 block font-display text-3xl text-ink">
            {en.englishCard}
          </span>
        </a>
        <a
          href="/ta"
          className="rounded-3xl border border-gold/40 bg-white/90 px-6 py-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="block text-sm uppercase tracking-[0.25em] text-gold">
            தமிழ்
          </span>
          <span className="mt-2 block font-display font-tamil text-3xl text-ink">
            {ta.tamilCard}
          </span>
        </a>
      </div>
    </main>
  );
}
