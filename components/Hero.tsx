"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site, heroWords } from "@/content/site";

const HOLD_MS = 3000;
const shadow = "[text-shadow:0_2px_22px_rgba(28,20,13,0.35)]";

// Hero is a single full-bleed image with a pair of words that changes every
// three seconds. Pairs hand off straight to the next with a quick cross-fade and
// never move, and the last pair wraps round to the first with no pause. Wide screens put one
// word either side of the cup; phones stack both above it, since the cup fills
// the width there.
export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % heroWords.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  const fade = (on: boolean) =>
    `transition-opacity duration-500 ease-linear ${on ? "opacity-100" : "opacity-0"}`;

  return (
    <section className="relative h-[85vh] h-[85dvh] w-full overflow-hidden sm:h-screen sm:h-dvh">
      <Image
        src="/images/hero-iced-coffee.png"
        alt={`${site.name} iced latte with the logo on the cup`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Wide screens: one word each side of the cup */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {heroWords.map((w, k) => (
          <div key={w.item} className={fade(k === i)}>
            <span
              className={`font-display absolute top-1/2 right-[62%] -translate-y-1/2 whitespace-nowrap text-right text-[min(6rem,7vw)] leading-none text-cream ${shadow}`}
            >
              {w.lead}
            </span>
            <span
              className={`font-display absolute top-1/2 left-[62%] -translate-y-1/2 whitespace-nowrap text-left text-[min(6rem,7vw)] leading-none text-cream ${shadow}`}
            >
              {w.item}
            </span>
          </div>
        ))}
      </div>

      {/* Phones: both words stacked above the cup */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[9%] h-36 sm:hidden">
        {heroWords.map((w, k) => (
          <div
            key={w.item}
            className={`absolute inset-0 flex flex-col items-center text-center ${fade(k === i)}`}
          >
            <span className={`font-display whitespace-nowrap text-3xl leading-none text-cream ${shadow}`}>
              {w.lead}
            </span>
            <span className={`font-display mt-2 whitespace-nowrap text-[3.4rem] leading-[0.95] text-cream ${shadow}`}>
              {w.item}
            </span>
          </div>
        ))}
      </div>

      <h1 className="sr-only">
        {site.name}: {heroWords.map((w) => `${w.lead} ${w.item}`).join(", ")}
      </h1>
    </section>
  );
}
