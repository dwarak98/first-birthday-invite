"use server";

import { redirect } from "next/navigation";
import {
  checkPassword,
  clearAdminCookie,
  setAdminCookie,
} from "@/lib/admin";

export type LoginState = { error?: string };

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) {
    return { error: "Wrong password" };
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin/login");
}
