import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { CollegeListItem } from "@/types";

type CollegeCardProps = {
  college: CollegeListItem;
};

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link href={`/colleges/${college.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <h3 className="text-lg font-semibold text-zinc-900">{college.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{college.location}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-medium text-zinc-700">
            ₹{college.fees.toLocaleString("en-IN")}/yr
          </span>
          <span className="text-amber-600">★ {college.rating.toFixed(1)}</span>
        </div>
      </Card>
    </Link>
  );
}
