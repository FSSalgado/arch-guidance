"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import { evaluateLab, INCIDENTS, type IncidentId } from "@/lib/integration/lab";
import { STYLE_IDS, STYLES, type StyleId } from "@/lib/integration/styles";

export function IntegrationLab() {
  const [style, setStyle] = useState<StyleId>("sharedDb");
  const [incident, setIncident] = useState<IncidentId>("schemaChange");
  const result = useMemo(() => evaluateLab(style, incident), [style, incident]);

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — Loja ↔ faturação, um pedido"
      title="O mesmo par, quatro canos, um incidente"
      lead="Não é o lab hexagonal. Não há broker. Pedido pago na Loja Norte precisa chegar à faturação. Troque o estilo e o incidente: o que acopla e o que quebra mudam juntos."
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Estilo</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {STYLE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setStyle(id)}
            className={`border px-3 py-2 font-display text-sm ${
              style === id
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

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Incidente
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {INCIDENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIncident(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              incident === item.id
                ? item.id === "none"
                  ? "border-gold bg-gold/15 text-gold-2"
                  : "border-danger bg-danger/15 text-danger"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <SideCard title="Loja Norte" status={result.loja.status} note={result.loja.note} />
        <div className="flex items-center justify-center border border-line bg-paper-2/40 px-4 py-6 text-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Cano
            </p>
            <p className="mt-2 font-display text-xl text-ink">{STYLES[style].pipe}</p>
            <p className="mt-1 text-sm text-ink-dim">{STYLES[style].name}</p>
          </div>
        </div>
        <SideCard title="Faturação" status={result.billing.status} note={result.billing.note} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="border border-line bg-paper-2/50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Acopla agora</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{result.couple}</p>
        </div>
        <div className="border border-line bg-paper-2/50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">O que aconteceu</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{result.story}</p>
        </div>
      </div>

      {result.refuse ? (
        <p className="mt-6 border-l-2 border-danger pl-4 text-sm leading-relaxed text-ink">
          {result.refuse}
        </p>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-ink-dim">
          Quando fizer sentido: {STYLES[style].when}
        </p>
      )}
    </Section>
  );
}

function SideCard({
  title,
  status,
  note,
}: {
  title: string;
  status: string;
  note: string;
}) {
  const tone =
    status === "ok"
      ? "border-ok/50 text-ok"
      : status === "delayed"
        ? "border-gold/50 text-gold"
        : "border-danger/50 text-danger";
  const label =
    status === "ok"
      ? "Ok"
      : status === "blocked"
        ? "Bloqueado"
        : status === "delayed"
          ? "Atrasado"
          : status === "duplicate"
            ? "Duplicata"
            : "Torto";

  return (
    <div className={`border bg-paper-2/50 p-5 ${tone}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em]">{label}</p>
      <h3 className="mt-1 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink">{note}</p>
    </div>
  );
}
