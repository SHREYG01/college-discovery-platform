import type { CollegeListItem } from "@/types";

import { CollegeCard } from "./college-card";

type CollegeListProps = {
  colleges: CollegeListItem[];
};

export function CollegeList({ colleges }: CollegeListProps) {
  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <p className="mt-4 text-lg font-semibold text-foreground">
          No colleges found
        </p>
        <p className="mt-1 text-sm text-muted">
          Try adjusting your search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}
