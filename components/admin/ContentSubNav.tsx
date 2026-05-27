"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/content/couple", label: "Couple" },
  { href: "/admin/content/wedding", label: "Wedding" },
  { href: "/admin/content/rsvp", label: "RSVP" },
  { href: "/admin/content/story", label: "Story" },
  { href: "/admin/content/schedule", label: "Schedule" },
  { href: "/admin/content/details", label: "Details & colors" },
  { href: "/admin/content/venues", label: "Venues" },
  { href: "/admin/content/gallery", label: "Gallery" },
  { href: "/admin/content/faq", label: "FAQ" },
  { href: "/admin/content/contact", label: "Contact" },
  { href: "/admin/content/music", label: "Music" },
];

export function ContentSubNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Edit sections" className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-dusty text-cream"
                  : "border border-beige bg-cream text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <ul className="hidden flex-col gap-1 md:flex">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-dusty text-cream"
                    : "text-ink-muted hover:bg-beige/60 hover:text-dusty-dark"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
