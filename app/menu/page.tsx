import type { Metadata } from "next";
import Header from "@/components/Header";
import MenuGrid from "@/components/MenuGrid";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Menu — ${site.name}`,
  description: `The full menu at ${site.name}, a neighbourhood coffee bar in ${site.city}.`,
};

export default function Menu() {
  return (
    <>
      <Header />
      <main>
        <MenuGrid />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
