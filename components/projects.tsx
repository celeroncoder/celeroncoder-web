import { Project, ProjectCard } from "./ui/project-card";
import { Section } from "./ui/section";

const projects: Project[] = [
  {
    title: "Chindi",
    description:
      "Expense Tracker App built with Next.JS to track expenses and export to CSV",
    live_url: "https://chindi.celeroncoder.tech",
  },
  {
    title: "Curewell Admin",
    description:
      "Extensive CRM Dashboard for Homeopathic Clinic built with Next.js and tRPC",
  },
  {
    title: "PlayerStatPML",
    description:
      "Express-TypeScript API proxy for Premier League statistics",
    github_url: "https://github.com/celeronCoder/playerstatpml",
    live_url:
      "https://rapidapi.com/celeronCoder/api/premier-league-player-and-club-statistics",
  },
  {
    title: "winston-highstorm",
    description:
      "NPM Package for winston Transport to ingest logs to highstorm.app",
    github_url: "https://github.com/celeronCoder/winston-highstorm",
    live_url: "https://link.celeroncoder.tech/winston-transport-npm",
  },
];

export function Projects() {
  return (
    <Section title="projects">
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  );
}
