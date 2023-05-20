import { Space_Grotesk } from "next/font/google";
import { Card } from "./card";
import Link from "next/link";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export type Blog = {
  title: string;
  description: string;
  publishedAt: string;
  readTime?: string;
  link: string;
};

export const BlogCard: React.FC<Blog> = ({
  title,
  description,
  publishedAt,
  readTime,
  link,
}) => {
  return (
    <Card>
      <Link href={link} target="_blank">
        <h1
          style={space_grotesk.style}
          className="text-xl tracking-tighter font-semibold"
        >
          {title}
        </h1>
        <p className="text-white/70 text-xs">{description}</p>
        <p className="text-muted-foreground text-xs">
          {publishedAt}
          {readTime && `~ ${readTime}`}
        </p>
      </Link>
    </Card>
  );
};
