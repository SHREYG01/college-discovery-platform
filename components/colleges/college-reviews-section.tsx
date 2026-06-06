import { ReviewList } from "@/components/reviews/review-list";
import { SectionHeader } from "@/components/ui/section-header";
import type { ReviewWithUser } from "@/types";

type CollegeReviewsSectionProps = {
  reviews: ReviewWithUser[];
};

export function CollegeReviewsSection({ reviews }: CollegeReviewsSectionProps) {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Community"
          title="Student reviews"
          description="Hear from students who have experienced this institution."
        />
        <div className="mt-8">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
