"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useTransition } from "react";

import {
  removeCollegeBookmark,
  saveCollegeBookmark,
} from "@/actions/bookmark.actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type BookmarkButtonProps = {
  collegeId: string;
  isBookmarked?: boolean;
  className?: string;
};

export function BookmarkButton({
  collegeId,
  isBookmarked = false,
  className,
}: BookmarkButtonProps) {
  const { status } = useSession();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function requireAuth() {
    signIn("google", { callbackUrl: `/colleges/${collegeId}` });
  }

  function handleSave() {
    if (status !== "authenticated") {
      requireAuth();
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await saveCollegeBookmark(collegeId);

      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }

      setBookmarked(true);
    });
  }

  function handleRemove() {
    if (status !== "authenticated") {
      requireAuth();
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await removeCollegeBookmark(collegeId);

      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }

      setBookmarked(false);
    });
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {bookmarked ? (
        <Button
          type="button"
          variant="outline"
          size="md"
          disabled={isPending}
          onClick={handleRemove}
          className="gap-2"
        >
          <BookmarkIcon filled />
          {isPending ? "Removing..." : "Remove bookmark"}
        </Button>
      ) : (
        <Button
          type="button"
          size="md"
          disabled={isPending}
          onClick={handleSave}
          className="gap-2"
        >
          <BookmarkIcon />
          {isPending ? "Saving..." : "Save college"}
        </Button>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      className="h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}
