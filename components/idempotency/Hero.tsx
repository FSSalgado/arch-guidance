export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Um comando, um efeito
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Idempotência
          <span className="block text-gold">e outbox</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Reenvio não é segundo pedido. Publicar e commitar são um só.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          O HTTP reenvia. Sem chave, o PlaceOrder vira dois pedidos. O processo
          grava e publica em dois destinos: o evento some, ou o mundo ouve um
          pedido que{" "}
          <strong className="font-medium text-ink">não foi commitado</strong>.
          Outbox é o mesmo commit. Relay entrega depois. Sem fila real. Sem saga.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Dois 201"
            hint="Timeout, o cliente insiste. A API não pede chave. Estoque vende duas vezes."
          />
          <HeroFact
            label="Sintoma"
            value="Duas verdades"
            hint="Commit sem publish, ou publish sem commit. Faturação e loja discordam."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Retry sem chave. Dual write. Exactly-once do broker como desculpa."
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
      <rect x="40" y="48" width="120" height="52" fill="none" stroke="#e07070" />
      <rect x="40" y="112" width="120" height="52" fill="none" stroke="#e07070" />
      <text x="58" y="78" fill="#e07070" fontSize="11" fontFamily="ui-monospace, monospace">
        POST 201
      </text>
      <text x="58" y="142" fill="#e07070" fontSize="11" fontFamily="ui-monospace, monospace">
        POST 201
      </text>
      <text x="48" y="186" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
        dois pedidos
      </text>
      <rect x="220" y="48" width="160" height="168" fill="none" stroke="#e0b35a" />
      <text x="236" y="78" fill="#e0b35a" fontSize="11" fontFamily="ui-monospace, monospace">
        commit
      </text>
      <text x="236" y="108" fill="#e0b35a" fontSize="11" fontFamily="ui-monospace, monospace">
        order + outbox
      </text>
      <path d="M300 120 V168" stroke="#6fc4b4" />
      <text x="236" y="188" fill="#6fc4b4" fontSize="11" fontFamily="ui-monospace, monospace">
        relay → evento
      </text>
    </svg>
  );
}
