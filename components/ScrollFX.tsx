"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page-wide motion, mounted once. Two behaviours only:
 *  - `.reveal` elements rise into place as they enter the viewport
 *  - `[data-parallax]` images drift slower than the page
 * Both are skipped entirely when the visitor asks for reduced motion.
 */
export default function ScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            overwrite: true,
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
