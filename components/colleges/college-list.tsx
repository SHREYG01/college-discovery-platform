import type { CollegeListItem } from "@/types";

import { CollegeCard } from "./college-card";

type CollegeListProps = {
  colleges: CollegeListItem[];
};

export function CollegeList({ colleges }: CollegeListProps) {
  if (colleges.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">No colleges found.</p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}
