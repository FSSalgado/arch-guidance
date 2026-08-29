import Link from "next/link";

export type ModuleTag = "estrutura" | "dados" | "runtime" | "decisão";

type ModuleCardProps = {
  href: string;
  kicker: string;
  title: string;
  problem: string;
  whenToStudy: string;
  tags: ModuleTag[];
};

export function ModuleCard({
  href,
  kicker,
  title,
  problem,
  whenToStudy,
  tags,
}: ModuleCardProps) {
  return (
    <article className="flex flex-col border border-line bg-paper-2/50 p-6 transition hover:border-gold/40">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-ink-dim">{problem}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
          Quando estudar
        </span>
        <span className="mt-1 block">{whenToStudy}</span>
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-dim"
          >
            {tag}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-6 inline-flex w-fit rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold-2 transition hover:bg-gold/20"
      >
        Abrir módulo
      </Link>
    </article>
  );
}
