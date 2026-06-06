import { getPlacementInfo } from "@/lib/college-content";
import { prisma } from "@/lib/db/prisma";
import type { CollegeComparisonItem } from "@/types";

export async function getCollegesForComparison(ids: string[]) {
  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
      description: true,
    },
  });

  const collegeMap = new Map(colleges.map((college) => [college.id, college]));

  return ids
    .map((id) => collegeMap.get(id))
    .filter((college): college is NonNullable<typeof college> => !!college)
    .map(toComparisonItem);
}

function toComparisonItem(
  college: {
    id: string;
    name: string;
    location: string;
    fees: number;
    rating: number;
    description: string;
  },
): CollegeComparisonItem {
  const placement = getPlacementInfo(college);

  return {
    id: college.id,
    name: college.name,
    location: college.location,
    fees: college.fees,
    rating: college.rating,
    placements: {
      placementRate: placement.placementRate,
      avgPackage: placement.avgPackage,
      highestPackage: placement.highestPackage,
      summary: `${placement.placementRate}% placement · ₹${(placement.avgPackage / 100000).toFixed(1)}L avg package`,
    },
  };
}
