import { Suspense } from "react";

import { CollegeFilters } from "@/components/colleges/college-filters";
import { CollegeList } from "@/components/colleges/college-list";
import { SectionHeader } from "@/components/ui/section-header";
import { getColleges } from "@/services/college.service";

type CollegesPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function CollegesPage({ searchParams }: CollegesPageProps) {
  const { query } = await searchParams;
  const colleges = await getColleges({ query });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Directory"
        title="Explore colleges"
        description="Search and compare institutions across India. Filter by name, location, fees, and ratings."
      />

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          }
        >
          <CollegeFilters defaultQuery={query ?? ""} />
        </Suspense>
      </div>

      {query && (
        <p className="mt-6 text-sm text-muted">
          Showing results for{" "}
          <span className="font-semibold text-foreground">
            &ldquo;{query}&rdquo;
          </span>
          {" · "}
          {colleges.length} {colleges.length === 1 ? "college" : "colleges"}{" "}
          found
        </p>
      )}

      <div className="mt-8">
        <CollegeList colleges={colleges} />
      </div>
    </div>
  );
}
