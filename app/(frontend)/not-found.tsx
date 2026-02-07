import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-medium tracking-tight mb-4">404</h1>
        <p className="text-neutral-400 text-sm mb-8">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors duration-300"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
