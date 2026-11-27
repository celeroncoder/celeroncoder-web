export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { PostIndex } from "@/components/post-index";
import { RetroPage, RetroTitle } from "@/components/retro-page";

export const metadata: Metadata = {
  title: "Blog | Khushal Bhardwaj",
  description: "Blog posts by Khushal Bhardwaj",
  alternates: {
    types: {
      "text/markdown": "/blog.md",
    },
  },
};

export default function BlogPage() {
  return (
    <RetroPage>
      <RetroTitle subtitle="Everything written here, newest first.">All posts</RetroTitle>
      <PostIndex />
    </RetroPage>
  );
}
