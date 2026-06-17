// Soft geometric blog header emblems.
//
// Each post gets an *intentional, designed* abstract emblem (not procedural
// noise) whose composition symbolizes the article, drawn in one cohesive warm
// "clay & cream" palette so the blog reads as a family. Flat shapes, hairlines,
// generous negative space, a faint dot grid + light grain for texture.
//
// Deterministic and SSR-safe: geometry is fixed per motif (any trig output is
// rounded to strings), so server and client render identical markup.
//
// Usage:
//   <BlogHeader seed={post.slug} title={post.title} />            // motif from slug
//   <BlogHeader seed="x" title="X" motif="orbit" ratio={16/6} />  // force a motif

import { useMemo } from "react";

type Motif = "orbit" | "sunrise" | "moat" | "strata" | "venn";

/* --------------------------------- palette --------------------------------- */
const C = {
  bg: "#F0EADE", // warm cream
  bg2: "#E7DECE", // deeper cream for gradients
  ink: "#26221E", // near-black warm (hairlines)
  clay: "#C8694A", // primary accent
  rust: "#A23C24", // deep accent
  sand: "#E3C292", // light warm fill
  gold: "#E0A23E", // amber tie-in to the site accent
  water: "#7E9AA0", // single muted cool accent (for the moat)
};

/* --------------------------------- helpers --------------------------------- */
const r2 = (n: number) => n.toFixed(2);

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// Arc from angle a0 to a1 (degrees), clockwise in SVG's y-down space.
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${r2(p0.x)} ${r2(p0.y)} A ${r} ${r} 0 ${large} 1 ${r2(p1.x)} ${r2(
    p1.y
  )}`;
}

/* --------------------------------- motifs ---------------------------------- */
// Each motif is a pure function of the canvas size. cx/cy center the emblem;
// motifs are hand-composed for balance, not generated.

// "The agent native company" -> a connected system: a core with orbiting,
// linked nodes. Agents in a network.
function Orbit(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const S = Math.min(W, H); // motifs scale to the shorter side, so they fill
  const sw = 0.0032 * S; //   any aspect ratio (wide banner or square card)
  const rings = [0.18, 0.29, 0.4].map((f) => f * S);
  const nodes = [
    { rF: 0.29, deg: 200, fill: C.clay, sizeF: 0.026 },
    { rF: 0.29, deg: 325, fill: C.sand, sizeF: 0.019 },
    { rF: 0.29, deg: 92, fill: C.gold, sizeF: 0.017 },
    { rF: 0.4, deg: 26, fill: C.rust, sizeF: 0.024 },
    { rF: 0.4, deg: 158, fill: C.sand, sizeF: 0.017 },
    { rF: 0.4, deg: 258, fill: C.clay, sizeF: 0.019 },
  ];
  return (
    <g>
      {rings.map((r, i) => (
        <circle
          key={`ring${i}`}
          cx={cx}
          cy={cy}
          r={r2(r)}
          fill="none"
          stroke={C.ink}
          strokeOpacity={0.28}
          strokeWidth={sw}
        />
      ))}
      {nodes.slice(0, 3).map((n, i) => {
        const p = polar(cx, cy, n.rF * S, n.deg);
        return (
          <line
            key={`link${i}`}
            x1={cx}
            y1={cy}
            x2={r2(p.x)}
            y2={r2(p.y)}
            stroke={C.ink}
            strokeOpacity={0.2}
            strokeWidth={sw * 0.9}
          />
        );
      })}
      {nodes.map((n, i) => {
        const p = polar(cx, cy, n.rF * S, n.deg);
        return (
          <circle
            key={`node${i}`}
            cx={r2(p.x)}
            cy={r2(p.y)}
            r={r2(n.sizeF * S)}
            fill={n.fill}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r2(0.1 * S)} fill="none" stroke={C.clay} strokeOpacity={0.4} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r2(0.074 * S)} fill={C.clay} />
      <circle cx={cx} cy={cy} r={r2(0.032 * S)} fill={C.bg} />
    </g>
  );
}

// "No one (really) knows anything" / optimism -> a sunrise: a rising sun with
// arc rays over a low horizon. Hope, the underdog rising.
function Sunrise(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const S = Math.min(W, H);
  const horizon = cy + 0.15 * S;
  const sunR = 0.155 * S;
  const sw = 0.0048 * S;
  return (
    <g>
      <line
        x1={r2(W * 0.1)}
        y1={r2(horizon)}
        x2={r2(W * 0.9)}
        y2={r2(horizon)}
        stroke={C.ink}
        strokeOpacity={0.4}
        strokeWidth={sw}
      />
      {/* arc rays above the sun */}
      {[0.23, 0.3, 0.37].map((f, i) => (
        <path
          key={`ray${i}`}
          d={arcPath(cx, horizon, f * S, 182, 358)}
          fill="none"
          stroke={C.clay}
          strokeOpacity={0.5 - i * 0.12}
          strokeWidth={sw}
        />
      ))}
      {/* short radiating ticks */}
      {[205, 230, 250, 270, 290, 310, 335].map((deg, i) => {
        const a = polar(cx, horizon, 0.19 * S, deg);
        const b = polar(cx, horizon, 0.21 * S, deg);
        return (
          <line
            key={`tick${i}`}
            x1={r2(a.x)}
            y1={r2(a.y)}
            x2={r2(b.x)}
            y2={r2(b.y)}
            stroke={C.ink}
            strokeOpacity={0.3}
            strokeWidth={sw * 0.7}
          />
        );
      })}
      {/* the sun, sitting on the horizon (rising) */}
      <circle cx={cx} cy={r2(horizon)} r={r2(sunR)} fill="url(#bh-sun)" />
    </g>
  );
}

// "What are the real moats..." -> concentric defensive rings + water ring +
// a bridge to a central keep. Layered defense.
function MoatMotif(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const S = Math.min(W, H);
  const keep = 0.082 * S;
  const sw = 0.0032 * S;
  const bridge = 0.33 * S;
  const half = 0.021 * S;
  return (
    <g>
      {/* the moat (single muted cool accent) */}
      <circle
        cx={cx}
        cy={cy}
        r={r2(0.25 * S)}
        fill="none"
        stroke={C.water}
        strokeOpacity={0.3}
        strokeWidth={0.058 * S}
      />
      {/* defensive walls */}
      {[0.185, 0.28, 0.375].map((f, i) => (
        <circle
          key={`wall${i}`}
          cx={cx}
          cy={cy}
          r={r2(f * S)}
          fill="none"
          stroke={C.ink}
          strokeOpacity={0.3}
          strokeWidth={sw}
        />
      ))}
      {/* bridge across the moat to the right */}
      <rect x={cx} y={r2(cy - half)} width={r2(bridge)} height={r2(half * 2)} fill={C.sand} />
      <line x1={cx} y1={r2(cy - half)} x2={r2(cx + bridge)} y2={r2(cy - half)} stroke={C.ink} strokeOpacity={0.3} strokeWidth={sw * 0.9} />
      <line x1={cx} y1={r2(cy + half)} x2={r2(cx + bridge)} y2={r2(cy + half)} stroke={C.ink} strokeOpacity={0.3} strokeWidth={sw * 0.9} />
      {/* the keep */}
      <rect x={r2(cx - keep)} y={r2(cy - keep)} width={r2(keep * 2)} height={r2(keep * 2)} rx={r2(0.026 * S)} fill={C.clay} />
      <rect x={r2(cx - keep + 0.035 * S)} y={r2(cy - keep + 0.035 * S)} width={r2(keep * 2 - 0.07 * S)} height={r2(keep * 2 - 0.07 * S)} rx={r2(0.016 * S)} fill="none" stroke={C.bg} strokeOpacity={0.5} strokeWidth={sw} />
    </g>
  );
}

// Generic-but-pretty fallback: soft horizontal strata (layered landscape).
function Strata(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const S = Math.min(W, H);
  const left = W * 0.1;
  const right = W * 0.9;
  const bandH = 0.13 * S;
  const bands = [
    { off: -0.26, fill: C.sand, op: 0.9 },
    { off: -0.1, fill: C.gold, op: 0.85 },
    { off: 0.06, fill: C.clay, op: 0.9 },
    { off: 0.22, fill: C.rust, op: 0.85 },
  ];
  return (
    <g>
      {bands.map((b, i) => (
        <rect
          key={i}
          x={r2(left)}
          y={r2(cy + b.off * S)}
          width={r2(right - left)}
          height={r2(bandH)}
          rx={r2(bandH / 2)}
          fill={b.fill}
          fillOpacity={b.op}
        />
      ))}
      <circle cx={r2(cx + 0.26 * S)} cy={r2(cy - 0.36 * S)} r={r2(0.07 * S)} fill={C.clay} />
    </g>
  );
}

// Generic-but-pretty fallback: overlapping translucent discs.
function Venn(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const S = Math.min(W, H);
  const r = 0.24 * S;
  const discs = [
    { dx: -0.12, dy: 0.07, fill: C.clay },
    { dx: 0.12, dy: 0.07, fill: C.gold },
    { dx: 0, dy: -0.1, fill: C.rust },
  ];
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {discs.map((d, i) => (
        <circle
          key={i}
          cx={r2(cx + d.dx * S)}
          cy={r2(cy + d.dy * S)}
          r={r2(r)}
          fill={d.fill}
          fillOpacity={0.62}
        />
      ))}
    </g>
  );
}

const MOTIFS: Record<Motif, (W: number, H: number) => JSX.Element> = {
  orbit: Orbit,
  sunrise: Sunrise,
  moat: MoatMotif,
  strata: Strata,
  venn: Venn,
};

// Designed assignment for known posts; everything else falls back by hash so a
// new post never gets noise.
const SLUG_MOTIF: Record<string, Motif> = {
  "agent-native": "orbit",
  optimism: "sunrise",
  moats: "moat",
};

const FALLBACK_ORDER: Motif[] = ["orbit", "venn", "strata", "moat", "sunrise"];

function hashSeed(str = ""): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/* ------------------------------- main export ------------------------------- */

export type BlogHeaderProps = {
  /** Use the post slug. Picks the designed motif for known posts. */
  seed: string;
  /** Used for the accessible label. */
  title?: string;
  /** Force a motif instead of deriving it from the seed. */
  motif?: Motif;
  /** Width / height aspect ratio. Default 16 / 6. */
  ratio?: number;
  /** Corner radius in viewBox units. Default 18. */
  rounded?: number;
  /** Film-grain overlay. Default true. */
  grain?: boolean;
  /** Render only the emblem on a transparent canvas - no background tile,
   *  dot grid, grain, or border. Used for the social share cards. */
  bare?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function BlogHeader({
  seed,
  title,
  motif,
  ratio = 16 / 6,
  rounded = 18,
  grain = true,
  bare = false,
  className,
  style,
}: BlogHeaderProps) {
  const { W, H, motifName, idP } = useMemo(() => {
    const W = 1200;
    const H = Math.round(W / ratio);
    const h = hashSeed(seed);
    const motifName: Motif =
      motif || SLUG_MOTIF[seed] || FALLBACK_ORDER[h % FALLBACK_ORDER.length];
    return { W, H, motifName, idP: `bh-${(h % 99999).toString(36)}` };
  }, [seed, motif, ratio]);

  return (
    <svg
      role="img"
      aria-label={title ? `Illustration for: ${title}` : "Blog illustration"}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      className={className}
      style={{ display: "block", borderRadius: rounded, ...style }}
    >
      <defs>
        <clipPath id={`${idP}-clip`}>
          <rect x="0" y="0" width={W} height={H} rx={rounded} ry={rounded} />
        </clipPath>
        <linearGradient id="bh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.bg} />
          <stop offset="1" stopColor={C.bg2} />
        </linearGradient>
        <radialGradient id="bh-sun" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={C.gold} />
          <stop offset="1" stopColor={C.clay} />
        </radialGradient>
        <pattern
          id="bh-dots"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.1" fill={C.ink} fillOpacity={0.05} />
        </pattern>
        {grain && !bare && (
          <filter id={`${idP}-grain`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        )}
      </defs>

      {bare ? (
        // Just the emblem, on a transparent canvas (share cards).
        <g>{MOTIFS[motifName](W, H)}</g>
      ) : (
        <g clipPath={`url(#${idP}-clip)`}>
          <rect x="0" y="0" width={W} height={H} fill="url(#bh-bg)" />
          <rect x="0" y="0" width={W} height={H} fill="url(#bh-dots)" />

          {MOTIFS[motifName](W, H)}

          {grain && (
            <rect
              x="0"
              y="0"
              width={W}
              height={H}
              filter={`url(#${idP}-grain)`}
              opacity={0.05}
              style={{ mixBlendMode: "multiply" }}
            />
          )}
          <rect
            x="0.5"
            y="0.5"
            width={W - 1}
            height={H - 1}
            fill="none"
            stroke={C.ink}
            strokeOpacity={0.1}
            rx={rounded}
            ry={rounded}
          />
        </g>
      )}
    </svg>
  );
}
