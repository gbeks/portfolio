"use client";

import { useEffect, useRef, useState } from "react";

/** "Contact me" pill that slides open to show the email on hover or focus, and copies it on click. */
export function ContactButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked; fall back to the mail app.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Contact me. Copy email address ${email}`}
      className="group inline-flex h-11 max-w-full items-center rounded-full bg-text px-5 text-sm font-medium text-bg transition-colors hover:bg-accent focus-visible:bg-accent"
    >
      <span className="whitespace-nowrap">{copied ? "Email copied" : "Contact me"}</span>
      <span
        className={`grid transition-[grid-template-columns] duration-[250ms] ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] ${
          copied ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
        }`}
      >
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          <span aria-hidden className="pl-2 opacity-60">·</span>
          <span className="pl-2">{email}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="ml-2 inline size-4 align-[-3px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {copied ? <path d="m5 12 5 5 9-10" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>}
          </svg>
        </span>
      </span>
    </button>
  );
}
