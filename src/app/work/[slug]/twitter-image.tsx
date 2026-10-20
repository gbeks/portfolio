import { getCaseStudySlugs, getCaseStudyTitle } from "@/lib/case-study-files";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study by Gbeke Odutuga";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderOg(`${getCaseStudyTitle(slug)} case study`);
}
