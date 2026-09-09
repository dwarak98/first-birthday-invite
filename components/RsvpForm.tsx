"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import { copyFor } from "@/lib/copy";
import type { Locale } from "@/lib/event";

const initial: RsvpState = {};

export function RsvpForm({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const [state, action, pending] = useActionState(submitRsvp, initial);
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (state.ok) {
    return (
      <div className="rounded-3xl border border-gold/30 bg-white/90 px-6 py-10 text-center shadow-sm">
        <p className="font-script text-4xl text-maroon">
          {state.attending ? copy.thanksYes : copy.thanksNo}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold tracking-wide text-ink/80">
          {copy.nameLabel}
        </span>
        <input
          required
          name="name"
          maxLength={80}
          className="w-full rounded-2xl border border-gold/30 bg-white px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
        />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold tracking-wide text-ink/80">
          {copy.attendingLabel}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gold/30 bg-white px-4 py-3">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
              required
            />
            <span>{copy.yes}</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gold/30 bg-white px-4 py-3">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
            />
            <span>{copy.no}</span>
          </label>
        </div>
      </fieldset>

      {attending === "yes" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold tracking-wide text-ink/80">
              {copy.adultsLabel}
            </span>
            <input
              required
              type="number"
              name="adults"
              min={1}
              max={20}
              defaultValue={1}
              className="w-full rounded-2xl border border-gold/30 bg-white px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold tracking-wide text-ink/80">
              {copy.childrenLabel}
            </span>
            <input
              required
              type="number"
              name="children"
              min={0}
              max={20}
              defaultValue={0}
              className="w-full rounded-2xl border border-gold/30 bg-white px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
            />
          </label>
        </div>
      ) : (
        <>
          <input type="hidden" name="adults" value="0" />
          <input type="hidden" name="children" value="0" />
        </>
      )}

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold tracking-wide text-ink/80">
          {copy.phoneLabel}
        </span>
        <input
          name="phone"
          type="tel"
          className="w-full rounded-2xl border border-gold/30 bg-white px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold tracking-wide text-ink/80">
          {copy.noteLabel}
        </span>
        <textarea
          name="note"
          rows={3}
          className="w-full rounded-2xl border border-gold/30 bg-white px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
        />
      </label>

      {state.error ? (
        <p className="text-sm text-maroon">{copy.error}</p>
      ) : null}

      <button
        disabled={pending}
        className="w-full rounded-full bg-maroon px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-maroon/90 disabled:opacity-60"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}
