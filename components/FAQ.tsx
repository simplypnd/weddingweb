"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

export function FAQ({ config }: { config: SiteConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-fade px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-3xl font-semibold text-dusty-dark md:text-4xl">
          FAQ
        </h2>
        <div className="mt-8 divide-y divide-beige rounded-2xl bg-cream shadow-sm">
          {config.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  className="flex min-h-[48px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <span
                    className="shrink-0 text-dusty transition-transform"
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-ink-muted">{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
