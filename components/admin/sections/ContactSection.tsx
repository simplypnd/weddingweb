"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function ContactSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Contact">
      <EditorField label="Contact email">
        <input
          type="email"
          className={inputClass}
          value={config.contact.email}
          onChange={(e) =>
            setConfig({ ...config, contact: { email: e.target.value } })
          }
        />
      </EditorField>
    </EditorSection>
  );
}
