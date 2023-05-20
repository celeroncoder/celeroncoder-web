import Link from "next/link";
import { Links } from "./links";
import { Separator } from "./ui/separator";
import { Logo } from "./logo";

const links = ["about", "tech stack", "projects", "blogs"];

const otherLinks: { title: string; url: string }[] = [
  { title: "Github", url: "https://github.com/celeroncoder/celeroncoder.tech" },
  { title: "Dev.to", url: "https://dev.to/celeron" },
  { title: "Hashnode", url: "https://hashnode.com/@celeroncoder" },
  { title: "Medium", url: "https://medium.com/@celeroncoder" },
];

export function Footer() {
  return (
    <section className="w-full">
      <Separator className="w-full" />
      <div className="w-full flex items-start justify-between gap-2">
        <div className="flex-[0.2] flex flex-col mt-5 pr-10">
          <p className="text-muted-foreground font-bold text-md">
            celeroncoder
          </p>
          <Logo className="text-lg" />
        </div>
        <div className="flex-[0.4] flex flex-col text-xs gap-1 mt-5">
          <h1 className="text-primary text-sm mb-1">Links</h1>
          {links.map((link) => (
            <Link
              className="capitalize cursor-alias text-muted-foreground hover:text-primary"
              href={`/#${link.toLowerCase()}`}
              key={link}
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="flex-[0.4] flex flex-col text-xs gap-1 mt-5">
          <h1 className="text-primary text-sm mb-1">Others</h1>
          {otherLinks.map((link) => (
            <Link
              className="capitalize cursor-alias text-muted-foreground hover:text-primary"
              href={link.url}
              key={link.title}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
