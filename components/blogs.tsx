import { Blog, BlogCard } from "./ui/blog-card";
import { Section } from "./ui/section";

const blogs: Blog[] = [
  {
    title: "The type-safe guide to tRPC",
    description:
      "tRPC is a typescript library that makes it easy to create type-safe APIs without schema or code generation.",
    publishedAt: "July 27, 2022",
    readTime: "5 min",
    link: "https://dev.to/celeron/the-type-safe-guide-to-trpc-og1",
  },
  {
    title: "Spinning up MySQL Database with Docker",
    description:
      "How to spin up a MySQL Database with Docker and some useful references.",
    publishedAt: "July 27, 2022",
    readTime: "2 min",
    link: "https://dev.to/celeron/spinning-up-mysql-database-with-docker-2d2a",
  },
  {
    title: "REST with Rust",
    description: "Calling REST APIs with Rust",
    publishedAt: "Sep 5, 2022",
    readTime: "4 min",
    link: "https://dev.to/celeron/rest-with-rust-4j5d",
  },
  {
    title: "Italic Fonts",
    description: "Italic Fonts for your terminal & Editor",
    publishedAt: "Sep 7, 2022",
    readTime: "2 min",
    link: "https://dev.to/celeron/rest-with-rust-4j5d",
  },
  {
    title: "Should I adopt Service Oriented Architecture (SOA)?",
    description: "A guide to SOA and should you use it or not?",
    publishedAt: "Sep 1, 2022",
    readTime: "5 min",
    link: "https://dev.to/celeron/should-i-adopt-service-oriented-architecture-soa-3l5l",
  },
];

export function Blogs() {
  return (
    <Section title="blogs">
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.title} {...blog} />
        ))}
      </div>
    </Section>
  );
}
