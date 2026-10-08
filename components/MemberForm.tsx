"use client";

import { useState } from "react";
import { membership, site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const slim =
  "w-full border-0 border-b-2 border-ink/25 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-orange";

export default function MemberForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: data.consent ? "yes" : "", source: "members" }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-6">
        <h2 className="font-display text-4xl text-orange-deep sm:text-5xl">You&rsquo;re in</h2>
        <p className="mt-3 max-w-md text-lg text-ink/70">
          Welcome to {membership.name}. We will email you when your card is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div>
        <label htmlFor="m-name" className="text-sm text-ink/60">Name</label>
        <input id="m-name" name="name" required maxLength={100} autoComplete="name" className={slim} />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="m-email" className="text-sm text-ink/60">Email</label>
          <input id="m-email" name="email" type="email" required maxLength={200} autoComplete="email" className={slim} />
        </div>
        <div>
          <label htmlFor="m-phone" className="text-sm text-ink/60">Phone (optional)</label>
          <input id="m-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={slim} />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-base text-ink/75">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-orange)]"
        />
        <span>Email me my card and member news from {site.name}. You can unsubscribe any time.</span>
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-9 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange disabled:opacity-60"
      >
        {status === "sending" ? "Joining..." : "Join the club"}
      </button>
      {status === "error" && (
        <p className="text-sm text-orange-deep" role="alert">
          That did not go through. Please call us at {site.phone}.
        </p>
      )}
    </form>
  );
}
