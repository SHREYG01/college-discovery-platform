"use server";

import { revalidatePath } from "next/cache";

import { toggleBookmark } from "@/services/bookmark.service";

export async function toggleCollegeBookmark(
  userId: string,
  collegeId: string,
) {
  const result = await toggleBookmark(userId, collegeId);

  revalidatePath("/bookmarks");
  revalidatePath(`/colleges/${collegeId}`);

  return result;
}
