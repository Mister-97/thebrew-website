import type { Metadata } from "next";
import { Inter, Anton, Caveat, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/content/site";
import Intro from "@/components/Intro";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-intro",
  subsets: ["latin"],
  weight: "800",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — Coffee, all day in ${site.city}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — Coffee, all day in ${site.city}`,
    description: site.description,
    type: "website",
  },
};

// Local SEO: a cafe lives or dies on the map pack, so ship real structured data.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.city,
    addressRegion: site.state,
  },
  servesCuisine: "Coffee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${caveat.variable} ${bricolage.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Set before paint so reveal elements never flash visible then hide. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');try{d.classList.add(location.pathname.replace(/[/]$/,'')==='/podcast'&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'intro-running':'intro-skip')}catch(e){d.classList.add('intro-skip')}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body className="grain min-h-full">
        <Intro />
        {children}
      </body>
    </html>
  );
}
