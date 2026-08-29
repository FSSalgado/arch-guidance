"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  ADR_SECTION_IDS,
  ADR_SECTIONS,
  type AdrSectionId,
} from "@/lib/adr/anatomy";

export function AnatomyModel() {
  const [selected, setSelected] = useState<AdrSectionId>("options");
  const copy = ADR_SECTIONS[selected];
  const skip = selected === "skip";

  return (
    <Section
      id="anatomia"
      kicker="FIG. 02 — Clique a seção"
      title="Seis campos, e um sétimo que é recusar"
      lead="Não é template de empresa. Clique um bloco: o que entra, o cheiro de quando falta, e quando o juízo é não gravar. O valor está nas opções recusadas — não no anúncio do vencedor."
    >
      <div className="flex flex-wrap gap-2">
        {ADR_SECTION_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`border px-3 py-2 font-display text-sm ${
              selected === id
                ? id === "skip"
                  ? "border-danger bg-danger/15 text-danger"
                  : "border-gold bg-gold/15 text-gold-2"
                : id === "skip"
                  ? "border-line text-danger/80 hover:text-danger"
                  : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {ADR_SECTIONS[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-line bg-paper-2/40 p-4 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Artefato · clique o bloco
          </p>
          <div className="mt-4 space-y-2">
            {ADR_SECTION_IDS.filter((id) => id !== "skip").map((id, index) => {
              const active = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  className={`block w-full border p-3 text-left transition ${
                    active
                      ? "border-gold bg-gold/10"
                      : "border-line bg-paper/40 hover:border-gold/30"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    {String(index + 1).padStart(2, "0")} · {ADR_SECTIONS[id].english}
                  </span>
                  <span className="mt-1 block font-display text-lg text-ink">
                    {ADR_SECTIONS[id].name}
                  </span>
                  <span className="mt-1 block text-sm text-ink-dim">
                    {ADR_SECTIONS[id].question}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelected("skip")}
              className={`block w-full border border-dashed p-3 text-left transition ${
                skip
                  ? "border-danger bg-danger/10"
                  : "border-danger/40 bg-transparent hover:border-danger"
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-danger">
                00 · Skip
              </span>
              <span className="mt-1 block font-display text-lg text-danger">Não grave</span>
              <span className="mt-1 block text-sm text-ink-dim">
                {ADR_SECTIONS.skip.question}
              </span>
            </button>
          </div>
        </div>

        <aside
          className={`border p-5 ${
            skip ? "border-danger/60 bg-danger/5" : "border-line bg-paper-2/70"
          }`}
        >
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
              skip ? "text-danger" : "text-gold"
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
              skip ? "border-danger" : "border-gold/50"
            }`}
          >
            {copy.refuse}
          </p>
        </aside>
      </div>
    </Section>
  );
}
