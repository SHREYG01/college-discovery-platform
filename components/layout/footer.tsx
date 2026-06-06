import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} {APP_NAME}
      </div>
    </footer>
  );
}
