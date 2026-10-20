import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudyMeta } from "@/lib/case-studies";

/** Bold one-liner that opens each numbered section. */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="font-display -mt-1 mb-6 text-[26px] leading-[1.2] text-text md:text-[32px]">{children}</p>;
}

export function AtAGlance({ meta }: { meta: CaseStudyMeta }) {
  const items = [
    ["Role", meta.role],
    ["Team", meta.team],
    ["Timeline", meta.timeline],
    ["Platform", meta.platform],
    ["Focus", meta.focus],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-8 md:grid-cols-4 md:gap-8">
      {items.map(([label, value]) => (
        <div key={label} className={label === "Focus" ? "col-span-2 md:col-span-4" : ""}>
          <dt className="text-xs font-medium uppercase tracking-[0.06em] text-muted">{label}</dt>
          <dd className="mt-1.5 text-sm font-medium md:text-[15px]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A journey drawn in code: steps in a row on desktop, stacked on mobile, with optional warning notes and a caption. */
export function JourneyDiagram({
  title,
  steps,
  caption,
}: {
  title: string;
  steps: { label: string; warning?: string }[];
  caption?: string;
}) {
  return (
    <figure className="relative left-1/2 my-12 w-[min(1100px,calc(100vw-48px))] -translate-x-1/2 md:my-16">
      <div className="rounded-[20px] bg-showcase px-5 py-8 md:px-8 md:py-10">
        <p className="mb-6 text-[13px] font-semibold tracking-[0.06em] text-text md:mb-8">{title}</p>
        <ol className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-2">
          {steps.map((step, i) => (
            <li key={step.label} className="flex flex-col items-stretch gap-3 lg:flex-1 lg:flex-row lg:gap-2">
              <div className="flex-1">
                <div className="flex min-h-[64px] items-center gap-3 rounded-[14px] bg-surface px-4 py-3 ring-1 ring-stroke lg:min-h-[104px] lg:flex-col lg:items-start lg:justify-between">
                  <span className="text-xs font-semibold text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium leading-snug text-text">{step.label}</span>
                </div>
                {step.warning && (
                  <p className="mt-2 flex items-start gap-1.5 px-1 text-xs leading-snug text-muted">
                    <svg aria-hidden viewBox="0 0 16 16" className="mt-px size-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 1.75 14.5 13.5h-13L8 1.75Z" />
                      <path d="M8 6.25v3.25M8 11.6v.01" />
                    </svg>
                    <span>{step.warning}</span>
                  </p>
                )}
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden className="self-center text-muted lg:mt-10 lg:self-start">
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      {caption && <figcaption className="mt-3 text-center text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Copy beside a narrow supporting image: text left, image right on desktop; image below the text on phones. */
export function TextWithImage({
  children,
  src,
  alt,
  width,
  height,
  caption,
}: {
  children: ReactNode;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <div className="grid items-start gap-x-10 md:grid-cols-[1fr_minmax(0,34%)]">
      <div className="min-w-0">{children}</div>
      <figure className="mx-auto mb-2 mt-4 w-full max-w-[280px] md:mt-5 md:max-w-none">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 240px, 280px" className="h-auto w-full rounded-[14px] ring-1 ring-stroke" />
        {caption && <figcaption className="mt-3 text-center text-[13px] text-muted">{caption}</figcaption>}
      </figure>
    </div>
  );
}

/** Numbered steps, each with a short description: stacked on mobile, a grid on wider screens. */
export function FlowSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="my-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="block text-[13px] font-semibold tracking-[0.12em] text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h4 className="mt-2 font-semibold text-text">{step.title}</h4>
          <p className="mt-1.5 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Clearfine "one flow" diagram, built in code from the steps. */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="relative left-1/2 my-12 w-[min(1100px,calc(100vw-48px))] -translate-x-1/2 rounded-[20px] bg-showcase px-5 py-8 md:px-10 md:py-12">
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center gap-3 md:flex-1 md:flex-row md:gap-2">
            <span className="flex w-full flex-1 items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-sm font-medium ring-1 ring-stroke md:min-h-[88px] md:flex-col md:justify-center md:text-center">
              <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-muted md:text-lg">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
