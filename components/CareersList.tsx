"use client";

import { useRef, useState } from "react";
import { jobs, site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error" | "toolarge" | "badfile";

const chevron =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c140d' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

// Same height and weight as the text inputs; the placeholder option and an empty
// date read as muted so a filled field stands out.
const picker =
  `${"w-full appearance-none rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-orange"} required:invalid:text-ink/40 bg-no-repeat bg-[length:1.1rem] bg-[position:right_1rem_center]`;

const lab = "text-sm font-semibold text-ink/70";

const field =
  "w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-orange";

export default function CareersList() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [role, setRole] = useState<(typeof jobs)[number]>(jobs[0]);
  const [status, setStatus] = useState<Status>("idle");
  const dialog = useRef<HTMLDialogElement>(null);
  const isManagerRole = /manager/i.test(role.title);

  const apply = (j: (typeof jobs)[number]) => {
    setRole(j);
    setStatus("idle");
    dialog.current?.showModal();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.set("role", role.title);
      data.set("source", "careers");
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (res.status === 413) {
        setStatus("toolarge");
        return;
      }
      if (res.status === 415) {
        setStatus("badfile");
        return;
      }
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <ul className="border-t-2 border-ink">
        {jobs.map((j, i) => {
          const open = openSlug === j.slug;
          return (
            <li key={j.slug} className="border-b-2 border-ink">
              <button
                type="button"
                onClick={() => setOpenSlug(open ? null : j.slug)}
                aria-expanded={open}
                aria-controls={`job-${j.slug}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
              >
                <span>
                  <span className="font-display block text-[clamp(1.9rem,4vw,3rem)] leading-none transition-colors group-hover:text-orange-deep">
                    {j.title}
                  </span>
                  <span className="mt-1.5 block max-w-xl text-base text-ink/65 sm:text-lg">{j.blurb}</span>
                </span>
                <span
                  aria-hidden
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-xl leading-none transition-transform duration-300 group-hover:bg-ink group-hover:text-cream ${open ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              <div
                id={`job-${j.slug}`}
                role="region"
                aria-label={`${j.title} details`}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden" inert={!open}>
                  <div className="grid gap-8 pb-10 sm:grid-cols-12">
                    <ul className="space-y-3 text-lg sm:col-span-8">
                      {j.duties.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="sm:col-span-4 sm:text-right">
                      <button
                        type="button"
                        onClick={() => apply(j)}
                        className="rounded-full bg-ink px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange"
                      >
                        Apply for this role
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="apply-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[92svh] w-[calc(100%-2.5rem)] max-w-lg overflow-y-auto rounded-slab bg-cream p-0 text-ink backdrop:bg-ink/75"
      >
        <div className="relative p-6 sm:p-9">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none transition-colors hover:bg-ink hover:text-cream"
          >
            &times;
          </button>

          {status === "sent" ? (
            <div className="py-10 text-center">
              <h2 id="apply-title" className="font-display text-4xl text-orange-deep">
                Application sent
              </h2>
              <p className="mt-3 text-ink/70">Thanks for applying. We will be in touch.</p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="mt-8 rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-ink"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 id="apply-title" className="font-display pr-10 text-4xl sm:text-5xl">
                Apply: {role.title}
              </h2>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="a-name" className={lab}>Full name</label>
                  <input id="a-name" name="name" required maxLength={100} autoComplete="name" className={`${field} mt-1.5`} />
                </div>
                <div className="grid items-end gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-email" className={lab}>Email</label>
                    <input id="a-email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${field} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor="a-phone" className={lab}>Phone</label>
                    <input id="a-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" className={`${field} mt-1.5`} />
                  </div>
                </div>

                <div className="grid items-end gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-auth" className={lab}>Authorized to work in the US?</label>
                    <select id="a-auth" name="authorized" required defaultValue="" className={`${picker} mt-1.5 pr-11`} style={{ backgroundImage: chevron }}>
                      <option value="" disabled>Choose</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="a-type" className={lab}>Looking for</label>
                    <select id="a-type" name="employmentType" required defaultValue="" className={`${picker} mt-1.5 pr-11`} style={{ backgroundImage: chevron }}>
                      <option value="" disabled>Choose</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Either</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="a-avail" className={lab}>Days and hours you can work</label>
                  <textarea
                    id="a-avail"
                    name="availability"
                    required
                    rows={2}
                    maxLength={1000}
                    placeholder="For example: Mon to Fri mornings, weekends open"
                    className={`${field} mt-1.5 resize-y`}
                  />
                </div>

                <div className="grid items-end gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-start" className={lab}>Earliest start date</label>
                    <input id="a-start" name="startDate" type="date" required className={`${picker} mt-1.5 min-h-[3.1rem] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60`} />
                  </div>
                  <div>
                    <label htmlFor="a-years" className={lab}>Years of experience</label>
                    <select id="a-years" name="yearsExperience" required defaultValue="" className={`${picker} mt-1.5 pr-11`} style={{ backgroundImage: chevron }}>
                      <option value="" disabled>Choose</option>
                      <option>None yet</option>
                      <option>Under 1 year</option>
                      <option>1 to 2 years</option>
                      <option>3 to 5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="a-exp" className={lab}>Your experience</label>
                  <textarea
                    id="a-exp"
                    name="experience"
                    required
                    rows={3}
                    maxLength={2000}
                    placeholder="Past jobs, skills, anything that makes you a fit"
                    className={`${field} mt-1.5 resize-y`}
                  />
                </div>

                {isManagerRole && (
                  <div>
                    <label htmlFor="a-mgmt" className={lab}>Management experience</label>
                    <textarea
                      id="a-mgmt"
                      name="management"
                      required
                      rows={3}
                      maxLength={2000}
                      placeholder="Team sizes you have led, hiring, scheduling, budgets, inventory"
                      className={`${field} mt-1.5 resize-y`}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="a-resume" className={lab}>Resume (optional, PDF, DOC or DOCX, up to 4 MB)</label>
                  <input
                    id="a-resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={`${field} mt-1.5 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-cream hover:file:bg-orange`}
                  />
                </div>

                <div className="grid items-end gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-pay" className={lab}>Desired pay (optional)</label>
                    <input id="a-pay" name="desiredPay" maxLength={80} placeholder="For example: $18/hr" className={`${field} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor="a-ref" className={lab}>How you found us (optional)</label>
                    <select id="a-ref" name="referral" defaultValue="" className={`${picker} mt-1.5 pr-11 has-[option[value='']:checked]:text-ink/40`} style={{ backgroundImage: chevron }}>
                      <option value="">Choose</option>
                      <option>Walked in</option>
                      <option>Instagram</option>
                      <option>Friend or family</option>
                      <option>Podcast</option>
                      <option>Job board</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="a-refs" className={lab}>References (optional)</label>
                  <textarea
                    id="a-refs"
                    name="references"
                    rows={2}
                    maxLength={1000}
                    placeholder="Name, relationship and phone or email"
                    className={`${field} mt-1.5 resize-y`}
                  />
                </div>

                <div>
                  <label htmlFor="a-msg" className={lab}>Anything else (optional)</label>
                  <textarea id="a-msg" name="message" rows={2} maxLength={1000} className={`${field} mt-1.5 resize-y`} />
                </div>
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-orange px-8 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send application"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-orange-deep" role="alert">
                    That did not go through. Please call us at {site.phone}.
                  </p>
                )}
                {status === "toolarge" && (
                  <p className="text-sm text-orange-deep" role="alert">
                    That resume is over 4 MB. Please attach a smaller file or leave it off.
                  </p>
                )}
                {status === "badfile" && (
                  <p className="text-sm text-orange-deep" role="alert">
                    The resume must be a PDF, DOC or DOCX file.
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
