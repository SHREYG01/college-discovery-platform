import { z } from "zod";

import { RATING_MAX, RATING_MIN } from "@/lib/constants";

export const createReviewSchema = z.object({
  collegeId: z.string().uuid(),
  rating: z.coerce.number().int().min(RATING_MIN).max(RATING_MAX),
  comment: z.string().trim().min(10, "Review must be at least 10 characters"),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
