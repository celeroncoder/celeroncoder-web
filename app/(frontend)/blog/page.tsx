import Link from "next/link";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "blog | celeroncoder",
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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-b border-white pb-2 mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-500">user@celeroncoder</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="text-white ml-1">ls ./blog/</span>
        </div>
      </div>

      <div className="mb-6">
        <Link
          href="/"
          className="text-neutral-500 text-xs hover:text-white transition-colors duration-200"
        >
          $ cd ~
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-500 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="border-l-2 border-white pl-4 py-3 hover:border-green-500 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-neutral-500 text-xs">[FILE]</span>
                  <h2 className="text-white font-bold text-sm">
                    {post.title}
                  </h2>
                </div>

                <div className="flex gap-2 text-xs text-neutral-500 mb-2">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {post.readTime && (
                    <>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>

                <p className="text-neutral-400 text-xs">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
