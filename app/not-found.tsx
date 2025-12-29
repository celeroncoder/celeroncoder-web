import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
      <div className="text-center">
        <p className="text-neutral-500 text-sm mb-2">
          user@celeroncoder:~$ cat /error
        </p>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-neutral-400 mb-6">Page not found</p>
        <Link
          href="/"
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          $ cd ~
        </Link>
      </div>
    </main>
  );
}
