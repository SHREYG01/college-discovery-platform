"use client";

import { MAX_COMPARE_COLLEGES } from "@/lib/constants";
import type { CollegeListItem } from "@/types";

type CollegeSelectorProps = {
  colleges: CollegeListItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export function CollegeSelector({
  colleges,
  selectedIds,
  onChange,
}: CollegeSelectorProps) {
  function handleSlotChange(index: number, value: string) {
    const slots = Array.from(
      { length: MAX_COMPARE_COLLEGES },
      (_, i) => selectedIds[i] ?? "",
    );
    slots[index] = value;

    const unique = slots.filter(
      (id, i, arr) => id && arr.indexOf(id) === i,
    );

    onChange(unique);
  }

  const slots = Array.from({ length: MAX_COMPARE_COLLEGES }, (_, index) => {
    return selectedIds[index] ?? "";
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((selectedId, index) => {
        const available = colleges.filter(
          (college) =>
            college.id === selectedId ||
            !selectedIds.includes(college.id),
        );

        return (
          <div key={index}>
            <label
              htmlFor={`college-slot-${index}`}
              className="mb-2 block text-sm font-medium text-foreground"
            >
              College {index + 1}
            </label>
            <select
              id={`college-slot-${index}`}
              value={selectedId}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-ring"
            >
              <option value="">Select a college</option>
              {available.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
