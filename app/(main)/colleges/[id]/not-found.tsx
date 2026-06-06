import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function CollegeNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-2xl font-bold text-primary">
        404
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        College not found
      </h1>
      <p className="mt-3 text-muted">
        The college you&apos;re looking for doesn&apos;t exist or may have been
        removed from our directory.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/colleges">Browse colleges</ButtonLink>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-xl px-5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
