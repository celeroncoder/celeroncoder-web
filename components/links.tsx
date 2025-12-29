import Link from "next/link";

const socialLinks = [
  { name: "github", url: "https://github.com/celeroncoder" },
  { name: "twitter", url: "https://twitter.com/celeroncoder" },
  { name: "linkedin", url: "https://linkedin.com/in/celeroncoder" },
  { name: "instagram", url: "https://instagram.com/celeroncoder" },
  { name: "email", url: "mailto:celeroncoder@gmail.com" },
];

export function Links() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-white hover:underline transition-colors duration-200"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
