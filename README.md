# Gbeke Odutuga · Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4 + MDX. Built from `gbeke-portfolio.md` (the PRD).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | Where |
| --- | --- |
| Site settings (email, LinkedIn, resume, URL) | `src/config/site.ts` |
| Home page project cards | `src/config/projects.ts` |
| Home page | `src/app/page.tsx` |
| Case studies (one MDX file each) | `content/work/{slug}.mdx` |
| Case study template | `src/app/work/[slug]/page.tsx` |
| Colour tokens, motion | `src/app/globals.css` |
| MDX building blocks | `src/mdx-components.tsx`, `src/components/case-study/` |

## Images

Put exported screens (flat, no frames) in `public/work/{slug}/` using the shot list names
(`cover-1.png`, `04-kyc-1.png`, ...). Phone/browser frames and the blue showcase panel are added in code.
Any missing image shows a placeholder with its file name, so the build never breaks.

Other files: `public/gbeke.jpg` (hero photo, square), `public/logos/{alotech,spleet,novacrust,youfanly}.svg`.

Raw, unsorted Figma exports go in `screens-raw/{slug}/`.

## Adding a case study

Drop a new `content/work/{slug}.mdx` with the same frontmatter as the others. It gets a page, sitemap entry
and OG image automatically. Then point its card in `src/config/projects.ts` at `/work/{slug}`.

MDX components available: `<Lead>`, `<Screens frame="phone|browser" images={[...]}/>`,
`<FlowDiagram steps={[...]}/>`, `<CardShowcase src alt/>`.

## Environment variables (set in Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_RESUME_URL` | Resume PDF link. The Resume item stays hidden until this is set. |
| `NEXT_PUBLIC_SITE_URL` | Set once a custom domain is added. Defaults to the Vercel URL. |

## Deploy

Push to GitHub and import the repo in Vercel. No extra config needed.
