import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function Podcast() {
  const links = site.podcast.links.filter((l) => l.href);

  return (
    <section id="podcast" className="bg-tan/50 px-5 py-16 sm:px-8 sm:py-24">
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/images/logo.png"
          alt=""
          width={160}
          height={160}
          className="h-28 w-28 object-contain"
        />
        <p className="label mt-6 text-orange-deep">Podcast</p>
        <h2 className="font-display mt-2 text-4xl sm:text-6xl">
          {site.podcast.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-ink/70">{site.podcast.blurb}</p>

        {links.length > 0 ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="label rounded-full bg-orange px-6 py-3 text-cream transition-all hover:-translate-y-0.5 hover:bg-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}

        <Link
          href="/podcast"
          className="label mt-8 rounded-full border-2 border-ink px-6 py-3 transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
        >
          About the show
        </Link>
      </div>
    </section>
  );
}
