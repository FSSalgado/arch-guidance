import Link from "next/link";

export function GuideNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-sm font-semibold tracking-wide text-gold">
          ARCH-GUIDANCE
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          Módulos independentes
        </p>
      </div>
    </header>
  );
}
