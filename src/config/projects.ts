// Home page project cards. Case study content lives in /content/work/{slug}.mdx.

export type Frame = "phone" | "browser";

export type Project = {
  slug: string;
  name: string;
  tags: string[];
  oneLiner: string;
  frame: Frame;
  /** Internal case study route, or an external live link. */
  href: string;
  external?: boolean;
  actionLabel: string;
  /** Small muted pill, e.g. "Full story coming soon". */
  note?: string;
  /** A finished cover image, shown instead of the composed screens. */
  coverImage?: { src: string; alt: string };
};

export const selectedWork: Project[] = [
  {
    slug: "novacrust",
    name: "Novacrust",
    tags: ["Fintech", "Cross-border payments"],
    oneLiner: "Making it easier to send and receive money across borders.",
    frame: "phone",
    href: "/work/novacrust",
    actionLabel: "Read case study",
    coverImage: {
      src: "/work/novacrust/cover-v2.png",
      alt: "The Novacrust logo above the green Novacrust virtual card on a mint background",
    },
  },
  {
    slug: "clearfine",
    name: "Clearfine",
    tags: ["Mobility", "Consumer", "Personal admin"],
    oneLiner:
      "Helping UK drivers track fines, stay on top of deadlines and pay without the stress. 80+ screens shipped.",
    frame: "phone",
    href: "/work/clearfine",
    actionLabel: "Read case study",
    coverImage: {
      src: "/work/clearfine/cover.png",
      alt: "Two Clearfine iPhone screens: the home screen with recent fines and their statuses, and the Add a fine screen",
    },
  },
  {
    slug: "youfanly",
    name: "Youfanly",
    tags: ["Creator platforms"],
    oneLiner:
      "Helping African creators share exclusive content and get paid by their fans.",
    frame: "browser",
    href: "/work/youfanly",
    actionLabel: "Read case study",
    coverImage: {
      src: "/work/youfanly/cover.png",
      alt: "Youfanly creator profile with subscription tiers next to a creator post with a Send a tip button",
    },
  },
  {
    slug: "spleet",
    name: "Spleet",
    tags: ["Proptech", "Fintech", "SaaS"],
    oneLiner:
      "Helping Lagos renters find homes and pay rent flexibly. Designed across the renter app, landlord tools, admin dashboard and shortlets.",
    frame: "browser",
    href: "https://spleet.africa",
    external: true,
    actionLabel: "Try it live",
    coverImage: {
      src: "/work/spleet/cover.png",
      alt: "The Spleet logo in navy, blue and green on a mint background",
    },
  },
];

export const moreWork: Project[] = [
  {
    slug: "owa",
    name: "Owa",
    tags: ["Side project", "Design + build"],
    oneLiner:
      "Bus directions for Lagos using landmarks, the way we actually give directions. Designed and built by me.",
    frame: "browser",
    href: "https://owa-one.vercel.app/",
    external: true,
    actionLabel: "Try it live",
    coverImage: {
      src: "/work/owa/cover.png",
      alt: "The Owa logo: a white lowercase \"owa\" with a gold full stop on a dark navy background",
    },
    note: "Full story coming soon",
  },
  {
    slug: "credited",
    name: "Credited",
    tags: ["Music", "Consumer"],
    oneLiner:
      "Music discovery for people who want to know who's behind their favourite songs.",
    frame: "phone",
    href: "https://apps.apple.com/ng/app/credited/id6475773549",
    external: true,
    actionLabel: "Try it live",
    coverImage: {
      src: "/work/credited/cover.png",
      alt: "Two Credited screens: the Tap to identify home screen, and a song's credits listing its artists, songwriters and composers",
    },
  },
];
