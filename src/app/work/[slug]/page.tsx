import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtAGlance } from "@/components/case-study/blocks";
import { Container } from "@/components/container";
import { Figure } from "@/components/case-study/figure";
import { Cover } from "@/components/cover";
import { ExternalLink } from "@/components/external-link";
import { Screens } from "@/components/screens";
import { getCaseStudy, getCaseStudySlugs, getNextCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getCaseStudy(slug);
  return {
    title: `${meta.title} case study`,
    description: meta.subtitle,
    openGraph: { title: `${meta.title} case study · Gbeke Odutuga`, description: meta.subtitle },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) notFound();
  const { Content, meta } = await getCaseStudy(slug);
  const next = await getNextCaseStudy(slug);

  return (
    <article className="pb-24 pt-10 md:pt-16">
      <Container>
        <div className="mx-auto max-w-[680px]">
          <Link href="/#work" className="text-sm font-medium text-muted hover:text-text">
            ← All work
          </Link>
          <h1 className="font-display mt-10 text-[56px] leading-none md:text-[96px]">{meta.title}</h1>
          <p className="mt-5 text-lg font-medium leading-snug tracking-[-0.01em] text-muted md:text-xl">{meta.subtitle}</p>
        </div>

        {meta.coverImage ? (
          <Figure src={meta.coverImage.src} alt={meta.coverImage.alt} />
        ) : meta.hero && meta.hero.length > 0 && (
          <div className="mx-auto max-w-[680px]">
            <Screens frame={meta.frame} images={meta.hero} />
          </div>
        )}

        <div className="mx-auto max-w-[680px]">
          <div className="space-y-5 text-muted">
            {meta.overview.split(/\n\s*\n/).map((para) => (
              <p key={para}>{para.trim()}</p>
            ))}
          </div>
          {meta.liveUrl && (
            <ExternalLink
              href={meta.liveUrl}
              className="mt-8 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              {meta.liveLabel ?? "Visit live product"}
            </ExternalLink>
          )}
          <div className="mt-12">
            <AtAGlance meta={meta} />
          </div>

          <Content />
        </div>

        {next && next.slug !== slug && (
          <nav aria-label="Next project" className="mx-auto mt-32 max-w-[1100px]">
            <p className="mb-4 text-[13px] font-medium text-muted">Next project</p>
            <Link
              href={`/work/${next.slug}`}
              className="lift group grid items-center gap-6 rounded-[22px] border border-border bg-surface/70 p-3 md:grid-cols-2 md:p-4"
            >
              <Cover slug={next.slug} name={next.title} frame={next.frame} covers={next.covers} coverImage={next.coverImage} />
              <div className="px-3 pb-4 md:px-6">
                <h2 className="font-display text-[40px] leading-none md:text-[56px]">{next.title}</h2>
                <p className="mt-3 text-muted">{next.subtitle}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent transition-colors group-hover:text-accent-hover">
                  Read case study <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </nav>
        )}
      </Container>
    </article>
  );
}
