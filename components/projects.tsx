import { Project, ProjectCard } from "./ui/project-card";
import { Section } from "./ui/section";
import { motion } from "motion/react";

const projects: Project[] = [
  {
    title: "Chindi",
    description:
      "It's an Expense Tracker App built with Next.JS to track all your expenses and also export them to csv",
    live_url: "https://chindi.celeroncoder.tech",
  },
  {
    title: "Curewell Admin",
    description:
      "An extensive CRM-cum-Dashboard for a local Homeopathic Clinic built with Next.Js and tRPC",
  },
  {
    title: "PlayerStatPML",
    description:
      "It is an express-typescript api or proxy that returns the stats provided by the Premier League.",
    github_url: "https://github.com/celeronCoder/playerstatpml",
    live_url:
      "https://rapidapi.com/celeronCoder/api/premier-league-player-and-club-statistics",
  },
  {
    title: "winston-highstorm",
    description:
      "An NPM Package to create winston Transport to ingest logs to highstorm.app",
    github_url: "https://github.com/celeronCoder/winston-highstorm",
    live_url: "https://link.celeroncoder.tech/winston-transport-npm",
  },
];

export function Projects() {
  return (
    <Section title="projects">
      <div className="flex flex-wrap gap-4">
        {projects.map((project, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.4 }}
          >
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              github_url={project.github_url}
              live_url={project.live_url}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
