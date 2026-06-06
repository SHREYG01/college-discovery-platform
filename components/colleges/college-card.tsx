import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { CollegeListItem } from "@/types";

type CollegeCardProps = {
  college: CollegeListItem;
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

export function CollegeCard({ college }: CollegeCardProps) {
  const city = college.location.split(",")[0]?.trim() ?? college.location;

  return (
    <Link href={`/colleges/${college.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-indigo-500/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-sm">
            {getInitials(college.name)}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
            <svg className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {college.rating.toFixed(1)}
          </div>
        </div>

        <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
          {college.name}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <svg
            className="h-4 w-4 shrink-0"
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
          <span className="line-clamp-1">{city}</span>
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 mt-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Annual fees
            </p>
            <p className="mt-0.5 text-base font-bold text-foreground">
              ₹{college.fees.toLocaleString("en-IN")}
            </p>
          </div>
          <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View &rarr;
          </span>
        </div>
      </Card>
    </Link>
  );
}
