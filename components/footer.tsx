import Link from "next/link";

const footerLinks = [
  { name: "GitHub", url: "https://github.com/celeroncoder/celeroncoder.tech" },
  { name: "Dev.to", url: "https://dev.to/celeron" },
  { name: "Hashnode", url: "https://hashnode.com/@celeroncoder" },
  { name: "Medium", url: "https://medium.com/@celeroncoder" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 pt-8 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-neutral-500 text-xs">
          &copy; {new Date().getFullYear()} Khushal Bhardwaj. Built with
          Next.js.
        </p>
        <div className="flex gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 text-xs hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
