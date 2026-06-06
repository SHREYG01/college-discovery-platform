import { redirect } from "next/navigation";

import { BookmarkList } from "@/components/bookmarks/bookmark-list";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { getSession } from "@/lib/auth";
import { getBookmarksByUserId } from "@/services/bookmark.service";

export default async function BookmarksPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/api/auth/signin?callbackUrl=/bookmarks");
  }

  const bookmarks = await getBookmarksByUserId(session.user.id);
  const colleges = bookmarks.map(({ college }) => ({
    id: college.id,
    name: college.name,
    location: college.location,
    fees: college.fees,
    rating: college.rating,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Saved"
        title="Your bookmarks"
        description={`Welcome back, ${session.user.name ?? "there"}. Manage colleges you've saved for later.`}
      />

      {colleges.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <svg
              className="h-8 w-8"
              fill="none"
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
          </div>
          <h2 className="mt-6 text-xl font-semibold text-foreground">
            No bookmarks yet
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Visit a college page and click &ldquo;Save college&rdquo; to add it
            here. Sign-in is required to save bookmarks.
          </p>
          <ButtonLink href="/colleges" className="mt-8">
            Browse colleges
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10">
          <p className="mb-6 text-sm text-muted">
            {colleges.length} saved{" "}
            {colleges.length === 1 ? "college" : "colleges"}
          </p>
          <BookmarkList colleges={colleges} />
        </div>
      )}
    </div>
  );
}
