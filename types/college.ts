import type { College as PrismaCollege } from "@prisma/client";

export type College = PrismaCollege;

export type CollegeListItem = Pick<
  College,
  "id" | "name" | "location" | "fees" | "rating"
>;

export type CollegeFilters = {
  query?: string;
  location?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
};
