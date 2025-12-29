import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Footer } from "@/components/footer";
import { Greeting } from "@/components/greeting";
import { Links } from "@/components/links";
import { Logo } from "@/components/logo";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";
import Link from "next/link";

const navLinks = ["about", "tech stack", "projects", "blogs"];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <section className="min-h-screen flex flex-col justify-center gap-6">
        <Logo />
        <Greeting />
        <Links />

        <nav className="flex flex-wrap gap-4 text-sm mt-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`/#${link.toLowerCase()}`}
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-neutral-600">$</span> {link}
            </Link>
          ))}
        </nav>

        <div className="text-neutral-500 text-xs mt-8">
          <span className="text-white">↓</span> scroll to explore
        </div>
      </section>

      <About />
      <Stack />
      <Projects />
      <Blogs />
      <Footer />
    </main>
  );
}
