"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { membership, site } from "@/content/site";

/**
 * A punch card that stamps itself: the circles fill in one by one, the last one
 * becomes the free drink, then it settles and the loop restarts. Static when the
 * visitor prefers reduced motion.
 */
export default function MembersCard() {
  const root = useRef<HTMLDivElement>(null);
  const n = membership.punches;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stamps = gsap.utils.toArray<HTMLElement>("[data-stamp]", root.current);
    if (reduce) {
      gsap.set(stamps, { scale: 1, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(stamps, { scale: 0, opacity: 0 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.5 });
      stamps.forEach((el, i) => {
        tl.to(el, { scale: 1.25, opacity: 1, duration: 0.18, ease: "power2.out" }, i * 0.32)
          .to(el, { scale: 1, duration: 0.25, ease: "bounce.out" }, i * 0.32 + 0.18);
      });
      tl.to("[data-free]", { rotate: -4, scale: 1.08, duration: 0.4, ease: "back.out(3)" }, n * 0.32 + 0.2)
        .to("[data-free]", { rotate: 0, scale: 1, duration: 0.5, ease: "power2.out" }, ">")
        .to(stamps, { scale: 0, opacity: 0, duration: 0.4, stagger: 0.03, ease: "power2.in" }, "+=1.6");
    }, root);
    return () => ctx.revert();
  }, [n]);

  return (
    <div
      ref={root}
      role="img"
      aria-label={`A punch card: buy ${n - 1} drinks, get the ${n}th free`}
      className="relative mx-auto w-full max-w-md rotate-[-2.5deg] rounded-slab border-2 border-ink bg-tan p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-8"
    >
      <p className="font-display text-3xl leading-none sm:text-4xl">{membership.name}</p>
      <p className="mt-1 text-sm text-ink/70">{site.name}, {site.address.line1}</p>

      <div className="mt-6 grid grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: n }).map((_, i) => {
          const last = i === n - 1;
          return (
            <div
              key={i}
              data-free={last ? "" : undefined}
              className={`relative flex aspect-square items-center justify-center rounded-full border-2 border-dashed ${last ? "border-orange-deep" : "border-ink/40"}`}
            >
              <span
                data-stamp
                className={`flex h-[78%] w-[78%] items-center justify-center rounded-full text-center font-display text-xs leading-none text-cream sm:text-sm ${last ? "bg-orange-deep" : "bg-ink"}`}
              >
                {last ? "FREE" : <CupMark />}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink/70">
        Buy {n - 1}, get the {n}th free.
      </p>
    </div>
  );
}

function CupMark() {
  return (
    <svg viewBox="0 0 24 24" width="55%" height="55%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3" />
    </svg>
  );
}
