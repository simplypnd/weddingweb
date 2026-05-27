"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import {
  EditorField,
  EditorSection,
  inputClass,
  textareaClass,
} from "@/components/admin/editor-ui";
import {
  applyPickers,
  isoToPickers,
  parseDisplayToIso,
  syncWeddingFromDisplay,
} from "@/lib/wedding-date";

export function WeddingSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Wedding date & hero">
      <div className="grid gap-4 sm:grid-cols-2">
        <EditorField label="Pick date">
          <input
            type="date"
            className={inputClass}
            value={isoToPickers(config.wedding.dateIso).date}
            onChange={(e) => {
              const pickers = isoToPickers(config.wedding.dateIso);
              const applied = applyPickers(e.target.value, pickers.time || "16:00");
              if (!applied) return;
              setConfig({
                ...config,
                wedding: { ...config.wedding, ...applied },
              });
            }}
          />
        </EditorField>
        <EditorField label="Pick time">
          <input
            type="time"
            className={inputClass}
            value={isoToPickers(config.wedding.dateIso).time}
            onChange={(e) => {
              const pickers = isoToPickers(config.wedding.dateIso);
              const applied = applyPickers(pickers.date, e.target.value);
              if (!applied) return;
              setConfig({
                ...config,
                wedding: { ...config.wedding, ...applied },
              });
            }}
          />
        </EditorField>
      </div>
      <p className="text-xs text-ink-muted">
        The countdown is set automatically from the date and time below.
      </p>
      <EditorField label="Date display">
        <input
          className={inputClass}
          value={config.wedding.dateDisplay}
          onChange={(e) => {
            const dateDisplay = e.target.value;
            setConfig({
              ...config,
              wedding: {
                ...config.wedding,
                dateDisplay,
                dateIso: syncWeddingFromDisplay(
                  dateDisplay,
                  config.wedding.timeDisplay,
                  config.wedding.dateIso,
                ),
              },
            });
          }}
        />
      </EditorField>
      <EditorField label="Time display">
        <input
          className={inputClass}
          value={config.wedding.timeDisplay}
          onChange={(e) => {
            const timeDisplay = e.target.value;
            setConfig({
              ...config,
              wedding: {
                ...config.wedding,
                timeDisplay,
                dateIso: syncWeddingFromDisplay(
                  config.wedding.dateDisplay,
                  timeDisplay,
                  config.wedding.dateIso,
                ),
              },
            });
          }}
        />
      </EditorField>
      {parseDisplayToIso(
        config.wedding.dateDisplay,
        config.wedding.timeDisplay,
      ) ? (
        <p className="text-xs text-dusty-dark">
          Countdown target:{" "}
          {parseDisplayToIso(
            config.wedding.dateDisplay,
            config.wedding.timeDisplay,
          )}
        </p>
      ) : (
        <p className="text-xs text-red-700" role="alert">
          Could not parse date and time for countdown. Use the pickers above or
          a format like &quot;Saturday, June 27, 2026&quot; and &quot;9:00 AM&quot;.
        </p>
      )}
      <EditorField label="Tagline">
        <textarea
          className={textareaClass}
          rows={2}
          value={config.wedding.tagline}
          onChange={(e) =>
            setConfig({
              ...config,
              wedding: { ...config.wedding, tagline: e.target.value },
            })
          }
        />
      </EditorField>
    </EditorSection>
  );
}
