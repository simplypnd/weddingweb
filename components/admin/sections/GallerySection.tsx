"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function GallerySection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Gallery">
      {config.gallery.map((img, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-beige p-4">
          <p className="text-sm font-medium text-dusty-dark">Photo {i + 1}</p>
          <ImageUploadField
            label="Image"
            folder="gallery"
            currentUrl={img.src}
            onUrlChange={(url) => {
              const gallery = [...config.gallery];
              gallery[i] = {
                ...img,
                src: url,
                alt: img.alt.trim() || `Photo ${i + 1}`,
              };
              setConfig({ ...config, gallery });
            }}
          />
          <EditorField label="Alt text">
            <input
              className={inputClass}
              value={img.alt}
              onChange={(e) => {
                const gallery = [...config.gallery];
                gallery[i] = { ...img, alt: e.target.value };
                setConfig({ ...config, gallery });
              }}
            />
          </EditorField>
          <button
            type="button"
            className="text-sm text-red-700"
            onClick={() =>
              setConfig({
                ...config,
                gallery: config.gallery.filter((_, j) => j !== i),
              })
            }
          >
            Remove photo
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-dusty-dark underline"
        onClick={() =>
          setConfig({
            ...config,
            gallery: [
              ...config.gallery,
              { src: "", alt: `Photo ${config.gallery.length + 1}` },
            ],
          })
        }
      >
        + Add photo
      </button>
    </EditorSection>
  );
}
