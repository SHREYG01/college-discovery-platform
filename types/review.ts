import type { Review as PrismaReview } from "@prisma/client";

export type Review = PrismaReview;

export type ReviewWithUser = Review & {
  user: {
    id: string;
    name: string | null;
  };
};
