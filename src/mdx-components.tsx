import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { AtAGlance, FlowDiagram, FlowSteps, JourneyDiagram, Lead, TextWithImage } from "@/components/case-study/blocks";
import { CardShowcase } from "@/components/case-study/card-showcase";
import { Figure } from "@/components/case-study/figure";
import { ExternalLink } from "@/components/external-link";
import { Screens } from "@/components/screens";

/** "## 01. The problem" renders the number as a small accent label above the heading. */
function H2({ children }: ComponentProps<"h2">) {
  const text = typeof children === "string" ? children : "";
  const match = text.match(/^(\d+)\.\s+(.*)$/);
  return (
    <h2 className="font-display mb-5 mt-24 text-[36px] leading-[1.05] md:mt-32 md:text-[52px]">
      {match ? (
        <>
          <span className="mb-4 block font-sans text-[13px] font-semibold tracking-[0.12em] text-accent">{match[1]}</span>
          {match[2]}
        </>
      ) : (
        children
      )}
    </h2>
  );
}

const components: MDXComponents = {
  h2: H2,
  h3: (props) => <h3 className="mb-3 mt-14 text-lg font-semibold tracking-[-0.01em] md:text-xl" {...props} />,
  p: (props) => <p className="my-5 text-muted [&_strong]:text-text" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-muted marker:text-accent [&_strong]:text-text" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-muted marker:text-accent" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("http") ? (
      <ExternalLink href={href} className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover" {...props} />
    ) : (
      <a href={href} className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover" {...props} />
    ),
  Lead,
  Screens,
  FlowDiagram,
  FlowSteps,
  JourneyDiagram,
  TextWithImage,
  CardShowcase,
  Figure,
  AtAGlance,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
