"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { CollegeListItem } from "@/types";

import { useDebounce } from "./use-debounce";

export function useCollegeSearch(initialColleges: CollegeListItem[] = []) {
  const router = useRouter();
  const [colleges, setColleges] = useState(initialColleges);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query);

  function handleSearch(value: string) {
    setQuery(value);

    startTransition(() => {
      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("query", value.trim());
      }
      router.push(`/colleges${params.toString() ? `?${params}` : ""}`);
    });
  }

  return {
    colleges,
    query: debouncedQuery,
    isPending,
    handleSearch,
    setColleges,
  };
}
