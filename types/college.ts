import type { College as PrismaCollege } from "@prisma/client";

import type { ReviewWithUser } from "./review";

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

export type CollegeDetail = College & {
  reviews: ReviewWithUser[];
};

export type CollegeDetailFields = Pick<
  College,
  "id" | "name" | "location" | "fees" | "rating" | "description"
>;
