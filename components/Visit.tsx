import Image from "next/image";
import { site } from "@/content/site";

/**
 * Centered cream CTA block, mirroring the reference's "FIND our LOCATION"
 * section rather than the full-bleed colour panel used earlier.
 */
export default function Visit() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery,
  )}&z=15&output=embed`;

  return (
    <section id="visit" className="border-b-2 border-ink px-5 py-16 sm:px-8 sm:py-24">
      <div className="reveal mx-auto flex max-w-xl flex-col items-center text-center">
        <Image
          src="/images/coffee-bean-photo.png"
          alt=""
          width={80}
          height={80}
          className="h-8 w-8 object-contain"
        />
        <h2 className="font-display mt-2 text-4xl sm:text-5xl">
          Find our
          <br />
          <span className="font-script text-brown lowercase">location</span>
        </h2>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(site.address.mapsQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="label mt-6 rounded-full bg-orange px-8 py-3.5 text-cream transition-transform hover:-translate-y-0.5"
        >
          Find us
        </a>
      </div>

      <div className="reveal relative mx-auto mt-14 max-w-6xl">
        <div className="relative h-[22rem] overflow-hidden rounded-slab border-2 border-ink bg-tan/40 sm:h-[26rem]">
          <iframe
            src={mapSrc}
            title={`Map to ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      <div className="reveal mx-auto mt-10 grid max-w-6xl gap-8 border-t-2 border-ink/15 pt-10 sm:grid-cols-3 sm:gap-12">
        <div>
          <p className="label text-orange-deep">Address</p>
          <address className="mt-3 text-lg leading-relaxed text-ink-soft not-italic">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
        </div>

        <div>
          <p className="label text-orange-deep">Hours</p>
          <dl className="mt-3 space-y-2.5">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6 text-sm">
                <dt className="text-ink-soft">{h.days}</dt>
                <dd className="tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="label text-orange-deep">Call</p>
          <a
            href={site.phoneHref}
            className="label mt-3 inline-block rounded-full border-2 border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-cream"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
