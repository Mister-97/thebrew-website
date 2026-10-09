import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import ContactForm from "@/components/ContactForm";
import ContactHours from "@/components/ContactHours";
import ContactHeading from "@/components/ContactHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: `Visit, call or write to ${site.name} at ${site.address.line1}, ${site.address.line2}.`,
};

const quiet =
  "inline-block py-2.5 underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors hover:text-orange-deep hover:decoration-orange-deep";

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery,
  )}&z=15&output=embed`;
  const directions = `https://maps.google.com/?q=${encodeURIComponent(site.address.mapsQuery)}`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
            <ContactHeading text="Let’s talk" animate={false} />

            <div className="mt-14 grid gap-14 border-t-2 border-ink pt-10 sm:mt-20 sm:pt-12 lg:grid-cols-12 lg:gap-20">
              <div className="space-y-10 lg:col-span-4">
                <div>
                  <p className="text-sm text-ink/60">Visit</p>
                  <address className="mt-2 text-xl leading-snug not-italic">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </address>
                  <a href={directions} target="_blank" rel="noreferrer" className={`mt-2 inline-block text-base ${quiet}`}>
                    Get directions
                  </a>
                </div>

                <ContactHours />

                <div>
                  <p className="text-sm text-ink/60">Call or write</p>
                  <div className="mt-2 space-y-1 text-xl">
                    <p>
                      <a href={site.phoneHref} className={quiet}>
                        {site.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${site.email}`} className={quiet}>
                        {site.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ContactForm minimal />
                <p className="mt-10 text-ink/60">
                  Want to be on the podcast?{" "}
                  <Link href="/podcast" className={quiet}>
                    Be a guest
                  </Link>
                  . Looking for work?{" "}
                  <Link href="/careers" className={quiet}>
                    See careers
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Edge to edge, tinted to the brand instead of default Google blue/green */}
          <div className="relative h-80 overflow-hidden border-t-2 border-ink bg-tan/40 sm:h-[28rem]">
            <iframe
              src={mapSrc}
              title={`Map to ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:grayscale(1)_sepia(0.35)_contrast(1.05)]"
            />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
