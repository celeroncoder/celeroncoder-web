export function Greeting() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-green-500">user@celeroncoder</span>
        <span>:</span>
        <span className="text-blue-400">~</span>
        <span>$</span>
        <span className="ml-2">whoami</span>
      </div>

      <div className="border-l-2 border-white pl-4">
        <h1 className="text-xl font-bold mb-2">Hey, celeroncoder here.</h1>
        <p className="text-neutral-400 text-sm">
          Full Stack Developer building web apps with React & Next.js
        </p>
      </div>
    </section>
  );
}
