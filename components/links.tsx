import Link from "next/link";
import { socialLinks } from "@/lib/site-content";

export function Links() {
  return (
    <nav className="flex items-center gap-6">
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 text-sm hover:text-white transition-colors duration-300"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
