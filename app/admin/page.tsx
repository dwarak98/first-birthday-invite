import { redirect } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin";
import { isAdmin } from "@/lib/admin";
import { listRsvps, summarize } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  const rsvps = await listRsvps();
  const stats = summarize(rsvps);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Host view</p>
          <h1 className="font-display text-4xl text-ink">RSVP responses</h1>
        </div>
        <div className="flex gap-3">
          <a
            href="/admin/export"
            className="rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold"
          >
            Export CSV
          </a>
          <form action={logoutAdmin}>
            <button className="rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white">
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Coming" value={stats.headcount} hint="people attending" />
        <Stat
          label="Parties"
          value={stats.attendingParties}
          hint="yes replies"
        />
        <Stat label="Can't make it" value={stats.declinedParties} hint="replies" />
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-gold/25 bg-white/90">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gold/20 text-ink/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">People</th>
              <th className="px-4 py-3">Language</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink/50">
                  No RSVPs yet.
                </td>
              </tr>
            ) : (
              rsvps.map((row) => (
                <tr key={row.id} className="border-t border-gold/10">
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="px-4 py-3">
                    {row.attending ? "Attending" : "Not attending"}
                  </td>
                  <td className="px-4 py-3">{row.attending ? row.people : "—"}</td>
                  <td className="px-4 py-3 uppercase">{row.locale}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-gold/25 bg-white/90 p-5">
      <p className="text-sm text-ink/60">{label}</p>
      <p className="font-display text-4xl text-maroon">{value}</p>
      {hint ? <p className="text-xs text-ink/45">{hint}</p> : null}
    </div>
  );
}
