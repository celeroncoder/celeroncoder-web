import { About } from "@/components/about";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";
import { ChevronDownIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-start justify-center">
      <section className="flex flex-col min-h-screen">
        <section className="flex justify-center flex-col gap-4 flex-[0.9]">
          <Logo className="text-4xl" />
          <Greeting />
          <Links />
        </section>
        <div className="flex-[0.1] flex flex-col items-center justify-center">
          {/* <p className="text-muted-foreground">More</p> */}
          <ChevronDownIcon className="sm:text-3xl md:text-5xl lg:text-6xl text-muted-foreground duration-300 hover:scale-150" />
        </div>
      </section>
      <About />
      <Projects />
    </main>
  );
}
