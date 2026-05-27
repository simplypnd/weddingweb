"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import {
  EditorField,
  EditorSection,
  inputClass,
  textareaClass,
} from "@/components/admin/editor-ui";
import { createEmptyVenue } from "@/lib/migrate-site-config";

export function VenuesSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection
      title="Venues"
      description="Ceremony, reception, and other locations."
    >
      {config.venues.map((venue, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-beige p-4">
          <p className="text-sm font-medium text-dusty-dark">Venue {i + 1}</p>
          <EditorField label="Label (e.g. Ceremony, Reception)">
            <input
              className={inputClass}
              value={venue.label}
              onChange={(e) => {
                const venues = [...config.venues];
                venues[i] = { ...venue, label: e.target.value };
                setConfig({ ...config, venues });
              }}
              placeholder="Ceremony"
            />
          </EditorField>
          <EditorField label="Venue name">
            <input
              className={inputClass}
              value={venue.name}
              onChange={(e) => {
                const venues = [...config.venues];
                venues[i] = { ...venue, name: e.target.value };
                setConfig({ ...config, venues });
              }}
            />
          </EditorField>
          <EditorField label="Address">
            <input
              className={inputClass}
              value={venue.address}
              onChange={(e) => {
                const venues = [...config.venues];
                venues[i] = { ...venue, address: e.target.value };
                setConfig({ ...config, venues });
              }}
            />
          </EditorField>
          <EditorField label="Google Maps embed URL">
            <textarea
              className={textareaClass}
              rows={2}
              value={venue.mapEmbedUrl}
              onChange={(e) => {
                const venues = [...config.venues];
                venues[i] = { ...venue, mapEmbedUrl: e.target.value };
                setConfig({ ...config, venues });
              }}
            />
          </EditorField>
          <EditorField label="Open in Maps link">
            <input
              className={inputClass}
              value={venue.mapsLink}
              onChange={(e) => {
                const venues = [...config.venues];
                venues[i] = { ...venue, mapsLink: e.target.value };
                setConfig({ ...config, venues });
              }}
            />
          </EditorField>
          {config.venues.length > 1 && (
            <button
              type="button"
              className="text-sm text-red-700"
              onClick={() =>
                setConfig({
                  ...config,
                  venues: config.venues.filter((_, j) => j !== i),
                })
              }
            >
              Remove venue
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-dusty-dark underline"
        onClick={() =>
          setConfig({
            ...config,
            venues: [...config.venues, createEmptyVenue("Reception")],
          })
        }
      >
        + Add venue
      </button>
    </EditorSection>
  );
}
