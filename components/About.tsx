import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Headshot2 from "../public/headshot-2.jpg";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-10 px-6 py-28 lg:grid lg:grid-cols-2 lg:justify-evenly lg:gap-0 lg:px-10 lg:py-0">
      <h3 className="absolute top-10 text-center text-lg uppercase tracking-[8px] text-gray-500 sm:text-xl sm:tracking-[10px] lg:left-[45%]">
        About me
      </h3>

      <div className="flex justify-center">
        <Image
          src={Headshot2.src}
          width={Headshot2.width}
          height={Headshot2.height}
          // object cover means it won't distort the image
          // negative bottom margin only applies on large (side-by-side) layout
          className="h-56 w-56 rounded-full object-cover lg:-mb-20 lg:h-[500px] lg:w-[400px] lg:flex-shrink-0 lg:rounded-lg"
          alt="Ibrahim Ali's Headshot"
        />
      </div>

      <div className="space-y-6 px-0 text-left md:px-10 lg:space-y-10">
        <h4 className=" text-2xl font-semibold uppercase tracking-[2px] text-gray-400">
          My Background
        </h4>
        <p className="text-base">
          {`Hi, I'm Ibrahim! I'm a software engineer based in San Francisco, California. I'm currently at Bluenote AI, a company building AI for the life sciences industry, where I work on AI-powered products and the infrastructure behind them. Before Bluenote, I worked as a software engineer at Microsoft and at Codecov, where I released their first GitHub Action, now adopted in over 300k repositories. I studied Computer Science and Engineering Management at Vanderbilt University (Class of 2020). When I'm not coding, I like reading, listening to podcasts, and everything basketball.`}{" "}
          If I&apos;m thinking too much about a certain topic, I write my
          thoughts down in my{" "}
          <Link
            href="/b"
            className="text-[#f7ab0a] underline-offset-4 transition-opacity hover:underline hover:opacity-80"
          >
            blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
