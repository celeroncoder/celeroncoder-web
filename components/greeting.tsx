import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export function Greeting() {
  return (
    <section>
      <h1
        style={space_grotesk.style}
        className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl"
      >
        Hey 👋
        <br className="inline" />
        celeroncoder here.
      </h1>
      <p className="text-muted-foreground text-sm sm:text-sm md:text-md lg:text-md">
        Too lazy to build a fancy site
      </p>
    </section>
  );
}
