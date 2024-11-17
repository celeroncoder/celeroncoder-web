import { Section } from "./ui/section";
import { StackCard } from "./ui/stack-card";
import type { Stack } from "./ui/stack-card";
import { motion } from "motion/react";

const stacks: Stack[] = [
  {
    title: "Typescript",
    imgUrl: "/typescript.svg",
  },
  {
    title: "Next.Js",
    imgUrl: "/nextjs.svg",
  },
  {
    title: "tRPC",
    imgUrl: "/trpc.svg",
  },
  {
    title: "Express.Js",
    imgUrl: "/expressjs.svg",
  },
  {
    title: "Prisma",
    imgUrl: "/prisma.svg",
  },
  {
    title: "Tailwind Css",
    imgUrl: "/tailwindcss.svg",
  },
];

export function Stack() {
  return (
    <Section title="tech stack">
      <div className="w-full flex flex-wrap gap-4 md:justify-start lg:justify-start sm:justify-center justify-center">
        {stacks.map((stack, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.4 }}
          >
            <StackCard
              imgUrl={stack.imgUrl}
              title={stack.title}
              key={stack.title}
            />{" "}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
