"use client";

import { useEffect, useState } from "react";
import { site, hoursSchedule } from "@/content/site";

const TZ = "America/Chicago";

function chicagoNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day, minutes: hour * 60 + Number(get("minute")) };
}

/** Hours list that picks out today's row, using Chicago time. */
export default function ContactHours() {
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDay(chicagoNow().day);
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const todayIdx =
    day === null ? -1 : hoursSchedule.findIndex((s) => (s.days as readonly number[]).includes(day));

  return (
    <div>
      <p className="text-sm text-ink/60">Hours</p>
      <dl className="mt-2 space-y-1 text-xl">
        {site.hours.map((h, i) => (
          <div key={h.days} className={`transition-colors ${i === todayIdx ? "text-ink" : "text-ink/55"}`}>
            <dt className="inline">{h.days}</dt>
            <dd className="tabular-nums">{h.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
