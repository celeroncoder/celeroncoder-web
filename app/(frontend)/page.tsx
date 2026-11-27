export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { PostIndex } from "@/components/post-index";
import { RetroPage, RetroTitle } from "@/components/retro-page";
import { profile } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Khushal Bhardwaj | Full Stack Web Developer",
  description:
    "Portfolio of Khushal Bhardwaj, a Full Stack Web Developer based in Jaipur, India, building web apps with React and Next.js.",
  alternates: {
    types: {
      "text/markdown": "/.md",
    },
  },
};

export default function Home() {
  return (
    <RetroPage>
      <RetroTitle>{profile.name}</RetroTitle>

      <PostIndex />
    </RetroPage>
  );
}
