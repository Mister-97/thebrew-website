"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-orange";

export default function ContactForm() {
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

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <h3 className="font-display text-3xl text-orange-deep">Thank you</h3>
        <p className="mt-3 text-ink/70">We got your message and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="label text-ink/70">Name</label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={`${field} mt-2`} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="label text-ink/70">Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="phone" className="label text-ink/70">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${field} mt-2`} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label text-ink/70">Message</label>
        <textarea id="message" name="message" required rows={5} maxLength={2000} className={`${field} mt-2 resize-y`} />
      </div>
      {/* Honeypot: real people never see or fill this. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="label rounded-full bg-orange px-8 py-3.5 text-cream transition-all hover:-translate-y-0.5 hover:bg-ink disabled:opacity-60"
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
