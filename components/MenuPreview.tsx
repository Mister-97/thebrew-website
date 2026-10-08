"use client";

import { useState } from "react";
import Image from "next/image";
import CupCarousel, { CUPS } from "./CupCarousel";

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

  return (
    <section
      id="menu"
      className="relative overflow-hidden pt-14 pb-0 transition-colors duration-[1200ms] ease-in-out sm:pt-20"
      style={{ backgroundColor: accent }}
    >
      <div className="relative">
        <div className="relative mx-auto flex max-w-6xl items-end justify-center px-4 sm:px-8">
          {/* 1. wordmark */}
          <span className="font-display pointer-events-none absolute inset-x-0 top-2 z-10 text-center text-[5rem] leading-[0.8] text-cream uppercase sm:top-4 sm:text-[10rem] lg:text-[13rem]">
            Coffee
          </span>

          {/* 2. beans behind the cups */}
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-0 left-[14%] z-20 h-14 w-14 -rotate-12 object-contain sm:h-24 sm:w-24"
          />
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-[4%] right-[16%] z-20 h-12 w-12 rotate-12 object-contain sm:h-20 sm:w-20"
          />
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-[38%] left-[8%] z-20 h-10 w-10 rotate-[30deg] object-contain sm:h-16 sm:w-16"
          />

          {/* 3. the cups — rotating carousel, each takes a turn centre stage */}
          <CupCarousel onActiveChange={setAccent} />

          {/* 4. beans in front of the cups */}
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-[26%] left-[30%] z-40 h-11 w-11 rotate-45 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
          />
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="pointer-events-none absolute top-[54%] right-[30%] z-40 h-10 w-10 -rotate-[25deg] object-contain sm:h-16 sm:w-16"
          />
        </div>

        {/* 5. full-bleed card on top — its arc cuts off the cup bases */}
        <div
          className="reveal relative z-50 -mt-8 w-full bg-cream pt-16 pb-10 sm:-mt-10 sm:pt-20 sm:pb-14"
          style={{
            borderRadius: "50% 50% 0 0 / 2rem 2rem 0 0",
          }}
        >
          <div className="mx-auto max-w-5xl px-8 sm:px-12">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                Explore a realm of rich aromas with our exclusive coffee
                selection, freshly brewed to deliver a truly exceptional
                experience.
              </p>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <a
                  href="#subscribe"
                  className="label rounded-full border-2 border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-cream"
                >
                  Join subscription
                </a>
                <a
                  href="#contact"
                  className="label rounded-full bg-orange px-10 py-4 text-cream transition-transform hover:-translate-y-0.5"
                >
                  Order now
                </a>
              </div>
            </div>

            <dl className="mt-10 grid gap-8 border-t-2 border-ink/10 pt-8 text-center sm:grid-cols-3 sm:text-left">
              <div>
                <dt className="label text-orange-deep">Roasted close by</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Small batches, never sitting in a warehouse.
                </dd>
              </div>
              <div>
                <dt className="label text-orange-deep">Whole bean or ground</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Ground to match how you brew it at home.
                </dd>
              </div>
              <div>
                <dt className="label text-orange-deep">Subscriptions</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  Delivered every two weeks or once a month.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
