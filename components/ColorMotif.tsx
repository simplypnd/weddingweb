import type { SiteConfig } from "@/lib/site-config-schema";
import { themeColorKeys } from "@/lib/theme";

export function ColorMotif({ config }: { config: SiteConfig }) {
  const title = config.details.motifTitle?.trim();

  return (
    <div className="mt-8">
      {title ? (
        <h3 className="text-center font-serif text-xl font-semibold text-dusty-dark">
          {title}
        </h3>
      ) : null}
      <ul
        className={`flex flex-wrap justify-center gap-3 ${title ? "mt-4" : ""}`}
        aria-label={title || "Wedding colors"}
      >
        {themeColorKeys.map((key) => (
          <li key={key}>
            <span
              className="block h-11 w-11 rounded-full border-2 border-beige shadow-sm md:h-12 md:w-12"
              style={{ backgroundColor: config.theme[key] }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
