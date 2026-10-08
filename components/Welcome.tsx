import Image from "next/image";
import { site } from "@/content/site";

// Image-forward two-column block, mirroring the reference's photo-plus-
// "WELCOME TO MY WORLD!" pairing right after the signature grid.
export default function Welcome() {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        <div className="reveal relative aspect-4/3 min-h-[26rem] overflow-hidden bg-tan/40 sm:min-h-[32rem] lg:aspect-auto">
          <Image
            src="/images/welcome-cherries.jpg"
            alt={`Freshly picked coffee cherries at ${site.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-cream lg:w-1/4"
          />
        </div>

        <div className="reveal flex flex-col justify-center px-6 py-20 sm:px-12 sm:py-28">
          <div>
            <h2 className="font-display text-4xl leading-[0.95] text-orange-deep sm:text-5xl">
              {site.welcome.heading}{" "}
              <span className="font-script text-brown lowercase">
                {site.welcome.script}
              </span>
              <br />
              {site.welcome.headingEnd}
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">{site.welcome.body}</p>

            <div
              id="subscribe"
              className="mt-6 max-w-sm scroll-mt-24 border-l-2 border-orange pl-4"
            >
              <p className="label text-orange-deep">Subscriptions</p>
              <p className="mt-2 text-ink-soft">
                {site.welcome.subscription}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="label rounded-full bg-ink px-7 py-3.5 text-cream transition-transform hover:-translate-y-0.5"
            >
              View menu
            </a>
            <a
              href="/members"
              className="label rounded-full bg-orange px-7 py-3.5 text-cream transition-transform hover:-translate-y-0.5"
            >
              Rewards
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
