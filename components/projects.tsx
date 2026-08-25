import Link from "next/link";
import { ArcadeArrowUpRight, ArcadeLock } from "@/components/icons/arcade-icons";
import { projects } from "@/lib/site-content";

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
              {project.githubUrl ? (
                <Link
                  href={project.githubUrl}
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
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
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
