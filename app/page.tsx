"use client";

import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Footer } from "@/components/footer";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { motion } from "motion/react";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

const links = ["about", "tech stack", "projects", "blogs"];

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-start justify-center">
      <section className="min-h-screen w-full flex gap-2">
        <section className="flex-[0.2] justify-center lg:flex md:flex flex-col gap-2 sm:hidden hidden items-end pr-10">
          {links.map((link, idx) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.4 }}
            >
              <Link
                key={link}
                style={space_grotesk.style}
                href={`/#${link.toLowerCase()}`}
                className="capitalize text-2xl font-bold tracking-tighter text-muted-foreground/40 hover:text-muted-foreground duration-300 cursor-alias"
              >
                {link.toLowerCase()}
              </Link>
            </motion.div>
          ))}
        </section>
        <section className="flex-[0.8] flex justify-center flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Logo className="text-4xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Greeting />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Links />
          </motion.div>
        </section>
      </section>

      <About />
      <Stack />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}
