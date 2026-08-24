export const SITE_URL = "https://celeroncoder.tech";

export const profile = {
  name: "Khushal Bhardwaj",
  email: "celeroncoder@gmail.com",
  headline: "Full Stack Web Developer",
  introduction:
    "Full Stack Web Developer based in Jaipur, India. Passionate about building web apps with React and Next.js. Currently an undergrad at VIT Bhopal University.",
} as const;

export const about = {
  beforeName: "Hey, I'm ",
  afterName:
    ", a Full Stack Web Developer based in Jaipur, India. Passionate about building web apps with React/NextJS. I'm also an undergrad at VIT Bhopal University.",
  writing:
    "Other than programming, I write blogs. I've developed a hobby of writing blogs, mostly technical. Although I may not be following it that regularly, you might think, but I do love it.",
} as const;

export const aboutParagraphs = [
  `${about.beforeName}${profile.name}${about.afterName}`,
  about.writing,
] as const;

export const skills = [
  "TypeScript",
  "Next.js",
  "tRPC",
  "Express.js",
  "Prisma",
  "Tailwind CSS",
] as const;

export type Project = {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Shire",
    description:
      "A macOS native Claude Code wrapper with all the functionalities of Claude Code",
    githubUrl: "https://github.com/celeroncoder/shire",
    liveUrl: "https://shire.celeroncoder.com",
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
    githubUrl: "https://github.com/celeronCoder/playerstatpml",
    liveUrl:
      "https://rapidapi.com/celeronCoder/api/premier-league-player-and-club-statistics",
  },
  {
    title: "winston-highstorm",
    description:
      "NPM Package for winston Transport to ingest logs to highstorm.app",
    githubUrl: "https://github.com/celeronCoder/winston-highstorm",
    liveUrl: "https://link.celeroncoder.tech/winston-transport-npm",
  },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/celeroncoder" },
  { name: "Twitter", url: "https://twitter.com/celeroncoder" },
  { name: "LinkedIn", url: "https://linkedin.com/in/celeroncoder" },
] as const;

export const writingLinks = [
  { name: "Dev.to", url: "https://dev.to/celeron" },
  { name: "Hashnode", url: "https://hashnode.com/@celeroncoder" },
  { name: "Medium", url: "https://medium.com/@celeroncoder" },
] as const;
