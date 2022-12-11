import React from "react";
import { motion } from "framer-motion";

type Props = {};

const BackgroundCircles = (props: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }}
      transition={{
        duration: 3,
      }}
      className="relative -z-10 flex items-center justify-center"
    >
      {/* <div className="absolute h-[200px] w-[200px] rounded-full border  border-[#333333]" /> */}
      <div className="absolute mt-52 h-[300px] w-[300px] animate-pulse rounded-full border border-[#333333] " />
      <div className="absolute mt-52 h-[450px] w-[450px] rounded-full border border-[#333333]  " />
      <div className="absolute mt-52 h-[650px] w-[650px] animate-pulse rounded-full border border-[#f7ab0a]  opacity-20" />
      <div className="absolute mt-52 h-[800px] w-[800px] rounded-full border border-[#333333] " />
    </motion.div>
  );
};

export default BackgroundCircles;
