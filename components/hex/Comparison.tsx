"use client";

import { useState } from "react";
import { Section } from "./Section";

const STYLES = [
  {
    id: "n",
    name: "N-camadas",
    angle: "Pilha vertical",
    same: "Também separa UI, regras e dados — no papel.",
    diff: "Dependências costumam descer até o banco. A “camada de negócio” frequentemente importa o ORM. Trocar a UI ou o SQL vaza para o meio.",
    vs: "No hexágono, persistência é adapter atrás de porta. O miolo não desce.",
  },
  {
    id: "onion",
    name: "Onion",
    angle: "Anéis concêntricos",
    same: "Domínio no centro. Dependências apontam para dentro. Infra na borda.",
    diff: "Ênfase no modelo de domínio e nos anéis (domínio → aplicação → infra). Menos ênfase na simetria entrada/saída.",
    vs: "Hexágono nomeia portas e trata testes, CLI e HTTP como adapters equivalentes.",
  },
  {
    id: "clean",
    name: "Clean",
    angle: "Entidades → casos de uso → adapters → frameworks",
    same: "Regra de dependência idêntica no espírito. Casos de uso no meio.",
    diff: "Uncle Bob fatia e nomeia mais camadas (interface adapters, presenters, gateways).",
    vs: "Hexágono é o ancestral mais enxuto: porta + adapter. Clean detalha o mapa; a seta continua para o centro.",
  },
] as const;

export function Comparison() {
  const [open, setOpen] = useState<(typeof STYLES)[number]["id"]>("n");
  const current = STYLES.find((item) => item.id === open) ?? STYLES[0];

  return (
    <Section
      id="comparar"
      kicker="FIG. 07 — Vizinhos, não capítulos novos"
      title="N-camadas, Onion e Clean"
      lead="Não são páginas desta versão — só um contraste rápido com o hexágono que você está estudando."
    >
      <div className="flex flex-wrap gap-2">
        {STYLES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(item.id)}
            className={`border px-4 py-2 font-display ${
              open === item.id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Note kicker="Leitura" title={current.angle} />
        <Note kicker="Parecido" title={current.same} />
        <Note kicker="Diferença" title={current.diff} />
      </div>
      <p className="mt-6 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink">
        Frente ao hexágono: {current.vs}
      </p>
    </Section>
  );
}

function Note({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border border-line bg-paper-2/50 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        {kicker}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{title}</p>
    </div>
  );
}
