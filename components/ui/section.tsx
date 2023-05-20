import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const Section: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <section
      id={title.toLowerCase()}
      className="py-6 gap-2 w-full flex sm:flex-col flex-col md:flex-row lg:flex-row"
    >
      <div className="flex-[0.2] flex items-start justify-start sm:justify-start md:justify-end lg:justify-end md:text-right lg:text-right pr-10">
        <Link
          href={`/#${title.toLowerCase()}`}
          style={space_grotesk.style}
          className="capitalize text-3xl text-muted-foreground/40 hover:text-muted-foreground font-extrabold lg:tracking-tighter md:lg:tracking-tighter mb-4"
        >
          {title}
        </Link>
      </div>
      <div className="max-w-xl flex-[0.8]">{children}</div>
    </section>
  );
};
