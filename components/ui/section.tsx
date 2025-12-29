import Link from "next/link";

export const Section: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <section
      id={title.toLowerCase()}
      className="py-16"
    >
      <div className="border-b border-white pb-2 mb-6">
        <Link
          href={`/#${title.toLowerCase()}`}
          className="flex items-center gap-2 text-sm hover:text-green-500 transition-colors duration-200"
        >
          <span className="text-green-500">user@celeroncoder</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="text-white ml-1">ls ./{title.toLowerCase().replace(" ", "-")}/</span>
        </Link>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};
