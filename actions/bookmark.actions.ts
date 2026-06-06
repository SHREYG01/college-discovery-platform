"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";
import {
  removeBookmark,
  saveBookmark,
  toggleBookmark,
} from "@/services/bookmark.service";

async function requireUserId() {
  const session = await getSession();

  if (!session?.user?.id) {
    return { error: "You must be signed in to manage bookmarks." as const };
  }

  return { userId: session.user.id };
}

export async function saveCollegeBookmark(collegeId: string) {
  const auth = await requireUserId();
  if ("error" in auth) return auth;

  const result = await saveBookmark(auth.userId, collegeId);

  revalidatePath("/bookmarks");
  revalidatePath(`/colleges/${collegeId}`);

  return { data: result };
}

export async function removeCollegeBookmark(collegeId: string) {
  const auth = await requireUserId();
  if ("error" in auth) return auth;

  const result = await removeBookmark(auth.userId, collegeId);

  revalidatePath("/bookmarks");
  revalidatePath(`/colleges/${collegeId}`);

  return { data: result };
}

export async function toggleCollegeBookmark(collegeId: string) {
  const auth = await requireUserId();
  if ("error" in auth) return auth;

  const result = await toggleBookmark(auth.userId, collegeId);

  revalidatePath("/bookmarks");
  revalidatePath(`/colleges/${collegeId}`);

  return { data: result };
}
