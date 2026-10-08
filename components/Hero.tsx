import Image from "next/image";
import { site } from "@/content/site";

// Hero is a single full-bleed image filling the section edge to edge.
export default function Hero() {
  return (
    <section className="relative h-[85vh] h-[85dvh] w-full overflow-hidden sm:h-screen sm:h-dvh">
      <Image
        src="/images/hero-iced-coffee.png"
        alt={`${site.name} — a daily pour of the good stuff`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0">
        <span className="font-display absolute top-1/2 right-[76%] -translate-y-1/2 text-right text-4xl leading-none text-cream sm:right-[62%] sm:text-6xl lg:text-8xl">
          Enjoy
        </span>
        <span className="font-display absolute top-1/2 left-[76%] -translate-y-1/2 text-left text-4xl leading-none text-cream sm:left-[62%] sm:text-6xl lg:text-8xl">
          Coffee
        </span>
      </div>
    </section>
  );
}
