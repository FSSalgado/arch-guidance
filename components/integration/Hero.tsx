export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — O atalho tem preço
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Integração
          <span className="block text-gold">quatro estilos</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Banco compartilhado não é atalho. É casamento de schema.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          Dois sistemas precisam da mesma verdade do pedido. Alguém sugere a
          mesma tabela{" "}
          <strong className="font-medium text-ink">“porque é mais rápido”</strong>
          . Arquivo, banco compartilhado, API síncrona e mensagens acoplam coisas
          diferentes. O juízo é recusar o estilo no tempo de vida errado.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Uma tabela, dois times"
            hint="O ALTER da loja quebra o SQL da faturação. Ninguém era dono do schema."
          />
          <HeroFact
            label="Sintoma"
            value="Checkout espera a nota"
            hint="POST síncrono no caminho crítico. O vizinho tossiu, o clique tossiu."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Lote no clique, fila na mesma transação, Kafka no lugar de estilo."
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
    <svg width="420" height="280" viewBox="0 0 420 280" aria-hidden="true">
      <rect x="40" y="88" width="100" height="72" fill="none" stroke="#6fc4b4" />
      <rect x="280" y="88" width="100" height="72" fill="none" stroke="#8aa0d8" />
      <text x="58" y="128" fill="#6fc4b4" fontSize="12" fontFamily="ui-monospace, monospace">
        Loja
      </text>
      <text x="292" y="128" fill="#8aa0d8" fontSize="12" fontFamily="ui-monospace, monospace">
        Fatura
      </text>
      <ellipse
        cx="210"
        cy="124"
        rx="36"
        ry="22"
        fill="none"
        stroke="#e07070"
        strokeWidth="1.6"
      />
      <text x="190" y="128" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
        schema
      </text>
      <path d="M140 124 H174 M246 124 H280" stroke="#e07070" strokeOpacity="0.7" />
      <g opacity="0.8">
        <path d="M90 200 H330" stroke="#e0b35a" strokeDasharray="6 5" />
        <rect x="168" y="186" width="84" height="28" fill="#121820" stroke="#e0b35a" />
        <text x="180" y="204" fill="#e0b35a" fontSize="10" fontFamily="ui-monospace, monospace">
          PedidoPago
        </text>
      </g>
    </svg>
  );
}
