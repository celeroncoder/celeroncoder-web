import { Section } from "./ui/section";
import { Separator } from "./ui/separator";

export function About() {
  return (
    <Section title="about">
      <div className="border-l-2 border-white pl-4 space-y-4 text-sm text-neutral-400">
        <p>
          Hey, I'm <span className="text-white font-bold">Khushal Bhardwaj</span>{" "}
          a Full Stack Web Developer based in Jaipur, India. Passionate about
          building web apps with React/NextJS. I'm also an undergrad at VIT
          Bhopal University.
        </p>
        <Separator className="my-4" />
        <p>
          Other than programming, I write blogs. I've developed a hobby of
          writing blogs, mostly technical. Although I may not be following it
          that regularly, you might think, but I do love it.
        </p>
        <p>
          I developed this habit of writing mainly because I was forced to under
          my academic curriculum, so rather than taking it as a burden I quite
          enjoy it. I've developed this unique style of writing with
          personality.
        </p>
      </div>
    </Section>
  );
}
