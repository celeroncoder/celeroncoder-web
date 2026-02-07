import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Media as MediaType, Tag } from "@/payload-types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const {
    docs: [post],
  } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!post) return { title: "Post not found" };

  return {
    title: `${post.meta?.title || post.title} | Khushal Bhardwaj`,
    description: post.meta?.description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const {
    docs: [post],
  } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });

  if (!post) notFound();

  const heroImage = post.heroImage as MediaType | null;
  const tags = (post.tags || []) as Tag[];

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <div className="mb-12">
        <Link
          href="/blog"
          className="text-neutral-500 text-sm hover:text-white transition-colors duration-300"
        >
          <ChevronLeft className="inline w-3.5 h-3.5" /> Back to blog
        </Link>
      </div>

      <article>
        <header className="mb-10">
          <h1 className="text-2xl font-medium tracking-tight">{post.title}</h1>

          <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mt-3">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
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

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs text-neutral-400 bg-neutral-800/50 px-2.5 py-1 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {heroImage?.url && (
          <div className="mb-10 rounded-lg overflow-hidden">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              width={1200}
              height={630}
              className="w-full"
            />
          </div>
        )}

        <div className="prose prose-invert prose-sm max-w-none prose-headings:font-medium prose-headings:text-white prose-headings:tracking-tight prose-p:text-neutral-300 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:underline-offset-2 prose-code:text-neutral-300 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg prose-strong:text-white prose-blockquote:border-neutral-700 prose-blockquote:text-neutral-400">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <RichText data={post.content as any} />
        </div>
      </article>

      <div className="border-t border-neutral-800 mt-16 pt-6">
        <Link
          href="/blog"
          className="text-neutral-500 text-sm hover:text-white transition-colors duration-300"
        >
          <ChevronLeft className="inline w-3.5 h-3.5" /> Back to all posts
        </Link>
      </div>
    </main>
  );
}
