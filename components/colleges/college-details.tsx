import { Card } from "@/components/ui/card";
import { parseLocation } from "@/lib/utils/location";
import type { CollegeDetailFields } from "@/types";

type CollegeDetailsProps = {
  college: CollegeDetailFields;
  reviewCount: number;
};

export function CollegeDetails({ college, reviewCount }: CollegeDetailsProps) {
  const { city, state } = parseLocation(college.location);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-foreground">About this college</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {college.description}
          </p>
        </div>

        <Card className="h-fit">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            At a glance
          </h3>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-muted">City</dt>
              <dd className="mt-0.5 font-medium text-foreground">{city}</dd>
            </div>
            {state && (
              <div>
                <dt className="text-sm text-muted">State</dt>
                <dd className="mt-0.5 font-medium text-foreground">{state}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-muted">Annual fees</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                ₹{college.fees.toLocaleString("en-IN")}/year
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Rating</dt>
              <dd className="mt-0.5 font-medium text-amber-600">
                ★ {college.rating.toFixed(1)} / 5.0
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Reviews</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
