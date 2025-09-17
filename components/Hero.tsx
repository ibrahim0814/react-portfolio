/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import headshot from "../public/headshot.jpg";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    loop: true,
    delaySpeed: 2000,
    words: ["Software Engineer", "Web Developer", "Designer"],
  });
  return (
    <div className="mt-8 flex h-screen flex-col items-center justify-center overflow-hidden text-center">
      <BackgroundCircles />
      <Image
        className="mx-auto h-32 w-32 rounded-full object-cover"
        src={headshot.src}
        height={headshot.height}
        width={headshot.width}
        alt={"Ibrahim Ali's Headshot"}
      />
      <div className="z-20">
        <h1 className="mt-8 text-4xl font-semibold text-gray-400">
          Ibrahim Ali
        </h1>

        <h1 className="lg:4xl p-3 text-3xl">
          <span>{text}</span>
          <Cursor cursorColor="#F7ab0a" />
        </h1>
      </div>
      <div className=" flex flex-row items-center">
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
        <SocialIcon
          url="mailto:ibrhaim.0814@gmail.com"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
      </div>
    </div>
  );
};

export default Hero;
