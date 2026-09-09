"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import { copyFor } from "@/lib/copy";
import type { Locale } from "@/lib/event";

const initial: RsvpState = {};

const fieldClass =
  "w-full border-0 border-b border-faint bg-transparent px-0 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:border-ink";

export function RsvpForm({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const [state, action, pending] = useActionState(submitRsvp, initial);
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (state.ok) {
    return (
      <div className="rounded-xl bg-accent-soft px-6 py-8">
        <p className="text-[15px] leading-7 text-ink">
          {state.attending ? copy.thanksYes : copy.thanksNo}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-7">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="mb-1 block text-xs font-medium tracking-widest text-muted uppercase">
          {copy.nameLabel}
        </span>
        <input required name="name" maxLength={80} className={fieldClass} />
      </label>

      <fieldset>
        <legend className="mb-3 block text-xs font-medium tracking-widest text-muted uppercase">
          {copy.attendingLabel}
        </legend>
        <div className="inline-flex w-full rounded-lg bg-accent-soft p-0.5 sm:w-auto">
          <label className="flex-1 sm:flex-none">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
              required
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-md px-4 py-2.5 text-center text-sm font-medium text-muted transition peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-sm">
              {copy.yes}
            </span>
          </label>
          <label className="flex-1 sm:flex-none">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-md px-4 py-2.5 text-center text-sm font-medium text-muted transition peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-sm">
              {copy.no}
            </span>
          </label>
        </div>
      </fieldset>

      {attending === "yes" ? (
        <label className="block">
          <span className="mb-1 block text-xs font-medium tracking-widest text-muted uppercase">
            {copy.peopleLabel}
          </span>
          <input
            required
            type="number"
            name="people"
            min={1}
            max={20}
            defaultValue={1}
            className={fieldClass}
          />
        </label>
      ) : (
        <input type="hidden" name="people" value="0" />
      )}

      {state.error ? (
        <p className="text-sm text-ink">{copy.error}</p>
      ) : null}

      <button
        disabled={pending}
        className="w-full rounded-lg bg-accent px-5 py-3.5 text-sm font-medium text-white transition hover:bg-ink/85 disabled:opacity-50"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
