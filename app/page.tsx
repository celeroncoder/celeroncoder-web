import { About } from "@/components/about";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-start justify-center">
      <section className="min-h-screen flex justify-center flex-col gap-4">
        <Logo className="text-4xl" />
        <Greeting />
        <Links />
      </section>
      <About />
      <Projects />
    </main>
  );
}
