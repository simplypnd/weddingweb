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
import { normalizeHex } from "@/lib/theme";

export function DetailsSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  const motifColors = config.details.motifColors ?? defaultSiteConfig.details.motifColors;

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
        description="These colors appear below the dress code on the invitation."
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
          {motifColors.map((color, i) => (
            <div
              key={`${color}-${i}`}
              className="h-10 w-10 rounded-full border border-beige shadow-sm"
              style={{ backgroundColor: color }}
              title={`Motif ${i + 1}`}
            />
          ))}
        </div>
        <div className="space-y-4">
          {motifColors.map((value, i) => {
            const safeValue = normalizeHex(value) ?? "#000000";
            return (
              <div
                key={`motif-field-${i}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="min-w-[140px] sm:w-40">
                  <p className="text-sm font-medium text-ink">{`Motif color ${i + 1}`}</p>
                  <p className="text-xs text-ink-muted">Shown in the swatch row</p>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <input
                    type="color"
                    value={safeValue}
                    onChange={(e) => {
                      const next = [...motifColors];
                      next[i] = e.target.value;
                      setConfig({
                        ...config,
                        details: { ...config.details, motifColors: next },
                      });
                    }}
                    className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-beige bg-cream p-1"
                    aria-label={`Motif color ${i + 1} picker`}
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const next = [...motifColors];
                      const normalized = normalizeHex(e.target.value);
                      next[i] = normalized ? normalized : e.target.value;
                      setConfig({
                        ...config,
                        details: { ...config.details, motifColors: next },
                      });
                    }}
                    onBlur={(e) => {
                      const normalized = normalizeHex(e.target.value);
                      if (!normalized) return;
                      const next = [...motifColors];
                      next[i] = normalized;
                      setConfig({
                        ...config,
                        details: { ...config.details, motifColors: next },
                      });
                    }}
                    placeholder="#7a8fa3"
                    className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 font-mono text-sm text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
                    spellCheck={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="text-sm font-medium text-dusty-dark underline"
          onClick={() =>
            setConfig({
              ...config,
              details: {
                ...config.details,
                motifColors: [...defaultSiteConfig.details.motifColors],
              },
            })
          }
        >
          Reset motif colors to defaults
        </button>
      </EditorSection>

      <EditorSection
        title="Theme colors"
        description="These colors style the website (background, text, buttons)."
      >
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
          Reset theme colors to defaults
        </button>
      </EditorSection>
    </div>
  );
}
