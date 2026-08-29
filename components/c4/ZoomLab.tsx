"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import type { C4LevelId } from "@/lib/c4/levels";
import {
  BREADCRUMB,
  MIXED_NODES,
  ZOOM_VIEWS,
  type DiagramNode,
} from "@/lib/c4/store";

type Mode = "honest" | "mixed";

export function ZoomLab() {
  const [mode, setMode] = useState<Mode>("honest");
  const [level, setLevel] = useState<C4LevelId>("context");
  const [selectedId, setSelectedId] = useState<string>("store");
  const view = ZOOM_VIEWS[level];
  const selected = view.nodes.find((node) => node.id === selectedId) ?? view.nodes[0];

  function goTo(next: C4LevelId) {
    setLevel(next);
    const firstZoom = ZOOM_VIEWS[next].nodes.find((node) => node.zoomTo);
    setSelectedId(firstZoom?.id ?? ZOOM_VIEWS[next].nodes[0].id);
  }

  function onNode(node: DiagramNode) {
    if (selectedId === node.id && node.zoomTo) {
      goTo(node.zoomTo);
      return;
    }
    setSelectedId(node.id);
  }

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — As mesmas caixas, zoom"
      title="Desça na Loja Norte — e recuse o slide único"
      lead="Não é o lab hexagonal. Não há PlaceOrder com adapters. É a mesma loja em três cortes. Clique uma caixa para descer. O nível código aparece para você recusar desenhá-lo. O outro modo junta pessoa, pod e classe — o anti-padrão."
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Modo</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("honest");
            setLevel("context");
            setSelectedId("store");
          }}
          className={`border px-3 py-2 font-display text-sm ${
            mode === "honest"
              ? "border-gold bg-gold/15 text-gold-2"
              : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Zoom honesto
        </button>
        <button
          type="button"
          onClick={() => setMode("mixed")}
          className={`border px-3 py-2 font-display text-sm ${
            mode === "mixed"
              ? "border-danger bg-danger/15 text-danger"
              : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Um diagrama só
        </button>
      </div>

      {mode === "mixed" ? (
        <MixedCanvas />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="border border-line bg-paper-2/40 p-4 md:p-6">
            <nav className="flex flex-wrap items-center gap-2" aria-label="Nível atual">
              {BREADCRUMB.map((crumb, index) => {
                const reachable = C4_RANK[crumb.id] <= C4_RANK[level];
                const current = crumb.id === level;
                return (
                  <span key={crumb.id} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span className="text-ink-dim" aria-hidden>
                        /
                      </span>
                    ) : null}
                    <button
                      type="button"
                      disabled={!reachable}
                      onClick={() => goTo(crumb.id)}
                      className={`font-mono text-[11px] uppercase tracking-wider ${
                        current
                          ? "text-gold"
                          : reachable
                            ? "text-ink-dim hover:text-ink"
                            : "cursor-default text-ink-dim/40"
                      }`}
                    >
                      {crumb.label}
                    </button>
                  </span>
                );
              })}
            </nav>
            <p className="mt-4 font-display text-2xl text-ink">{view.title}</p>
            <p className="mt-1 text-sm text-ink-dim">{view.focus}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">{view.lead}</p>

            {level === "code" ? (
              <p className="mt-4 border-l-2 border-danger pl-4 text-sm leading-relaxed text-ink">
                Geralmente nem desenha. Suba pela trilha acima. O IDE já mostra estas classes.
              </p>
            ) : null}

            <div
              className={`mt-6 grid gap-3 sm:grid-cols-2 ${
                level === "code" ? "opacity-55" : ""
              }`}
            >
              {view.nodes.map((node) => {
                const active = selectedId === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => onNode(node)}
                    className={`border p-4 text-left transition ${
                      kindBorder(node.kind, active, Boolean(node.zoomTo))
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                      {kindLabel(node.kind)}
                      {node.zoomTo ? " · descer" : ""}
                    </span>
                    <span className="mt-1 block font-display text-lg text-ink">{node.name}</span>
                    <span className="mt-1 block text-sm text-ink-dim">{node.summary}</span>
                  </button>
                );
              })}
            </div>

            <ul className="mt-5 space-y-1">
              {view.edges.map((edge) => (
                <li
                  key={`${edge.from}-${edge.to}`}
                  className="font-mono text-[11px] text-ink-dim"
                >
                  {nodeName(view.nodes, edge.from)} → {nodeName(view.nodes, edge.to)}
                  <span className="text-gold"> · {edge.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border border-line bg-paper-2/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Caixa · {kindLabel(selected.kind)}
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">{selected.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink">{selected.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">{view.hint}</p>
            {selected.zoomTo ? (
              <button
                type="button"
                onClick={() => {
                  const next = selected.zoomTo;
                  if (next) goTo(next);
                }}
                className="mt-5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold-2 hover:bg-gold/20"
              >
                Descer um zoom
              </button>
            ) : level !== "context" ? (
              <button
                type="button"
                onClick={() => goTo(parentOf(level))}
                className="mt-5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-dim hover:text-ink"
              >
                Subir
              </button>
            ) : null}
          </aside>
        </div>
      )}
    </Section>
  );
}

function MixedCanvas() {
  return (
    <div className="mt-8 border border-danger/50 bg-danger/5 p-4 md:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-danger">
        Anti-padrão · um plano só
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink">
        Pessoa, chart, classe, pod, PSP e Redis no mesmo desenho. Não dá para
        descer: os níveis já estão misturados. Recuse este slide — não acrescente
        seta.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MIXED_NODES.map((node) => (
          <div key={node.id} className="border border-dashed border-danger/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-danger">
              {node.tag}
            </p>
            <p className="mt-1 font-display text-lg text-ink">{node.name}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 border-l-2 border-danger pl-4 text-sm leading-relaxed text-ink">
        Volte ao zoom honesto. Uma pergunta por diagrama. Nível 4 continua de fora.
      </p>
    </div>
  );
}

const C4_RANK: Record<C4LevelId, number> = {
  context: 0,
  container: 1,
  component: 2,
  code: 3,
};

function parentOf(level: C4LevelId): C4LevelId {
  if (level === "code") return "component";
  if (level === "component") return "container";
  return "context";
}

function nodeName(nodes: DiagramNode[], id: string): string {
  return nodes.find((node) => node.id === id)?.name ?? id;
}

function kindLabel(kind: DiagramNode["kind"]): string {
  switch (kind) {
    case "person":
      return "Pessoa";
    case "system":
      return "Sistema";
    case "external":
      return "Externo";
    case "container":
      return "Container";
    case "component":
      return "Componente";
    case "code":
      return "Código";
  }
}

function kindBorder(kind: DiagramNode["kind"], active: boolean, zoomable: boolean): string {
  if (kind === "code") {
    return active
      ? "border-danger/70 border-dashed bg-danger/10"
      : "border-dashed border-danger/40 bg-paper/30";
  }
  if (active) {
    return "border-gold bg-gold/10";
  }
  if (zoomable) {
    return "border-gold/40 bg-paper/40 hover:border-gold";
  }
  return "border-line bg-paper/40 hover:border-gold/30";
}
