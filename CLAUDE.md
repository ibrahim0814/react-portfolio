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
