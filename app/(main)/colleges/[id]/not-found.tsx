import Link from "next/link";

export default function CollegeNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-zinc-900">College not found</h1>
      <p className="mt-2 text-zinc-600">
        The college you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/colleges"
        className="mt-6 inline-block text-sm font-medium text-zinc-900 underline"
      >
        Back to colleges
      </Link>
    </div>
  );
}
