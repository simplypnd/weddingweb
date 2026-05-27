import type { SiteConfig } from "@/lib/site-config-schema";

export function Hero({ config }: { config: SiteConfig }) {
  return (
    <section
      id="hero"
      className="section-fade flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-16 pt-24 text-center md:pt-28"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-dusty md:text-base">
        We&apos;re getting married
      </p>
      <h1 className="font-serif text-4xl font-semibold leading-tight text-dusty-dark sm:text-5xl md:text-7xl">
        {config.couple.displayNames}
      </h1>
      <p className="mt-4 font-serif text-2xl text-ink md:text-3xl">
        {config.wedding.dateDisplay}
      </p>
      <p className="mt-2 text-lg text-ink-muted">{config.wedding.timeDisplay}</p>
      <p className="mx-auto mt-8 max-w-md text-base text-ink-muted md:max-w-lg md:text-lg">
        {config.wedding.tagline}
      </p>
      <a
        href="#rsvp"
        className="mt-10 inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-full bg-dusty px-8 py-3 text-base font-medium text-cream transition-colors hover:bg-dusty-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty"
      >
        RSVP
      </a>
    </section>
  );
}
