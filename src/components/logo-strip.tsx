import type { CSSProperties } from "react";
import { publicFileExists } from "@/lib/public-file";
import { ArrowUpRight } from "./external-link";

/** Widths are tuned by eye so each logo reads at the same visual size. Logos without a confirmed site have no url. */
const logos = [
  { name: "Spleet", file: "/logos/spleet.png", width: 100, url: "https://www.spleet.africa" },
  { name: "AloTech Labs", file: "/logos/alotech.png", width: 118 },
  { name: "Novacrust", file: "/logos/novacrust.png", width: 150, url: "https://novacrust.com/" },
  { name: "Youfanly", file: "/logos/youfanly.png", width: 118, url: "https://www.youfanly.com/" },
];

export function LogoStrip() {
  return (
    <section aria-labelledby="logos-label" className="py-16 md:py-24">
      <p id="logos-label" className="text-[13px] font-medium text-muted">
        Teams I’ve designed with. Tap a logo to visit.
      </p>
      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-14">
        {logos.map((logo) => {
          if (!publicFileExists(logo.file)) {
            return (
              <li key={logo.name}>
                <span className="text-base font-semibold tracking-[-0.01em] text-muted">{logo.name}</span>
              </li>
            );
          }
          // Width scales with the 24px (mobile) / 32px (desktop) height so proportions hold.
          const style = { "--logo": `url(${logo.file})`, "--w": logo.width } as CSSProperties;
          return (
            <li key={logo.name}>
              {logo.url ? (
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${logo.name} (opens in a new tab)`}
                  className="logo-link group relative inline-block pr-3.5"
                >
                  <span className="client-logo" style={style} />
                  <ArrowUpRight className="absolute -top-1.5 right-0 size-3 text-muted transition-colors group-hover:text-accent group-focus-visible:text-accent" />
                </a>
              ) : (
                <span role="img" aria-label={logo.name} className="client-logo" style={style} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
