"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type CollegeFiltersProps = {
  defaultQuery?: string;
};

export function CollegeFilters({ defaultQuery = "" }: CollegeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultQuery);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("query", query.trim());
      } else {
        params.delete("query");
      }
      router.push(`/colleges${params.toString() ? `?${params}` : ""}`);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search colleges by name or description..."
          disabled={isPending}
          className="h-12 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-ring disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="h-12 shrink-0 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
