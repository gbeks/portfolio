// Site-wide settings. Edit these instead of hunting through components.

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Gbekeloluwa Odutuga",
  shortName: "Gbeke",
  title: "Gbeke Odutuga, Product Designer",
  description: "Product designer in Lagos making products people enjoy using. See my work.",
  // Set NEXT_PUBLIC_SITE_URL once a custom domain is added. Falls back to the Vercel URL.
  url: siteUrl(),
  email: "gbekex@gmail.com",
  linkedin: "https://www.linkedin.com/in/gbeke-odutuga-209057218",
  // Shown in the nav and contact section. NEXT_PUBLIC_RESUME_URL can override it; an empty value hides the links.
  resumeUrl:
    process.env.NEXT_PUBLIC_RESUME_URL ??
    "https://docs.google.com/document/d/1bsxls0D15e5lY9nPuDjlHln5B4JWdpBT8QOL-vczU2w/edit?usp=sharing",
};
