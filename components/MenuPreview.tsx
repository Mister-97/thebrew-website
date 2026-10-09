"use client";

import { useState } from "react";
import Image from "next/image";
import CupCarousel, { CUPS } from "./CupCarousel";

// Floating garnish around the cups: coffee beans for Coffee, blueberries for Smoothie,
// ice cubes and chocolate chunks for Iced Coffee, each with its own spots and tilts. Both sets stay mounted and
// cross-fade with the wordmark. `layer` back sits behind the cups, front sits over them.
type Bit = {
  cls: string;
  layer: "back" | "front";
  src?: string;
  /** far pieces sit deeper: a touch more smear on ice. Drift is seconds per bob. */
  far?: boolean;
  drift?: number;
  /** hide on phones so the garnish does not crowd the word and cups */
  wideOnly?: boolean;
};
const BEANS: Bit[] = [
  { layer: "back", cls: "top-0 left-[14%] h-14 w-14 -rotate-12 sm:h-24 sm:w-24" },
  { layer: "back", cls: "top-[4%] right-[16%] h-12 w-12 rotate-12 sm:h-20 sm:w-20" },
  { layer: "back", cls: "top-[38%] left-[8%] h-10 w-10 rotate-[30deg] sm:h-16 sm:w-16" },
  { layer: "front", cls: "top-[26%] left-[30%] h-11 w-11 rotate-45 sm:h-[4.5rem] sm:w-[4.5rem]" },
  { layer: "front", cls: "top-[54%] right-[30%] h-10 w-10 -rotate-[25deg] sm:h-16 sm:w-16" },
];
const BERRIES: Bit[] = [
  { layer: "back", wideOnly: true, cls: "top-[2%] left-[22%] h-11 w-11 rotate-[18deg] sm:h-[4.5rem] sm:w-[4.5rem]" },
  { layer: "back", cls: "top-[10%] right-[9%] h-12 w-12 -rotate-[38deg] sm:h-20 sm:w-20" },
  { layer: "back", cls: "top-[52%] left-[5%] h-10 w-10 rotate-[95deg] sm:h-16 sm:w-16" },
  { layer: "back", cls: "top-[46%] right-[5%] h-9 w-9 rotate-[150deg] sm:h-14 sm:w-14" },
  { layer: "front", cls: "top-[34%] left-[24%] h-9 w-9 -rotate-[60deg] sm:h-14 sm:w-14" },
  { layer: "front", wideOnly: true, cls: "top-[20%] right-[27%] h-10 w-10 rotate-[115deg] sm:h-[4.25rem] sm:w-[4.25rem]" },
];

const ICE = "/images/ice-cube.png";
const CHOC = "/images/chocolate-chunk.png";
// Iced Coffee garnish, arranged like pieces tumbling out of the cup: two loose
// clusters either side, big sharp pieces up front, small softer ones behind.
const ICED: Bit[] = [
  // behind the cups: smaller, farther, softer
  { layer: "back", far: true, drift: 6.5, src: ICE, cls: "top-[5%] left-[31%] h-8 w-8 rotate-[40deg] sm:h-[3.2rem] sm:w-[3.2rem]" },
  { layer: "back", far: true, drift: 7.5, src: CHOC, cls: "top-[2%] right-[34%] h-7 w-7 -rotate-[70deg] sm:h-[2.6rem] sm:w-[2.6rem]" },
  { layer: "back", far: true, drift: 8, src: ICE, cls: "top-[47%] left-[11%] h-9 w-9 rotate-[100deg] sm:h-[3.6rem] sm:w-[3.6rem]" },
  { layer: "back", far: true, drift: 7, src: CHOC, cls: "top-[54%] right-[10%] h-8 w-8 rotate-[25deg] sm:h-[3.2rem] sm:w-[3.2rem]" },
  { layer: "back", wideOnly: true, drift: 6, src: ICE, cls: "top-[11%] right-[12%] h-12 w-12 rotate-[95deg] sm:h-[5.4rem] sm:w-[5.4rem]" },
  // in front of the cups: larger and sharp
  { layer: "front", drift: 6.2, src: CHOC, cls: "top-[9%] left-[5%] h-10 w-10 -rotate-[34deg] sm:left-[6%] sm:h-[4.6rem] sm:w-[4.6rem]" },
  { layer: "front", drift: 6.8, src: CHOC, cls: "top-[37%] left-[28%] h-10 w-10 rotate-[115deg] sm:h-[4.6rem] sm:w-[4.6rem]" },
  { layer: "front", drift: 5, src: CHOC, cls: "top-[24%] right-[24%] h-11 w-11 -rotate-[48deg] sm:h-20 sm:w-20" },
];

function Garnish({ bits, src, on, layer }: { bits: Bit[]; src?: string; on: boolean; layer: "back" | "front" }) {
  return (
    <>
      {bits
        .filter((b) => b.layer === layer)
        .map((b, i) => (
          <Image
            key={i}
            src={b.src ?? src!}
            alt=""
            width={96}
            height={96}
            className={`pointer-events-none absolute object-contain transition-opacity duration-[1400ms] ease-in-out ${layer === "back" ? "z-20" : "z-40"} ${on ? "opacity-100" : "opacity-0"} ${b.wideOnly ? "hidden sm:block" : ""} ${b.cls}`}
            style={{
              ...((b.src ?? src) === ICE ? { filter: b.far ? "url(#ice-motion-far)" : "url(#ice-motion)" } : {}),
              ...(b.drift ? { animation: `garnish-drift ${b.drift}s ease-in-out ${-i * 1.3}s infinite alternate` } : {}),
            }}
          />
        ))}
    </>
  );
}

/**
 * Coffee showcase, layered to match the reference:
 *   1. giant cream "COFFEE" wordmark on flat orange (colour follows the cup)
 *   2. beans behind the cups
 *   3. three cups (small / large / small) overlapping the wordmark
 *   4. a bean or two in front of the cups
 *   5. the arc-topped cream card on top, cutting off the cup bases
 */
export default function MenuPreview() {
  const [accent, setAccent] = useState(CUPS[1].accent);
  const [word, setWord] = useState(CUPS[1].word);
  const smoothie = word === "Smoothie";
  const onActive = (a: string, w: string) => {
    setAccent(a);
    setWord(w);
  };
  return (
    <section
      id="menu"
      className="relative overflow-hidden pt-14 pb-0 transition-colors duration-[1200ms] ease-in-out sm:pt-20"
      style={{ backgroundColor: accent }}
    >
      {/* A very slight vertical smear, as if the ice is mid-fall. */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="ice-motion" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.3 1.1" />
        </filter>
        <filter id="ice-motion-far" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6 1.7" />
        </filter>
      </svg>
      <div className="relative">
        <div className="relative mx-auto flex max-w-6xl items-end justify-center px-4 sm:px-8">
          {/* 1. wordmark */}
          <span
            data-wordmark
            className="font-display pointer-events-none absolute inset-x-0 top-2 z-10 block h-[0.8em] text-[min(13rem,20vw)] leading-[0.8] text-cream uppercase sm:top-4"
          >
            {CUPS.map((c) => {
              const on = c.word === word;
              return (
                <span
                  key={c.word}
                  aria-hidden={!on}
                  className={`absolute inset-0 block whitespace-nowrap text-center transition-opacity duration-[1400ms] ease-in-out ${on ? "opacity-100" : "opacity-0"}`}
                >
                  {c.word}
                </span>
              );
            })}
          </span>

          {/* 2. garnish behind the cups */}
          <Garnish bits={BEANS} src="/images/coffee-bean-photo.png" on={word === "Coffee"} layer="back" />
          <Garnish bits={BERRIES} src="/images/blueberry.png" on={smoothie} layer="back" />
          <Garnish bits={ICED} on={word === "Iced Coffee"} layer="back" />

          {/* 3. the cups, rotating carousel, each takes a turn centre stage */}
          <CupCarousel onActiveChange={onActive} />

          {/* 4. garnish in front of the cups */}
          <Garnish bits={BEANS} src="/images/coffee-bean-photo.png" on={word === "Coffee"} layer="front" />
          <Garnish bits={BERRIES} src="/images/blueberry.png" on={smoothie} layer="front" />
          <Garnish bits={ICED} on={word === "Iced Coffee"} layer="front" />
        </div>

        {/* 5. full-bleed card on top, its arc cuts off the cup bases */}
        <div
          className="reveal relative z-50 -mt-8 w-full bg-cream pt-16 pb-10 sm:-mt-10 sm:pt-20 sm:pb-14"
          style={{
            borderRadius: "50% 50% 0 0 / 2rem 2rem 0 0",
          }}
        >
          <div className="mx-auto max-w-5xl px-8 sm:px-12">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                Coffee, teas, smoothies and signature drinks, plus breakfast,
                paninis and soups, served at our shop on Yates &amp; Exchange.
              </p>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <a
                  href="/members"
                  className="label rounded-full border-2 border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-cream"
                >
                  Join rewards
                </a>
                <a
                  href="/menu"
                  className="label rounded-full bg-orange px-10 py-4 text-cream transition-transform hover:-translate-y-0.5"
                >
                  See the menu
                </a>
              </div>
            </div>

            <dl className="mt-10 grid gap-8 border-t-2 border-ink/10 pt-8 text-center sm:grid-cols-3 sm:text-left">
              <div className="hidden sm:block">
                <dt className="label text-orange-deep">Hot and iced</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Espresso, cold brew, teas and smoothies, with a flavor shot
                  on any coffee.
                </dd>
              </div>
              <div className="hidden sm:block">
                <dt className="label text-orange-deep">Breakfast and lunch</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Waffles, egg sandwiches, paninis and soups, with pastries on
                  the side.
                </dd>
              </div>
              <div>
                <dt className="label text-orange-deep">Value Duet, $14</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Any sandwich with a soup or a pastry, from 10:30am to 4pm.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
