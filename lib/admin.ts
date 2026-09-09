import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "birthday_admin";

function secret() {
  const value = process.env.ADMIN_PASSWORD;
  if (value) return value;
  if (process.env.VERCEL) {
    throw new Error("Set ADMIN_PASSWORD in Vercel environment variables.");
  }
  return "local-dev-only";
}

export function adminToken() {
  return createHmac("sha256", secret()).update("ok").digest("hex");
}

export function checkPassword(password: string) {
  const expected = secret();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const token = adminToken();
  const a = Buffer.from(value);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setAdminCookie() {
  const jar = await cookies();
  jar.set(COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
