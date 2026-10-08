import Image from "next/image";
import { site } from "@/content/site";

// Intro block directly under the ticker: headline + copy on the left,
// circular photo with a doodle and small badge on the right — mirrors the
// reference's "BANH ME the WORLD" section.
export default function About() {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="reveal">
          <h2 className="font-display text-5xl leading-[0.95] text-orange-deep sm:text-6xl lg:text-7xl">
            {site.about.heading}
            <br />
            <span className="font-script text-brown lowercase">
              {site.about.script}
            </span>{" "}
            {site.about.headingEnd}
          </h2>

          <div className="mt-5 max-w-md space-y-3 text-lg leading-relaxed text-ink-soft">
            {site.about.body.split("\n\n").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <a
            href="#story"
            className="label mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-cream transition-transform hover:-translate-y-0.5"
          >
            Learn more
          </a>
        </div>

        <div className="reveal relative mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-sm">
          <div className="relative aspect-[989/1279]">
            <Image
              src="/images/about.png"
              alt={`Regulars at ${site.name}`}
              fill
              sizes="(max-width: 1024px) 90vw, 36rem"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
