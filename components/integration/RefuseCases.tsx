"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import { REFUSE_CASES } from "@/lib/integration/refuse";

export function RefuseCases() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="recusar"
      kicker="FIG. 04 — O critério de aceite"
      title="Onde você recusa o cano errado"
      lead="Quem só lista arquivo, banco, API e fila ainda não terminou a página. Clique o caso: o juízo é recusar o banco compartilhado entre times — e recusar o lote no clique do checkout."
    >
      <div className="grid gap-4">
        {REFUSE_CASES.map((item) => {
          const selected = open === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(selected ? null : item.id)}
              className={`border p-5 text-left transition ${
                selected ? "border-gold bg-paper-2/80" : "border-line bg-paper-2/40 hover:border-gold/30"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                {item.stance === "recuse" ? "Candidato a recusa" : "Candidato a tratar"}
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink">{item.prompt}</p>
              {selected ? (
                <p
                  className={`mt-4 border-l-2 pl-4 text-sm leading-relaxed ${
                    item.stance === "recuse" ? "border-danger text-ink" : "border-ok text-ink"
                  }`}
                >
                  {item.verdict}
                </p>
              ) : (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                  Clique para o juízo
                </p>
              )}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
