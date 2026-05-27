export const inputClass =
  "w-full min-h-[48px] rounded-xl border border-beige bg-cream px-4 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30";

export const textareaClass =
  "w-full rounded-xl border border-beige bg-cream px-4 py-3 text-base text-ink focus:border-dusty focus:outline-none focus:ring-2 focus:ring-dusty/30";

export function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-cream p-5 shadow-sm md:p-6">
      <h2 className="font-serif text-xl font-semibold text-dusty-dark md:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-ink-muted">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function EditorField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}
