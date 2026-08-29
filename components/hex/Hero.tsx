"use client";

export function Hero() {
  return (
    <section id="hexagono" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-24 top-10 hidden opacity-40 md:block">
        <HeroHex />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Alistair Cockburn, 2005
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Arquitetura
          <span className="block text-gold">hexagonal</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Ports & Adapters — o domínio no centro, o mundo plugável na borda.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          O hexágono não é um desenho obrigatório. É uma regra:{" "}
          <strong className="font-medium text-ink">
            regras de negócio não conhecem HTTP, SQL, SMTP nem o relógio do sistema
          </strong>
          . Quem chega (web, CLI, testes) e quem é chamado (repositório, e-mail,
          relógio) são adaptadores. Eles só tocam o núcleo através de{" "}
          <em>portas</em> — contratos estáveis.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Centro"
            value="Domínio"
            hint="Políticas, invariantes, linguagem do negócio."
          />
          <HeroFact
            label="Furos no hexágono"
            value="Portas"
            hint="Interfaces. O lado de dentro define o contrato."
          />
          <HeroFact
            label="Fora da linha"
            value="Adaptadores"
            hint="Traduzem o mundo real para o contrato — e vice-versa."
          />
        </dl>
      </div>
    </section>
  );
}

function HeroFact({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-line bg-paper-2/60 p-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl text-ink">{value}</dd>
      <p className="mt-2 text-sm leading-snug text-ink-dim">{hint}</p>
    </div>
  );
}

function HeroHex() {
  return (
    <svg width="520" height="520" viewBox="0 0 520 520" aria-hidden="true">
      <g fill="none" stroke="#e0b35a" strokeOpacity="0.35">
        <polygon
          points="260,40 434,140 434,380 260,480 86,380 86,140"
          strokeWidth="1.5"
        />
        <polygon
          points="260,110 390,185 390,335 260,410 130,335 130,185"
          strokeWidth="1"
        />
        <polygon
          points="260,180 338,225 338,295 260,340 182,295 182,225"
          strokeWidth="1.5"
          className="glow-active"
        />
      </g>
      <text
        x="260"
        y="268"
        textAnchor="middle"
        fill="#f3ead2"
        fontSize="14"
        fontFamily="var(--font-syne), sans-serif"
      >
        DOMAIN
      </text>
    </svg>
  );
}
