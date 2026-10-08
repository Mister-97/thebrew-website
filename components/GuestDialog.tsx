"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-orange";

/** "Be a guest" button plus the request form it opens. */
export default function GuestDialog({ className = "" }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    setStatus("idle");
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), source: "podcast-guest" }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" onClick={open} className={className}>
        Be a guest
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="guest-title"
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto max-h-[92svh] w-[calc(100%-2.5rem)] max-w-lg overflow-y-auto rounded-slab bg-cream p-0 text-ink backdrop:bg-ink/75"
      >
        <div className="relative p-6 sm:p-9">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none transition-colors hover:bg-ink hover:text-cream"
          >
            &times;
          </button>

          {status === "sent" ? (
            <div className="py-10 text-center">
              <h2 id="guest-title" className="font-display text-4xl text-orange-deep">
                Thank you
              </h2>
              <p className="mt-3 text-ink/70">
                We got your request and will be in touch.
              </p>
              <button
                type="button"
                onClick={close}
                className="label mt-8 rounded-full bg-orange px-8 py-3.5 text-cream transition-colors hover:bg-ink"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 id="guest-title" className="font-display pr-10 text-4xl sm:text-5xl">
                Be a guest
              </h2>
              <p className="mt-2 text-ink/70">
                Tell us a little about you and what you would like to talk about.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="g-name" className="text-sm font-semibold text-ink/70">Name</label>
                  <input id="g-name" name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="g-email" className="text-sm font-semibold text-ink/70">Email</label>
                    <input id="g-email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${field} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor="g-phone" className="text-sm font-semibold text-ink/70">Phone (optional)</label>
                    <input id="g-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${field} mt-1.5`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="g-message" className="text-sm font-semibold text-ink/70">What would you talk about?</label>
                  <textarea id="g-message" name="message" required rows={3} maxLength={2000} className={`${field} mt-1.5 resize-y`} />
                </div>
                <div>
                  <label htmlFor="g-achievements" className="text-sm font-semibold text-ink/70">Notable achievements</label>
                  <textarea
                    id="g-achievements"
                    name="achievements"
                    required
                    rows={3}
                    maxLength={2000}
                    placeholder="Awards, businesses, milestones, anything you are proud of"
                    className={`${field} mt-1.5 resize-y`}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="g-linkedin" className="text-sm font-semibold text-ink/70">LinkedIn (optional)</label>
                    <input id="g-linkedin" name="linkedin" inputMode="url" maxLength={300} placeholder="linkedin.com/in/you" className={`${field} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor="g-instagram" className="text-sm font-semibold text-ink/70">Instagram (optional)</label>
                    <input id="g-instagram" name="instagram" inputMode="url" maxLength={300} placeholder="@you or instagram.com/you" className={`${field} mt-1.5`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="g-publications" className="text-sm font-semibold text-ink/70">Publications or press (optional)</label>
                  <textarea
                    id="g-publications"
                    name="publications"
                    rows={2}
                    maxLength={1000}
                    placeholder="Links to articles, interviews or features"
                    className={`${field} mt-1.5 resize-y`}
                  />
                </div>
                {/* Honeypot: real people never see or fill this. */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="label rounded-full bg-orange px-8 py-3.5 text-cream transition-colors hover:bg-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send request"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-orange-deep" role="alert">
                    That did not go through. Please call us at {site.phone}.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
