import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/colleges" className="hover:text-zinc-900">
            Colleges
          </Link>
          <Link href="/bookmarks" className="hover:text-zinc-900">
            Bookmarks
          </Link>
        </nav>
      </div>
    </header>
  );
}
