import Image from "next/image";
import { menuCategories, menuCustomize } from "@/content/site";
import CircleEmblem from "./CircleEmblem";

// The full menu — a tile per category, laid out the way a drive-thru board
// reads: photo up top, name below, everything scannable in one glance.
export default function MenuGrid() {
  return (
    <section className="bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="reveal flex flex-col items-center text-center">
          <CircleEmblem text="THE BREW • MENU • " size={112} />
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            What we pour
          </h1>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category) => (
            <article
              key={category.slug}
              className="reveal group flex flex-col items-center text-center"
            >
              <div className="relative aspect-square w-full max-w-64 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 60vw, 16rem"
                  className="object-contain drop-shadow-xl"
                />
              </div>
              <h2 className="font-display mt-5 text-2xl text-orange-deep sm:text-3xl">
                {category.name}
              </h2>
              <ul className="label mt-3 space-y-1 text-ink/60">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="reveal mx-auto mt-24 max-w-3xl rounded-slab border-2 border-ink/10 bg-white/60 px-6 py-10 text-center sm:px-12">
          <h2 className="font-display text-3xl text-orange-deep sm:text-4xl">
            Customize everything
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 text-left sm:grid-cols-3">
            {menuCustomize.map((option, i) => (
              <div key={option.label}>
                <p className="label text-orange">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display mt-1 text-xl">{option.label}</p>
                {option.note && (
                  <p className="mt-1 text-sm text-ink/60">{option.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
