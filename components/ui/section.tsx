export const Section: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <section id="title" className="py-6 relative">
      <h1 className="capitalize lg:absolute md:absolute relative lg:-left-32 md:-left-32 lg:top-6 md:top-6 text-3xl text-muted-foreground/50 font-extralight lg:font-bold md:font-bold lg:tracking-tighter md:lg:tracking-tighter mb-4">
        {title}
      </h1>
      <div className="max-w-xl">{children}</div>
    </section>
  );
};
