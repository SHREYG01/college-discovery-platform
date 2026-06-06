"use client";

type CollegeFiltersProps = {
  onSearch: (query: string) => void;
  isPending?: boolean;
};

export function CollegeFilters({ onSearch, isPending }: CollegeFiltersProps) {
  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSearch((formData.get("query") as string) ?? "");
      }}
    >
      <input
        name="query"
        type="search"
        placeholder="Search colleges..."
        className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-400"
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {isPending ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
