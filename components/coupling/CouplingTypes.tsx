"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import { COUPLING_KINDS, KIND_COPY, KIND_COLOR, type CouplingKind } from "@/lib/coupling/lab";

export function CouplingTypes() {
  const [kind, setKind] = useState<CouplingKind>("content");
  const copy = KIND_COPY[kind];

  return (
    <Section
      id="tipos"
      kicker="FIG. 02 — Clique o tipo"
      title="Do conteúdo à mensagem"
      lead="Seis graus clássicos, do pior ao mais frouxo. O ponto não é memorizar a lista — é reconhecer o cheiro e saber quando o grau “mais frouxo” também é o errado."
    >
      <div className="flex flex-wrap gap-2">
        {COUPLING_KINDS.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id)}
            className={`border px-3 py-2 text-left font-display transition ${
              kind === id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            <span className="block font-mono text-[10px] uppercase tracking-wider opacity-70">
              {index + 1}
            </span>
            {KIND_COPY[id].name}
          </button>
        ))}
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden border border-line">
        <div className="flex h-full">
          {COUPLING_KINDS.map((id) => (
            <div
              key={id}
              className="h-full flex-1"
              style={{
                background: KIND_COLOR[id],
                opacity: id === kind ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        <span>Mais rígido</span>
        <span>Mais frouxo</span>
      </div>

      <aside className="mt-8 border border-line bg-paper-2/70 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
          {copy.english} · {copy.rank}
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">{copy.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{copy.summary}</p>
        <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
          {copy.smell}
        </pre>
        <p className="mt-4 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink">
          {copy.refuse}
        </p>
      </aside>
    </Section>
  );
}
