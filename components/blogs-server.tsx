import Link from "next/link";
import { ArcadeArrowUpRight } from "@/components/icons/arcade-icons";
import { getPayload } from "payload";
import config from "@payload-config";
import { BlogsList } from "@/components/blogs";

export async function Blogs() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 5,
  });

  if (posts.length === 0) return null;

  const items = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug!,
    publishedAt: post.publishedAt,
  }));

  return (
    <section className="space-y-5">
      <h2 className="text-lg font-medium tracking-tight font-pixel">Blog</h2>
      <BlogsList posts={items} />
      <Link
        href="/blog"
        className="inline-flex items-center gap-[0.3em] text-neutral-500 text-xs hover:text-white transition-colors duration-300 mt-2"
      >
        <span className="font-pixel">View all posts</span>
        <ArcadeArrowUpRight />
      </Link>
    </section>
  );
}
