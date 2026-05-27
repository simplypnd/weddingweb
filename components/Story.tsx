import Image from "next/image";
import type { SiteConfig } from "@/lib/site-config-schema";

export function Story({ config }: { config: SiteConfig }) {
  const { story } = config;

  return (
    <section id="story" className="section-fade px-4 py-12 md:py-20">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-beige md:max-w-none">
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={story.image.includes("supabase.co/storage")}
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
            Sponsors
          </h2>
          <div className="mt-6 space-y-4 text-base text-ink-muted md:text-lg">
            {story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
