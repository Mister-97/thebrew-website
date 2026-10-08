"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const slim =
  "w-full border-0 border-b-2 border-ink/25 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-orange";

const field =
  "w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-orange";

export default function ContactForm({ minimal = false }: { minimal?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const input = minimal ? slim : field;
  const lab = minimal ? "text-sm text-ink/60" : "label text-ink/70";

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <h3 className="font-display text-3xl text-orange-deep">Thank you</h3>
        <p className="mt-3 text-ink/70">We got your message and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={minimal ? "space-y-7" : "space-y-5"}>
      <div>
        <label htmlFor="name" className={lab}>Name</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={`${input} ${minimal ? "mt-0" : "mt-2"}`} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={lab}>Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${input} ${minimal ? "mt-0" : "mt-2"}`} />
        </div>
        <div>
          <label htmlFor="phone" className={lab}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${input} ${minimal ? "mt-0" : "mt-2"}`} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={lab}>Message</label>
        <textarea id="message" name="message" required rows={5} maxLength={2000} className={`${input} ${minimal ? "mt-0" : "mt-2"} resize-y`} />
      </div>
      {/* Honeypot: real people never see or fill this. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className={
          minimal
            ? "rounded-full bg-ink px-9 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange disabled:opacity-60"
            : "label rounded-full bg-orange px-8 py-3.5 text-cream transition-all hover:-translate-y-0.5 hover:bg-ink disabled:opacity-60"
        }
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-orange-deep" role="alert">
          That did not go through. Please call us at {site.phone}.
        </p>
      )}
    </form>
  );
}
