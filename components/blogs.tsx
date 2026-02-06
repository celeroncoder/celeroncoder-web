import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { BlogCard } from "./ui/blog-card";
import { Section } from "./ui/section";

export async function Blogs() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 5,
  });

  return (
    <Section title="blogs">
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.excerpt}
              publishedAt={new Date(post.publishedAt).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "short", day: "numeric" }
              )}
              readTime={post.readTime || undefined}
              slug={post.slug}
            />
          ))
        )}
      </div>
      {posts.length > 0 && (
        <Link
          href="/blog"
          className="text-blue-400 text-xs hover:underline mt-4 inline-block"
        >
          → view all posts
        </Link>
      )}
    </Section>
  );
}
