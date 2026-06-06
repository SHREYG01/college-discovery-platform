"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { removeCollegeBookmark } from "@/actions/bookmark.actions";
import { Card } from "@/components/ui/card";
import type { CollegeListItem } from "@/types";

type BookmarkListProps = {
  colleges: CollegeListItem[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function BookmarkList({ colleges }: BookmarkListProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleRemove(collegeId: string) {
    setPendingId(collegeId);
    startTransition(async () => {
      await removeCollegeBookmark(collegeId);
      router.refresh();
      setPendingId(null);
    });
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => {
        const city =
          college.location.split(",")[0]?.trim() ?? college.location;
        const isRemoving = pendingId === college.id;

        return (
          <Card
            key={college.id}
            className="flex h-full flex-col transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-sm">
                {getInitials(college.name)}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
                ★ {college.rating.toFixed(1)}
              </div>
            </div>

            <Link href={`/colleges/${college.id}`} className="mt-4 block">
              <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground hover:text-primary">
                {college.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{city}</p>
              <p className="mt-3 text-base font-bold text-foreground">
                ₹{college.fees.toLocaleString("en-IN")}
                <span className="text-sm font-normal text-muted">/year</span>
              </p>
            </Link>

            <div className="mt-auto flex gap-2 pt-6">
              <Link
                href={`/colleges/${college.id}`}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-slate-50"
              >
                View details
              </Link>
              <button
                type="button"
                disabled={isRemoving}
                onClick={() => handleRemove(college.id)}
                className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
