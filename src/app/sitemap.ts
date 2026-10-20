import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCaseStudySlugs } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, priority: 1 },
    ...getCaseStudySlugs().map((slug) => ({ url: `${siteConfig.url}/work/${slug}`, priority: 0.8 })),
  ];
}
