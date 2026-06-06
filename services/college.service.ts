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

export async function getFeaturedColleges(limit = 6) {
  return prisma.college.findMany({
    orderBy: { rating: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
    },
  });
}

export async function getCollegeStats() {
  const [collegeCount, reviewCount, avgRating, colleges] = await Promise.all([
    prisma.college.count(),
    prisma.review.count(),
    prisma.college.aggregate({ _avg: { rating: true } }),
    prisma.college.findMany({ select: { location: true } }),
  ]);

  const citiesCount = new Set(
    colleges.map((c) => c.location.split(",")[0]?.trim()).filter(Boolean),
  ).size;

  return {
    collegeCount,
    reviewCount,
    citiesCount,
    avgRating: avgRating._avg.rating ?? 0,
  };
}

export async function getCollegeSelectOptions() {
  return prisma.college.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
    },
    orderBy: { name: "asc" },
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
