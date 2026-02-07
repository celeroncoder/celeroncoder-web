import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPayload } from "payload";
import config from "@payload-config";

export async function Blogs() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 5,
  });

  if (posts.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-lg font-medium tracking-tight">Blog</h2>
      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <h3 className="text-white text-sm font-medium group-hover:text-neutral-300 transition-colors duration-300">
              {post.title}
            </h3>
            <div className="flex gap-2 text-xs text-neutral-500 mt-1">
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {post.readTime && (
                <>
                  <span>&#183;</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
            {post.excerpt && (
              <p className="text-neutral-400 text-sm mt-1 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className="text-neutral-500 text-xs hover:text-white transition-colors duration-300 inline-block mt-2"
      >
        View all posts <ArrowUpRight className="inline w-3 h-3" />
      </Link>
    </section>
  );
}
