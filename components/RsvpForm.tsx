"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import { copyFor } from "@/lib/copy";
import type { Locale } from "@/lib/event";

const initial: RsvpState = {};

const fieldClass =
  "w-full rounded-xl border border-gold/30 bg-white/80 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-rose";

export function RsvpForm({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const [state, action, pending] = useActionState(submitRsvp, initial);
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-blush/70 px-4 py-6 text-center">
        <p className="text-sm leading-6 text-ink">
          {state.attending ? copy.thanksYes : copy.thanksNo}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="mb-1 block text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
          {copy.nameLabel}
        </span>
        <input required name="name" maxLength={80} className={fieldClass} />
      </label>

      <fieldset>
        <legend className="mb-1.5 block text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
          {copy.attendingLabel}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
              required
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-xl border border-gold/30 px-2 py-2.5 text-center text-[11px] leading-4 font-medium text-muted transition peer-checked:border-rose peer-checked:bg-rose peer-checked:text-white">
              {copy.yes}
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-xl border border-gold/30 px-2 py-2.5 text-center text-[11px] leading-4 font-medium text-muted transition peer-checked:border-rose peer-checked:bg-rose peer-checked:text-white">
              {copy.no}
            </span>
          </label>
        </div>
      </fieldset>

      {attending === "yes" ? (
        <input type="hidden" name="people" value="1" />
      ) : (
        <input type="hidden" name="people" value="0" />
      )}

      {state.error ? <p className="text-xs text-rose">{copy.error}</p> : null}

      <button
        disabled={pending}
        className="w-full rounded-full bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-dusk disabled:opacity-50"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
