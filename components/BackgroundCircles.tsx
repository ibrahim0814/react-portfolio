import React from "react";
import { motion } from "framer-motion";

type Props = {};

// All rings share the same start, easing, and reversing rhythm so they pulse
// in a synchronized way. Durations are harmonically staggered (2/3/4/5s) for
// different frequencies, and each ring breathes through its own opacity range
// for different brightness — a clearly visible fade in and out. The inner ring
// keeps a higher floor so the concentric look always holds; the yellow ring is
// the brightest accent.
//
// Sizes are responsive: on phones they scale with the viewport width (vw) so
// the circles fill the screen and grow on larger phones, while staying clear of
// the top on short viewports (portrait height always exceeds width, so a
// width-relative ring fits vertically). From the `sm` breakpoint up they switch
// to the original fixed pixel sizes.
const rings = [
  {
    key: "r1",
    sizeClass: "h-[72vw] w-[72vw] sm:h-[300px] sm:w-[300px]",
    color: "#333333",
    duration: 2,
    opacity: [0.3, 1],
  },
  {
    key: "r2",
    sizeClass: "h-[102vw] w-[102vw] sm:h-[450px] sm:w-[450px]",
    color: "#333333",
    duration: 3,
    opacity: [0.18, 0.8],
  },
  {
    key: "r3",
    sizeClass: "h-[126vw] w-[126vw] sm:h-[650px] sm:w-[650px]",
    color: "#f7ab0a",
    duration: 4,
    opacity: [0.15, 0.65],
  },
  {
    key: "r4",
    sizeClass: "h-[152vw] w-[152vw] sm:h-[800px] sm:w-[800px]",
    color: "#333333",
    duration: 5,
    opacity: [0.12, 0.6],
  },
];

const BackgroundCircles = (props: Props) => {
  return (
    <div className="relative -z-10 flex items-center justify-center">
      {rings.map((ring) => (
        <motion.div
          key={ring.key}
          className={`absolute mt-40 rounded-full border sm:mt-52 ${ring.sizeClass}`}
          style={{ borderColor: ring.color }}
          initial={{ opacity: ring.opacity[0] }}
          animate={{ opacity: ring.opacity }}
          transition={{
            duration: ring.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundCircles;
