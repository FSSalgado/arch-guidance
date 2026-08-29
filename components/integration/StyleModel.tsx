"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import { STYLE_IDS, STYLES, type StyleId } from "@/lib/integration/styles";

export function StyleModel() {
  const [selected, setSelected] = useState<StyleId>("sharedDb");
  const copy = STYLES[selected];
  const danger = selected === "sharedDb";

  return (
    <Section
      id="estilos"
      kicker="FIG. 02 — Clique o cano"
      title="Quatro tubos, o mesmo par"
      lead="Não é Kafka. Não é REST vs GraphQL. Clique um estilo: o que acopla, a falha típica, e quando recusar. Loja e faturação são sempre os dois lados — muda só o cano."
    >
      <div className="flex flex-wrap gap-2">
        {STYLE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`border px-3 py-2 font-display text-sm ${
              selected === id
                ? id === "sharedDb"
                  ? "border-danger bg-danger/15 text-danger"
                  : "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {STYLES[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-line bg-paper-2/40 p-4 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Loja Norte · Faturação · um cano
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <SystemCard name="Loja Norte" tone="loja" />
            <div className="flex flex-1 flex-col items-center gap-2 py-2">
              {STYLE_IDS.map((id) => {
                const active = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={`w-full border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
                      active
                        ? id === "sharedDb"
                          ? "border-danger bg-danger/10 text-danger"
                          : "border-gold bg-gold/10 text-gold-2"
                        : "border-line text-ink-dim hover:text-ink"
                    }`}
                  >
                    {STYLES[id].pipe} · {STYLES[id].name}
                  </button>
                );
              })}
            </div>
            <SystemCard name="Faturação" tone="billing" />
          </div>
        </div>

        <aside
          className={`border p-5 ${
            danger ? "border-danger/60 bg-danger/5" : "border-line bg-paper-2/70"
          }`}
        >
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
              danger ? "text-danger" : "text-gold"
            }`}
          >
            {copy.english} · pergunta
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{copy.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink">{copy.question}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{copy.summary}</p>
          <p className="mt-4 text-sm text-ink">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              Acopla
            </span>
            <span className="mt-1 block text-ink-dim">{copy.couples}</span>
          </p>
          <p className="mt-3 text-sm text-ink">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              Falha típica
            </span>
            <span className="mt-1 block text-ink-dim">{copy.failure}</span>
          </p>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
            {copy.smell}
          </pre>
          <p
            className={`mt-4 border-l-2 pl-4 text-sm leading-relaxed text-ink ${
              danger ? "border-danger" : "border-gold/50"
            }`}
          >
            {copy.refuse}
          </p>
        </aside>
      </div>
    </Section>
  );
}

function SystemCard({ name, tone }: { name: string; tone: "loja" | "billing" }) {
  return (
    <div
      className={`border p-4 sm:w-36 ${
        tone === "loja" ? "border-port/50 bg-port/5" : "border-outbound/50 bg-outbound/5"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Sistema</p>
      <p className="mt-1 font-display text-lg text-ink">{name}</p>
    </div>
  );
}
