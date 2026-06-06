import { prisma } from "@/lib/db/prisma";

export async function getBookmarksByUserId(userId: string) {
  return prisma.bookmark.findMany({
    where: { userId },
    include: { college: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleBookmark(userId: string, collegeId: string) {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_collegeId: { userId, collegeId } },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return { bookmarked: false };
  }

  await prisma.bookmark.create({ data: { userId, collegeId } });
  return { bookmarked: true };
}
