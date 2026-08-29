"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import { TACTIC_IDS, TACTICS, type TacticId } from "@/lib/resilience/tactics";

export function TacticModel() {
  const [selected, setSelected] = useState<TacticId>("retry");
  const copy = TACTICS[selected];
  const danger = selected === "retry";

  return (
    <Section
      id="taticas"
      kicker="FIG. 02 — Clique a tática"
      title="Três alavancas, um vizinho instável"
      lead="Não é Istio. Não é chaos. Clique: o que a tática corta, o cheiro de quando falta, e quando retry é a segunda cobrança. Bulkhead e hedge cabem numa nota — não nesta página."
    >
      <div className="flex flex-wrap gap-2">
        {TACTIC_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`border px-3 py-2 font-display text-sm ${
              selected === id
                ? id === "retry"
                  ? "border-danger bg-danger/15 text-danger"
                  : "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {TACTICS[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-line bg-paper-2/40 p-4 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Loja → PSP · o caminho
          </p>
          <div className="mt-6 space-y-2">
            {TACTIC_IDS.map((id, index) => {
              const active = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  className={`block w-full border p-4 text-left transition ${
                    active
                      ? id === "retry"
                        ? "border-danger bg-danger/10"
                        : "border-gold bg-gold/10"
                      : "border-line bg-paper/40 hover:border-gold/30"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    0{index + 1} · {TACTICS[id].english}
                  </span>
                  <span className="mt-1 block font-display text-lg text-ink">
                    {TACTICS[id].name}
                  </span>
                  <span className="mt-1 block text-sm text-ink-dim">{TACTICS[id].question}</span>
                </button>
              );
            })}
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
