"use server";

import { isLocale } from "@/lib/event";
import { createRsvp } from "@/lib/db";

export type RsvpState = {
  ok?: boolean;
  attending?: boolean;
  error?: string;
};

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const localeRaw = String(formData.get("locale") || "");
  const name = String(formData.get("name") || "").trim();
  const attendingRaw = String(formData.get("attending") || "");
  const people = Number(formData.get("people") || 0);

  if (!isLocale(localeRaw)) {
    return { error: "invalid" };
  }
  if (!name || name.length > 80) {
    return { error: "invalid" };
  }
  if (attendingRaw !== "yes" && attendingRaw !== "no") {
    return { error: "invalid" };
  }

  const attending = attendingRaw === "yes";
  if (attending && (people < 1 || people > 20)) {
    return { error: "invalid" };
  }
  if (!attending && people !== 0) {
    return { error: "invalid" };
  }

  await createRsvp({
    locale: localeRaw,
    name,
    attending,
    people: attending ? people : 0,
  });

  return { ok: true, attending };
}
