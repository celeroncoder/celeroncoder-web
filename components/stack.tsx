import { Section } from "./ui/section";
import { StackCard } from "./ui/stack-card";
import type { Stack as StackType } from "./ui/stack-card";

const stacks: StackType[] = [
  { title: "TypeScript", description: "Type-safe JavaScript" },
  { title: "Next.js", description: "React framework for production" },
  { title: "tRPC", description: "End-to-end typesafe APIs" },
  { title: "Express.js", description: "Node.js web framework" },
  { title: "Prisma", description: "Next-generation ORM" },
  { title: "Tailwind CSS", description: "Utility-first CSS framework" },
];

export function Stack() {
  return (
    <Section title="tech stack">
      <div className="space-y-2">
        {stacks.map((stack) => (
          <StackCard key={stack.title} {...stack} />
        ))}
      </div>
    </Section>
  );
}
