import { site } from "@/content/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery,
  )}&z=15&output=embed`;

  return (
    <section id="contact" className="border-b-2 border-ink px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal text-center">
          <h2 className="font-display text-4xl sm:text-6xl">Contact us</h2>
          <p className="mt-4 text-lg text-ink/70">
            Questions, catering, or just want to say hi. Send us a note.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="reveal rounded-slab border-2 border-ink/10 bg-white/60 p-6 sm:p-10">
            <ContactForm />
          </div>

          <div className="reveal flex flex-col gap-8">
            <div className="relative h-72 overflow-hidden rounded-slab border-2 border-ink bg-tan/40">
              <iframe
                src={mapSrc}
                title={`Map to ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="label text-orange-deep">Address</p>
                <address className="mt-3 leading-relaxed text-ink-soft not-italic">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </address>
              </div>
              <div>
                <p className="label text-orange-deep">Hours</p>
                <dl className="mt-3 space-y-2">
                  {site.hours.map((h) => (
                    <div key={h.days} className="text-sm">
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
                  className="mt-3 inline-block underline decoration-2 underline-offset-4 hover:text-orange-deep"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
