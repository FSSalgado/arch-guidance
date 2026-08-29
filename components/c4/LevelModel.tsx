"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import { C4_LEVEL_IDS, C4_LEVELS, type C4LevelId } from "@/lib/c4/levels";

export function LevelModel() {
  const [selected, setSelected] = useState<C4LevelId>("context");
  const copy = C4_LEVELS[selected];
  const isCode = selected === "code";

  return (
    <Section
      id="niveis"
      kicker="FIG. 02 — Clique o zoom"
      title="Quatro níveis, uma pergunta cada"
      lead="Não é UML. Não é notação obrigatória. Clique um nível: quem lê, o que cabe, e o cheiro de misturar com o vizinho. O nível 4 existe para você recusar desenhá-lo."
    >
      <div className="flex flex-wrap gap-2">
        {C4_LEVEL_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`border px-3 py-2 font-display text-sm ${
              selected === id
                ? id === "code"
                  ? "border-danger bg-danger/15 text-danger"
                  : "border-gold bg-gold/15 text-gold-2"
                : id === "code"
                  ? "border-line text-danger/80 hover:text-danger"
                  : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {C4_LEVELS[id].number} · {C4_LEVELS[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-line bg-paper-2/40 p-4 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            O mesmo sistema · um corte
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            {C4_LEVEL_IDS.map((id, index) => {
              const active = selected === id;
              const width = `${100 - index * 12}%`;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  style={{ width }}
                  className={`border px-4 py-3 text-left transition ${
                    active
                      ? id === "code"
                        ? "border-danger border-dashed bg-danger/10"
                        : "border-gold bg-gold/10"
                      : id === "code"
                        ? "border-dashed border-danger/40 hover:border-danger"
                        : "border-line bg-paper/40 hover:border-gold/30"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                      id === "code" ? "text-danger" : "text-gold"
                    }`}
                  >
                    Nível {C4_LEVELS[id].number} · {C4_LEVELS[id].english}
                  </span>
                  <span className="mt-1 block font-display text-lg text-ink">
                    {C4_LEVELS[id].name}
                    {id === "code" ? " — em geral, não" : ""}
                  </span>
                  <span className="mt-1 block text-sm text-ink-dim">
                    {C4_LEVELS[id].question}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside
          className={`border p-5 ${
            isCode ? "border-danger/60 bg-danger/5" : "border-line bg-paper-2/70"
          }`}
        >
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
              isCode ? "text-danger" : "text-gold"
            }`}
          >
            {copy.english} · audiência
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{copy.name}</h3>
          <p className="mt-1 text-sm text-ink-dim">{copy.audience}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{copy.question}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{copy.summary}</p>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
            {copy.smell}
          </pre>
          <p
            className={`mt-4 border-l-2 pl-4 text-sm leading-relaxed text-ink ${
              isCode ? "border-danger" : "border-gold/50"
            }`}
          >
            {copy.refuse}
          </p>
        </aside>
      </div>
    </Section>
  );
}
