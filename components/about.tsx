import { about, profile } from "@/lib/site-content";

export function About() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-medium tracking-tight font-pixel">About</h2>
      <div className="space-y-4 text-sm text-neutral-400 leading-relaxed">
        <p>
          {about.beforeName}
          <span className="text-white font-medium">{profile.name}</span>
          {about.afterName}
        </p>
        <p>{about.writing}</p>
      </div>
    </section>
  );
}
