import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";
import { ScrollDown } from "@/components/scroll-down";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-start justify-center">
      <section className="flex flex-col min-h-screen w-full">
        <section className="flex justify-center flex-col gap-4 flex-[0.9]">
          <Logo className="text-4xl" />
          <Greeting />
          <Links />
        </section>
        <ScrollDown />
      </section>
      <About />
      <Projects />
      <Blogs />
    </main>
  );
}
