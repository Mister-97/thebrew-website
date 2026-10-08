import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import ContactHeading from "@/components/ContactHeading";
import CareersList from "@/components/CareersList";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: `Open roles at ${site.name}: barista, manager and general manager in ${site.city}.`,
};

export default function Careers() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
            <ContactHeading text="We’re hiring" size="md" />
            <p className="mt-5 max-w-xl text-lg text-ink/70">
              Three open roles at the shop on {site.address.line1}. Pick one to
              see what the job involves, then apply.
            </p>

            <div className="mt-10 sm:mt-14">
              <CareersList />
            </div>

            <p className="mt-10 text-ink/60">
              Not sure which fits? Call us at{" "}
              <a href={site.phoneHref} className="inline-block py-2.5 underline decoration-ink/30 decoration-2 underline-offset-4 hover:text-orange-deep">
                {site.phone}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
