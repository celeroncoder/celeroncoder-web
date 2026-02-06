import Link from "next/link";
import { Logo } from "./logo";

const navLinks = [
  { name: "about", href: "/#about" },
  { name: "tech stack", href: "/#tech stack" },
  { name: "projects", href: "/#projects" },
  { name: "blogs", href: "/#blogs" },
  { name: "blog", href: "/blog" },
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/celeroncoder/celeroncoder.tech" },
  { name: "Dev.to", url: "https://dev.to/celeron" },
  { name: "Hashnode", url: "https://hashnode.com/@celeroncoder" },
  { name: "Medium", url: "https://medium.com/@celeroncoder" },
];

export function Footer() {
  return (
    <footer className="border-t border-white pt-8 mt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo />
          <p className="text-neutral-500 text-xs mt-2">
            Developer. Builder. Creator.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold mb-3">Navigation</h4>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-400 text-xs hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold mb-3">Connect</h4>
          <div className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 text-xs hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-8 pt-4">
        <p className="text-neutral-500 text-xs text-center">
          <span className="text-white">$</span> echo &quot;&copy; 2025 celeroncoder. Built
          with Next.js&quot;
        </p>
      </div>
    </footer>
  );
}
