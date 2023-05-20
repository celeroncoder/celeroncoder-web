import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const Section: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <section id={title.toLowerCase()} className="py-6 relative w-full">
      <h1
        style={space_grotesk.style}
        className="capitalize lg:absolute md:absolute relative lg:-left-32 md:-left-32 lg:top-6 md:top-6 text-3xl text-muted-foreground/50 font-extralight lg:font-bold md:font-bold lg:tracking-tighter md:lg:tracking-tighter mb-4"
      >
        {title}
      </h1>
      <div className="max-w-xl">{children}</div>
    </section>
  );
};
