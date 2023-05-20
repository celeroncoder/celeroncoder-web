import { ExternalLinkIcon, GithubIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { Card } from "./card";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

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
      <h1
        style={space_grotesk.style}
        className="text-xl tracking-tighter font-semibold"
      >
        {title}
      </h1>
      <p className="text-white/70 text-xs">{description}</p>
      <div className="flex gap-2 w-full items-center justify-start">
        {github_url ? (
          <Link href={github_url}>
            <GithubIcon className="w-4" />
          </Link>
        ) : (
          <LockIcon className="w-4" />
        )}
        {live_url && (
          <Link href={live_url}>
            <ExternalLinkIcon className="w-4" />
          </Link>
        )}
      </div>
    </Card>
  );
};
