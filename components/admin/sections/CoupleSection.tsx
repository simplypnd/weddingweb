"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function CoupleSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Couple">
      <EditorField label="Display names">
        <input
          className={inputClass}
          value={config.couple.displayNames}
          onChange={(e) =>
            setConfig({
              ...config,
              couple: { ...config.couple, displayNames: e.target.value },
            })
          }
        />
      </EditorField>
      <div className="grid gap-4 sm:grid-cols-2">
        <EditorField label="Partner 1">
          <input
            className={inputClass}
            value={config.couple.partner1}
            onChange={(e) =>
              setConfig({
                ...config,
                couple: { ...config.couple, partner1: e.target.value },
              })
            }
          />
        </EditorField>
        <EditorField label="Partner 2">
          <input
            className={inputClass}
            value={config.couple.partner2}
            onChange={(e) =>
              setConfig({
                ...config,
                couple: { ...config.couple, partner2: e.target.value },
              })
            }
          />
        </EditorField>
      </div>
    </EditorSection>
  );
}
