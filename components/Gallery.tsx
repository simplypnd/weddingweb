import Image from "next/image";
import type { SiteConfig } from "@/lib/site-config-schema";

function isSupabaseStorageUrl(src: string) {
  return src.includes("supabase.co/storage");
}

export function Gallery({ config }: { config: SiteConfig }) {
  const photos = config.gallery.filter((img) => img.src.trim());

  return (
    <section id="gallery" className="section-fade bg-cream px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          Gallery
        </h2>
        {photos.length === 0 ? (
          <p className="mt-8 text-center text-ink-muted">Photos coming soon.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {photos.map((img) => (
              <div
                key={img.src}
                className="relative aspect-square overflow-hidden rounded-xl bg-beige"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={isSupabaseStorageUrl(img.src)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
