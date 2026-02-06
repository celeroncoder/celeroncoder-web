import Link from "next/link";
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
    title: `${post.meta?.title || post.title} | celeroncoder`,
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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-neutral-500 text-xs hover:text-white transition-colors duration-200"
        >
          $ cd ../blog
        </Link>
      </div>

      <article>
        <header className="border-b border-white pb-4 mb-8">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="text-green-500">user@celeroncoder</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="text-white ml-1">cat ./blog/{post.slug}</span>
          </div>

          <h1 className="text-white text-2xl font-bold mt-4">{post.title}</h1>

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
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs text-green-500 border border-green-500/30 px-2 py-0.5"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {heroImage?.url && (
          <div className="mb-8">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              width={1200}
              height={630}
              className="w-full"
            />
          </div>
        )}

        <div className="prose prose-invert prose-sm max-w-none prose-headings:font-mono prose-headings:text-white prose-p:text-neutral-300 prose-a:text-blue-400 prose-code:text-green-400 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-700 prose-strong:text-white prose-blockquote:border-green-500 prose-blockquote:text-neutral-400">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <RichText data={post.content as any} />
        </div>
      </article>

      <div className="border-t border-white mt-12 pt-6">
        <Link
          href="/blog"
          className="text-neutral-500 text-xs hover:text-white transition-colors duration-200"
        >
          &larr; back to all posts
        </Link>
      </div>
    </main>
  );
}
