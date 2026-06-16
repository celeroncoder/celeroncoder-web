import Link from "next/link";
import { ArcadeArrowUpRight, ArcadeLock } from "@/components/icons/arcade-icons";

type Project = {
  title: string;
  description: string;
  github_url?: string;
  live_url?: string;
};

const projects: Project[] = [
  {
    title: "Shire",
    description:
      "A macOS native Claude Code wrapper with all the functionalities of Claude Code",
    github_url: "https://github.com/celeroncoder/shire",
    live_url: "https://shire.celeroncoder.com",
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
      <h2 className="text-lg font-medium tracking-tight font-pixel">Projects</h2>
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
                  className="inline-flex items-center gap-[0.3em] text-neutral-500 text-xs hover:text-white transition-colors duration-300"
                >
                  <span className="font-pixel">GitHub</span>
                  <ArcadeArrowUpRight />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-[0.3em] text-neutral-600 text-xs">
                  <ArcadeLock />
                  <span className="font-pixel">Private</span>
                </span>
              )}
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.3em] text-neutral-500 text-xs hover:text-white transition-colors duration-300"
                >
                  <span className="font-pixel">Live</span>
                  <ArcadeArrowUpRight />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
