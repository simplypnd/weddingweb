"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "RSVPs" },
  { href: "/admin/content", label: "Edit site" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-2 border-b border-beige" aria-label="Admin sections">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`min-h-[44px] px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-b-2 border-dusty text-dusty-dark"
                : "text-ink-muted hover:text-dusty-dark"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
