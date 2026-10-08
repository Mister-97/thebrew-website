import { site } from "@/content/site";

// Dark newsletter footer, mirroring the reference's brown signup band.
export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="font-display text-4xl sm:text-5xl">{site.name}</p>
            <p className="label mt-3 text-cream/60">{site.tagline}</p>

            <div className="mt-6 space-y-1 text-sm text-cream/70">
              <a href={site.phoneHref} className="block py-2.5 hover:text-orange">
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block py-2.5 hover:text-orange"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <p className="label text-cream/60">Newsletter</p>
            <p className="mt-2 text-sm text-cream/70">
              First to know about new roasts and specials.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email"
                className="min-w-0 flex-1 rounded-full border-2 border-cream/25 bg-transparent px-4 py-2.5 text-base placeholder:text-cream/40 focus:border-orange focus:outline-none"
              />
              <button
                type="submit"
                className="label shrink-0 rounded-full bg-orange px-5 py-3 text-cream"
              >
                Submit
              </button>
            </form>

            <div className="label mt-4 flex gap-3 text-cream/60">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-2 py-3 hover:text-orange"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="label mt-12 border-t-2 border-cream/15 pt-6 text-cream/50">
          &copy; {new Date().getFullYear()} {site.name} &middot;{" "}
          {site.address.line2}
        </p>
      </div>
    </footer>
  );
}
