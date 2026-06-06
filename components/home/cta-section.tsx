import { ButtonLink } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent px-8 py-14 text-center sm:px-16">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your dream college?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-indigo-100">
            Browse our full directory of top-rated institutions and make an
            informed decision for your future.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="/colleges"
              className="bg-white text-primary hover:bg-indigo-50"
              size="lg"
            >
              Explore all colleges
            </ButtonLink>
            <ButtonLink
              href="/bookmarks"
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              View bookmarks
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
