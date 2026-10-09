import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import ContactHeading from "@/components/ContactHeading";
import MembersCard from "@/components/MembersCard";
import MemberForm from "@/components/MemberForm";
import { membership, site } from "@/content/site";

const svg = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// One icon per perk, in the same order as membership.perks.
const perkIcons = [
  // cup with a star: the free drink
  <svg key="cup" {...svg} className="perk-cup">
    <path d="M4 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Z" />
    <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M10 11.2l.8 1.6 1.7.25-1.25 1.2.3 1.7L10 15.1l-1.55.85.3-1.7-1.25-1.2 1.7-.25.8-1.6Z" />
    <path d="M7.5 3c0 1.4 1.3 1.4 1.3 2.8M11.5 3c0 1.4 1.3 1.4 1.3 2.8" />
  </svg>,
  // bell: first to know
  <svg key="bell" {...svg} className="perk-bell">
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" />
    <path d="M10 21a2 2 0 0 0 4 0" />
    <path d="M4 5.5C4.8 4 5.9 3 7 2.5M20 5.5C19.2 4 18.1 3 17 2.5" />
  </svg>,
  // microphone: the tapings
  <svg key="mic" {...svg}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M8.5 21h7" />
  </svg>,
];

export const metadata: Metadata = {
  title: `Members | ${site.name}`,
  description: `Join ${membership.name}: earn a stamp with every drink and get your tenth free at ${site.name}.`,
};

export default function MembersPage() {
  return (
    <>
      <Header />
      <main>
        <section className="overflow-hidden bg-cream text-ink">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <ContactHeading text="Join the club" size="md" />
              <p className="mt-5 max-w-md text-lg text-ink/70">
                Every drink earns a stamp. Fill the card and your next one is free.
                Joining takes a minute and costs nothing.
              </p>
              <a
                href="#join"
                className="mt-8 inline-block rounded-full bg-ink px-9 py-4 text-base font-semibold text-cream transition-colors hover:bg-orange"
              >
                Sign up
              </a>
            </div>
            <MembersCard />
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink text-cream">
          <div className="pattern-frame h-3 w-full border-b-2 border-cream sm:h-4" aria-hidden />
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="font-display max-w-2xl text-4xl leading-none sm:text-6xl">
              What members get
            </h2>

            <ul className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3 sm:items-stretch sm:gap-6">
              {membership.perks.map((p, i) => {
                const tone = [
                  "bg-orange text-cream",
                  "bg-cream text-ink",
                  "bg-tan text-ink",
                ][i];
                const badge = i === 0 ? "bg-cream text-orange-deep" : "bg-ink text-cream";
                return (
                  <li
                    key={p.title}
                    className={`perk group relative rounded-slab p-7 pb-9 transition-transform duration-300 hover:-translate-y-1.5 sm:p-8 sm:pb-10 ${tone}`}
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center">
                      {i === 2 && (
                        <span aria-hidden className="perk-ripple absolute inset-0 rounded-full border-2 border-ink/40 opacity-0" />
                      )}
                      <span className={`relative flex h-20 w-20 items-center justify-center rounded-full ${badge}`}>
                        {perkIcons[i]}
                      </span>
                    </span>
                    <h3 className="font-display mt-7 text-3xl leading-[1.05] sm:text-[2rem]">{p.title}</h3>
                    <p className={`mt-3 text-lg leading-relaxed ${i === 0 ? "text-cream/90" : "text-ink/70"}`}>{p.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="join" className="scroll-mt-16 bg-cream text-ink">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <h2 className="font-display text-4xl sm:text-5xl">Sign up</h2>
              <p className="mt-4 text-lg text-ink/70">
                Tell us where to send your card. That is all we need.
              </p>
            </div>
            <div className="lg:col-span-8">
              <MemberForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
