"use client";

import { useState } from "react";

import { ReviewList } from "@/components/reviews/review-list";
import { getAdmissionInfo, getPlacementInfo } from "@/lib/college-content";
import { cn } from "@/lib/utils/cn";
import type { College, ReviewWithUser } from "@/types";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "reviews", label: "Reviews" },
  { id: "admission", label: "Admission Info" },
  { id: "placements", label: "Placements" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type CollegeTabsProps = {
  college: Pick<
    College,
    "name" | "location" | "fees" | "rating" | "description"
  >;
  reviews: ReviewWithUser[];
};

export function CollegeTabs({ college, reviews }: CollegeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const admission = getAdmissionInfo(college);
  const placements = getPlacementInfo(college);
  const city = college.location.split(",")[0]?.trim() ?? college.location;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-border">
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:border-border hover:text-foreground",
              )}
            >
              {tab.label}
              {tab.id === "reviews" && (
                <span
                  className={cn(
                    "ml-2 rounded-full px-2 py-0.5 text-xs",
                    activeTab === tab.id
                      ? "bg-primary-light text-primary"
                      : "bg-slate-100 text-muted",
                  )}
                >
                  {reviews.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === "overview" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground">About</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {college.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Located in {college.location}, {college.name} is recognized for
                academic excellence with a rating of {college.rating.toFixed(1)}{" "}
                out of 5. Annual tuition fees are approximately ₹
                {college.fees.toLocaleString("en-IN")}, making it a competitive
                option for students seeking quality higher education in India.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Quick facts
              </h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm text-muted">Location</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{city}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Annual fees</dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    ₹{college.fees.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Rating</dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {college.rating.toFixed(1)} / 5.0
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Reviews</dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Student reviews
            </h2>
            <p className="mt-2 text-muted">
              Hear from students who have experienced this institution.
            </p>
            <div className="mt-6">
              <ReviewList reviews={reviews} />
            </div>
          </div>
        )}

        {activeTab === "admission" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-foreground">Eligibility</h2>
              <ul className="mt-4 space-y-3">
                {admission.eligibility.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xl font-bold text-foreground">
                Application process
              </h2>
              <ol className="mt-4 space-y-3">
                {admission.process.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">Key deadlines</h3>
                <dl className="mt-4 space-y-3">
                  {admission.deadlines.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-muted">{item.label}</dt>
                      <dd className="text-sm font-medium text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">
                  Required documents
                </h3>
                <ul className="mt-4 space-y-2">
                  {admission.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex gap-2 text-sm text-muted"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-xl bg-primary-light/60 px-4 py-3 text-sm text-primary">
                {admission.feeNote}
              </p>
            </div>
          </div>
        )}

        {activeTab === "placements" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Placement rate
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {placements.placementRate}%
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Average package
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  ₹{(placements.avgPackage / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Highest package
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  ₹{(placements.highestPackage / 100000).toFixed(1)}L
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Placement highlights
                </h2>
                <ul className="mt-4 space-y-3">
                  {placements.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">Top recruiters</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {placements.recruiters.map((company) => (
                    <span
                      key={company}
                      className="rounded-lg border border-border bg-slate-50 px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
