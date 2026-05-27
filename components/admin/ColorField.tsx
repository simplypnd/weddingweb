"use client";

import { normalizeHex } from "@/lib/theme";

type ThemeKey =
  | "sand"
  | "beige"
  | "cream"
  | "dusty"
  | "dustyDark"
  | "ink"
  | "inkMuted";

const LABELS: Record<ThemeKey, { title: string; hint: string }> = {
  sand: { title: "Page background", hint: "Main page background" },
  beige: { title: "Borders", hint: "Dividers and borders" },
  cream: { title: "Cards / surfaces", hint: "Cards and section backgrounds" },
  dusty: { title: "Accent", hint: "Buttons and primary accents" },
  dustyDark: { title: "Accent (dark)", hint: "Headings and button hover" },
  ink: { title: "Text", hint: "Main body text" },
  inkMuted: { title: "Text (muted)", hint: "Secondary text" },
};

type Props = {
  themeKey: ThemeKey;
  value: string;
  onChange: (value: string) => void;
};

export function ColorField({ themeKey, value, onChange }: Props) {
  const { title, hint } = LABELS[themeKey];
  const safeValue = normalizeHex(value) ?? "#000000";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-[140px] sm:w-40">
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="text-xs text-ink-muted">{hint}</p>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <input
          type="color"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-14 shrink-0 cursor-pointer rounded-lg border border-beige bg-cream p-1"
          aria-label={`${title} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const next = normalizeHex(e.target.value);
            if (next) onChange(next);
            else onChange(e.target.value);
          }}
          onBlur={(e) => {
            const next = normalizeHex(e.target.value);
            if (next) onChange(next);
          }}
          placeholder="#7a8fa3"
          className="w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 font-mono text-sm text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export const themeFieldOrder: ThemeKey[] = [
  "sand",
  "beige",
  "cream",
  "dusty",
  "dustyDark",
  "ink",
  "inkMuted",
];
