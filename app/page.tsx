import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-start justify-center">
      <section className="min-h-screen w-full flex justify-center flex-col gap-4 flex-[0.9]">
        <Logo className="text-4xl" />
        <Greeting />
        <Links />
      </section>
      <About />
      <Stack />
      <Projects />
      <Blogs />
    </main>
  );
}
