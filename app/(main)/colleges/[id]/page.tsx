import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollegeDetails } from "@/components/colleges/college-details";
import { CollegeHeader } from "@/components/colleges/college-header";
import { CollegeReviewsSection } from "@/components/colleges/college-reviews-section";
import { getSession } from "@/lib/auth";
import { isCollegeBookmarked } from "@/services/bookmark.service";
import { getCollegeById } from "@/services/college.service";

type CollegeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CollegeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    return { title: "College not found" };
  }

  return {
    title: `${college.name} | College Discovery Platform`,
    description: college.description,
  };
}

export default async function CollegeDetailPage({
  params,
}: CollegeDetailPageProps) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  const session = await getSession();
  const isBookmarked = session?.user?.id
    ? await isCollegeBookmarked(session.user.id, id)
    : false;

  return (
    <div>
      <CollegeHeader college={college} isBookmarked={isBookmarked} />
      <CollegeDetails
        college={college}
        reviewCount={college.reviews.length}
      />
      <CollegeReviewsSection reviews={college.reviews} />
    </div>
  );
}
