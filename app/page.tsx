import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CityFeature from "@/components/CityFeature";
import Signature from "@/components/Signature";
import MenuPreview from "@/components/MenuPreview";
import Welcome from "@/components/Welcome";
import HomeMembers from "@/components/HomeMembers";
import PatternBanner from "@/components/PatternBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CityFeature />
        <MenuPreview />
        <PatternBanner />
        <Signature />
        <Welcome />
        <PatternBanner />
        <HomeMembers />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
