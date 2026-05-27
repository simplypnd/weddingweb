import { ColorMotif } from "@/components/ColorMotif";
import type { SiteConfig } from "@/lib/site-config-schema";

export function EventDetails({ config }: { config: SiteConfig }) {
  return (
    <section id="details" className="section-fade bg-cream px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          Event Details
        </h2>
        <p className="mt-3 text-center text-ink-muted">
          {config.wedding.dateDisplay} · {config.wedding.timeDisplay}
        </p>

        <ol className="mt-10 space-y-6">
          {config.schedule.map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-l-2 border-dusty pl-5 sm:flex-row sm:gap-6"
            >
              <span className="shrink-0 font-medium text-dusty-dark sm:w-24">
                {item.time}
              </span>
              <div>
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="text-ink-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl bg-sand p-6 text-center">
          <h3 className="font-serif text-xl font-semibold text-dusty-dark">
            Dress Code
          </h3>
          <p className="mt-2 text-ink-muted">{config.details.dressCode}</p>
          <ColorMotif config={config} />
        </div>
      </div>
    </section>
  );
}
