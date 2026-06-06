import { notFound } from "next/navigation";

import { ReviewList } from "@/components/reviews/review-list";
import { getCollegeById } from "@/services/college.service";

type CollegeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CollegeDetailPage({
  params,
}: CollegeDetailPageProps) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">{college.name}</h1>
        <p className="mt-2 text-zinc-600">{college.location}</p>
        <div className="mt-4 flex gap-6 text-sm">
          <span className="font-medium">
            ₹{college.fees.toLocaleString("en-IN")}/year
          </span>
          <span className="text-amber-600">★ {college.rating.toFixed(1)}</span>
        </div>
        <p className="mt-6 leading-relaxed text-zinc-700">
          {college.description}
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900">Reviews</h2>
        <ReviewList reviews={college.reviews} />
      </section>
    </div>
  );
}
