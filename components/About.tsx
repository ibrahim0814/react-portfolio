import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Headshot2 from "../public/headshot-2.jpg";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="relative mx-auto flex h-screen max-w-7xl flex-col items-center justify-evenly px-10 lg:grid lg:grid-cols-2 ">
      <h3 className="absolute top-24 text-center text-xl uppercase tracking-[10px] text-gray-500 lg:left-[45%]">
        About me
      </h3>

      <div>
        <Image
          src={Headshot2.src}
          width={Headshot2.width}
          height={Headshot2.height}
          // object cover means it won't distort the image
          // flex shrink won't make the image smaller than its original size
          // -mb-20 means it will be 20px below the bottom of the container
          className="-mb-20 h-56 w-56 rounded-full object-cover lg:h-[500px]  lg:w-[400px] lg:flex-shrink-0 lg:rounded-lg "
          alt="Ibrahim Ali's Headshot"
        />
      </div>

      <div className="space-y-10 px-0 text-center md:px-10 lg:text-left">
        <h4 className=" text-2xl font-semibold uppercase tracking-[2px] text-gray-400">
          My Background
        </h4>
        <p className="text-base">
          {`Hi, I'm Ibrahim! I'm a software engineer based in San Diego, California. I'm passionate about building web applications and crafting great user experiences. I've worked professionally in the industry for two years, currently building applications and tools for networking technologies at Microsoft. When I'm not coding, I like reading, listening to podcasts, and everything basketball.`}
        </p>
      </div>
    </div>
  );
};

export default About;
