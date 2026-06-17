import Link from "next/link";
import { ArcadeChevronRight } from "@/components/icons/arcade-icons";
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
        <h3 className="text-white font-semibold text-sm">{title}</h3>
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
        className="inline-flex items-center gap-[0.3em] text-blue-400 text-xs hover:underline"
      >
        <ArcadeChevronRight />
        <span className="font-pixel">read</span>
      </Link>
    </Card>
  );
};
