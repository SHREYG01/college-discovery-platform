import { z } from "zod";

export const collegeSearchSchema = z.object({
  query: z.string().trim().optional(),
  location: z.string().trim().optional(),
  minFees: z.coerce.number().int().min(0).optional(),
  maxFees: z.coerce.number().int().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export type CollegeSearchInput = z.infer<typeof collegeSearchSchema>;
