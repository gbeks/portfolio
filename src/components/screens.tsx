import { publicFileExists } from "@/lib/public-file";
import { ScreenGroup } from "./screen-group";

type Props = {
  frame?: "phone" | "browser";
  images: { src: string; alt: string }[];
};

/** Use in MDX: <Screens frame="phone" images={[{ src: "/work/x/a.png", alt: "..." }]} /> */
export function Screens({ frame = "phone", images }: Props) {
  // More than 4 screens become several panels of up to 4.
  const groups: Props["images"][] = [];
  for (let i = 0; i < images.length; i += 4) groups.push(images.slice(i, i + 4));

  return (
    <div className="relative left-1/2 w-[min(1100px,calc(100vw-48px))] -translate-x-1/2">
      {groups.map((group, i) => (
        <ScreenGroup
          key={i}
          frame={frame}
          screens={group.map((img) => ({ ...img, exists: publicFileExists(img.src) }))}
        />
      ))}
    </div>
  );
}
