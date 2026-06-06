export default function CollegeDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-border bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-6 flex gap-6">
            <div className="h-16 w-16 rounded-2xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-10 w-3/4 max-w-lg rounded-lg bg-slate-200" />
              <div className="h-6 w-48 rounded-lg bg-slate-200" />
              <div className="h-20 w-full max-w-2xl rounded-lg bg-slate-200" />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
            <div className="h-24 rounded-2xl bg-slate-200" />
            <div className="h-24 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="h-40 rounded-2xl bg-slate-100 lg:col-span-2" />
          <div className="h-56 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
