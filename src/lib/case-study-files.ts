import fs from "node:fs";
import path from "node:path";

// Plain file reads only, no MDX import, so image routes stay light.
const CONTENT_DIR = path.join(process.cwd(), "content", "work");

export function getCaseStudySlugs() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Title from the frontmatter, read as plain text. */
export function getCaseStudyTitle(slug: string) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  return source.match(/^title:\s*(.+)$/m)?.[1].trim() ?? slug;
}
