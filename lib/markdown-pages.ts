import type { Post, Tag } from "@/payload-types";
import {
  aboutParagraphs,
  profile,
  projects,
  skills,
  socialLinks,
  writingLinks,
} from "@/lib/site-content";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function escapeLinkLabel(value: string): string {
  return value.replace(/([\\[\]])/g, "\\$1");
}

function absoluteUrl(origin: string, pathname: string): string {
  return new URL(pathname, origin).toString();
}

function markdownLink(label: string, url: string): string {
  return `[${escapeLinkLabel(label)}](${url.replace(/\)/g, "%29")})`;
}

function postMarkdownUrl(origin: string, slug: string): string {
  return absoluteUrl(origin, `/blog/${encodeURIComponent(slug)}.md`);
}

function postHtmlUrl(origin: string, slug: string): string {
  return absoluteUrl(origin, `/blog/${encodeURIComponent(slug)}`);
}

export function renderHomeMarkdown(posts: Post[], origin: string): string {
  const projectSections = projects.map((project) => {
    const links = [
      project.githubUrl
        ? markdownLink("GitHub", project.githubUrl)
        : "Private repository",
      project.liveUrl ? markdownLink("Live", project.liveUrl) : null,
    ].filter((link): link is string => link !== null);

    return [
      `### ${project.title}`,
      project.description,
      links.join(" | "),
    ].join("\n\n");
  });

  const blogItems = posts.map(
    (post) =>
      `- ${markdownLink(post.title, postMarkdownUrl(origin, post.slug))} (${formatDate(post.publishedAt)})`,
  );

  const contactLinks = [
    markdownLink("Email", `mailto:${profile.email}`),
    ...socialLinks.map((link) => markdownLink(link.name, link.url)),
    ...writingLinks.map((link) => markdownLink(link.name, link.url)),
  ];

  return [
    `# ${profile.name}`,
    `**${profile.headline}**`,
    profile.introduction,
    "## Top skills",
    skills.map((skill) => `- ${skill}`).join("\n"),
    "## About",
    aboutParagraphs.join("\n\n"),
    "## Projects",
    projectSections.join("\n\n"),
    "## Blog",
    blogItems.length > 0 ? blogItems.join("\n") : "No posts yet.",
    markdownLink("View all posts", absoluteUrl(origin, "/blog.md")),
    "## Contact",
    contactLinks.map((link) => `- ${link}`).join("\n"),
  ].join("\n\n");
}

export function renderBlogIndexMarkdown(posts: Post[], origin: string): string {
  const entries = posts.map((post) => {
    const details = [`Published: ${formatDate(post.publishedAt)}`];
    if (post.readTime) details.push(`Read time: ${post.readTime}`);

    return [
      `## ${markdownLink(post.title, postMarkdownUrl(origin, post.slug))}`,
      details.join(" | "),
      post.excerpt,
      markdownLink("HTML page", postHtmlUrl(origin, post.slug)),
    ].join("\n\n");
  });

  return [
    "# Blog",
    `Blog posts by ${profile.name}.`,
    entries.length > 0 ? entries.join("\n\n") : "No posts yet.",
    markdownLink("Home", absoluteUrl(origin, "/.md")),
  ].join("\n\n");
}

export function renderBlogPostMarkdown(
  post: Post,
  body: string,
  origin: string,
): string {
  const heroImage =
    post.heroImage && typeof post.heroImage === "object"
      ? post.heroImage
      : null;
  const tags = (post.tags ?? []).filter(
    (tag): tag is Tag => typeof tag === "object",
  );
  const details = [`Published: ${formatDate(post.publishedAt)}`];

  if (post.readTime) details.push(`Read time: ${post.readTime}`);
  if (tags.length > 0) {
    details.push(`Tags: ${tags.map((tag) => tag.name).join(", ")}`);
  }

  const sections = [
    `# ${post.title}`,
    `> ${post.excerpt.replace(/\n/g, "\n> ")}`,
    details.join(" | "),
    `Canonical HTML: ${postHtmlUrl(origin, post.slug)}`,
  ];

  if (heroImage?.url) {
    sections.push(
      `![${escapeLinkLabel(heroImage.alt || post.title)}](${heroImage.url.replace(/\)/g, "%29")})`,
    );
  }

  if (body.trim()) sections.push(body.trim());

  sections.push(
    markdownLink("All posts", absoluteUrl(origin, "/blog.md")),
  );

  return sections.join("\n\n");
}

export function markdownResponse(
  markdown: string,
  filename: string,
  status = 200,
): Response {
  const headers = new Headers({
    "Cache-Control":
      status === 200
        ? "public, s-maxage=60, stale-while-revalidate=300"
        : "no-store",
    "Content-Disposition": `inline; filename="${filename.replace(/[^a-zA-Z0-9._-]/g, "-")}"`,
    "Content-Type": "text/markdown; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });

  if (status >= 400) headers.set("X-Robots-Tag", "noindex");

  return new Response(`${markdown.trim()}\n`, { headers, status });
}
