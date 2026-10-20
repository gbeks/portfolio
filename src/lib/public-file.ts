import fs from "node:fs";
import path from "node:path";

/** True when a file exists under /public, e.g. publicFileExists("/gbeke.jpg"). */
export function publicFileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
