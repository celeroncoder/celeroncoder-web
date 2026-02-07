/* eslint-disable @next/next/no-img-element */

export function Greeting() {
  return (
    <section className="space-y-6">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-800 ring-2 ring-neutral-700">
        <img
          src="https://github.com/celeroncoder.png"
          alt="Khushal Bhardwaj"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-2xl font-medium tracking-tight">
          Hey, I&apos;m Khushal Bhardwaj.
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed">
          Full Stack Web Developer based in Jaipur, India. Passionate about
          building web apps with React and Next.js. Currently an undergrad at
          VIT Bhopal University.
        </p>
      </div>
    </section>
  );
}
