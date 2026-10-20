import Image from "next/image";
import { MissingImage } from "../frames";
import { publicFileExists } from "@/lib/public-file";

/** Large card illustration with a subtle tilt on hover (Novacrust 05). */
export function CardShowcase({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative left-1/2 my-12 w-[min(1100px,calc(100vw-48px))] -translate-x-1/2 rounded-[20px] bg-showcase px-6 py-12 md:py-20">
      <div className="group mx-auto max-w-[560px] [perspective:1200px]">
        <div className="relative aspect-[1.586] transition-transform duration-300 ease-out group-hover:[transform:rotateX(6deg)_rotateY(-10deg)]">
          {publicFileExists(src) ? (
            <Image src={src} alt={alt} fill sizes="(min-width: 768px) 560px, 90vw" className="object-contain drop-shadow-2xl" />
          ) : (
            <MissingImage src={src} />
          )}
        </div>
      </div>
    </div>
  );
}
