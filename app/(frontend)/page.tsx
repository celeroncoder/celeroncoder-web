export const dynamic = "force-dynamic";

import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Footer } from "@/components/footer";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";
import { HeroShader } from "@/components/hero-shader";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      {/* Navigation - top right */}
      <header className="absolute top-0 right-0 p-8 md:p-12 z-20">
        <Links />
      </header>

      {/* Hero - vertically centered with dithering shader background */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <HeroShader />
        <div className="w-full max-w-xl mx-auto px-6 md:px-8 py-24 relative z-10">
          <Greeting />
          <Stack />

          <div className="mt-12">
            <Link
              href="mailto:celeroncoder@gmail.com"
              className="inline-flex items-center px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors duration-300"
            >
              Say Hello
            </Link>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="w-full max-w-xl mx-auto px-6 md:px-8 pb-16 space-y-16">
        <About />
        <Projects />
        <Blogs />
        <Footer />
      </div>
    </main>
  );
}
