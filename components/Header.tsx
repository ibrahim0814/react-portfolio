// trfce

import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-20 mx-auto flex max-w-7xl items-start justify-between p-5 xl:items-center">
      <motion.div
        initial={{
          opacity: 0,
          x: -500,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className=" flex flex-row items-center"
      >
        {/* Social Icons */}

        <SocialIcon
          url="https://www.linkedin.com/in/ibrahimamanali/"
          fgColor="gray"
          bgColor="transparent"
        />

        <SocialIcon
          url="https://www.github.com/ibrahim0814/"
          fgColor="gray"
          bgColor="transparent"
        />

        <SocialIcon
          url="https://www.twitter.com/ibrahim_0814/"
          fgColor="gray"
          bgColor="transparent"
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          x: 500,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex cursor-pointer flex-row items-center  text-gray-300"
      >
        {/* social icon for email */}

        <SocialIcon
          url="mailto:ibrhaim.0814@gmail.com"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
        <p className="hidden text-sm uppercase text-gray-400 md:inline-flex">
          Get in touch
        </p>
      </motion.div>
    </header>
  );
}
