"use client";

import { ColorField, themeFieldOrder } from "@/components/admin/ColorField";
import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import {
  EditorField,
  EditorSection,
  inputClass,
  textareaClass,
} from "@/components/admin/editor-ui";
import { defaultSiteConfig } from "@/lib/site-config-defaults";

export function DetailsSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <div className="space-y-6">
      <EditorSection title="Dress code">
        <textarea
          className={textareaClass}
          rows={2}
          value={config.details.dressCode}
          onChange={(e) =>
            setConfig({
              ...config,
              details: { ...config.details, dressCode: e.target.value },
            })
          }
        />
      </EditorSection>

      <EditorSection
        title="Wedding motif"
        description="These colors appear below the dress code on the invitation and across the site."
      >
        <EditorField label="Motif heading (leave blank to hide)">
          <input
            className={inputClass}
            value={config.details.motifTitle}
            onChange={(e) =>
              setConfig({
                ...config,
                details: { ...config.details, motifTitle: e.target.value },
              })
            }
            placeholder="Our Colors"
          />
        </EditorField>
        <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-beige bg-sand p-4">
          {themeFieldOrder.map((key) => (
            <div
              key={key}
              className="h-10 w-10 rounded-full border border-beige shadow-sm"
              style={{ backgroundColor: config.theme[key] }}
              title={key}
            />
          ))}
        </div>
        {themeFieldOrder.map((key) => (
          <ColorField
            key={key}
            themeKey={key}
            value={config.theme[key]}
            onChange={(value) =>
              setConfig({
                ...config,
                theme: { ...config.theme, [key]: value },
              })
            }
          />
        ))}
        <button
          type="button"
          className="text-sm font-medium text-dusty-dark underline"
          onClick={() =>
            setConfig({
              ...config,
              theme: { ...defaultSiteConfig.theme },
            })
          }
        >
          Reset colors to defaults
        </button>
      </EditorSection>
    </div>
  );
}
