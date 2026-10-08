import type { Metadata } from "next";
import Header from "@/components/Header";
import PodcastStage from "@/components/PodcastStage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Podcast — ${site.name}`,
  description: `${site.podcast.title}: interviews with thought-changers and community leaders from South Shore, recorded live at ${site.name} in ${site.city}.`,
};

export default function PodcastPage() {
  return (
    <>
      <Header />
      <main>
        <PodcastStage />
      </main>
    </>
  );
}
