// After `next build`: once launched (src/data/launch.json), drop the "noindex" header from out/_headers.
import { readFileSync, writeFileSync } from "node:fs";

const launch = JSON.parse(readFileSync(new URL("../src/data/launch.json", import.meta.url), "utf8"));
const file = new URL("../out/_headers", import.meta.url);
let headers = readFileSync(file, "utf8");
if (launch.launched) {
  headers = headers.replace(/^\s*X-Robots-Tag:.*\n/m, "");
  writeFileSync(file, headers);
  console.log("postbuild: launched – search engines allowed (X-Robots-Tag removed).");
} else {
  console.log("postbuild: not launched – site stays noindex.");
}
