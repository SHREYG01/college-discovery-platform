"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CollegeSelector } from "@/components/compare/college-selector";
import { CompareEmptyState } from "@/components/compare/compare-empty-state";
import { CompareLoading } from "@/components/compare/compare-loading";
import { ComparisonTable } from "@/components/compare/comparison-table";
import type { CollegeComparisonItem, CollegeListItem } from "@/types";

type ComparePageClientProps = {
  colleges: CollegeListItem[];
};

export function ComparePageClient({ colleges }: ComparePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparison, setComparison] = useState<CollegeComparisonItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncFromUrl = useCallback(() => {
    const idsParam = searchParams.get("ids");
    if (!idsParam) {
      setSelectedIds([]);
      setComparison([]);
      return;
    }

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    setSelectedIds(ids);
  }, [searchParams]);

  useEffect(() => {
    syncFromUrl();
  }, [syncFromUrl]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setComparison([]);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function fetchComparison() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/compare?ids=${selectedIds.join(",")}`,
          { signal: controller.signal },
        );

        const result = await response.json();

        if (!response.ok) {
          const message =
            typeof result.error === "string"
              ? result.error
              : "Failed to load comparison data";
          setError(message);
          setComparison([]);
          return;
        }

        setComparison(result.data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to load comparison data");
          setComparison([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchComparison();

    return () => controller.abort();
  }, [selectedIds]);

  function handleSelectionChange(ids: string[]) {
    setSelectedIds(ids);

    const params = new URLSearchParams();
    if (ids.length > 0) {
      params.set("ids", ids.join(","));
    }

    router.replace(`/compare${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  }

  return (
    <div className="space-y-10">
      <CollegeSelector
        colleges={colleges}
        selectedIds={selectedIds}
        onChange={handleSelectionChange}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading && <CompareLoading />}

      {!isLoading && selectedIds.length === 0 && <CompareEmptyState />}

      {!isLoading && selectedIds.length > 0 && comparison.length > 0 && (
        <ComparisonTable colleges={comparison} />
      )}
    </div>
  );
}
