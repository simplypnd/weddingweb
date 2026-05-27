"use client";

import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown({ config }: { config: SiteConfig }) {
  const dateIso = config.wedding.dateIso;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(dateIso);
    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateIso]);

  return (
    <section id="countdown" className="section-fade px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          Counting Down
        </h2>
        {timeLeft ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {units.map(({ key, label }) => (
              <div
                key={key}
                className="rounded-2xl bg-cream px-3 py-5 shadow-sm md:py-6"
              >
                <span className="block font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
                  {timeLeft[key]}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-ink-muted md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-lg text-ink-muted">The big day is here!</p>
        )}
      </div>
    </section>
  );
}
