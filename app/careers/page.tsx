import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import CircleEmblem from "@/components/CircleEmblem";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: `Work at ${site.name}, a neighbourhood coffee bar in ${site.city}.`,
};

export default function Careers() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <div className="reveal flex flex-col items-center">
              <CircleEmblem text="THE BREW • CAREERS • " size={112} />
              <h1 className="font-display mt-4 text-5xl sm:text-6xl">
                Work with us
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink/70">
                We are a small team that takes coffee seriously and each other
                lightly. If you want to be part of it, we would like to meet
                you.
              </p>
            </div>

            <div className="reveal mx-auto mt-14 rounded-slab border-2 border-ink/10 bg-white/60 px-6 py-10 sm:px-12">
              <h2 className="font-display text-3xl text-orange-deep sm:text-4xl">
                How to apply
              </h2>
              <p className="mt-4 text-ink/70">
                Stop by the shop, call, or send us a note.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={site.phoneHref}
                  className="label rounded-full bg-orange px-6 py-3 text-cream transition-all hover:-translate-y-0.5 hover:bg-ink"
                >
                  Call {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}?subject=Job%20inquiry`}
                  className="label rounded-full border-2 border-ink px-6 py-3 transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
                >
                  Email us
                </a>
              </div>
              <p className="label mt-8 text-ink/60">
                {site.address.line1}, {site.address.line2}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
