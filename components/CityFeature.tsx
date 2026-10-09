import { site } from "@/content/site";

// Full-bleed feature between the hero and the coffee showcase. The photo
// is a native CSS fixed background — it stays put while the page scrolls
// over it, no JS involved, so there's no scroll-jank to fight.
export default function CityFeature() {
  return (
    <section
      className="relative isolate overflow-hidden bg-fixed bg-cover"
      style={{
        backgroundImage: "url(/images/feature-interior-v3.webp)",
        backgroundPosition: "center 40%",
      }}
    >
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative z-10 flex min-h-[70vh] flex-col justify-between gap-16 px-6 pt-14 pb-8 sm:min-h-[85vh] sm:px-24 sm:pt-20 sm:pb-10 lg:px-40">
        <h2 className="font-display ml-auto max-w-md text-right text-5xl leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
          South Shore&rsquo;s
          <br />
          coffee bar
          <span className="text-orange hidden sm:inline">—</span>
          <span aria-hidden className="mt-2 block text-orange sm:hidden">
            —
          </span>
        </h2>

        <div className="ml-6 w-56 text-cream sm:ml-12 sm:w-64 lg:ml-20">
          <p className="label leading-relaxed">
            Now serving
            <br />
            coffee &amp; tea
            <br />
            smoothies
            <br />
            breakfast &amp; lunch
            <br />
            soups &amp; pastries
          </p>
          <div className="label mt-6 space-y-2">
            <a href="/menu" className="flex gap-2 py-1">
              <span>&gt;</span>
              <span className="underline underline-offset-4">Explore menu</span>
            </a>
            <a href="/contact" className="flex gap-2 py-1">
              <span>&gt;</span>
              <span className="underline underline-offset-4">
                Location / hours
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
