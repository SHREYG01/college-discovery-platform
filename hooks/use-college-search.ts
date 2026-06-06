"use client";

import { useState, useTransition } from "react";

import { searchColleges } from "@/actions/college.actions";
import type { CollegeListItem } from "@/types";

import { useDebounce } from "./use-debounce";

export function useCollegeSearch(initialColleges: CollegeListItem[] = []) {
  const [colleges, setColleges] = useState(initialColleges);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query);

  function handleSearch(value: string) {
    setQuery(value);

    startTransition(async () => {
      const formData = new FormData();
      formData.set("query", value);
      const result = await searchColleges(formData);

      if (result.data) {
        setColleges(result.data);
      }
    });
  }

  return {
    colleges,
    query: debouncedQuery,
    isPending,
    handleSearch,
  };
}
