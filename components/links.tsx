import Link from "next/link";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/celeroncoder" },
  { name: "Twitter", url: "https://twitter.com/celeroncoder" },
  { name: "LinkedIn", url: "https://linkedin.com/in/celeroncoder" },
];

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
