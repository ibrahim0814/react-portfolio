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
  const rings = [72, 128, 184];
  const nodes = [
    { r: 128, deg: 200, fill: C.clay, size: 11 },
    { r: 128, deg: 325, fill: C.sand, size: 8 },
    { r: 128, deg: 92, fill: C.gold, size: 7 },
    { r: 184, deg: 26, fill: C.rust, size: 10 },
    { r: 184, deg: 158, fill: C.sand, size: 7 },
    { r: 184, deg: 258, fill: C.clay, size: 8 },
  ];
  return (
    <g>
      {rings.map((r, i) => (
        <circle
          key={`ring${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={C.ink}
          strokeOpacity={0.28}
          strokeWidth={1.25}
        />
      ))}
      {nodes.slice(0, 3).map((n, i) => {
        const p = polar(cx, cy, n.r, n.deg);
        return (
          <line
            key={`link${i}`}
            x1={cx}
            y1={cy}
            x2={r2(p.x)}
            y2={r2(p.y)}
            stroke={C.ink}
            strokeOpacity={0.2}
            strokeWidth={1.1}
          />
        );
      })}
      {nodes.map((n, i) => {
        const p = polar(cx, cy, n.r, n.deg);
        return (
          <circle
            key={`node${i}`}
            cx={r2(p.x)}
            cy={r2(p.y)}
            r={n.size}
            fill={n.fill}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={42} fill="none" stroke={C.clay} strokeOpacity={0.4} strokeWidth={1.25} />
      <circle cx={cx} cy={cy} r={30} fill={C.clay} />
      <circle cx={cx} cy={cy} r={13} fill={C.bg} />
    </g>
  );
}

// "No one (really) knows anything" / optimism -> a sunrise: a rising sun with
// arc rays over a low horizon. Hope, the underdog rising.
function Sunrise(W: number, H: number) {
  const cx = W / 2;
  const horizon = H * 0.7;
  const sunR = 78;
  return (
    <g>
      <line
        x1={W * 0.1}
        y1={horizon}
        x2={W * 0.9}
        y2={horizon}
        stroke={C.ink}
        strokeOpacity={0.4}
        strokeWidth={1.25}
      />
      {/* arc rays above the sun */}
      {[112, 146, 180].map((r, i) => (
        <path
          key={`ray${i}`}
          d={arcPath(cx, horizon, r, 182, 358)}
          fill="none"
          stroke={C.clay}
          strokeOpacity={0.5 - i * 0.12}
          strokeWidth={2}
        />
      ))}
      {/* short radiating ticks */}
      {[205, 230, 250, 270, 290, 310, 335].map((deg, i) => {
        const a = polar(cx, horizon, 96, deg);
        const b = polar(cx, horizon, 104, deg);
        return (
          <line
            key={`tick${i}`}
            x1={r2(a.x)}
            y1={r2(a.y)}
            x2={r2(b.x)}
            y2={r2(b.y)}
            stroke={C.ink}
            strokeOpacity={0.3}
            strokeWidth={1.5}
          />
        );
      })}
      {/* the sun, sitting on the horizon (rising) */}
      <circle cx={cx} cy={horizon} r={sunR} fill="url(#bh-sun)" />
    </g>
  );
}

// "What are the real moats..." -> concentric defensive rings + water ring +
// a bridge to a central keep. Layered defense.
function MoatMotif(W: number, H: number) {
  const cx = W / 2;
  const cy = H / 2;
  const keep = 38;
  return (
    <g>
      {/* the moat (single muted cool accent) */}
      <circle
        cx={cx}
        cy={cy}
        r={114}
        fill="none"
        stroke={C.water}
        strokeOpacity={0.3}
        strokeWidth={26}
      />
      {/* defensive walls */}
      {[84, 128, 172].map((r, i) => (
        <circle
          key={`wall${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={C.ink}
          strokeOpacity={0.3}
          strokeWidth={1.25}
        />
      ))}
      {/* bridge across the moat to the right */}
      <rect x={cx} y={cy - 9} width={150} height={18} fill={C.sand} />
      <line x1={cx} y1={cy - 9} x2={cx + 150} y2={cy - 9} stroke={C.ink} strokeOpacity={0.3} strokeWidth={1.1} />
      <line x1={cx} y1={cy + 9} x2={cx + 150} y2={cy + 9} stroke={C.ink} strokeOpacity={0.3} strokeWidth={1.1} />
      {/* the keep */}
      <rect x={cx - keep} y={cy - keep} width={keep * 2} height={keep * 2} rx={10} fill={C.clay} />
      <rect x={cx - keep + 14} y={cy - keep + 14} width={keep * 2 - 28} height={keep * 2 - 28} rx={6} fill="none" stroke={C.bg} strokeOpacity={0.5} strokeWidth={1.5} />
    </g>
  );
}

// Generic-but-pretty fallback: soft horizontal strata (layered landscape).
function Strata(W: number, H: number) {
  const left = W * 0.12;
  const right = W * 0.88;
  const bands = [
    { y: H * 0.42, fill: C.sand, op: 0.9 },
    { y: H * 0.55, fill: C.gold, op: 0.85 },
    { y: H * 0.68, fill: C.clay, op: 0.9 },
    { y: H * 0.81, fill: C.rust, op: 0.85 },
  ];
  return (
    <g>
      {bands.map((b, i) => (
        <rect
          key={i}
          x={left}
          y={b.y}
          width={right - left}
          height={H * 0.085}
          rx={H * 0.0425}
          fill={b.fill}
          fillOpacity={b.op}
        />
      ))}
      <circle cx={W * 0.72} cy={H * 0.3} r={26} fill={C.clay} />
    </g>
  );
}

// Generic-but-pretty fallback: overlapping translucent discs.
function Venn(W: number, H: number) {
  const cy = H / 2;
  const r = 92;
  const discs = [
    { cx: W / 2 - 64, fill: C.clay },
    { cx: W / 2 + 64, fill: C.gold },
    { cx: W / 2, cyOff: -52, fill: C.rust },
  ];
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      {discs.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={cy + (d.cyOff ?? 28)}
          r={r}
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
        {grain && (
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
    </svg>
  );
}
