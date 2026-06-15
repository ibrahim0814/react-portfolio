import React from "react";
import { motion } from "framer-motion";

type Props = {};

// All rings share the same start, easing, and reversing rhythm so they pulse
// in a synchronized way. Durations are harmonically staggered (2/3/4/5s) for
// different frequencies, and each ring breathes through its own opacity range
// for different brightness — a clearly visible fade in and out. The inner ring
// keeps a higher floor so the concentric look always holds; the yellow ring is
// the brightest accent.
const rings = [
  { size: 300, color: "#333333", duration: 2, opacity: [0.3, 1] },
  { size: 450, color: "#333333", duration: 3, opacity: [0.18, 0.8] },
  { size: 650, color: "#f7ab0a", duration: 4, opacity: [0.15, 0.65] },
  { size: 800, color: "#333333", duration: 5, opacity: [0.12, 0.6] },
];

const BackgroundCircles = (props: Props) => {
  return (
    <div className="relative -z-10 flex items-center justify-center">
      {rings.map((ring) => (
        <motion.div
          key={ring.size}
          className="absolute mt-52 rounded-full border"
          style={{
            height: ring.size,
            width: ring.size,
            borderColor: ring.color,
          }}
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
