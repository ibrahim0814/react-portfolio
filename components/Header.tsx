// trfce

import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-20 mx-auto flex max-w-7xl items-center justify-center p-5 backdrop-blur xl:items-center">
      {/* <div className="flex cursor-pointer flex-row items-center  text-gray-300">
   

       
        <p className="hidden text-sm uppercase text-gray-400 md:inline-flex">
          Get in touch
        </p>
      </div> */}

      <div className="pt-5">
        <Link href={"#about"}>
          <button className="heroButton">About</button>
        </Link>
        <Link href={"#experience"}>
          <button className="heroButton">Experience</button>
        </Link>

        <Link href={"#skills"}>
          <button className="heroButton">Skills</button>
        </Link>

        <Link href={"#projects"}>
          <button className="heroButton">Projects</button>
        </Link>
      </div>
    </header>
  );
}
