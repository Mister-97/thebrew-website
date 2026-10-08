import Image from "next/image";
import { features } from "@/content/site";

/**
 * Signature grid wrapped in the decorative diamond-pattern frame, each
 * offering shown as a postage-stamp card — mirrors the reference's
 * "SIGNATURE foods" block and its four scalloped stamp cards.
 */
export default function Signature() {
  return (
    <section id="story">
      <div>
        <div className="bg-cream px-5 py-14 sm:px-10 sm:py-20">
          <div className="reveal mx-auto flex max-w-lg flex-col items-center text-center">
            <Image
              src="/images/coffee-bean-photo.png"
              alt=""
              width={80}
              height={80}
              className="h-8 w-8 object-contain"
            />
            <p className="label mt-2 text-orange-deep">Signature</p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">
              What we pour
            </h2>
          </div>

          <div
            className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-2 sm:mx-auto sm:grid sm:max-w-5xl sm:grid-cols-3 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            {features.map((f) => (
              <article
                key={f.eyebrow}
                className="reveal group flex w-[68%] shrink-0 snap-center flex-col items-center rounded-slab border-2 border-ink/10 bg-white/60 px-4 py-6 text-center shadow-sm sm:w-auto sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none"
              >
                <div className="relative aspect-square w-full max-w-80 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 640px) 68vw, 24rem"
                    className="object-contain drop-shadow-xl transition-[filter] duration-300 group-hover:drop-shadow-2xl"
                  />
                </div>
                <h3 className="font-display mt-4 text-2xl text-orange-deep">
                  {f.eyebrow}
                </h3>
                <p className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-ink-soft">
                  {f.tags.map((t) => (
                    <span key={t}>#{t.replace(/\s+/g, "")}</span>
                  ))}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-1.5 sm:hidden">
            {features.map((f) => (
              <span
                key={f.eyebrow}
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-ink/20"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
