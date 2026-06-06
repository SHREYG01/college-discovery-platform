import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

const footerLinks = {
  Platform: [
    { label: "Browse Colleges", href: "/colleges" },
    { label: "Compare Colleges", href: "/compare" },
    { label: "Bookmarks", href: "/bookmarks" },
  ],
  Resources: [
    { label: "How it works", href: "/colleges" },
    { label: "Top rated", href: "/colleges" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                CD
              </span>
              <span className="text-base font-semibold text-foreground">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Your trusted platform to discover, compare, and evaluate top
              universities across India — fees, ratings, and reviews in one place.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Built for students exploring higher education in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
