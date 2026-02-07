import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Khushal Bhardwaj",
  description: "Blog posts by Khushal Bhardwaj",
};

export default async function BlogPage() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 50,
  });

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <div className="mb-12">
        <Link
          href="/"
          className="text-neutral-500 text-sm hover:text-white transition-colors duration-300"
        >
          <ChevronLeft className="inline w-3.5 h-3.5" /> Back
        </Link>
      </div>

      <h1 className="text-2xl font-medium tracking-tight mb-10">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-neutral-500 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <article>
                <h2 className="text-white text-base font-medium group-hover:text-neutral-300 transition-colors duration-300">
                  {post.title}
                </h2>

                <div className="flex gap-2 text-xs text-neutral-500 mt-1.5">
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
                  <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
