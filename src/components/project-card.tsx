import Link from "next/link";
import type { Project } from "@/config/projects";
import { Cover } from "./cover";
import { ArrowUpRight } from "./external-link";
import { Pill } from "./pill";
import { Reveal } from "./reveal";

/** The whole card is one link; the "button" is a styled span inside it. */
export function ProjectCard({ project, size = "large", priority = false }: { project: Project; size?: "large" | "small"; priority?: boolean }) {
  const { name, tags, oneLiner, href, external, actionLabel, note } = project;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const LinkTag = external ? "a" : Link;

  return (
    <Reveal>
      <LinkTag
        href={href}
        {...linkProps}
        className="lift surface-fade group flex h-full flex-col rounded-[22px] border border-border bg-surface/70 p-3 md:p-4"
      >
        <Cover slug={project.slug} name={name} frame={project.frame} priority={priority} coverImage={project.coverImage} />
        <div className={`flex flex-1 flex-col px-2 pb-2 ${size === "large" ? "pt-6" : "pt-5"}`}>
          <h3 className={`font-display ${size === "large" ? "text-[34px]" : "text-[30px]"} leading-none`}>{name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
            {note && <Pill variant="muted">{note}</Pill>}
          </div>
          <p className="mt-4 text-muted">{oneLiner}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-bg transition-colors group-hover:bg-accent">
            {actionLabel}
            {external ? <ArrowUpRight /> : <span aria-hidden>→</span>}
          </span>
          {external && <span className="sr-only">(opens in a new tab)</span>}
        </div>
      </LinkTag>
    </Reveal>
  );
}
