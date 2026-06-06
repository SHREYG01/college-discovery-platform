import type { ReviewWithUser } from "@/types";

type ReviewListProps = {
  reviews: ReviewWithUser[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-zinc-500">No reviews yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-lg border border-zinc-100 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-900">
              {review.user.name ?? "Anonymous"}
            </span>
            <span className="text-sm text-amber-600">★ {review.rating}</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
