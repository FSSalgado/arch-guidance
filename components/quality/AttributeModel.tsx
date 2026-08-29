"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  ATTRIBUTE_COLOR,
  ATTRIBUTE_COPY,
  ATTRIBUTE_IDS,
  TRADEOFF_PAIRS,
  type AttributeId,
} from "@/lib/quality/attributes";

export function AttributeModel() {
  const [selected, setSelected] = useState<AttributeId>("latency");
  const copy = ATTRIBUTE_COPY[selected];
  const vertices = useMemo(() => pentagonVertices(250, 170, 100), []);

  return (
    <Section
      id="atributos"
      kicker="FIG. 02 — Clique o eixo"
      title="Cinco perguntas, não um catálogo"
      lead="Não é ISO 25010. São os eixos que um checkout sente. Clique um vértice: a pergunta que o padrão deveria responder — e o cheiro de quem escolhe tática sem nomear o atributo."
    >
      <div className="flex flex-wrap gap-2">
        {ATTRIBUTE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`border px-3 py-2 font-display text-sm ${
              selected === id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {ATTRIBUTE_COPY[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto rounded-sm border border-line bg-paper-2/40">
          <svg
            viewBox="0 0 500 360"
            className="h-auto w-full min-w-[420px]"
            role="img"
            aria-label="Cinco atributos de qualidade em pentágono"
          >
            <polygon
              points={vertices.map((point) => `${point.x},${point.y}`).join(" ")}
              fill="rgba(224,179,90,0.06)"
              stroke="rgba(231,225,211,0.22)"
              strokeWidth="1.25"
            />
            {vertices.map((point, index) => {
              const id = ATTRIBUTE_IDS[index];
              const next = vertices[(index + 1) % vertices.length];
              const active = selected === id;
              return (
                <g key={id}>
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={ATTRIBUTE_COLOR[id]}
                    strokeWidth={active ? 2.4 : 1.2}
                    strokeOpacity={active ? 0.95 : 0.35}
                  />
                </g>
              );
            })}
            {vertices.map((point, index) => {
              const id = ATTRIBUTE_IDS[index];
              const active = selected === id;
              const label = labelPos(point, 250, 170, 40);
              return (
                <g
                  key={`${id}-node`}
                  className="cursor-pointer"
                  onClick={() => setSelected(id)}
                  role="button"
                  aria-label={ATTRIBUTE_COPY[id].name}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={active ? 11 : 8}
                    fill={active ? ATTRIBUTE_COLOR[id] : "#121820"}
                    stroke={ATTRIBUTE_COLOR[id]}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor="middle"
                    fill={active ? "#e0b35a" : "#9a9384"}
                    fontSize="13"
                    fontFamily="var(--font-syne), sans-serif"
                  >
                    {ATTRIBUTE_COPY[id].name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="border border-line bg-paper-2/70 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {copy.english} · pergunta
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{copy.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink">{copy.question}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{copy.summary}</p>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
            {copy.smell}
          </pre>
          <p className="mt-4 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink">
            {copy.refuse}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-dim">{copy.tension}</p>
        </aside>
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Tensões clássicas
      </p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {TRADEOFF_PAIRS.map((item) => {
          const hot = item.a === selected || item.b === selected;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.a)}
              className={`border p-4 text-left transition ${
                hot ? "border-gold/50 bg-paper-2/80" : "border-line bg-paper-2/40 hover:border-gold/30"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                {ATTRIBUTE_COPY[item.a].name} × {ATTRIBUTE_COPY[item.b].name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.punch}</p>
            </button>
          );
        })}
      </div>
    </Section>
  );
}

function pentagonVertices(cx: number, cy: number, r: number) {
  return ATTRIBUTE_IDS.map((_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

function labelPos(
  point: { x: number; y: number },
  cx: number,
  cy: number,
  extra: number,
) {
  const dx = point.x - cx;
  const dy = point.y - cy;
  const len = Math.hypot(dx, dy) || 1;
  return { x: cx + (dx / len) * (len + extra), y: cy + (dy / len) * (len + extra) + 4 };
}
