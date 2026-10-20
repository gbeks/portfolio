"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked; the address is visible on the page either way.
      return;
    }
    setToast(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 3000);
  };

  return (
    <>
      <span className="group relative inline-block">
        <button
          type="button"
          onClick={copy}
          aria-describedby="copy-hint"
          className="font-display text-[34px] leading-tight text-text underline decoration-accent decoration-1 underline-offset-[8px] transition-colors hover:text-accent md:text-[52px]"
        >
          {email}
        </button>
        <span
          id="copy-hint"
          role="tooltip"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-text px-2.5 py-1 text-xs font-medium text-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          Click to copy
        </span>
      </span>

      <div aria-live="polite" role="status" className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-6">
        {toast && (
          <div className="rounded-full bg-text px-5 py-3 text-sm font-medium text-bg shadow-lift">
            Email copied! Talk soon 👋
          </div>
        )}
      </div>
    </>
  );
}
