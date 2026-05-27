import type { SiteConfig } from "@/lib/site-config-schema";

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="safe-bottom border-t border-beige bg-sand px-4 py-10 text-center">
      <p className="font-serif text-xl text-dusty-dark">
        {config.couple.displayNames}
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        Questions?{" "}
        <a
          href={`mailto:${config.contact.email}`}
          className="font-medium text-dusty-dark underline-offset-2 hover:underline"
        >
          {config.contact.email}
        </a>
      </p>
      <p className="mt-6 text-xs text-ink-muted">
        © {new Date().getFullYear()} {config.couple.displayNames}
      </p>
    </footer>
  );
}
