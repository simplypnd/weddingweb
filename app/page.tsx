import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { MusicToggle } from "@/components/MusicToggle";
import { RSVPForm } from "@/components/RSVPForm";
import { SiteNav } from "@/components/SiteNav";
import { Story } from "@/components/Story";
import { VenueMap } from "@/components/VenueMap";
import { getSiteConfig } from "@/lib/get-site-config";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <>
      <SiteNav config={config} />
      <main>
        <Hero config={config} />
        <Countdown config={config} />
        <Story config={config} />
        <EventDetails config={config} />
        <VenueMap config={config} />
        <Gallery config={config} />
        <FAQ config={config} />
        <section id="rsvp" className="section-fade bg-cream px-4 py-12 md:py-20">
          <div className="mx-auto max-w-lg">
            <h2 className="text-center font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
              RSVP
            </h2>
            <p className="mt-3 text-center text-ink-muted">{config.rsvp.deadline}</p>
            <div className="mt-8">
              <RSVPForm config={config} />
            </div>
          </div>
        </section>
      </main>
      <Footer config={config} />
      <MusicToggle config={config} />
    </>
  );
}
