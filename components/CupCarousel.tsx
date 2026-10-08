"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export const CUPS = [
  {
    src: "/images/menu/berry-blast-smoothie.png",
    alt: "Berry Blast smoothie with The Brew logo",
    word: "Smoothie",
    centerBoost: 1,
    accent: "#9b2c5b",
  },
  {
    src: "/images/menu/iced-mocha.png",
    alt: "Iced Mocha with The Brew logo",
    word: "Iced Coffee",
    centerBoost: 1.15,
    accent: "#e84b17",
  },
  {
    src: "/images/menu/hot-coffee-cup-v2.png",
    alt: "Hot black coffee in a paper cup with The Brew logo",
    word: "Coffee",
    centerBoost: 1.15,
    accent: "#8a3a1a",
  },
];
const cups = CUPS;

const HOLD_SECONDS = 3.2;

// Slot 0 = left, 1 = centre (hero), 2 = right. The three cups rotate
// through these every few seconds, so each takes a turn large and centred.
type Slot = { x: number; y: number; scale: number; zIndex: number };

function slots(offset: number, isMobile: boolean): Slot[] {
  const centerY = isMobile ? 40 : 88;
  return [
    { x: -offset, y: 46, scale: 0.56, zIndex: 10 },
    { x: 0, y: centerY, scale: 1, zIndex: 30 },
    { x: offset, y: 46, scale: 0.56, zIndex: 10 },
  ];
}

export default function CupCarousel({
  onActiveChange,
}: {
  onActiveChange?: (accent: string, word: string) => void;
}) {
  const cupRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let tick = 0;
    const offsetFor = () => (window.innerWidth >= 640 ? 300 : 118);

    const announceActive = () => {
      const centerCup = cups[(1 - tick + cups.length) % cups.length];
      onActiveChange?.(centerCup.accent, centerCup.word);
    };

    // Cup i sits in slot (i + tick) % 3 — advancing tick rotates them all.
    const place = (animate: boolean) => {
      const isMobile = window.innerWidth < 640;
      const table = slots(offsetFor(), isMobile);
      cups.forEach((cup, i) => {
        const el = cupRefs.current[i];
        if (!el) return;
        const slotIndex = (i + tick) % cups.length;
        const slot = table[slotIndex];
        const boost = slotIndex === 1 ? cup.centerBoost : 1;
        const vars = {
          x: slot.x,
          y: slot.y,
          scale: slot.scale * boost,
          zIndex: slot.zIndex,
        };
        if (animate) {
          gsap.to(el, { ...vars, duration: 0.9, ease: "power3.inOut" });
        } else {
          gsap.set(el, { ...vars, xPercent: -50 });
        }
      });
    };

    place(false);
    announceActive();
    if (reduce) return;

    const id = setInterval(() => {
      tick = (tick + 1) % cups.length;
      place(true);
      announceActive();
    }, HOLD_SECONDS * 1000);

    const onResize = () => place(true);
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(id);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(cupRefs.current.filter(Boolean));
    };
  }, []);

  return (
    <div className="relative z-30 h-72 w-full sm:h-[30rem]">
      {cups.map((cup, i) => (
        <div
          key={cup.src}
          ref={(el) => {
            cupRefs.current[i] = el;
          }}
          className="absolute bottom-0 left-1/2 h-72 w-44 origin-bottom sm:h-[30rem] sm:w-[19rem]"
        >
          <Image
            src={cup.src}
            alt={cup.alt}
            fill
            sizes="19rem"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      ))}
    </div>
  );
}
