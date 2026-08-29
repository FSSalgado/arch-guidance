"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  ATTRIBUTE_COLOR,
  ATTRIBUTE_COPY,
  ATTRIBUTE_IDS,
  type AttributeId,
} from "@/lib/quality/attributes";
import {
  CHECKOUT_EDGES,
  DEFAULT_PRIORITIES,
  PRESETS,
  evaluateLab,
  nodeCenter,
  tacticsOnNode,
  type CheckoutNodeId,
  type Priorities,
} from "@/lib/quality/lab";

export function TradeoffLab() {
  const [priorities, setPriorities] = useState<Priorities>({ ...DEFAULT_PRIORITIES });
  const [selected, setSelected] = useState<CheckoutNodeId>("pay");
  const state = useMemo(() => evaluateLab(priorities), [priorities]);
  const node = state.nodes.find((item) => item.id === selected);
  const onNode = tacticsOnNode(state, selected).filter((tactic) => tactic.status !== "idle");
  const activePreset = PRESETS.find((preset) =>
    ATTRIBUTE_IDS.every((id) => preset.priorities[id] === priorities[id]),
  );

  function setPriority(id: AttributeId, value: number) {
    setPriorities((current) => ({ ...current, [id]: value }));
  }

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — Checkout, cinco sliders"
      title="Suba um eixo e veja o outro cair"
      lead="O cenário é um checkout — não o lab hexagonal, não o de acoplamento. Arraste as prioridades. O desenho aplica táticas que sobem um atributo e rebaixam outro. Máximo em latência, custo e consistência some o desenho."
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Pedido (atalho)
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setPriorities({ ...preset.priorities })}
            className={`border px-3 py-2 font-display text-sm ${
              activePreset?.id === preset.id
                ? preset.id === "all"
                  ? "border-danger bg-danger/15 text-danger"
                  : "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ATTRIBUTE_IDS.map((id) => (
          <label key={id} className="border border-line bg-paper-2/50 p-4">
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-display text-lg text-ink">{ATTRIBUTE_COPY[id].name}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gold-2">
                {priorities[id]} / 5
              </span>
            </span>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={priorities[id]}
              onChange={(event) => setPriority(id, Number(event.target.value))}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={priorities[id]}
              aria-label={`Prioridade de ${ATTRIBUTE_COPY[id].name}`}
              className="mt-3 w-full"
              style={{ accentColor: "#e0b35a" }}
            />
            <span className="mt-2 block text-xs leading-relaxed text-ink-dim">
              {ATTRIBUTE_COPY[id].question}
            </span>
          </label>
        ))}
      </div>

      <div
        className={`mt-8 border p-5 ${
          state.verdict.kind === "impossible"
            ? "border-danger bg-danger/10"
            : state.verdict.kind === "conflict"
              ? "border-inbound bg-inbound/10"
              : "border-line bg-paper-2/50"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
          {state.verdict.kind === "impossible"
            ? "Recuse este pedido"
            : state.verdict.kind === "conflict"
              ? "Trade-off visível"
              : "Desenho atual"}
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">{state.verdict.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink">{state.verdict.body}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto rounded-sm border border-line bg-paper-2/40">
          <svg
            viewBox="0 0 700 300"
            className="h-auto w-full min-w-[640px]"
            role="img"
            aria-label="Checkout com táticas segundo as prioridades"
          >
            {CHECKOUT_EDGES.map((edge) => {
              const from = state.nodes.find((item) => item.id === edge.from);
              const to = state.nodes.find((item) => item.id === edge.to);
              if (!from || !to) return null;
              const a = nodeCenter(from);
              const b = nodeCenter(to);
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(231,225,211,0.28)"
                  strokeWidth="1.5"
                />
              );
            })}
            {state.nodes.map((box) => (
              <CheckoutBox
                key={box.id}
                node={box}
                active={selected === box.id}
                onSelect={() => setSelected(box.id)}
              />
            ))}
            <text
              x="28"
              y="286"
              fill="#9a9384"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.14em"
            >
              CLIQUE UMA CAIXA  ·  OURO = TÁTICA APLICADA  ·  VERMELHO = RECUSADA
            </text>
          </svg>
        </div>

        <aside className="border border-line bg-paper-2/70 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {node?.label ?? "Caixa"} · checkout
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{node?.label}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{node?.caption}</p>
          {onNode.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">
              Nenhuma tática pressionou esta caixa. O baseline do checkout sem herói permanece.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {onNode.map((tactic) => (
                <li key={tactic.id} className="border-l-2 pl-3" style={{ borderColor: tone(tactic.status) }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    {tactic.status === "applied"
                      ? "Aplicada"
                      : tactic.status === "blocked"
                        ? "Recusada"
                        : "Em espera"}
                    {" · "}
                    {tactic.up.map((id) => ATTRIBUTE_COPY[id].name).join("/")} ↑{" · "}
                    {tactic.down.map((id) => ATTRIBUTE_COPY[id].name).join("/")} ↓
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{tactic.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Resultado no desenho (não o pedido)
      </p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-5">
        {ATTRIBUTE_IDS.map((id) => (
          <div key={id} className="border border-line bg-paper-2/50 p-3">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
              {ATTRIBUTE_COPY[id].name}
            </dt>
            <dd className="mt-2">
              <div className="h-1.5 w-full overflow-hidden border border-line">
                <div
                  className="h-full"
                  style={{
                    width: `${state.scores[id]}%`,
                    background: ATTRIBUTE_COLOR[id],
                  }}
                />
              </div>
              <p className="mt-2 font-display text-xl text-ink">{state.scores[id]}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Barras no meio = compromisso. Barras no teto num eixo e no chão noutro = tática honesta.
        Cinco tetos = recuse.
      </p>
    </Section>
  );
}

function tone(status: "applied" | "blocked" | "idle"): string {
  if (status === "applied") return "#e0b35a";
  if (status === "blocked") return "#e07070";
  return "rgba(231,225,211,0.28)";
}

function CheckoutBox({
  node,
  active,
  onSelect,
}: {
  node: {
    id: CheckoutNodeId;
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
    hot: boolean;
    danger: boolean;
  };
  active: boolean;
  onSelect: () => void;
}) {
  const fill = active ? "#e0b35a" : node.danger ? "#2a1616" : node.hot ? "#1a2418" : "#121820";
  const stroke = node.danger ? "#e07070" : active ? "#e0b35a" : node.hot ? "#e0b35a" : "rgba(231,225,211,0.28)";
  const text = active ? "#0b0f14" : node.danger ? "#e07070" : "#e7e1d3";
  return (
    <g className="cursor-pointer" onClick={onSelect} role="button" aria-label={node.label}>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        fill={fill}
        stroke={stroke}
        strokeWidth={active || node.danger || node.hot ? 2 : 1.25}
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + node.h / 2 + 4}
        textAnchor="middle"
        fill={text}
        fontSize="14"
        fontFamily="var(--font-syne), sans-serif"
      >
        {node.label}
      </text>
    </g>
  );
}
