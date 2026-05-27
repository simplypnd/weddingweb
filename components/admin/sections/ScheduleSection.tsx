"use client";

import { useContentConfig } from "@/components/admin/ContentConfigProvider";
import { EditorField, EditorSection, inputClass } from "@/components/admin/editor-ui";

export function ScheduleSection() {
  const { config, setConfig } = useContentConfig();
  if (!config) return null;

  return (
    <EditorSection title="Schedule">
      {config.schedule.map((item, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-beige p-4">
          <p className="text-sm font-medium text-dusty-dark">Event {i + 1}</p>
          <EditorField label="Time">
            <input
              className={inputClass}
              value={item.time}
              onChange={(e) => {
                const schedule = [...config.schedule];
                schedule[i] = { ...item, time: e.target.value };
                setConfig({ ...config, schedule });
              }}
            />
          </EditorField>
          <EditorField label="Title">
            <input
              className={inputClass}
              value={item.title}
              onChange={(e) => {
                const schedule = [...config.schedule];
                schedule[i] = { ...item, title: e.target.value };
                setConfig({ ...config, schedule });
              }}
            />
          </EditorField>
          <EditorField label="Description">
            <input
              className={inputClass}
              value={item.description}
              onChange={(e) => {
                const schedule = [...config.schedule];
                schedule[i] = { ...item, description: e.target.value };
                setConfig({ ...config, schedule });
              }}
            />
          </EditorField>
          <button
            type="button"
            className="text-sm text-red-700"
            onClick={() =>
              setConfig({
                ...config,
                schedule: config.schedule.filter((_, j) => j !== i),
              })
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
            schedule: [
              ...config.schedule,
              { time: "", title: "", description: "" },
            ],
          })
        }
      >
        + Add schedule item
      </button>
    </EditorSection>
  );
}
