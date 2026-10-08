"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import GuestDialog from "./GuestDialog";
import { site } from "@/content/site";

// Swap these for real episodes once the show is published: same shape, with
// `label` as "Season 1, Episode 2" and `text` as the episode blurb.
const slides = [
  {
    live: true,
    label: "Live from South Shore",
    title: "The Brew Podcast",
    text: `Recorded at the shop on ${site.address.line1}.`,
    img: "/images/pod-ep1-guest.jpg",
    pos: "50% 40%",
    alt: "A guest in the green armchair, wearing headphones, mid-conversation at The Brew",
  },
  {
    live: false,
    label: "Coming soon",
    title: "Episode 2",
    text: "Check back soon.",
    img: "/images/pod-ep2.jpg",
    pos: "50% 30%",
    alt: "Two men in dark jackets smiling in front of The Brew's orange logo wall",
  },
  {
    live: false,
    label: "Coming soon",
    title: "Episode 3",
    text: "Check back soon.",
    img: "/images/pod-night.jpg",
    pos: "50% 82%",
    alt: "A Brew-branded microphone against the orange wall",
  },
  {
    live: false,
    label: "Coming soon",
    title: "Episode 4",
    text: "Check back soon.",
    img: "/images/podcast-wall.jpg",
    pos: "50% 50%",
    alt: "The painted Brew logo wall and podcast seating",
  },
];

const REST = 0; // resting tilt of the photo
const SCROLL_PER_SLIDE = 0.8; // viewport heights of scroll between slides

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    {dir === "prev" ? (
      <path d="M6 5h2v14H6zM20 5v14L9 12z" />
    ) : (
      <path d="M16 5h2v14h-2zM4 5l11 7L4 19z" />
    )}
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.75.75 0 0 1-1.03.25c-2.8-1.7-6.3-2.1-10.45-1.15a.75.75 0 1 1-.33-1.46c4.55-1.04 8.45-.59 11.56 1.33.35.21.46.67.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.2-1.97-8.08-2.54-11.87-1.39a.94.94 0 0 1-.54-1.8c4.33-1.31 9.7-.68 13.39 1.59.44.27.58.85.31 1.29Zm.13-3.4C14.35 7.45 7.97 7.24 4.28 8.36a1.12 1.12 0 1 1-.65-2.15c4.24-1.29 11.28-1.04 15.73 1.6a1.12 1.12 0 0 1-1.15 1.92Z" />
  </svg>
);

const ApplePodcastIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" />
    <path d="M12 13v7" />
    <path d="M7.6 15.4a6 6 0 1 1 8.8 0" />
    <path d="M4.9 18.3a10 10 0 1 1 14.2 0" />
  </svg>
);

const linkFor = (label: string) => site.podcast.links.find((l) => l.label === label)?.href;
// A platform is live once its real URL is in site.podcast.links. Until then it
// shows a "Coming soon" badge and does not link anywhere.
const platforms = [
  { label: "Apple Podcasts", href: linkFor("Apple Podcasts"), icon: <ApplePodcastIcon /> },
  { label: "Spotify", href: linkFor("Spotify"), icon: <SpotifyIcon /> },
];

// Little live-audio meter. Bar timings are staggered so it never loops in sync.
const Equalizer = () => (
  <span aria-hidden className="inline-flex h-4 items-end gap-[3px]">
    {[0.9, 1.15, 0.75, 1.3, 1.0].map((d, i) => (
      <span key={i} className="eq-bar" style={{ animationDuration: `${d}s`, animationDelay: `${i * -0.17}s` }} />
    ))}
  </span>
);

const SoonBadge = () => (
  <span className="absolute -right-1.5 -top-2 whitespace-nowrap rounded-full bg-orange px-1.5 py-0.5 text-[8px] font-semibold leading-none text-cream sm:-right-2 sm:-top-2.5 sm:px-2 sm:text-[10px]">
    <span className="sm:hidden">Soon</span>
    <span className="hidden sm:inline">Coming soon</span>
  </span>
);

/**
 * Full-screen episode player hero. The section pins to the screen and scrolling
 * steps through the slides: the photo swaps sideways while the text and
 * numbers follow. The first
 * reveal waits for the intro loader to hand the page over.
 */
export default function PodcastStage() {
  const root = useRef<HTMLElement>(null);
  const cur = useRef(0);
  const busy = useRef(false);
  const target = useRef(0);
  const trigger = useRef<ScrollTrigger | null>(null);
  const goRef = useRef<(to: number, dir: 1 | -1) => void>(() => {});
  const pumpRef = useRef<() => void>(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("podcast-dark");
    return () => document.documentElement.classList.remove("podcast-dark");
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current!;
    const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, el);

    const ctx = gsap.context(() => {
      const photos = q<HTMLElement>("[data-photo]");
      const texts = q<HTMLElement>("[data-text]");

      photos.forEach((p, i) =>
        gsap.set(p, { xPercent: i === 0 ? 0 : 140, rotate: REST, autoAlpha: i === 0 ? 1 : 0 }),
      );
      texts.forEach((t, i) => gsap.set(t, { autoAlpha: i === 0 ? 1 : 0 }));

      goRef.current = (to, dir) => {
        if (busy.current || to === cur.current) return;
        busy.current = true;
        const from = cur.current;
        cur.current = to;
        setActive(to);
        const d = reduce ? 0 : 0.95;
        gsap
          .timeline({
            defaults: { ease: "power3.inOut", duration: d },
            onComplete: () => {
              busy.current = false;
              pumpRef.current();
            },
          })
          .to(photos[from], { xPercent: -140 * dir, rotate: REST - 6 * dir, autoAlpha: 0 }, 0)
          .fromTo(
            photos[to],
            { xPercent: 140 * dir, rotate: REST + 6 * dir, autoAlpha: 1 },
            { xPercent: 0, rotate: REST },
            0,
          )
          .to("[data-cable-l]", { x: 22, duration: d ? 0.35 : 0, yoyo: true, repeat: 1, ease: "power2.out" }, 0)
          .to("[data-cable-r]", { x: -22, duration: d ? 0.35 : 0, yoyo: true, repeat: 1, ease: "power2.out" }, 0)
          .to(texts[from], { autoAlpha: 0, y: -12, duration: d ? 0.3 : 0, ease: "power2.in" }, 0)
          .fromTo(
            texts[to],
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: d ? 0.55 : 0, ease: "power3.out" },
            d ? 0.45 : 0,
          );
      };

      // Walk toward whichever slide the scroll position asks for, one at a time.
      pumpRef.current = () => {
        if (busy.current || cur.current === target.current) return;
        const dir = target.current > cur.current ? 1 : -1;
        goRef.current(cur.current + dir, dir);
      };

      if (!reduce) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        const n = slides.length;
        trigger.current = ScrollTrigger.create({
          trigger: el,
          start: () => `top ${document.querySelector("header")?.offsetHeight ?? 64}px`,
          end: () => `+=${(n - 1) * SCROLL_PER_SLIDE * window.innerHeight}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power1.inOut" },
          onUpdate: (self) => {
            target.current = Math.round(self.progress * (n - 1));
            pumpRef.current();
          },
        });
        window.addEventListener("brew:intro-done", () => ScrollTrigger.refresh(), { once: true });
      }

      // Ambient motion: cables sway, the photo frame floats, the picture drifts.
      if (!reduce) {
        gsap.set("[data-cable-l]", { transformOrigin: "0% 60%" });
        gsap.set("[data-cable-r]", { transformOrigin: "100% 50%" });
        gsap.to("[data-cable-l]", { y: 5, rotation: 1.6, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-cable-r]", { y: -5, rotation: -1.6, duration: 3.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-float]", { y: -6, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(
          "[data-photo] img",
          { scale: 1 },
          { scale: 1.07, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 1.4 },
        );
      }

      // Entrance, held until the loader is done.
      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .from("[data-cable-l]", { xPercent: -45, autoAlpha: 0, duration: 1.4 }, 0.1)
        .from("[data-cable-r]", { xPercent: 45, autoAlpha: 0, duration: 1.4 }, 0.1)
        .from(photos[0], { y: 90, autoAlpha: 0, duration: 1.2 }, 0.2)
        .from(texts[0], { y: 22, autoAlpha: 0, duration: 0.9 }, 0.55)
        .from("[data-stage-chrome]", { autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.8);

      if (reduce) intro.progress(1);
      else if (document.documentElement.classList.contains("intro-running")) {
        window.addEventListener("brew:intro-done", () => intro.play(), { once: true });
      } else intro.play();
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  // With scroll driving the slides, buttons scroll to the slide they name.
  const jump = (i: number) => {
    const st = trigger.current;
    if (!st) {
      target.current = i;
      pumpRef.current();
      return;
    }
    const y = st.start + ((st.end - st.start) * i) / (slides.length - 1);
    gsap.to(window, { scrollTo: y, duration: 0.9, ease: "power2.inOut" });
  };
  const step = (d: 1 | -1) =>
    jump(Math.min(slides.length - 1, Math.max(0, cur.current + d)));

  const first = active === 0;
  const last = active === slides.length - 1;
  const sideBtn =
    "hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg border-2 border-cream/70 transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:opacity-30 sm:flex";
  const smallBtn =
    "flex h-12 w-12 items-center justify-center rounded-lg border-2 border-cream/70 transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:opacity-30 hidden";

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="About the podcast"
      className="relative flex h-[calc(100svh-3.5rem)] flex-col overflow-hidden bg-ink text-cream sm:h-[calc(100svh-4rem)]"
    >
      {/* Numbers */}
      <nav
        data-stage-chrome
        aria-label="Slides"
        className="flex shrink-0 justify-center gap-5 pt-3 text-sm tabular-nums"
      >
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => jump(i)}
            aria-label={`Go to ${s.title}`}
            aria-current={i === active}
            title={s.live ? undefined : "Coming soon"}
            className={`transition-colors ${i === active ? "text-cream" : "text-cream/35 hover:text-cream/70"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </nav>

      {/* Mobile only: a side hint that scrolling changes the episode */}
      <div
        aria-hidden
        className={`pointer-events-none absolute right-1 top-[60%] z-30 flex flex-col items-center gap-2 text-cream/45 transition-opacity duration-500 sm:hidden ${last ? "opacity-0" : "opacity-100"}`}
      >
        <span className="text-[10px] font-medium [writing-mode:vertical-rl]">Scroll for next episode</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nudge">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Cords come in from the screen edges with the jack heads facing the photo
          (desktop only). */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-[36%] z-10 hidden w-[min(10.5vw,10.5rem)] -translate-y-[82%] lg:block">
        <Image data-cable-l src="/images/jack-left.png" alt="" width={541} height={224} className="h-auto w-full" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-0 top-[36%] z-10 hidden w-[min(9.5vw,9.5rem)] -translate-y-1/2 lg:block">
        <Image data-cable-r src="/images/jack-right.png" alt="" width={446} height={80} className="h-auto w-full" />
      </div>

      {/* Photo: takes whatever height is left */}
      <div className="pointer-events-none relative z-20 flex min-h-0 flex-1 justify-center px-5 py-3 sm:py-4">
        <div data-float className="relative aspect-[5/4] h-full max-h-[30rem] max-w-full">
          {slides.map((s, i) => (
            <div
              key={s.title}
              data-photo
              className="absolute inset-0 overflow-hidden border-[6px] border-cream bg-tan"
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 88vw, 32rem"
                className={`object-cover ${s.live ? "" : "opacity-45 grayscale"}`}
                style={{ objectPosition: s.pos }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text and listen row */}
      <div className="relative z-30 flex shrink-0 items-start justify-center gap-4 px-5 pb-3 sm:gap-8">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={first}
          aria-label="Previous"
          data-stage-chrome
          className={`${sideBtn} mt-3`}
        >
          <Arrow dir="prev" />
        </button>

        <div className="w-full max-w-xl text-center">
          <div className="grid">
            {slides.map((s) => (
              <div key={s.title} data-text className="col-start-1 row-start-1">
                <p
                  className={
                    s.live
                      ? "inline-flex items-center gap-2.5 text-base font-semibold text-orange sm:text-lg"
                      : "mx-auto w-fit rounded-full border border-cream/30 px-3 py-0.5 text-sm font-semibold text-cream/60 sm:text-base"
                  }
                >
                  {s.live && <Equalizer />}
                  {s.label}
                </p>
                <h1
                  className={`font-display mt-1 text-[clamp(2.2rem,min(6.4vw,9svh),5rem)] leading-none ${s.live ? "" : "text-cream/35"}`}
                >
                  {s.title}
                </h1>
                <p
                  className={`mx-auto mt-2 hidden max-w-md text-base sm:block sm:text-lg ${s.live ? "text-cream/75" : "text-cream/35"}`}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div data-stage-chrome className="mt-3 flex items-center justify-center gap-2.5 sm:hidden">
            <span className="sr-only">Listen on</span>
            {platforms.map((p) =>
              p.href ? (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Listen on ${p.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-cream text-ink transition-colors hover:bg-orange hover:text-cream [&_svg]:h-[18px] [&_svg]:w-[18px]"
                >
                  {p.icon}
                </a>
              ) : (
                <span
                  key={p.label}
                  role="img"
                  aria-label={`${p.label}, coming soon`}
                  className="relative flex h-9 w-9 items-center justify-center rounded-md bg-cream text-ink [&_svg]:h-[18px] [&_svg]:w-[18px]"
                >
                  {p.icon}
                  <SoonBadge />
                </span>
              ),
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          disabled={last}
          aria-label="Next"
          data-stage-chrome
          className={`${sideBtn} mt-3`}
        >
          <Arrow dir="next" />
        </button>
      </div>

      {/* Bottom bar: on phones prev and next sit at the edges and Instagram plus
          Be a guest are centred between them; on desktop the listen buttons are
          at the left and Instagram plus Be a guest at the right. */}
      <div
        data-stage-chrome
        className="relative z-30 flex shrink-0 items-center justify-center gap-3 px-5 pb-5 pt-2 sm:justify-start sm:px-10 sm:pb-7"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={first}
            aria-label="Previous"
            className={smallBtn}
          >
            <Arrow dir="prev" />
          </button>
          {platforms.map((p) => {
            const inner = (
              <>
                {p.icon}
                <span className="text-left leading-tight">
                  <span className="block text-[11px] opacity-70">Listen on</span>
                  <span className="block text-base font-semibold">{p.label}</span>
                </span>
              </>
            );
            return p.href ? (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-3 rounded-lg border-2 border-cream/70 px-4 py-2 transition-colors hover:bg-cream hover:text-ink sm:flex"
              >
                {inner}
              </a>
            ) : (
              <div
                key={p.label}
                aria-label={`${p.label}, coming soon`}
                className="relative hidden items-center gap-3 rounded-lg border-2 border-cream/50 px-4 py-2 sm:flex"
              >
                {inner}
                <SoonBadge />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 sm:ml-auto sm:gap-4">
          <a
            href={site.podcast.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <GuestDialog className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-ink" />
        </div>

        <div className="hidden">
          <button
            type="button"
            onClick={() => step(1)}
            disabled={last}
            aria-label="Next"
            className={smallBtn}
          >
            <Arrow dir="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
