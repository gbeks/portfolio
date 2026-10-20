import type { ReactNode } from "react";

const styles = {
  filled: "bg-accent-soft text-accent",
  outline: "border border-stroke text-text",
  muted: "bg-border/60 text-muted",
} as const;

export function Pill({ children, variant = "filled" }: { children: ReactNode; variant?: keyof typeof styles }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5 md:text-[13px] ${styles[variant]}`}>
      {children}
    </span>
  );
}
