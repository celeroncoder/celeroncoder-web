"use client";
import { Space_Grotesk } from "next/font/google";
import { Card } from "./card";
import { useRedirect } from "@/lib/hooks";

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
  const redirect = useRedirect();
  return (
    <Card className="cursor-alias" onClick={() => redirect(link, "_blank")}>
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
    </Card>
  );
};
