import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

type Project = {
  title: string;
  description: string;
  github_url?: string;
  live_url?: string;
};

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
    <section className="space-y-5">
      <h2 className="text-lg font-medium tracking-tight">Projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.title} className="group">
            <h3 className="text-white text-sm font-medium">{project.title}</h3>
            <p className="text-neutral-400 text-sm mt-1 leading-relaxed">
              {project.description}
            </p>
            <div className="flex gap-4 mt-2">
              {project.github_url ? (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 text-xs hover:text-white transition-colors duration-300"
                >
                  GitHub <ArrowUpRight className="inline w-3 h-3" />
                </Link>
              ) : (
                <span className="text-neutral-600 text-xs"><Lock className="inline w-3 h-3" /> Private</span>
              )}
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 text-xs hover:text-white transition-colors duration-300"
                >
                  Live <ArrowUpRight className="inline w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
