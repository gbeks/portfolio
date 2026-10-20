import type { ReactNode } from "react";

/** Mobile screen: just the screen, a hairline stroke and a soft radius. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[22px] bg-surface ring-1 ring-stroke">
      {children}
    </div>
  );
}

/** Web screen: same hairline stroke, a tighter radius for the wider shape. */
export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-surface ring-1 ring-stroke">
      {children}
    </div>
  );
}

/** Shown in place of any missing image so the build never breaks. */
export function MissingImage({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-showcase p-3 text-center">
      <span className="break-all font-mono text-[11px] leading-4 text-muted">{src}</span>
    </div>
  );
}
