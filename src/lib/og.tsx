import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const PAPER = "#ECE7DE";
const INK = "#1A1816";
const WINE = "#6B2A3A";
const MUTED = "#5A5750";

const fontDir = join(process.cwd(), "src/assets/fonts");

/** Shared Open Graph card: the gb. logo on paper, with the name beside it and an optional caption. */
export async function renderOg(caption?: string) {
  const [regular, italic] = await Promise.all([
    readFile(join(fontDir, "InstrumentSerif-Regular.ttf")),
    readFile(join(fontDir, "InstrumentSerif-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          background: PAPER,
          color: INK,
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 300, lineHeight: 1, letterSpacing: "-0.045em" }}>
          <span style={{ fontStyle: "italic", color: WINE }}>gb</span>
          <span style={{ color: INK }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1 }}>Gbekeloluwa Odutuga, Product Designer</div>
          {caption && <div style={{ fontSize: 36, lineHeight: 1.25, color: MUTED }}>{caption}</div>}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
