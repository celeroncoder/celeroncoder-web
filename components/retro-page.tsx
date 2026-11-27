import Link from "next/link";
import { AsciiBackground } from "@/components/ascii-background";
import { profile, socialLinks } from "@/lib/site-content";

const navLinks = socialLinks.filter((link) => link.name === "GitHub" || link.name === "Twitter");

/**
 * Early-web page shell: a centered text column over the ASCII noise
 * background (which fades out behind it), with a bracketed link bar on top.
 */
export function RetroPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AsciiBackground />
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10 sm:py-12">
        <nav className="mb-6 text-sm leading-relaxed">
          [{" "}
          {navLinks.map((link, i) => {
            return (
              <span key={link.name}>
                {i > 0 && " | "}
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </Link>
              </span>
            );
          })}{" "}
          ]
        </nav>

        <main>{children}</main>

        <footer className="mt-12 border-t border-[#a2a9b1] pt-3 text-xs leading-relaxed text-[#54595d]">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {profile.name}. Best viewed in any browser at 800&times;600.
          </p>
        </footer>
      </div>
    </>
  );
}

/** Page title with the thin rule underneath, encyclopedia style. */
export function RetroTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <header className="mb-5">
      <h1 className="border-b border-[#a2a9b1] pb-1 font-serif text-[2rem] font-normal leading-tight">
        {children}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-[#54595d]">{subtitle}</p>}
    </header>
  );
}
