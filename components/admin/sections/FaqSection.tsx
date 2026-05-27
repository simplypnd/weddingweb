"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import {
  EditorField,
  EditorSection,
  inputClass,
  textareaClass,
} from "@/components/admin/editor-ui";

export function FaqSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="FAQ">
      {config.faq.map((item, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-beige p-4">
          <EditorField label="Question">
            <input
              className={inputClass}
              value={item.question}
              onChange={(e) => {
                const faq = [...config.faq];
                faq[i] = { ...item, question: e.target.value };
                setConfig({ ...config, faq });
              }}
            />
          </EditorField>
          <EditorField label="Answer">
            <textarea
              className={textareaClass}
              rows={2}
              value={item.answer}
              onChange={(e) => {
                const faq = [...config.faq];
                faq[i] = { ...item, answer: e.target.value };
                setConfig({ ...config, faq });
              }}
            />
          </EditorField>
          <button
            type="button"
            className="text-sm text-red-700"
            onClick={() =>
              setConfig({ ...config, faq: config.faq.filter((_, j) => j !== i) })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-dusty-dark underline"
        onClick={() =>
          setConfig({
            ...config,
            faq: [...config.faq, { question: "", answer: "" }],
          })
        }
      >
        + Add FAQ
      </button>
    </EditorSection>
  );
}
