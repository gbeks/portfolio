import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { MissingImage } from "../frames";

/** Width and height from a PNG header, so wide images keep their real shape. */
async function pngSize(src: string) {
  "use cache";
  const file = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(file)) return null;
  const header = Buffer.alloc(24);
  const fd = fs.openSync(file, "r");
  fs.readSync(fd, header, 0, 24, 0);
  fs.closeSync(fd);
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/** A wide image (diagram, journey map) on the showcase panel, unframed and uncropped. */
export async function Figure({ src, alt }: { src: string; alt: string }) {
  const size = await pngSize(src);
  return (
    <figure className="relative left-1/2 my-12 w-[min(1100px,calc(100vw-48px))] -translate-x-1/2 rounded-[20px] bg-showcase p-4 md:my-16 md:p-8">
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          sizes="(min-width: 1100px) 1040px, 90vw"
          className="h-auto w-full rounded-[12px] ring-1 ring-stroke"
        />
      ) : (
        <div className="relative aspect-[16/6]">
          <MissingImage src={src} />
        </div>
      )}
    </figure>
  );
}
