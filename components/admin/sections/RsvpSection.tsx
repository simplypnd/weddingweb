"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function RsvpSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="RSVP">
      <EditorField label="RSVP deadline message">
        <input
          className={inputClass}
          value={config.rsvp.deadline}
          onChange={(e) =>
            setConfig({ ...config, rsvp: { ...config.rsvp, deadline: e.target.value } })
          }
        />
      </EditorField>
      <EditorField label="Max guests per RSVP">
        <input
          type="number"
          min={1}
          max={20}
          className={inputClass}
          value={config.rsvp.maxGuests}
          onChange={(e) =>
            setConfig({
              ...config,
              rsvp: { ...config.rsvp, maxGuests: Number(e.target.value) || 1 },
            })
          }
        />
      </EditorField>
    </EditorSection>
  );
}
