"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserFrame, MissingImage, PhoneFrame } from "./frames";

export type Screen = { src: string; alt: string; exists: boolean };

const cols: Record<number, string> = {
  1: "grid-cols-1 max-w-[320px]",
  2: "grid-cols-2 max-w-[640px]",
  3: "grid-cols-3 max-w-[900px]",
  4: "grid-cols-2 md:grid-cols-4 max-w-[1100px]",
};
const browserCols: Record<number, string> = {
  1: "grid-cols-1 max-w-[900px]",
  2: "grid-cols-1 md:grid-cols-2 max-w-[1100px]",
  3: "grid-cols-1 md:grid-cols-3 max-w-[1100px]",
  4: "grid-cols-1 sm:grid-cols-2 max-w-[1100px]",
};

/** 1 to 4 screens on the showcase panel. Click any screen to open it full size. */
export function ScreenGroup({ screens, frame }: { screens: Screen[]; frame: "phone" | "browser" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const Frame = frame === "phone" ? PhoneFrame : BrowserFrame;
  const count = Math.min(Math.max(screens.length, 1), 4);
  const grid = (frame === "phone" ? cols : browserCols)[count];

  const open = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setActive(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Native <dialog> traps focus and closes on Esc; we return focus to the screen that opened it.
    const onClose = () => {
      setActive(null);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + screens.length) % screens.length));

  const current = active !== null ? screens[active] : null;

  return (
    <figure className="my-12 rounded-[20px] bg-showcase px-5 py-8 md:my-16 md:px-10 md:py-14">
      <div className={`mx-auto grid items-start gap-4 md:gap-8 ${grid}`}>
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            className="group block w-full cursor-zoom-in rounded-[22px] text-left transition-transform duration-200 ease-out hover:-translate-y-0.5"
            aria-label={`View full size: ${s.alt}`}
          >
            <Frame>
              {s.exists ? (
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes={frame === "phone" ? "(min-width: 768px) 260px, 45vw" : "(min-width: 768px) 550px, 90vw"}
                  className="object-cover object-top"
                />
              ) : (
                <MissingImage src={s.src} />
              )}
            </Frame>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={current?.alt ?? "Screen"}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-black/80"
      >
        {current && (
          <div className="flex h-full w-full items-center justify-center p-4 md:p-12" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="relative h-full w-full">
              {current.exists ? (
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              ) : (
                <MissingImage src={current.src} />
              )}
            </div>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </figure>
  );
}
