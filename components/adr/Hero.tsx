export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Grave o porquê
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          ADR
          <span className="block text-gold">e o que foi recusado</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Decisão sem recusa é anúncio.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          A escolha ficou na cabeça, no Slack, no PR que ninguém abre. Daqui a
          um ano o time pergunta{" "}
          <strong className="font-medium text-ink">por que não era síncrono</strong>{" "}
          — e reabre o debate. ADR não é template de empresa. É o mínimo que
          faz o próximo herdar o porquê e o que perdeu.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Só no Slack"
            hint="O fio some, a pessoa sai. A restrição que matou SMTP síncrono sai junto."
          />
          <HeroFact
            label="Sintoma"
            value="Só o vencedor"
            hint="“Vamos de fila.” Sem o que foi recusado, qualquer opção volta à mesa."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Não grave o óbvio. Local, reversível, uma pessoa — git blame chega."
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
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-ink">{value}</dd>
      <p className="mt-2 text-sm leading-snug text-ink-dim">{hint}</p>
    </div>
  );
}

function HeroSketch() {
  return (
    <svg width="420" height="300" viewBox="0 0 420 300" aria-hidden="true">
      <g opacity="0.45">
        <rect x="48" y="36" width="150" height="52" rx="18" fill="none" stroke="#e07070" strokeWidth="1.4" />
        <rect x="78" y="102" width="170" height="44" rx="18" fill="none" stroke="#e07070" strokeWidth="1.2" strokeDasharray="5 5" />
        <text x="64" y="66" fill="#e07070" fontSize="11" fontFamily="ui-monospace, monospace">
          vamos de fila?
        </text>
        <text x="94" y="128" fill="#e07070" fontSize="11" fontFamily="ui-monospace, monospace">
          ok, fechou
        </text>
      </g>
      <g>
        <rect x="210" y="88" width="180" height="172" fill="#121820" stroke="#e0b35a" strokeWidth="1.5" />
        <text x="226" y="118" fill="#e0b35a" fontSize="11" fontFamily="ui-monospace, monospace">
          ADR · e-mail pedido
        </text>
        <line x1="226" y1="132" x2="370" y2="132" stroke="#e0b35a" strokeOpacity="0.35" />
        <text x="226" y="158" fill="#9a9384" fontSize="11" fontFamily="ui-monospace, monospace">
          aceito
        </text>
        <text x="226" y="186" fill="#e7e1d3" fontSize="12" fontFamily="ui-monospace, monospace">
          decisão: fila
        </text>
        <text
          x="226"
          y="216"
          fill="#e07070"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          textDecoration="line-through"
        >
          recusa: sync
        </text>
        <text
          x="226"
          y="240"
          fill="#e07070"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          textDecoration="line-through"
        >
          recusa: forget
        </text>
      </g>
    </svg>
  );
}
