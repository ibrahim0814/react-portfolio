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
        gap: 56,
        padding: "0 80px",
        boxSizing: "border-box",
        background: "#F0EADE",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ flex: "0 0 480px" }}>
        <BlogHeader
          seed={seed}
          title={title}
          ratio={1}
          rounded={28}
          style={{ width: 480 }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: 480,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 25,
            fontWeight: 600,
            color: "#A23C24",
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            margin: "22px 0 0",
            fontSize: 60,
            lineHeight: 1.08,
            fontWeight: 700,
            color: "#26221E",
            letterSpacing: "-0.015em",
          }}
        >
          {title}
        </h1>
        <div style={{ marginTop: 28, fontSize: 30, color: "#6B5D50" }}>
          {subtitle}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 22,
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
