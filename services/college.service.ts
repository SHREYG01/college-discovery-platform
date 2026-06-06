import { prisma } from "@/lib/db/prisma";
import { COLLEGE_PAGE_SIZE } from "@/lib/constants";
import type { CollegeFilters } from "@/types";

export async function getColleges(filters: CollegeFilters = {}, page = 1) {
  const { query, location, minFees, maxFees, minRating } = filters;

  return prisma.college.findMany({
    where: {
      ...(query && {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }),
      ...(location && {
        location: { contains: location, mode: "insensitive" },
      }),
      ...(minFees !== undefined && { fees: { gte: minFees } }),
      ...(maxFees !== undefined && { fees: { lte: maxFees } }),
      ...(minRating !== undefined && { rating: { gte: minRating } }),
    },
    orderBy: { rating: "desc" },
    skip: (page - 1) * COLLEGE_PAGE_SIZE,
    take: COLLEGE_PAGE_SIZE,
  });
}

export async function getCollegeById(id: string) {
  return prisma.college.findUnique({
    where: { id },
    include: {
      reviews: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
