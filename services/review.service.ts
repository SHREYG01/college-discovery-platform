import { prisma } from "@/lib/db/prisma";
import type { CreateReviewInput } from "@/validations";

export async function createReview(userId: string, input: CreateReviewInput) {
  return prisma.review.create({
    data: {
      userId,
      collegeId: input.collegeId,
      rating: input.rating,
      comment: input.comment,
    },
  });
}

export async function getReviewsByCollegeId(collegeId: string) {
  return prisma.review.findMany({
    where: { collegeId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
}
