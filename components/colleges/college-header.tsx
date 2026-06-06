import Link from "next/link";

import { BookmarkButton } from "@/components/bookmarks/bookmark-button";
import { parseLocation } from "@/lib/utils/location";
import type { CollegeDetailFields } from "@/types";

type CollegeHeaderProps = {
  college: CollegeDetailFields;
  isBookmarked?: boolean;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function CollegeHeader({
  college,
  isBookmarked = false,
}: CollegeHeaderProps) {
  const { city, state } = parseLocation(college.location);

  return (
    <div className="border-b border-border bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to colleges
        </Link>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-bold text-white shadow-md shadow-primary/20">
            {getInitials(college.name)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {college.name}
              </h1>
              <BookmarkButton
                collegeId={college.id}
                isBookmarked={isBookmarked}
                className="shrink-0"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm text-foreground shadow-sm">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {city}
              </span>
              {state && (
                <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
                  {state}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {college.description}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Annual fees
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              ₹{college.fees.toLocaleString("en-IN")}
              <span className="text-sm font-normal text-muted">/year</span>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Rating
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-2xl font-bold text-amber-600">
              <svg className="h-6 w-6 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {college.rating.toFixed(1)}
              <span className="text-sm font-normal text-muted">/ 5.0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
