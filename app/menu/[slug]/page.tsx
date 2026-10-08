import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { menuCategories } from "@/content/menu";
import { site } from "@/content/site";

export function generateStaticParams() {
  return menuCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = menuCategories.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${site.name}`,
    description: `${c.name} at ${site.name}: ${c.items.slice(0, 4).map((i) => i.name).join(", ")} and more.`,
  };
}

export default async function CategoryPage(props: PageProps<"/menu/[slug]">) {
  const { slug } = await props.params;
  const idx = menuCategories.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const c = menuCategories[idx];
  const n = menuCategories.length;
  const next = menuCategories[(idx + 1) % n];
  const prev = menuCategories[(idx - 1 + n) % n];
  // Item photos show only when every item in the category has one, so a page
  // never shows one lonely photo. Items keep their `image` for when the set is complete.
  const featured = c.items.every((i) => i.image) ? c.items : [];
  const list = c.items;

  return (
    <>
      <Header />
      <main>
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
            <Link href="/menu" className="inline-block py-2.5 text-base text-ink/60 underline decoration-ink/30 decoration-2 underline-offset-4 hover:text-orange-deep">
              All categories
            </Link>

            <div className="mt-4 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <h1 className="font-display text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.9]">{c.name}</h1>
                {c.intro && <p className="mt-4 text-lg text-ink/70">{c.intro}</p>}
                {c.priceKey && <p className="mt-2 text-ink/55">Prices: {c.priceKey}</p>}
              </div>
              <div className="relative mx-auto aspect-4/3 w-full max-w-lg">
                <Image src={c.image} alt={c.alt} fill priority sizes="(max-width: 1024px) 90vw, 32rem" className="object-contain object-bottom drop-shadow-xl" />
              </div>
            </div>

            {featured.length > 0 && (
              <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-20 lg:grid-cols-4">
                {featured.map((i) => (
                  <li key={i.name} className="text-center">
                    <div className="relative mx-auto aspect-3/4 w-full max-w-[14rem]">
                      <Image src={i.image!} alt={`${i.name}, in a cup with The Brew logo`} fill sizes="(max-width: 1024px) 45vw, 14rem" className="object-contain object-bottom drop-shadow-lg" />
                    </div>
                    <p className="font-display mt-4 text-xl leading-tight sm:text-2xl">{i.name}</p>
                    {i.desc && <p className="mt-1 text-sm text-ink/60">{i.desc}</p>}
                    <p className="mt-1 text-lg tabular-nums text-orange-deep">${i.price}</p>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-14 border-t-2 border-ink sm:mt-20">
              {list.map((i) => (
                <li key={i.name} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                  <span>
                    <span className="block text-xl">{i.name}</span>
                    {i.desc && <span className="mt-0.5 block max-w-xl text-base text-ink/60">{i.desc}</span>}
                  </span>
                  <span className="shrink-0 text-xl tabular-nums">${i.price.replace(" / ", " / $")}</span>
                </li>
              ))}
            </ul>

            {c.note && <p className="mt-6 max-w-2xl text-base text-ink/65">{c.note}</p>}

            <nav aria-label="More categories" className="mt-16 grid gap-4 border-t-2 border-ink pt-8 sm:mt-24 sm:grid-cols-2 sm:gap-6">
              {[
                { c: prev, label: "Previous", flip: false },
                { c: next, label: "Next", flip: true },
              ].map(({ c: t, label, flip }) => (
                <Link
                  key={label}
                  href={`/menu/${t.slug}`}
                  className={`group flex items-center gap-4 rounded-slab bg-tan/60 p-4 transition-colors hover:bg-tan sm:gap-6 sm:p-6 ${flip ? "flex-row-reverse text-right" : ""}`}
                >
                  <span className="relative block aspect-4/3 w-28 shrink-0 sm:w-40">
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 7rem, 10rem"
                      className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base text-ink/60">{flip ? `${label} \u2192` : `\u2190 ${label}`}</span>
                    <span className="font-display mt-1 block text-2xl leading-tight transition-colors group-hover:text-orange-deep sm:text-3xl">
                      {t.name}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
