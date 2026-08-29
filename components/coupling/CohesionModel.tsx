"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  COHESION_REASONS,
  GOD_FILE,
  SPLIT_FILES,
  type CohesionReasonId,
} from "@/lib/coupling/cohesion";

export function CohesionModel() {
  const [split, setSplit] = useState(false);
  const [reason, setReason] = useState<CohesionReasonId>("market");
  const current = COHESION_REASONS.find((item) => item.id === reason) ?? COHESION_REASONS[0];
  const godHits = GOD_FILE.methods.filter((item) => item.reason === reason).length;

  return (
    <Section
      id="coesao"
      kicker="FIG. 04 — Dentro do módulo"
      title="Um arquivo, três razões"
      lead="Acoplamento é entre módulos. Coesão é dentro. Clique uma razão de mudança: no saco, o arquivo inteiro está em risco; no desenho coeso, só um arquivo acende."
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSplit(false)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider ${
            !split ? "bg-gold text-paper" : "border border-line text-ink-dim hover:text-ink"
          }`}
        >
          Arquivo-saco
        </button>
        <button
          type="button"
          onClick={() => setSplit(true)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider ${
            split ? "bg-gold text-paper" : "border border-line text-ink-dim hover:text-ink"
          }`}
        >
          Por razão de mudança
        </button>
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Razão de mudança
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {COHESION_REASONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setReason(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              reason === item.id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-dim">{current.hint}</p>

      {split ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SPLIT_FILES.map((file) => (
            <FileCard
              key={file.name}
              name={file.name}
              methods={file.methods}
              hotReason={reason}
              fileHot={file.reason === reason}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <FileCard name={GOD_FILE.name} methods={GOD_FILE.methods} hotReason={reason} fileHot />
        </div>
      )}

      <p className="mt-8 max-w-2xl border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink">
        {split
          ? `Marketing muda o banner: só Marketing.ts recompila. Pedido, pagamento e fiscal nem ficam sabendo.`
          : `Marketing muda o banner: ${GOD_FILE.name} inteiro está em jogo — e ${godHits} métodos desta razão convivem com outros seis de motivos diferentes.`}
      </p>
    </Section>
  );
}

function FileCard({
  name,
  methods,
  hotReason,
  fileHot,
}: {
  name: string;
  methods: { signature: string; reason: CohesionReasonId }[];
  hotReason: CohesionReasonId;
  fileHot: boolean;
}) {
  return (
    <div
      className={`border bg-paper-2/50 ${fileHot ? "border-gold/50" : "border-line opacity-70"}`}
    >
      <p className="border-b border-line px-4 py-2 font-mono text-[11px] text-gold-2">{name}</p>
      <ul>
        {methods.map((method) => {
          const hot = method.reason === hotReason;
          const reasonLabel =
            COHESION_REASONS.find((item) => item.id === method.reason)?.label ?? method.reason;
          return (
            <li
              key={method.signature}
              className={`flex items-center justify-between gap-3 border-b border-line px-4 py-2 last:border-b-0 ${
                hot ? "bg-gold/15 text-ink" : "text-ink-dim"
              }`}
            >
              <span className="font-mono text-[12px]">{method.signature}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider">
                {reasonLabel}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
