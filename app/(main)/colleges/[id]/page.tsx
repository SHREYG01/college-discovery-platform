import { notFound } from "next/navigation";

import { CollegeHeader } from "@/components/colleges/college-header";
import { CollegeTabs } from "@/components/colleges/college-tabs";
import { getSession } from "@/lib/auth";
import { isCollegeBookmarked } from "@/services/bookmark.service";
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

  const session = await getSession();
  const isBookmarked = session?.user?.id
    ? await isCollegeBookmarked(session.user.id, id)
    : false;

  return (
    <div>
      <CollegeHeader college={college} isBookmarked={isBookmarked} />
      <CollegeTabs college={college} reviews={college.reviews} />
    </div>
  );
}
