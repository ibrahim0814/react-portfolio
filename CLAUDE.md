# CLAUDE.md

## Blog post slugs

Keep post slugs short and punchy rather than a literal slugification of the
title. Prefer the shortest phrase that still identifies the post (e.g. the post
titled "The agent native company" uses the slug `agent-native`, not
`agent-native-company`).

## No em dashes

When publishing or editing blog post content, do not add em dashes (—). Use
periods, commas, semicolons, or colons instead. This applies to post excerpts
(the slug sentence) as well.

## Byline

Show the author byline ("By Ibrahim Ali") below the post title, not on the date
line above it. The byline lives in the post template (`pages/b/[slug].tsx`) so
it applies to every post automatically.

## Publishing flow

Blog posts are authored inline in `lib/posts.ts` as structured content blocks.
Commit post changes directly to `main`; Netlify deploys from there. Run
`npx tsc --noEmit` before committing.

## Creating a new article (REQUIRED process)

Whenever creating, adding, or publishing a new blog post, use the
`new-article` skill (`.claude/skills/new-article/SKILL.md`) and follow it end to
end. Every new post MUST get both:

1. An emblem motif mapped to its slug in `components/BlogHeader.tsx`
   (`SLUG_MOTIF`) - this drives the article header art and the share card.
2. A generated link-preview image at `public/og/<slug>.png` via
   `npm run gen:og <slug>` (dev server must be running).

The Open Graph / Twitter meta tags are already templated per post in
`pages/b/[slug].tsx`, so they need no per-post edits - but the `public/og/<slug>.png`
file must exist or the preview image will 404. Do not skip the image generation
step.
