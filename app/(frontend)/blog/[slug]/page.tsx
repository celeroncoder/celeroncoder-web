import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media as MediaType, Tag } from "@/payload-types";
import { extractHeadings } from "@/lib/blog-toc";
import { ContentsBox } from "@/components/contents-box";
import { RetroPage, RetroTitle } from "@/components/retro-page";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ slug }, payload] = await Promise.all([params, getPayload({ config })]);
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
    alternates: {
      types: {
        "text/markdown": `/blog/${slug}.md`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const [{ slug }, payload] = await Promise.all([params, getPayload({ config })]);
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
            <pre className="hljs overflow-x-auto border border-[#eaecf0] !bg-[#f8f9fa] p-3 text-[13px] leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          );
        },
      },
    };
  };

  const published = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <RetroPage>
      <article>
        <RetroTitle
          subtitle={
            <span suppressHydrationWarning>
              {published}
              {post.readTime && (
                <> &middot; {/^\d+$/.test(post.readTime) ? `${post.readTime} min read` : post.readTime}</>
              )}
            </span>
          }
        >
          {post.title}
        </RetroTitle>

        {heroImage?.url && (
          <figure className="mb-5 border border-[#c8ccd1] bg-[#f8f9fa] p-1">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              width={1200}
              height={630}
              className="w-full border border-[#c8ccd1]"
            />
          </figure>
        )}

        <ContentsBox headings={headings} />

        <div className="prose max-w-none font-serif text-[17px] text-black prose-headings:font-serif prose-headings:font-normal prose-headings:text-black prose-h2:border-b prose-h2:border-[#a2a9b1] prose-h2:pb-1 prose-h2:text-[1.6rem] prose-h3:text-[1.25rem] prose-h3:font-bold prose-a:font-normal prose-a:text-[#0000ee] [&_a:visited]:text-[#551a8b] prose-strong:text-black prose-blockquote:border-[#a2a9b1] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-[#202122] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none [&_:not(pre)>code]:border [&_:not(pre)>code]:border-[#eaecf0] [&_:not(pre)>code]:bg-[#f8f9fa] [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:text-[0.85em]">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <RichText data={post.content as any} converters={jsxConverters} />
        </div>

        {tags.length > 0 && (
          <div className="mt-10 border border-[#a2a9b1] bg-[#f8f9fa] px-3 py-2 text-sm">
            Categories:{" "}
            {tags.map((tag, i) => (
              <span key={tag.id}>
                {i > 0 && " | "}
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm">
          &larr; <Link href="/blog">Back to all posts</Link>
        </p>
      </article>
    </RetroPage>
  );
}
