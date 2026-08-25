import Image from "next/image";
import { profile } from "@/lib/site-content";

export function Greeting() {
  return (
    <section className="space-y-6">
      <div className="size-20 rounded-full overflow-hidden bg-neutral-800 ring-2 ring-neutral-700">
        <Image
          src="https://github.com/celeroncoder.png"
          alt={profile.name}
          width={80}
          height={80}
          className="object-cover size-full"
        />
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-2xl font-medium tracking-tight font-pixel">
          Hey, I&apos;m {profile.name}.
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed">
          {profile.introduction}
        </p>
      </div>
    </section>
  );
}
