import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "./card";

export type Blog = {
  title: string;
  description: string;
  publishedAt: string;
  readTime?: string;
  slug: string;
};

export const BlogCard: React.FC<Blog> = ({
  title,
  description,
  publishedAt,
  readTime,
  slug,
}) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-neutral-500 text-xs">[FILE]</span>
        <h3 className="text-white font-bold text-sm">{title}</h3>
      </div>

      <div className="flex gap-2 text-xs text-neutral-500 mb-2">
        <span>{publishedAt}</span>
        {readTime && (
          <>
            <span>&middot;</span>
            <span>{readTime}</span>
          </>
        )}
      </div>

      <p className="text-neutral-400 text-xs mb-3">{description}</p>

      <Link
        href={`/blog/${slug}`}
        className="text-blue-400 text-xs hover:underline"
      >
        <ChevronRight className="inline w-3 h-3" /> read
      </Link>
    </Card>
  );
};
