export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Não herde o cadáver
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Resiliência
          <span className="block text-gold">sem levar o vizinho</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Timeout, retry, breaker. Retry sem chave duplica o efeito.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          O PSP lenta ou cai. Sem teto, a loja espera com ele. Com retry no{" "}
          <strong className="font-medium text-ink">charge</strong>, o timeout
          cobra e a segunda tentativa cobra de novo. Circuit breaker isola a
          cascata. Não é mesh. Não é chaos de plataforma.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="A loja espera"
            hint="Oito checkouts na fila do PSP morto. O hang do vizinho virou hang nosso."
          />
          <HeroFact
            label="Sintoma"
            value="Retry cobrou duas"
            hint="Timeout de 200 ms. O cartão passou aos 600. A segunda tentativa passou de novo."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Chamar sem timeout. Retry em POST sem chave. Continuar batendo no cadáver."
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
      <rect x="36" y="70" width="90" height="56" fill="none" stroke="#6fc4b4" />
      <rect x="292" y="70" width="90" height="56" fill="none" stroke="#e07070" />
      <text x="52" y="102" fill="#6fc4b4" fontSize="12" fontFamily="ui-monospace, monospace">
        Loja
      </text>
      <text x="312" y="102" fill="#e07070" fontSize="12" fontFamily="ui-monospace, monospace">
        PSP
      </text>
      <path d="M126 98 H292" stroke="#e07070" strokeDasharray="5 4" />
      <text x="170" y="90" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
        hang…
      </text>
      <rect x="36" y="168" width="90" height="56" fill="none" stroke="#6fc4b4" />
      <rect x="292" y="168" width="90" height="56" fill="none" stroke="#e0b35a" strokeDasharray="4 4" />
      <text x="52" y="200" fill="#6fc4b4" fontSize="12" fontFamily="ui-monospace, monospace">
        Loja
      </text>
      <text x="304" y="200" fill="#e0b35a" fontSize="11" fontFamily="ui-monospace, monospace">
        aberto
      </text>
      <path d="M126 196 H180" stroke="#e0b35a" />
      <path d="M180 196 L292 196" stroke="#e0b35a" strokeDasharray="4 4" />
      <text x="186" y="188" fill="#e0b35a" fontSize="10" fontFamily="ui-monospace, monospace">
        fail fast
      </text>
    </svg>
  );
}
