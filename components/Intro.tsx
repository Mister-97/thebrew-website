"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/content/site";

/**
 * First-visit loader. The wordmark fills in left to right through a halftone
 * ghost while a counter runs, then shrinks into the header's wordmark and the
 * rest of the header fades in. Plays on every full load of /podcast only;
 * skipped for reduced motion. The gate classes on <html> come from the script in layout.tsx.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-running")) return;

    const finish = () => {
      html.classList.remove("intro-running");
      html.classList.add("intro-skip");
      window.dispatchEvent(new Event("brew:intro-done"));
    };

    const ctx = gsap.context(() => {
      const progress = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(progress, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = progress.v;
          if (fill.current) fill.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
          if (count.current) count.current.textContent = `${Math.round(v)}%`;
        },
      });

      tl.add(() => {
        // Aim the wordmark at the header's real wordmark.
        const target = document.querySelector("[data-brand-word]");
        const el = word.current;
        if (!target || !el) return;
        const t = target.getBoundingClientRect();
        // On the podcast page the header wordmark is the whole phrase, on a dark
        // bar, so the intro lands as one piece and turns white on the way.
        const full = target.hasAttribute("data-brand-full");
        const c = (full ? el : (el.querySelector("[data-intro-brand]") as HTMLElement)).getBoundingClientRect();
        gsap.set(el, { transformOrigin: "0 0" });
        gsap.to(el, {
          x: t.left - c.left,
          y: t.top - c.top,
          scale: t.width / c.width,
          duration: 1.1,
          ease: "power4.inOut",
        });
        gsap.to(full ? "[data-intro-meta]" : "[data-intro-meta], [data-intro-extra]", { opacity: 0, duration: 0.35 });
        if (full) gsap.to(fill.current, { color: "#ffffff", duration: 0.9 });
        gsap.to(root.current, { backgroundColor: "rgba(248,241,233,0)", duration: 0.9, delay: 0.2 });
        // Reveal the header once the wordmark has landed.
        gsap.delayedCall(0.95, () => {
          gsap.set("[data-brand-word]", { opacity: 1 });
          gsap.set(root.current, { opacity: 0 });
          gsap.fromTo(
            "[data-intro-fade]",
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "transform" },
          );
          gsap.set(root.current, { display: "none" });
        });
      }, "+=0.25");

      // Hold until the shrink has finished before releasing the page.
      tl.to({}, { duration: 1.4 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="brew-intro"
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-cream"
    >
      <div
        ref={word}
        className="relative whitespace-nowrap font-[family-name:var(--font-intro)] text-[11vw] sm:text-[clamp(2.3rem,9.6vw,12rem)] font-extrabold leading-[1.05] tracking-[-0.05em]"
      >
        <IntroText className="intro-ghost" />
        <span
          ref={fill}
          aria-hidden
          className="absolute inset-0 block text-ink"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <IntroText />
        </span>
      </div>

      <span
        data-intro-meta
        ref={count}
        className="absolute bottom-6 left-5 text-sm tabular-nums text-ink/70 sm:bottom-8 sm:left-10"
      >
        0%
      </span>
      <span
        data-intro-meta
        className="absolute bottom-6 right-5 text-sm text-ink/70 sm:bottom-8 sm:right-10"
      >
        {site.tagline}
      </span>
    </div>
  );
}

// "The Brew" is what lands in the header; "Podcast" fades away on the way.
function IntroText({ className = "" }: { className?: string }) {
  return (
    <span className={`block ${className}`}>
      <span data-intro-brand>{site.name}</span>
      <span data-intro-extra>{" Podcast"}</span>
    </span>
  );
}
