"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function MusicSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Background music">
      <label className="flex min-h-[48px] cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={config.music.enabled}
          onChange={(e) =>
            setConfig({
              ...config,
              music: { ...config.music, enabled: e.target.checked },
            })
          }
          className="h-5 w-5 accent-dusty"
        />
        <span>Enable music button on invitation</span>
      </label>
      <EditorField label="Audio URL (upload MP3 or paste path)">
        <input
          className={inputClass}
          value={config.music.src}
          onChange={(e) =>
            setConfig({ ...config, music: { ...config.music, src: e.target.value } })
          }
          placeholder="/audio/wedding.mp3"
        />
      </EditorField>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Upload MP3
        </label>
        <input
          type="file"
          accept="audio/mpeg,audio/mp3"
          className="block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-dusty file:px-4 file:py-2 file:text-sm file:font-medium file:text-cream"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "audio");
            const res = await fetch("/api/admin/upload", {
              method: "POST",
              body: formData,
            });
            const body = await res.json();
            if (res.ok) {
              setConfig({ ...config, music: { ...config.music, src: body.url } });
            }
            e.target.value = "";
          }}
        />
      </div>
    </EditorSection>
  );
}
