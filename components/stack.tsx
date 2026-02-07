const skills = [
  "TypeScript",
  "Next.js",
  "tRPC",
  "Express.js",
  "Prisma",
  "Tailwind CSS",
];

export function Stack() {
  return (
    <section className="space-y-4 mt-10">
      <h2 className="text-sm font-medium text-neutral-300 font-pixel">Top Skills</h2>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {skills.map((skill, i) => (
          <span key={skill} className="flex items-center gap-2">
            <span className="text-neutral-400 text-sm">{skill}</span>
            {i < skills.length - 1 && (
              <span className="text-neutral-600">&#183;</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
