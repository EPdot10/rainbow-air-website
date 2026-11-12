#!/usr/bin/env node
/**
 * Downloads every image in src/data/images.ts, converts it to optimised WebP
 * (max 2400px wide) in public/images/, and writes src/data/image-manifest.json
 * so the site serves local copies instead of remote hotlinks.
 *
 *   npm run images:download
 *
 * Only run this for images you are permitted to self-host (Unsplash photos are;
 * Midea product images need Midea's permission before public launch).
 * Pass --stock-only to skip product (Midea) images.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = await readFile(path.join(root, "src/data/images.ts"), "utf8");
const stockOnly = process.argv.includes("--stock-only");

// Lightweight parse of the registry: each entry has id, remote (literal or unsplash("…")) and kind.
const entries = [...src.matchAll(/id:\s*"([^"]+)",\s*remote:\s*(unsplash\("([^"]+)"\)|"([^"]+)"),[\s\S]*?kind:\s*"(\w+)"/g)].map((m) => ({
  id: m[1],
  url: m[3] ? `https://images.unsplash.com/photo-${m[3]}?auto=format&fit=crop&q=80&w=2400` : m[4],
  kind: m[5],
}));

const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });
const manifestPath = path.join(root, "src/data/image-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));

for (const e of entries) {
  if (stockOnly && e.kind !== "stock") continue;
  try {
    const res = await fetch(e.url, { headers: { "User-Agent": "rainbow-air-website image sync" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const file = `${e.id}.webp`;
    await sharp(buf).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: e.kind === "product" ? 88 : 78 }).toFile(path.join(outDir, file));
    manifest[e.id] = `/images/${file}`;
    console.log(`✓ ${e.id}`);
  } catch (err) {
    console.warn(`✗ ${e.id}: ${err.message} (remote URL will keep being used)`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nManifest updated: ${Object.keys(manifest).length} local image(s). Commit public/images and the manifest.`);
