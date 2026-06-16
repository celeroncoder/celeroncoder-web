import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import Link from "next/link";
import { ArcadeChevronLeft, ArcadeUTurnLeft } from "@/components/icons/arcade-icons";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media as MediaType, Tag } from "@/payload-types";
import { extractHeadings } from "@/lib/blog-toc";
import { TocSidebar } from "@/components/blog/toc-sidebar";

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

  // Build the table of contents and the matching anchor ids for headings.
  const headings = extractHeadings(post.content);

  const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => {
    let headingIndex = 0;
    return {
      ...defaultConverters,
      heading: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({ nodes: node.children });
        const Tag = node.tag as "h2";
        const id = headings[headingIndex++]?.id;
        // scroll-mt offsets the sticky-header gap when jumping to an anchor.
        return (
          <Tag id={id} className="scroll-mt-24">
            {children}
          </Tag>
        );
      },
      blocks: {
        // Renders the Payload CodeBlock (``` fenced code) with syntax
        // highlighting (highlight.js, server-side). Falls back to auto-detection
        // when the fence language isn't a known highlight.js grammar.
        Code: ({ node }: { node: { fields: { code?: string; language?: string } } }) => {
          const code = node.fields.code ?? "";
          const language = node.fields.language;
          const highlighted =
            language && hljs.getLanguage(language)
              ? hljs.highlight(code, { language, ignoreIllegals: true }).value
              : hljs.highlightAuto(code).value;
          return (
            <pre className="hljs overflow-x-auto rounded-lg border border-neutral-800 !bg-neutral-950 p-4 text-[13px] leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          );
        },
      },
    };
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <TocSidebar headings={headings} />

      {/* On xl+ the "see all" link lives at the top of the TOC sidebar. */}
      <div className="mb-12 xl:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-[0.3em] text-xs tracking-wide text-neutral-500 hover:text-neutral-200 transition-colors duration-300"
        >
          <ArcadeUTurnLeft />
          <span className="font-pixel">see all</span>
        </Link>
      </div>

      <article>
        <header className="mb-10">
          <h1 className="text-2xl font-medium tracking-tight font-pixel">{post.title}</h1>

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
          <RichText data={post.content as any} converters={jsxConverters} />
        </div>
      </article>

      <div className="border-t border-neutral-800 mt-16 pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-[0.3em] text-neutral-500 text-sm hover:text-white transition-colors duration-300"
        >
          <ArcadeChevronLeft />
          <span className="font-pixel">Back to all posts</span>
        </Link>
      </div>
    </main>
  );
}
