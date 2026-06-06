import { z } from "zod";

import { MAX_COMPARE_COLLEGES } from "@/lib/constants";

export const compareCollegesSchema = z.object({
  ids: z
    .array(z.string().uuid("Each college id must be a valid UUID"))
    .min(1, "Select at least one college")
    .max(MAX_COMPARE_COLLEGES, `You can compare up to ${MAX_COMPARE_COLLEGES} colleges`),
});

export const compareCollegesQuerySchema = z
  .string()
  .min(1, "ids query parameter is required")
  .transform((value) =>
    value
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  )
  .pipe(compareCollegesSchema.shape.ids);

export type CompareCollegesInput = z.infer<typeof compareCollegesSchema>;
