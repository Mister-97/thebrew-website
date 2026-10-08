import Image from "next/image";
import Link from "next/link";
import { menuCategories } from "@/content/menu";

// Homepage picks, in this order. Each links to its category page on /menu.
const PICKS = ["iced-coffee", "smoothies", "signature-drinks"];

/**
 * "Check out our menu" on the homepage: three of the menu categories as the same
 * three-drink photos used on /menu. A swipeable row on phones.
 */
export default function Signature() {
  const picks = PICKS.map((slug) => menuCategories.find((c) => c.slug === slug)!).filter(Boolean);

  return (
    <section id="story">
      <div className="bg-cream px-5 py-14 sm:px-10 sm:py-20">
        <div className="reveal mx-auto flex max-w-lg flex-col items-center text-center">
          <Image
            src="/images/coffee-bean-photo.png"
            alt=""
            width={80}
            height={80}
            className="h-8 w-8 object-contain"
          />
          <h2 className="font-display mt-2 text-4xl sm:text-5xl">Check out our menu</h2>
        </div>

        <ul
          className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-2 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          {picks.map((c) => (
            <li key={c.slug} className="reveal w-[78%] shrink-0 snap-center sm:w-auto">
              <Link href={`/menu/${c.slug}`} className="group block text-center">
                <span className="relative mx-auto block aspect-4/3 w-full">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, 30vw"
                    className="object-contain object-bottom drop-shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="font-display mt-4 block text-2xl leading-tight text-orange-deep transition-colors group-hover:text-ink sm:text-3xl">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-center gap-1.5 sm:hidden" aria-hidden>
          {picks.map((c) => (
            <span key={c.slug} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center sm:mt-14">
          <Link
            href="/menu"
            className="rounded-full bg-ink px-9 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange"
          >
            See the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
