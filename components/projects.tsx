import { Project, ProjectCard } from "./ui/project-card";
import { Section } from "./ui/section";

const projects: Project[] = [
  {
    title: "Chindi",
    description:
      "It's an Expense Tracker App built with Next.JS to track all your expenses and also export them to csv",
    live_url: "chindi.celeroncoder.tech",
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
];

export function Projects() {
  return (
    <Section title="projects">
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectCard
            title={project.title}
            description={project.description}
            github_url={project.github_url}
            live_url={project.live_url}
          />
        ))}
      </div>
    </Section>
  );
}
