"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site } from "@/content/site";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Members", href: "/members" },
  { label: "Podcast", href: "/podcast" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  // Circle the link for the page we are on (Home on the homepage).
  const pathname = usePathname();
  const activeHref =
    links.find((l) => l.href === pathname)?.href ?? links[0].href;
  // The podcast page runs dark: header matches the page, text goes white.
  const dark = pathname === "/podcast";
  const accent = dark ? "text-orange" : "text-orange-deep";
  const hoverAccent = dark ? "hover:text-orange" : "hover:text-orange-deep";
  const bar = dark ? "bg-cream" : "bg-ink";

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible ${dark ? "bg-ink text-white" : "bg-cream"}`}
    >
      <div className="relative z-10 mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="relative z-10 flex items-center gap-0.5 whitespace-nowrap font-display text-xl min-[360px]:text-2xl sm:text-[1.6rem]"
        >
          {dark ? (
            <span
              data-brand-word
              data-brand-full
              className="whitespace-nowrap font-[family-name:var(--font-intro)] normal-case text-[1.35rem] font-extrabold tracking-[-0.05em] text-white sm:text-[1.6rem]"
            >
              {site.podcast.title}
            </span>
          ) : (
            <>
              <Image
                src="/images/logo.png"
                alt={`${site.name} logo`}
                width={96}
                height={96}
                data-intro-fade
                className="-my-5 -mr-2 h-16 w-16 shrink-0 object-contain sm:-my-6 sm:-mr-3 sm:h-24 sm:w-24"
                priority
              />
              <span data-brand-word>{site.name}</span>
            </>
          )}
        </Link>

        <nav data-intro-fade className="hidden items-center gap-9 md:flex">
          {links.map((l) =>
            l.href === activeHref ? (
              <a
                key={l.href}
                href={l.href}
                className={`label relative px-3 py-1.5 ${accent}`}
              >
                {/* Hand-drawn circle marking the active/first nav item. */}
                <svg
                  viewBox="0 0 100 50"
                  aria-hidden
                  className="pointer-events-none absolute -inset-3"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M6,26 C6,10 26,4 50,5 C76,4 96,10 96,27 C96,44 74,47 50,46 C24,47 6,41 6,26 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M38,1 Q50,-2 60,1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="relative">{l.label}</span>
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={`label transition-colors ${hoverAccent}`}
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div data-intro-fade className="flex items-center gap-3">
          <a
            href={site.ordering.enabled ? site.ordering.href : "/contact"}
            className={`label whitespace-nowrap rounded-full bg-orange px-4 py-3 text-cream min-[360px]:px-5 sm:py-2.5 transition-all hover:-translate-y-0.5 ${dark ? "hover:bg-cream hover:text-ink" : "hover:bg-ink"}`}
          >
            {site.ordering.enabled ? "Order now" : "Find us"}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 ${bar} transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 ${bar} transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 ${bar} transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className={`border-t-2 px-5 py-4 md:hidden ${dark ? "border-white/15 bg-ink text-white" : "border-ink/10 bg-cream"}`}
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`label block py-2.5 transition-colors ${hoverAccent}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
