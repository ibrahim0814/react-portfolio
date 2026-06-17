// Default share card (used for /b and any page without a per-post image).
// Screenshotted into /public/og/default.png by `npm run gen:og`.

import OgCard from "../../components/OgCard";

export default function OgPreviewDefault() {
  return (
    <div style={{ margin: 0, width: 1200, height: 630, overflow: "hidden" }}>
      <OgCard
        seed="blog"
        title="Writing about software and life"
        eyebrow="Ibrahim Ali"
        subtitle="ibrahim0814.com/b"
      />
    </div>
  );
}
