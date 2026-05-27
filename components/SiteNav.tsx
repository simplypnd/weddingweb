"use client";

import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

export function SiteNav({ config }: { config: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const solidHeader = scrolled || open;

  return (
    <header
      className={`safe-top fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solidHeader ? "bg-cream shadow-sm" : "bg-cream/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:h-16 md:px-6">
        <a
          href="#hero"
          className="font-serif text-xl font-semibold text-dusty-dark md:text-2xl"
          onClick={close}
        >
          {config.couple.displayNames}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {config.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-[44px] min-w-[44px] px-1 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-dusty-dark"
            >
              {item.href === "#story" ? "Sponsors" : item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-md text-dusty-dark md:hidden ${
            solidHeader ? "bg-transparent" : "bg-cream shadow-sm ring-1 ring-beige/80"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="fixed inset-0 top-14 z-40 flex flex-col bg-cream px-4 pb-8 pt-4 md:hidden"
          aria-label="Mobile"
        >
          {config.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-[48px] items-center border-b border-beige text-lg font-medium text-ink"
              onClick={close}
            >
              {item.href === "#story" ? "Sponsors" : item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
