"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/admin";

const initial: LoginState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, initial);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4">
      <h1 className="text-center font-display text-4xl">Host login</h1>
      <p className="mt-2 text-center text-ink/70">
        Use this page to see who has RSVP’d.
      </p>
      <form action={action} className="mt-8 space-y-4 rounded-3xl border border-gold/25 bg-white/90 p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Password</span>
          <input
            required
            type="password"
            name="password"
            className="w-full rounded-2xl border border-gold/30 px-4 py-3 outline-none ring-maroon/20 focus:ring-2"
          />
        </label>
        {state.error ? <p className="text-sm text-maroon">{state.error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-full bg-maroon py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Checking..." : "Enter"}
        </button>
      </form>
    </main>
  );
}
