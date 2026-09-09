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
  const phone = String(formData.get("phone") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const adults = Number(formData.get("adults") || 0);
  const children = Number(formData.get("children") || 0);

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
  if (attending && (adults < 1 || adults > 20 || children < 0 || children > 20)) {
    return { error: "invalid" };
  }
  if (!attending && (adults < 0 || children < 0)) {
    return { error: "invalid" };
  }

  await createRsvp({
    locale: localeRaw,
    name,
    phone,
    attending,
    adults: attending ? adults : 0,
    children: attending ? children : 0,
    note,
  });

  return { ok: true, attending };
}
