import { ButtonLink } from "@/components/ui/button";

export function CompareEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white py-20 text-center">
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
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      </div>
      <h2 className="mt-6 text-xl font-semibold text-foreground">
        Select colleges to compare
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Choose up to 3 colleges from the dropdowns above to see a side-by-side
        comparison of fees, ratings, and placements.
      </p>
      <ButtonLink href="/colleges" variant="outline" className="mt-8">
        Browse all colleges
      </ButtonLink>
    </div>
  );
}
