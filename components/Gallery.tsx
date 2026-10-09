"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { gallery } from "@/content/site";

const LOOP = [...gallery, ...gallery];

/**
 * Gallery as a slow, continuous filmstrip, uniform photos drift right to
 * left on a loop, fading only as they approach the container's edges.
 * Hover pauses the drift so a photo can actually be looked at.
 */
export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: gallery.length * 7,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section id="gallery">
      <div>
        <div className="bg-cream px-5 py-14 sm:px-10 sm:py-20">
          <div className="reveal text-center">
            <h2 className="font-display text-4xl sm:text-5xl">
              Gallery<span className="text-orange-deep">.</span>
            </h2>
          </div>

          <div
            className="reveal relative mt-12 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div ref={trackRef} className="flex w-max gap-4 sm:gap-5">
              {LOOP.map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="relative aspect-[4/5] h-64 shrink-0 overflow-hidden rounded-slab border-2 border-ink bg-tan/40 sm:h-80"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="16rem"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
