import type { SerializedEditorState } from "lexical";
import { getPayload, type Payload } from "payload";
import {
  convertLexicalToMarkdown,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";
import config from "@payload-config";
import {
  markdownResponse,
  renderBlogIndexMarkdown,
  renderBlogPostMarkdown,
  renderHomeMarkdown,
} from "@/lib/markdown-pages";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

function isSerializedEditorState(value: unknown): value is SerializedEditorState {
  if (!value || typeof value !== "object" || !("root" in value)) return false;

  const root = value.root;
  return Boolean(
    root &&
      typeof root === "object" &&
      "type" in root &&
      root.type === "root" &&
      "children" in root &&
      Array.isArray(root.children),
  );
}

function getPostEditorConfig(payload: Payload) {
  const postsCollection = payload.config.collections.find(
    (collection) => collection.slug === "posts",
  );
  const contentField = postsCollection?.fields.find(
    (field) => "name" in field && field.name === "content",
  );

  if (!contentField || contentField.type !== "richText") {
    throw new Error("The posts.content rich text field is not configured.");
  }

  return editorConfigFactory.fromField({ field: contentField });
}

function notFoundResponse() {
  return markdownResponse(
    "# 404\n\nThe requested page does not exist.",
    "404.md",
    404,
  );
}

export async function GET(request: Request, { params }: RouteContext) {
  const { path = [] } = await params;
  const origin = new URL(request.url).origin;
  const isHome = path.length === 0 || (path.length === 1 && path[0] === "index");
  const isBlogIndex = path.length === 1 && path[0] === "blog";
  const isBlogPost = path.length === 2 && path[0] === "blog";

  if (!isHome && !isBlogIndex && !isBlogPost) return notFoundResponse();

  try {
    const payload = await getPayload({ config });

    if (isHome) {
      const { docs: posts } = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: 5,
      });

      return markdownResponse(
        renderHomeMarkdown(posts, origin),
        "index.md",
      );
    }

    if (isBlogIndex) {
      const { docs: posts } = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: 50,
        depth: 1,
      });

      return markdownResponse(
        renderBlogIndexMarkdown(posts, origin),
        "blog.md",
      );
    }

    const slug = path[1];
    const {
      docs: [post],
    } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });

    if (!post) return notFoundResponse();

    if (!isSerializedEditorState(post.content)) {
      throw new Error(`Post "${post.slug}" has invalid rich text content.`);
    }

    const body = convertLexicalToMarkdown({
      data: post.content,
      editorConfig: getPostEditorConfig(payload),
    });

    return markdownResponse(
      renderBlogPostMarkdown(post, body, origin),
      `${post.slug}.md`,
    );
  } catch (error) {
    console.error("Failed to render Markdown page", error);
    return markdownResponse(
      "# 500\n\nThe Markdown version of this page is temporarily unavailable.",
      "500.md",
      500,
    );
  }
}
