import Link from "next/link";
import { ArcadeChevronLeft } from "@/components/icons/arcade-icons";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { BlogList, type BlogListItem } from "@/components/blog-list";

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
    depth: 1,
  });

  const items: BlogListItem[] = posts.map((post) => {
    const hero =
      post.heroImage && typeof post.heroImage === "object"
        ? post.heroImage
        : null;
    const heroUrl = hero?.sizes?.card?.url ?? hero?.url ?? null;
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      heroImage: heroUrl
        ? {
            url: heroUrl,
            alt: hero?.alt ?? post.title,
            width: hero?.sizes?.card?.width ?? hero?.width,
            height: hero?.sizes?.card?.height ?? hero?.height,
          }
        : null,
    };
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-[0.3em] text-neutral-500 text-sm hover:text-white transition-colors duration-300"
        >
          <ArcadeChevronLeft />
          <span className="font-pixel">Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-medium tracking-tight mb-10 font-pixel">Blog</h1>

      {items.length === 0 ? (
        <p className="text-neutral-500 text-sm">No posts yet.</p>
      ) : (
        <BlogList posts={items} />
      )}
    </main>
  );
}
