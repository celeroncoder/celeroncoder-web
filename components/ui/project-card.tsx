import Link from "next/link";
import { Card } from "./card";

export type Project = {
  title: string;
  description: string;
  github_url?: string;
  live_url?: string;
};

export const ProjectCard: React.FC<Project> = ({
  title,
  description,
  github_url,
  live_url,
}) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-neutral-500 text-xs">[DIR]</span>
        <h3 className="text-white font-bold text-sm">{title}</h3>
      </div>

      <p className="text-neutral-400 text-xs mb-3">{description}</p>

      <div className="flex gap-3 text-xs">
        {github_url ? (
          <Link
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            → github
          </Link>
        ) : (
          <span className="text-neutral-600">→ private</span>
        )}
        {live_url && (
          <Link
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            → live
          </Link>
        )}
      </div>
    </Card>
  );
};
