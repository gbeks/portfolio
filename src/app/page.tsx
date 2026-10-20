import Image from "next/image";
import { ContactButton } from "@/components/contact-button";
import { Container } from "@/components/container";
import { CopyEmail } from "@/components/copy-email";
import { ExternalLink } from "@/components/external-link";
import { LogoStrip } from "@/components/logo-strip";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { moreWork, selectedWork } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { publicFileExists } from "@/lib/public-file";

const h2 = "font-display text-[38px] leading-[1.05] md:text-[56px]";

export default function Home() {
  const hasPhoto = publicFileExists("/gbeke.png");

  return (
    <Container>
      {/* 6.1 Hero */}
      <section className="flex min-h-[calc(100svh-64px)] flex-col justify-center py-16 md:min-h-[calc(100svh-72px)] md:py-20">
        {hasPhoto && (
          <Image
            src="/gbeke.png"
            alt="Portrait of Gbeke Odutuga"
            width={96}
            height={96}
            priority
            className="mb-8 size-20 rounded-full object-cover ring-1 ring-stroke md:mb-10 md:size-24"
          />
        )}
        <h1 className="font-display text-[clamp(36px,4.5vw,56px)] leading-[1.1]">
          Hi, I’m <span className="italic text-accent">Gbeke</span>.
        </h1>
        <p className="mt-6 max-w-[600px] text-base leading-[1.6] text-muted md:mt-8 md:text-lg">
          I’m a product designer with 3+ years of experience translating complex problems into simple, user-friendly
          digital products. Lately, I’ve been exploring how to bring my designs to life using Claude Code and Cursor.
        </p>

        <div className="mt-8 md:mt-10">
          <ContactButton email={siteConfig.email} />
        </div>
      </section>

      {/* 6.2 Logo strip */}
      <LogoStrip />

      {/* 6.3 Selected work */}
      <section id="work" aria-labelledby="work-heading" className="py-16 md:py-28">
        <Reveal>
          <h2 id="work-heading" className={h2}>
            Selected work
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {selectedWork.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* 6.4 More work */}
      <section aria-labelledby="more-heading" className="py-16 md:py-24">
        <Reveal>
          <h2 id="more-heading" className={h2}>
            More work
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {moreWork.map((p) => (
            <ProjectCard key={p.slug} project={p} size="small" />
          ))}
        </div>
      </section>

      {/* 6.5 About */}
      <Reveal as="section" id="about" className="py-16 md:py-28">
        <div className="grid items-center gap-y-10 md:grid-cols-[55fr_40fr] md:gap-x-[5%]">
          <div>
            <h2 className={h2}>About</h2>
            <div className="mt-6 space-y-5 text-muted">
            <p>
              Over the last 3+ years, I’ve worked on products across fintech, proptech, creator platforms, and consumer
              spaces. I enjoy taking ideas from the early stages, understanding what users need, and working with
              engineers to turn those ideas into useful digital experiences.
            </p>
            <p>
              Recently, I’ve been exploring the engineering side of design. I designed and built Owa, a Lagos transit
              app, with the help of Claude Code and Cursor, and I’m curious to see how much further I can take my ideas
              beyond Figma.
            </p>
            <p>When I’m not designing, I’m probably baking, watching a sitcom, or reading African literature.</p>
            </div>
          </div>
          {/* Slight tilt like a pinned print; straight for people who prefer reduced motion. */}
          <Image
            src="/about-collage.jpg"
            alt="A collage of Gbeke: a childhood photo, favourite books, Figma work, Unilag lab days, beach sunsets in Lagos and a homemade cake."
            width={2400}
            height={2800}
            loading="lazy"
            sizes="(min-width: 768px) 440px, 100vw"
            className="h-auto w-full rotate-[1.5deg] rounded-[14px] ring-1 ring-stroke motion-reduce:rotate-0"
          />
        </div>
      </Reveal>

      {/* 6.6 Contact */}
      <Reveal as="section" id="contact" className="py-16 md:py-32">
        <h2 className={`${h2} max-w-[760px]`}>Got a role or a project in mind? Let&apos;s talk.</h2>
        <div className="mt-10">
          <CopyEmail email={siteConfig.email} />
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium">
          <ExternalLink href={siteConfig.linkedin} className="text-text hover:text-accent">
            LinkedIn
          </ExternalLink>
          {siteConfig.resumeUrl && (
            <ExternalLink href={siteConfig.resumeUrl} className="text-text hover:text-accent">
              Resume
            </ExternalLink>
          )}
        </div>
        <p className="mt-12 flex items-start gap-2.5 text-sm text-muted">
          <span aria-hidden className="mt-[7px] size-2 shrink-0 rounded-full bg-success" />
          I&apos;m open to full-time and contract product design roles. Based in Lagos, working with teams anywhere.
        </p>
      </Reveal>
    </Container>
  );
}
