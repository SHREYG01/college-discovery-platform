import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-6 shadow-sm shadow-slate-200/50",
        className,
      )}
      {...props}
    />
  );
}
