"use client";

import { Section } from "./ui/section";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";

export function About() {
  return (
    <Section title="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-sm lg:text-md md:text-md sm:text-sm"
      >
        <p>
          Hey, I'm <span className="font-bold">Khushal Bhardwaj</span> a Full
          Stack Web Developer based in Jaipur, India. Passionate about building
          web apps with React/NextJS. I'm also an undergrad at VIT Bhopal
          University.
        </p>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
          <p>
            Other than programming, I write blogs. I've developed a hobby of
            writing blogs, mostly technical. Although I may not be following it
            that regularly, you might think, but I do love it.
          </p>
          <p>
            I developed this habit of writing mainly because I was forced to
            under my academic curriculum, so rather than taking it as a burden I
            quite enjoy it. I've developed this unique or I would rather say
            "writing with personality". I know these are big words for literally
            technical blogging, but I feel like writing it 😜.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
