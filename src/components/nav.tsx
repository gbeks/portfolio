"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink } from "./external-link";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav({ resumeUrl }: { resumeUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = "rounded-md px-3 py-2 text-sm font-medium text-muted hover:text-text";

  const links = (
    <>
      {sections.map((s) => (
        <Link key={s.href} href={s.href} className={linkClass} onClick={() => setOpen(false)}>
          {s.label}
        </Link>
      ))}
      {resumeUrl && (
        <ExternalLink href={resumeUrl} className={linkClass}>
          Resume
        </ExternalLink>
      )}
    </>
  );

  return (
    <header
      className={`surface-fade sticky top-0 z-40 border-b ${
        scrolled || open ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:h-[72px] md:px-10">
        <Link href="/" aria-label="Gbekeloluwa Odutuga, home" className="logo">
          <span className="logo-gb">gb</span>
          <span className="logo-dot">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-muted hover:bg-accent-soft hover:text-text"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="flex flex-col gap-1 border-t border-border px-3 pb-4 pt-2 md:hidden">
          {links}
        </div>
      )}
    </header>
  );
}
