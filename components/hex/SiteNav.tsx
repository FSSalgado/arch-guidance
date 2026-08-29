"use client";

import Link from "next/link";

const LINKS = [
  { href: "#hexagono", label: "Hexágono" },
  { href: "#diagrama", label: "Diagrama" },
  { href: "#dependencias", label: "Dependências" },
  { href: "#fluxo", label: "Fluxo" },
  { href: "#laboratorio", label: "Laboratório" },
  { href: "#pastas", label: "Pastas" },
  { href: "#comparar", label: "Comparar" },
  { href: "#quando", label: "Quando usar" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wider text-ink-dim transition hover:text-ink"
          >
            Índice
          </Link>
          <a href="#hexagono" className="font-display text-sm font-semibold tracking-wide text-gold">
            HEX / P&A
          </a>
        </div>
        <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-dim transition hover:bg-paper-3 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#laboratorio"
          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold-2 transition hover:bg-gold/20"
        >
          Ir ao lab
        </a>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-line px-5 py-2 lg:hidden">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-dim"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
