import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center gap-8 py-16 text-center">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Discover the right college for you
        </h1>
        <p className="text-lg text-zinc-600">
          Compare fees, ratings, and reviews across India&apos;s top engineering
          and university programs.
        </p>
      </div>
      <Link href="/colleges">
        <Button className="px-8 py-3 text-base">Browse Colleges</Button>
      </Link>
    </section>
  );
}
