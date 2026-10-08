import { site } from "@/content/site";

// Dark scrolling ticker directly under the hero, matching the reference's
// "EAT BANH MI ⚬ DRINK COFFEE ⚬ BE HAPPY" bar.
export default function Marquee() {
  const track = (
    <ul className="flex shrink-0 items-center gap-3 pr-3">
      {[...site.ticker, ...site.ticker].map((w, i) => (
        <li key={`${w}-${i}`} className="flex items-center gap-3">
          <span className="label whitespace-nowrap text-cream">{w}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex overflow-hidden bg-brown py-3.5">
      <div className="animate-marquee flex motion-reduce:animate-none">
        {track}
        {track}
      </div>
    </div>
  );
}
