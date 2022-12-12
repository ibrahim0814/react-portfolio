/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import headshot from "../public/headshot.jpg";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    loop: true,
    delaySpeed: 2000,
    words: ["Software Engineer", "Web Developer", "Designer"],
  });
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden text-center">
      <BackgroundCircles />
      <Image
        className="mx-auto h-32 w-32 rounded-full object-cover"
        src={headshot.src}
        height={headshot.height}
        width={headshot.width}
        alt={"Ibrahim Ali's Headshot"}
      />
      <div className="z-20">
        <h1 className="text-4xl font-semibold text-gray-400">Ibrahim Ali</h1>

        <h1 className="lg:4xl p-3 text-3xl">
          <span>{text}</span>
          <Cursor cursorColor="#F7ab0a" />
        </h1>

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
      </div>
    </div>
  );
};

export default Hero;
