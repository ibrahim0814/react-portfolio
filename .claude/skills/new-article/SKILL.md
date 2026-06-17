---
name: new-article
description: Publish a new blog post for this portfolio end to end - add the post to lib/posts.ts, assign its generative emblem, generate the 1200x630 social preview image, and verify link-preview meta tags. Use whenever creating, adding, or publishing a new blog article/post.
---

# Publish a new blog article

Follow every step. The goal: a new post that has both its on-page emblem and a
working link-preview (Open Graph) image, with no manual asset wrangling.

## 1. Add the post content

Edit `lib/posts.ts` and add a `Post` to the `posts` array.

- `slug`: short and punchy, NOT a literal slugification of the title
  (e.g. "The agent native company" -> `agent-native`). Keep it unique.
- `date`: ISO `yyyy-mm-dd`.
- `excerpt`: one sentence. This becomes the meta description / preview text.
- `content`: an array of blocks (`{ type: "p", text }` or
  `{ type: "ol", items: [{ heading, body }] }`).
- NO em dashes (—) anywhere in post content or the excerpt. Use periods,
  commas, semicolons, or colons.

## 2. Assign the emblem motif

The post's header art and its share-card emblem both come from the motif mapped
to the slug in `components/BlogHeader.tsx` (`SLUG_MOTIF`). Add an entry:

```ts
const SLUG_MOTIF: Record<string, Motif> = {
  ...,
  "your-slug": "orbit",
};
```

Pick the motif whose meaning fits the article. Available motifs:

- `orbit`  - a core with linked orbiting nodes. Networks, systems, agents, connection.
- `sunrise`- a rising sun + rays over a horizon. Optimism, hope, beginnings, growth.
- `moat`   - concentric walls, water ring, bridge to a keep. Defense, advantage, strategy.
- `strata` - soft stacked layers. Foundations, structure, building up.
- `venn`   - overlapping discs. Overlap, ideas, tradeoffs, intersection.

If none fit, add a new motif: write a `function NewMotif(W, H)` in
`BlogHeader.tsx` (round any trig output with `r2(...)` to stay SSR-safe),
register it in `MOTIFS` and the `Motif` type, and add it to `FALLBACK_ORDER`.
Keep it in the existing palette `C` (clay / cream / sand / gold + the single
`water` accent) with generous negative space.

## 3. Generate the social preview image

The link-preview image lives at `public/og/<slug>.png` (1200x630). Generate it:

```bash
npm run dev          # in one terminal (if not already running)
npm run gen:og <slug>   # in another; omit <slug> to regenerate all
```

This screenshots `/og-preview/<slug>` (emblem + title card) into
`public/og/<slug>.png`. First time only: `npx playwright install chromium`.

If a headless browser is unavailable, render `http://localhost:3000/og-preview/<slug>`
at a 1200x630 viewport and save the screenshot to `public/og/<slug>.png` by any
means - the file path is what matters.

Confirm the PNG exists and looks right (emblem left, title + "By Ibrahim Ali"
right, `ibrahim0814.com` footer).

## 4. Verify the link-preview meta tags

These are already templated per post in `pages/b/[slug].tsx` (og:title,
og:description, og:image -> `ogImage(slug)`, twitter:card=summary_large_image,
etc.) using `SITE_URL` from `lib/site.ts`. You do NOT edit them per post. Just
confirm:

- `lib/site.ts` `SITE_URL` is the canonical host `https://www.ibrahim0814.com`
  (the apex 301-redirects to www, and scrapers won't follow a redirected
  og:image - so the www host is required).
- `public/og/<slug>.png` exists (step 3), so `og:image` resolves once deployed.

Optional sanity check: load `http://localhost:3000/b/<slug>` and confirm the
`<head>` contains `og:image` pointing at `/og/<slug>.png`.

## 5. Ship

```bash
npx tsc --noEmit     # required before committing
```

Commit the post, the `SLUG_MOTIF` change, and `public/og/<slug>.png` directly to
`main`; Netlify deploys from there.

## Notes

- Emblems are intentionally NOT shown on the blog list (`/b`); only on the
  article page and the share card.
- After deploy, validate the real preview with a debugger such as
  opengraph.xyz or the platform's own card validator (caches can be sticky).
