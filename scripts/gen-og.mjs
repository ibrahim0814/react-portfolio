// Generate 1200x630 social preview images for every blog post.
//
// It screenshots the /og-preview/<slug> helper pages into public/og/<slug>.png
// (plus public/og/default.png). Run it whenever you add or edit a post.
//
//   1. Start the dev server:   npm run dev
//   2. In another terminal:    npm run gen:og            (all posts)
//                              npm run gen:og moats      (one or more slugs)
//
// Requires Playwright's Chromium once:  npx playwright install chromium
//
// Override the base URL with OG_BASE (e.g. to point at a preview deploy).

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.OG_BASE || "http://localhost:3000";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "og");

async function getSlugs() {
  const fromArgs = process.argv.slice(2);
  if (fromArgs.length) return fromArgs;
  const res = await fetch(`${BASE}/api/og-slugs`);
  if (!res.ok) throw new Error(`Could not fetch slugs from ${BASE} (is the dev server running?)`);
  return res.json();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const slugs = await getSlugs();
  // "default" maps to /og-preview (the index card), everything else to /og-preview/<slug>.
  const targets = [...slugs.map((s) => ({ slug: s, path: `/og-preview/${s}` })), { slug: "default", path: "/og-preview" }];

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  try {
    for (const { slug, path } of targets) {
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      const card = await page.$("div");
      const file = join(OUT, `${slug}.png`);
      await (card ?? page).screenshot({ path: file });
      console.log(`✓ ${slug}.png`);
    }
  } finally {
    await browser.close();
  }
  console.log(`\nWrote ${targets.length} images to public/og/`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
