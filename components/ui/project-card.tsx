import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export type Project = {
  title: string;
  description: string;
  github_url: string;
  live_url?: string;
};

export const ProjectCard: React.FC<Project> = ({
  title,
  description,
  github_url,
  live_url,
}) => {
  return (
    <div className="bg-white border-2 border-white/20 bg-opacity-5 backdrop-blur-lg drop-shadow-lg rounded-lg hover:shadow-lg shadow-md max-w-xs lg:w-64 md:w-64 sm:w-full w-full py-2 px-4 flex flex-col gap-y-2">
      <h1
        style={space_grotesk.style}
        className="text-xl tracking-tighter font-semibold"
      >
        {title}
      </h1>
      <p className="text-white/70 text-xs">{description}</p>
      <div className="flex gap-2 w-full items-center justify-start">
        <Link href={github_url}>
          <GithubIcon className="w-4" />
        </Link>
        {live_url && (
          <Link href={live_url}>
            <ExternalLinkIcon className="w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
