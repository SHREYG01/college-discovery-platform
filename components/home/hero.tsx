import Link from "next/link";

import { CollegeList } from "@/components/colleges/college-list";
import { ButtonLink } from "@/components/ui/button";
import type { CollegeListItem } from "@/types";

import { HeroSearch } from "./hero-search";
import { HeroStats } from "./hero-stats";

type HeroProps = {
  featuredColleges: CollegeListItem[];
};

export function Hero({ featuredColleges }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-background" />
      <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Headline & actions */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            University discovery platform
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Find the right college{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              for your future
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Search, compare, and explore top institutions across India — with
            fees, ratings, and real student reviews in one place.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <HeroSearch />
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/colleges" size="lg">
              Explore all colleges
            </ButtonLink>
            <ButtonLink href="/bookmarks" variant="outline" size="lg">
              View bookmarks
            </ButtonLink>
          </div>
        </div>

        {/* Statistics */}
        <div className="mx-auto mt-14 max-w-4xl">
          <HeroStats />
        </div>

        {/* Featured colleges preview */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Top picks
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Featured colleges
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Highly rated institutions trusted by students nationwide.
              </p>
            </div>
            <Link
              href="/colleges"
              className="shrink-0 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              View all colleges &rarr;
            </Link>
          </div>

          <div className="mt-8">
            <CollegeList colleges={featuredColleges} />
          </div>
        </div>
      </div>
    </section>
  );
}
