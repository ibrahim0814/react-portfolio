// 1200x630 social share card: the post's emblem on the left, title + byline on
// the right, in the same warm palette. This is rendered by /og-preview/[slug]
// and rasterized to /public/og/<slug>.png by `npm run gen:og`. It is NOT shown
// to readers directly; it only exists to produce the link-preview image.

import BlogHeader from "./BlogHeader";

export type OgCardProps = {
  /** Post slug, drives the emblem motif. */
  seed: string;
  /** Big headline (the post title). */
  title: string;
  /** Small label above the title (e.g. the date, or "Ibrahim Ali"). */
  eyebrow?: string;
  /** Small line under the title. */
  subtitle?: string;
};

export default function OgCard({
  seed,
  title,
  eyebrow = "Ibrahim Ali",
  subtitle = "By Ibrahim Ali",
}: OgCardProps) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        alignItems: "center",
        gap: 60,
        padding: "0 84px",
        boxSizing: "border-box",
        background: "#F0EADE",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ flex: "0 0 470px" }}>
        <BlogHeader
          seed={seed}
          title={title}
          ratio={470 / 430}
          rounded={26}
          style={{ width: 470 }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: 430,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: 19,
            fontWeight: 600,
            color: "#A23C24",
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            margin: "20px 0 0",
            fontSize: 52,
            lineHeight: 1.12,
            fontWeight: 700,
            color: "#26221E",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>
        <div style={{ marginTop: 26, fontSize: 23, color: "#6B5D50" }}>
          {subtitle}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 19,
            letterSpacing: "0.04em",
            color: "#9A8B7C",
          }}
        >
          ibrahim0814.com
        </div>
      </div>
    </div>
  );
}
