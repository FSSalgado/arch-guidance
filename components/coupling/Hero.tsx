"use client";

export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-8 top-12 hidden opacity-50 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Dois eixos, um juízo
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Acoplamento
          <span className="block text-gold">e coesão</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Módulos que mudam juntos não são dois módulos.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          <strong className="font-medium text-ink">Acoplamento</strong> é o quanto A
          sente a mudança de B.{" "}
          <strong className="font-medium text-ink">Coesão</strong> é o quanto as partes
          de A mudam pela mesma razão. O objetivo não é zero acoplamento. É juntar o
          que muda junto e separar o que muda por motivos diferentes.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Ripple"
            hint="Uma mudança de requisito acende oito arquivos. Os “módulos” eram um só."
          />
          <HeroFact
            label="Sintoma"
            value="Arquivo-saco"
            hint="Três razões de mudança no mesmo sítio. Quem mexe no banner quebra o pedido."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Fatiar o que deveria ficar junto é o erro simétrico do god object."
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
      <g fill="none" stroke="#e07070" strokeOpacity="0.55">
        <rect x="40" y="40" width="88" height="44" />
        <rect x="200" y="28" width="88" height="44" />
        <rect x="120" y="120" width="88" height="44" />
        <rect x="280" y="110" width="88" height="44" />
        <path d="M84 84 C 90 110, 140 70, 200 50" />
        <path d="M244 72 C 220 100, 180 110, 164 120" />
        <path d="M164 164 C 200 180, 280 80, 280 110" />
        <path d="M84 62 C 160 20, 300 40, 324 110" />
        <path d="M208 164 C 240 200, 300 190, 324 154" />
      </g>
      <g fill="none" stroke="#6fc4b4" strokeOpacity="0.7" transform="translate(0 8)">
        <rect x="40" y="210" width="88" height="36" />
        <rect x="200" y="210" width="88" height="36" />
        <path d="M128 228 H 200" />
      </g>
    </svg>
  );
}
