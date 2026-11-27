import Link from "next/link";
import { RetroPage, RetroTitle } from "@/components/retro-page";

export default function NotFound() {
  return (
    <RetroPage>
      <RetroTitle subtitle="Error 404">Page not found</RetroTitle>
      <p>
        There is currently no page at this address. Try the <Link href="/">home page</Link> or the{" "}
        <Link href="/blog">list of all posts</Link>.
      </p>
    </RetroPage>
  );
}
