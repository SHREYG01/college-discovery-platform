import { Suspense } from "react";

import { ComparePageClient } from "@/components/compare/compare-page-client";
import { CompareLoading } from "@/components/compare/compare-loading";
import { SectionHeader } from "@/components/ui/section-header";
import { getCollegeSelectOptions } from "@/services/college.service";

export default async function ComparePage() {
  const colleges = await getCollegeSelectOptions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Compare"
        title="Compare colleges"
        description="Select up to 3 colleges to compare fees, ratings, and placement outcomes side by side."
      />

      <div className="mt-10">
        <Suspense fallback={<CompareLoading />}>
          <ComparePageClient colleges={colleges} />
        </Suspense>
      </div>
    </div>
  );
}
