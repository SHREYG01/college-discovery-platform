"use server";

import { revalidatePath } from "next/cache";

import { createReview } from "@/services/review.service";
import { createReviewSchema } from "@/validations";

export async function submitReview(
  userId: string,
  formData: FormData,
) {
  const parsed = createReviewSchema.safeParse({
    collegeId: formData.get("collegeId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const review = await createReview(userId, parsed.data);

  revalidatePath(`/colleges/${parsed.data.collegeId}`);

  return { data: review };
}
