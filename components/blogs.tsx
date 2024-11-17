import { Blog, BlogCard } from "./ui/blog-card";
import { motion } from "motion/react";
import { Section } from "./ui/section";

const blogs: Blog[] = [
  {
    title: "The type-safe guide to tRPC",
    description:
      "tRPC is a typescript library, so to say, that makes it easy to create type-safe APIs without schema or any sort of code generation.",
    publishedAt: "July 27, 2022",
    readTime: "5 min",
    link: "https://dev.to/celeron/the-type-safe-guide-to-trpc-og1",
  },
  {
    title: "Spinning up MySQL Database with Docker",
    description:
      "Spinning up a MySQL Database with Docker, this is how I personally go about it and some other useful refrences.",
    publishedAt: "July 27, 2022",
    readTime: "2 min",
    link: "https://dev.to/celeron/spinning-up-mysql-database-with-docker-2d2a",
  },
  {
    title: "REST with Rust",
    description: "Calling Rest APIs with Rust",
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
      <div className="flex flex-wrap gap-4">
        {blogs.map((blog, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.4 }}
          >
            <BlogCard
              key={idx}
              title={blog.title}
              description={blog.description}
              publishedAt={blog.publishedAt}
              readTime={blog.readTime}
              link={blog.link}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
