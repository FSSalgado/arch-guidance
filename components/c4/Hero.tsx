export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Um zoom por vez
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          C4
          <span className="block text-gold">sem misturar o zoom</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Empresa, deploy e classe no mesmo desenho não é contexto.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          Um único diagrama tenta explicar a empresa, o que sobe onde e a classe
          do checkout. Quem olha não sabe{" "}
          <strong className="font-medium text-ink">qual pergunta o desenho responde</strong>
          . C4 é o mesmo sistema em zooms. Nível 4, na maior parte das vezes,
          nem se desenha.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Um slide só"
            hint="Cliente, Helm e CheckoutHandler no mesmo plano. Três conversas, zero zoom."
          />
          <HeroFact
            label="Sintoma"
            value="Nível 4 no mural"
            hint="O IDE já tem a árvore. Arquitetura que lista classe perdeu o corte."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Misturei níveis? Recuse o desenho. Não acrescente notação."
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
      <rect x="48" y="36" width="200" height="150" fill="none" stroke="#6fc4b4" strokeOpacity="0.7" />
      <rect x="72" y="60" width="152" height="102" fill="none" stroke="#e0b35a" strokeOpacity="0.85" />
      <rect x="96" y="84" width="104" height="54" fill="none" stroke="#e7e1d3" strokeOpacity="0.7" />
      <text x="56" y="56" fill="#6fc4b4" fontSize="11" fontFamily="ui-monospace, monospace">
        1 contexto
      </text>
      <text x="80" y="80" fill="#e0b35a" fontSize="11" fontFamily="ui-monospace, monospace">
        2 container
      </text>
      <text x="104" y="116" fill="#e7e1d3" fontSize="11" fontFamily="ui-monospace, monospace">
        3
      </text>
      <g opacity="0.7">
        <rect x="268" y="48" width="96" height="36" fill="none" stroke="#e07070" strokeDasharray="4 4" />
        <rect x="292" y="108" width="88" height="36" fill="none" stroke="#e07070" />
        <rect x="252" y="168" width="120" height="36" fill="none" stroke="#e07070" strokeDasharray="4 4" />
        <path d="M300 84 L330 108 M336 144 L300 168" stroke="#e07070" strokeOpacity="0.55" />
        <text x="276" y="70" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
          pessoa
        </text>
        <text x="304" y="130" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
          pod
        </text>
        <text x="264" y="190" fill="#e07070" fontSize="10" fontFamily="ui-monospace, monospace">
          Classe.java
        </text>
      </g>
    </svg>
  );
}
