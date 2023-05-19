import {
  AtSignIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

export function Links() {
  return (
    <section className="flex items-center justify-start gap-4">
      <Link href="https://twitter.com/celeroncoder" target="_blank">
        <TwitterIcon className="w-5 cursor-alias hover:text-slate-400" />
      </Link>
      <Link href="https://github.com/celeroncoder" target="_blank">
        <GithubIcon className="w-5 cursor-alias hover:text-slate-400" />
      </Link>
      <Link href="https://instagram.com/celeroncoder" target="_blank">
        <InstagramIcon className="w-5 cursor-alias hover:text-slate-400" />
      </Link>
      <Link href="https://linkedin.com/in/celeroncoder" target="_blank">
        <LinkedinIcon className="w-5 cursor-alias hover:text-slate-400" />
      </Link>
      <Link href="mailto:celeroncoder@gmail.com" target="_blank">
        <AtSignIcon className="w-5 cursor-alias hover:text-slate-400" />
      </Link>
    </section>
  );
}
