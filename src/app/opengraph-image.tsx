import { ogSize, renderOg } from "@/lib/og";

export const alt = "Gbeke Odutuga, Product Designer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}
