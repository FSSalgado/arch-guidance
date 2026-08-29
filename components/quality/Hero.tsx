export function Hero() {
  return (
    <section id="problema" className="relative overflow-hidden scroll-mt-28">
      <div className="pointer-events-none absolute -right-4 top-10 hidden opacity-55 lg:block">
        <HeroSketch />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          FIG. 01 — Nomeie o que sobe
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Atributos
          <span className="block text-gold">e trade-off</span>
        </h1>
        <p className="mt-3 font-display text-xl text-ink-dim md:text-2xl">
          Padrão sem atributo é palpite.
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
          Escolher fila, cache ou hexágono sem dizer{" "}
          <strong className="font-medium text-ink">o que o sistema precisa ser</strong>{" "}
          é decorar um nome. Latência, disponibilidade, custo, evoluibilidade e
          consistência não sobem juntos. O juízo é recusar o slide em que todos
          estão no máximo.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <HeroFact
            label="Sintoma"
            value="Padrão primeiro"
            hint="“Vamos de fila.” Ninguém disse se o que dói é milissegundo, nove extra ou a troca do PSP."
          />
          <HeroFact
            label="Sintoma"
            value="Máximo em todos"
            hint="Checkout instantâneo, barato, estoque sempre certo. Três frases, zero desenho."
          />
          <HeroFact
            label="Juízo"
            value="Recusar"
            hint="Peça dois eixos. O terceiro é o preço — com nome, não com “a gente otimiza depois”."
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
  const cx = 210;
  const cy = 150;
  const r = 108;
  const points = Array.from({ length: 5 }, (_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const broken = `${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`;
  const rest = `${points[2].x},${points[2].y} ${points[3].x},${points[3].y} ${points[4].x},${points[4].y} ${points[0].x},${points[0].y}`;
  return (
    <svg width="420" height="300" viewBox="0 0 420 300" aria-hidden="true">
      <polygon
        points={rest}
        fill="none"
        stroke="#6fc4b4"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <polyline
        points={broken}
        fill="none"
        stroke="#e07070"
        strokeOpacity="0.75"
        strokeWidth="1.8"
        strokeDasharray="6 5"
      />
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={index === 0 || index === 1 ? 5 : 3.5}
          fill={index === 0 || index === 1 ? "#e07070" : "#e0b35a"}
          fillOpacity="0.85"
        />
      ))}
    </svg>
  );
}
