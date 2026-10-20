import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type CaseStudyMeta = {
  title: string;
  subtitle: string;
  slug: string;
  role: string;
  team: string;
  timeline: string;
  platform: string;
  focus: string;
  liveUrl?: string;
  liveLabel?: string;
  covers: string[];
  /** A finished cover image, used for the card and the hero instead of framed screens. */
  coverImage?: { src: string; alt: string };
  /** Opening paragraph shown under the header. */
  overview: string;
  /** Hero screens on the showcase panel. */
  hero?: { src: string; alt: string }[];
  frame: "phone" | "browser";
  order: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "work");

/** Every case study slug, from the MDX files in /content/work. */
export function getCaseStudySlugs() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getCaseStudy(slug: string) {
  const mod = (await import(`@content/work/${slug}.mdx`)) as {
    default: ComponentType;
    frontmatter: CaseStudyMeta;
  };
  return { Content: mod.default, meta: mod.frontmatter };
}

export async function getAllCaseStudies() {
  const all = await Promise.all(getCaseStudySlugs().map(getCaseStudy));
  return all.map((c) => c.meta).sort((a, b) => a.order - b.order);
}

/** Next case study by `order`, wrapping back to the first. */
export async function getNextCaseStudy(slug: string) {
  const all = await getAllCaseStudies();
  const i = all.findIndex((c) => c.slug === slug);
  return all[(i + 1) % all.length];
}
