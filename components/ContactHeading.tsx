"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Headline whose letters rise out of a mask, one after another, on load. */
export default function ContactHeading({ text, size = "lg" }: { text: string; size?: "lg" | "md" }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-ch]", {
        yPercent: 115,
        rotate: 4,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
        delay: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={root}
      aria-label={text}
      className={`font-display ${size === "md" ? "text-[clamp(2.4rem,6vw,4.75rem)]" : "text-[clamp(3rem,9vw,7.5rem)]"} leading-[0.85] tracking-[0.01em] [-webkit-text-stroke:0.016em_currentColor] [paint-order:stroke_fill]`}
    >
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden px-[0.02em] pb-[0.06em] align-bottom">
          <span data-ch className="inline-block">
            {c === " " ? " " : c}
          </span>
        </span>
      ))}
    </h1>
  );
}
