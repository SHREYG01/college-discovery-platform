import Link from "next/link";

import type { CollegeComparisonItem } from "@/types";

type ComparisonTableProps = {
  colleges: CollegeComparisonItem[];
};

const ROWS = [
  { key: "name", label: "College Name" },
  { key: "location", label: "Location" },
  { key: "fees", label: "Fees" },
  { key: "rating", label: "Rating" },
  { key: "placements", label: "Placements" },
] as const;

function formatValue(college: CollegeComparisonItem, key: (typeof ROWS)[number]["key"]) {
  switch (key) {
    case "name":
      return college.name;
    case "location":
      return college.location;
    case "fees":
      return `₹${college.fees.toLocaleString("en-IN")}/year`;
    case "rating":
      return `${college.rating.toFixed(1)} / 5.0`;
    case "placements":
      return college.placements.summary;
  }
}

function getBestIndex(
  colleges: CollegeComparisonItem[],
  key: (typeof ROWS)[number]["key"],
) {
  if (colleges.length < 2) return -1;

  if (key === "fees") {
    const minFees = Math.min(...colleges.map((c) => c.fees));
    return colleges.findIndex((c) => c.fees === minFees);
  }

  if (key === "rating") {
    const maxRating = Math.max(...colleges.map((c) => c.rating));
    return colleges.findIndex((c) => c.rating === maxRating);
  }

  if (key === "placements") {
    const maxRate = Math.max(
      ...colleges.map((c) => c.placements.placementRate),
    );
    return colleges.findIndex((c) => c.placements.placementRate === maxRate);
  }

  return -1;
}

export function ComparisonTable({ colleges }: ComparisonTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-white shadow-sm md:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              <th className="px-5 py-4 font-semibold text-muted">Field</th>
              {colleges.map((college) => (
                <th
                  key={college.id}
                  className="px-5 py-4 font-semibold text-foreground"
                >
                  <Link
                    href={`/colleges/${college.id}`}
                    className="hover:text-primary"
                  >
                    {college.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const bestIndex = getBestIndex(colleges, row.key);

              return (
                <tr key={row.key} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-muted">
                    {row.label}
                  </td>
                  {colleges.map((college, index) => (
                    <td
                      key={college.id}
                      className={`px-5 py-4 text-foreground ${
                        bestIndex === index ? "bg-primary-light/40 font-medium" : ""
                      }`}
                    >
                      {formatValue(college, row.key)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <Link
              href={`/colleges/${college.id}`}
              className="text-lg font-semibold text-foreground hover:text-primary"
            >
              {college.name}
            </Link>
            <dl className="mt-4 space-y-3">
              {ROWS.filter((row) => row.key !== "name").map((row) => (
                <div key={row.key}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {formatValue(college, row.key)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
