import type { ComponentProps } from "react";

export function ArrowUpRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

/** External links always open in a new tab and show the ↗ icon. */
export function ExternalLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${className}`} {...props}>
      {children}
      <ArrowUpRight />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
