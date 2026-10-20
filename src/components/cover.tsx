import Image from "next/image";
import { publicFileExists } from "@/lib/public-file";
import { BrowserFrame, MissingImage, PhoneFrame } from "./frames";

/** Card cover composed in code: 2 to 3 screens, slightly overlapped, on the showcase panel. */
export function Cover({
  slug,
  name,
  frame,
  priority = false,
  covers,
  coverImage,
}: {
  slug: string;
  name: string;
  frame: "phone" | "browser";
  priority?: boolean;
  covers?: string[];
  coverImage?: { src: string; alt: string };
}) {
  if (coverImage) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-showcase ring-1 ring-stroke">
        {publicFileExists(coverImage.src) ? (
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 560px, 92vw"
            className="object-cover object-center"
          />
        ) : (
          <MissingImage src={coverImage.src} />
        )}
      </div>
    );
  }

  const srcs = covers ?? [1, 2, 3].map((n) => `/work/${slug}/cover-${n}.png`);
  const Frame = frame === "phone" ? PhoneFrame : BrowserFrame;

  const layout =
    frame === "phone"
      ? [
          "left-[9%] top-[16%] w-[27%]",
          "left-1/2 top-[9%] z-10 w-[29%] -translate-x-1/2",
          "right-[9%] top-[16%] w-[27%]",
        ]
      : ["left-[6%] top-[10%] w-[62%]", "right-[6%] top-[30%] z-10 w-[56%]", "left-[22%] top-[52%] z-20 w-[50%]"];

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-showcase">
      {srcs.slice(0, 3).map((src, i) => (
        <div key={src} className={`absolute ${layout[i]}`}>
          <Frame>
            {publicFileExists(src) ? (
              <Image
                src={src}
                alt={`${name} screen ${i + 1}`}
                fill
                priority={priority}
                sizes="(min-width: 768px) 200px, 30vw"
                className="object-cover object-top"
              />
            ) : (
              <MissingImage src={src} />
            )}
          </Frame>
        </div>
      ))}
    </div>
  );
}
