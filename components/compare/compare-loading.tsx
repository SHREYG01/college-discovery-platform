export function CompareLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-white md:block">
        <div className="h-12 bg-slate-100" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex border-t border-border">
            <div className="h-14 w-36 shrink-0 bg-slate-50" />
            <div className="h-14 flex-1 border-l border-border bg-white" />
            <div className="h-14 flex-1 border-l border-border bg-white" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:hidden">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
