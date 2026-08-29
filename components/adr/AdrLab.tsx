"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  ADR_STATUSES,
  DEFAULT_CONTEXT,
  DEFAULT_TITLE,
  OPTION_IDS,
  OPTIONS,
  THRESHOLDS,
  renderAdr,
  type AdrStatus,
  type OptionId,
} from "@/lib/adr/lab";

export function AdrLab() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [status, setStatus] = useState<AdrStatus>("accepted");
  const [context, setContext] = useState(DEFAULT_CONTEXT);
  const [selected, setSelected] = useState<OptionId | null>(null);
  const [why, setWhy] = useState("");
  const [thresholdId, setThresholdId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const artifact = useMemo(
    () => renderAdr({ title, status, context, selected, why }),
    [title, status, context, selected, why],
  );
  const chosen = selected ? OPTIONS[selected] : null;
  const threshold = THRESHOLDS.find((item) => item.id === thresholdId);

  async function copyArtifact() {
    try {
      await navigator.clipboard.writeText(artifact);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — E-mail de pedido, três opções"
      title="Preencha o ADR e veja o artefato"
      lead="O cenário é o e-mail de confirmação — não o lab hexagonal, não o de atributos. Clique uma opção. O markdown registra o vencedor e o que foi recusado. Abaixo: o teste de quando não gravar."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Título
            </span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full border border-line bg-paper-2/50 px-3 py-2 font-display text-lg text-ink outline-none focus:border-gold/50"
            />
          </label>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Status</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ADR_STATUSES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStatus(item.id)}
                  className={`border px-3 py-2 font-display text-sm ${
                    status === item.id
                      ? "border-gold bg-gold/15 text-gold-2"
                      : "border-line text-ink-dim hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {status === "superseded" ? (
              <p className="mt-2 text-sm text-ink-dim">
                Superado aponta para o próximo arquivo. Não se apaga o anterior.
              </p>
            ) : null}
          </div>

          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Contexto
            </span>
            <textarea
              value={context}
              onChange={(event) => setContext(event.target.value)}
              rows={5}
              className="mt-2 w-full resize-y border border-line bg-paper-2/50 px-3 py-2 text-sm leading-relaxed text-ink outline-none focus:border-gold/50"
            />
          </label>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Opções — clique a decisão
            </p>
            <div className="mt-2 grid gap-2">
              {OPTION_IDS.map((id) => {
                const option = OPTIONS[id];
                const active = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={`border p-4 text-left transition ${
                      active
                        ? "border-gold bg-gold/10"
                        : "border-line bg-paper-2/40 hover:border-gold/30"
                    }`}
                  >
                    <span className="font-display text-lg text-ink">{option.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-dim">
                      {option.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Por quê (opcional)
            </span>
            <input
              value={why}
              onChange={(event) => setWhy(event.target.value)}
              placeholder="A frase que o Slack ia esquecer"
              className="mt-2 w-full border border-line bg-paper-2/50 px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-dim/70 focus:border-gold/50"
            />
          </label>

          {chosen?.warning ? (
            <p className="border-l-2 border-danger pl-4 text-sm leading-relaxed text-ink">
              {chosen.warning}
            </p>
          ) : null}
        </div>

        <div className="border border-line bg-paper-2/50 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Artefato gerado
            </p>
            <button
              type="button"
              onClick={() => void copyArtifact()}
              className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold-2 hover:bg-gold/15"
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          <pre className="mt-4 max-h-[640px] overflow-auto whitespace-pre-wrap border border-line bg-paper p-4 font-mono text-[12px] leading-relaxed text-gold-2">
            {artifact}
          </pre>
        </div>
      </div>

      <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Esta decisão merece ADR?
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">
        O lab acima é o caso para gravar. Clique um vizinho: local, reversível e
        óbvio não entram no mesmo arquivo.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {THRESHOLDS.map((item) => {
          const active = thresholdId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setThresholdId(active ? null : item.id)}
              className={`border px-3 py-2 font-display text-sm ${
                active
                  ? item.record
                    ? "border-ok bg-ok/15 text-ok"
                    : "border-danger bg-danger/15 text-danger"
                  : "border-line text-ink-dim hover:text-ink"
              }`}
            >
              {item.prompt}
            </button>
          );
        })}
      </div>
      {threshold ? (
        <p
          className={`mt-4 max-w-2xl border-l-2 pl-4 text-sm leading-relaxed text-ink ${
            threshold.record ? "border-ok" : "border-danger"
          }`}
        >
          {threshold.verdict}
        </p>
      ) : (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
          Clique para o juízo
        </p>
      )}
    </Section>
  );
}
