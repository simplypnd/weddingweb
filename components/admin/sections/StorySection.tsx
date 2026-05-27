"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  EditorField,
  EditorSection,
  inputClass,
  textareaClass,
} from "@/components/admin/editor-ui";

export function StorySection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Sponsors">
      <EditorField label="Section heading">
        <input
          className={inputClass}
          value={config.story.title}
          onChange={(e) =>
            setConfig({ ...config, story: { ...config.story, title: e.target.value } })
          }
        />
      </EditorField>
      {config.story.paragraphs.map((p, i) => (
        <EditorField key={i} label={`Paragraph ${i + 1}`}>
          <textarea
            className={textareaClass}
            rows={3}
            value={p}
            onChange={(e) => {
              const paragraphs = [...config.story.paragraphs];
              paragraphs[i] = e.target.value;
              setConfig({ ...config, story: { ...config.story, paragraphs } });
            }}
          />
        </EditorField>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-dusty-dark underline"
        onClick={() =>
          setConfig({
            ...config,
            story: { ...config.story, paragraphs: [...config.story.paragraphs, ""] },
          })
        }
      >
        + Add paragraph
      </button>
      <ImageUploadField
        label="Sponsors image"
        folder="story"
        currentUrl={config.story.image}
        onUrlChange={(url) =>
          setConfig({ ...config, story: { ...config.story, image: url } })
        }
      />
      <EditorField label="Image alt text">
        <input
          className={inputClass}
          value={config.story.imageAlt}
          onChange={(e) =>
            setConfig({
              ...config,
              story: { ...config.story, imageAlt: e.target.value },
            })
          }
        />
      </EditorField>
    </EditorSection>
  );
}
