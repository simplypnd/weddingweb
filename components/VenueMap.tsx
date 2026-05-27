"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

export function VenueMap({ config }: { config: SiteConfig }) {
  const venues = config.venues;
  const [selected, setSelected] = useState(0);
  const active = venues[selected] ?? venues[0];

  if (!active) return null;

  return (
    <section id="venue" className="section-fade px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          Venues & Directions
        </h2>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Select venue"
        >
          {venues.map((venue, i) => {
            const isActive = i === selected;
            return (
              <button
                key={`${venue.label}-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`venue-panel-${i}`}
                id={`venue-tab-${i}`}
                onClick={() => setSelected(i)}
                className={`min-h-[48px] rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty md:text-base ${
                  isActive
                    ? "bg-dusty text-cream shadow-sm"
                    : "border-2 border-dusty bg-cream text-dusty-dark hover:bg-dusty/10"
                }`}
              >
                {venue.label}
              </button>
            );
          })}
        </div>

        <article
          id={`venue-panel-${selected}`}
          role="tabpanel"
          aria-labelledby={`venue-tab-${selected}`}
          className="mt-8 text-center"
        >
          <p className="text-lg font-medium text-ink">{active.name}</p>
          <p className="mt-1 text-ink-muted">{active.address}</p>

          {active.mapEmbedUrl.trim() ? (
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-beige shadow-sm">
              <iframe
                title={`Map to ${active.name}`}
                src={active.mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="mt-6 text-sm text-ink-muted">
              Map embed not set for this venue.
            </p>
          )}

          {active.mapsLink.trim() && (
            <a
              href={active.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-dusty px-6 py-3 text-base font-medium text-dusty-dark transition-colors hover:bg-dusty hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty sm:w-auto"
            >
              Open {active.label} in Maps
            </a>
          )}
        </article>
      </div>
    </section>
  );
}
