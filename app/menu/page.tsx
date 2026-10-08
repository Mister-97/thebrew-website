import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { menuCategories } from "@/content/menu";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Menu — ${site.name}`,
  description: `The full menu at ${site.name}, ${site.address.line1}, ${site.city}: coffee, teas, smoothies, signature drinks, meals, paninis and pastries.`,
};

export default function Menu() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
            <h1 className="font-display text-center text-[clamp(2.4rem,9vw,4.75rem)] leading-[0.9] tracking-[0.01em] sm:text-left">
              Check out our menu
            </h1>
            <p className="mt-5 hidden max-w-xl text-lg text-ink/70 sm:block">
              Pick a category to see everything on it.
            </p>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-10 sm:mt-16 sm:gap-x-8 sm:gap-y-14">
              {menuCategories.map((c) => (
                <li key={c.slug} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                  <Link href={`/menu/${c.slug}`} className="group block text-center">
                    <span className="relative mx-auto block aspect-4/3 w-full">
                      <Image
                        src={c.image}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 30vw"
                        className={`object-contain object-bottom drop-shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] ${c.slug === "pastries" ? "scale-[0.88]" : ""}`}
                      />
                    </span>
                    <span className="font-display mt-3 block text-xl leading-tight text-orange-deep transition-colors group-hover:text-ink min-[400px]:text-2xl sm:mt-5 sm:text-4xl">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-sm text-ink/55 sm:text-base">{c.items.length} items</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
