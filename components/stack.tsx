import { Section } from "./ui/section";
import { Stack, StackCard } from "./ui/stack-card";

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
    imgUrl: "/tRPC.svg",
  },
  {
    title: "Express.Js",
    imgUrl: "/expressjs.svg",
  },
];

export function Stack() {
  return (
    <Section title="stack">
      <div className="w-full flex flex-wrap gap-4 md:justify-start lg:justify-start sm:justify-center justify-center">
        {stacks.map((stack) => (
          <StackCard
            imgUrl={stack.imgUrl}
            title={stack.title}
            key={stack.title}
          />
        ))}
      </div>
    </Section>
  );
}
