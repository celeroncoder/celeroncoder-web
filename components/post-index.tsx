import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Every post as a plain bulleted list of links, newest first. */
export async function PostIndex() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    limit: 100,
    depth: 0,
  });

  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <ul className="list-disc space-y-1.5 pl-6">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>{" "}
          <span suppressHydrationWarning className="whitespace-nowrap text-sm text-[#54595d]">
            ({formatDate(post.publishedAt)})
          </span>
        </li>
      ))}
    </ul>
  );
}
