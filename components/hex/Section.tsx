import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

export function Section({ id, kicker, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
          {kicker}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
            {lead}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
