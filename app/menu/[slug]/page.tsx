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
  const next = menuCategories[(idx + 1) % menuCategories.length];
  const featured = c.items.filter((i) => i.image);
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

            <Link href={`/menu/${next.slug}`} className="group mt-14 flex items-center justify-between gap-6 border-t-2 border-ink pt-6 sm:mt-20">
              <span className="text-ink/60">Next</span>
              <span className="font-display text-3xl transition-colors group-hover:text-orange-deep sm:text-4xl">{next.name}</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
