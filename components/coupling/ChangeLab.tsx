"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  CHANGES,
  COUPLING_KINDS,
  KIND_COLOR,
  KIND_COPY,
  MODULE_BLURB,
  boxesFor,
  centerOf,
  changeById,
  edgesFor,
  ripplesFor,
  type Box,
  type ChangeId,
  type CouplingKind,
  type DrawingId,
  type ModuleId,
} from "@/lib/coupling/lab";

export function ChangeLab() {
  const [drawing, setDrawing] = useState<DrawingId>("tangled");
  const [changeId, setChangeId] = useState<ChangeId>("promo");
  const [kind, setKind] = useState<CouplingKind | null>("common");
  const [selected, setSelected] = useState<ModuleId | null>("god");

  const boxes = boxesFor(drawing);
  const change = changeById(changeId);
  const ripples = ripplesFor(drawing, changeId);
  const broken = new Set(ripples.map((item) => item.module));
  const kindEdges = edgesFor(drawing, kind);
  const allEdges = edgesFor(drawing);
  const selectedBox = boxes.find((box) => box.id === selected);

  const inspector = useMemo(() => {
    const kindCopy = kind ? KIND_COPY[kind] : null;
    const kindOnDrawing = kindEdges;
    const ripple = selected ? ripples.find((item) => item.module === selected) : undefined;
    const blurb = selected ? MODULE_BLURB[drawing][selected] : undefined;
    return { kindCopy, kindOnDrawing, ripple, blurb };
  }, [kind, kindEdges, selected, ripples, drawing]);

  function focusFirstRipple(nextDrawing: DrawingId, nextChange: ChangeId) {
    const next = ripplesFor(nextDrawing, nextChange);
    setSelected(next[0]?.module ?? boxesFor(nextDrawing)[0]?.id ?? null);
  }

  function selectDrawing(next: DrawingId) {
    setDrawing(next);
    focusFirstRipple(next, changeId);
  }

  function selectChange(next: ChangeId) {
    setChangeId(next);
    focusFirstRipple(drawing, next);
  }

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — O mesmo sistema, dois desenhos"
      title="Clique numa mudança e veja o que quebra"
      lead="Esquerda: um balcão que finge ser vários módulos. Direita: limites estáveis. A mudança de requisito é a mesma. O ripple não é."
    >
      <div className="flex flex-wrap gap-2">
        <Toggle
          active={drawing === "tangled"}
          onClick={() => selectDrawing("tangled")}
          label="Alto acoplamento"
        />
        <Toggle
          active={drawing === "stable"}
          onClick={() => selectDrawing("stable")}
          label="Limites estáveis"
        />
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Mudança de requisito
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {CHANGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectChange(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              changeId === item.id
                ? "border-danger bg-danger/15 text-danger"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink">{change.requirement}</p>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        Tipo de acoplamento (aresta)
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKind(null)}
          className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${
            kind === null ? "border-gold bg-gold/15 text-gold-2" : "border-line text-ink-dim"
          }`}
        >
          Todos
        </button>
        {COUPLING_KINDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id)}
            className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider ${
              kind === id ? "border-gold bg-gold/15 text-gold-2" : "border-line text-ink-dim"
            }`}
          >
            {KIND_COPY[id].name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto rounded-sm border border-line bg-paper-2/40">
          <svg
            viewBox="0 0 800 440"
            className="h-auto w-full min-w-[640px]"
            role="img"
            aria-label="Dois desenhos do mesmo checkout, com arestas de acoplamento"
          >
            {allEdges.map((edge) => {
              const from = boxes.find((box) => box.id === edge.from);
              const to = boxes.find((box) => box.id === edge.to);
              if (!from || !to) return null;
              const a = centerOf(from);
              const b = centerOf(to);
              const hot = !kind || edge.kind === kind;
              return (
                <line
                  key={edge.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={KIND_COLOR[edge.kind]}
                  strokeWidth={hot ? 2.4 : 1}
                  strokeOpacity={hot ? 0.95 : 0.18}
                />
              );
            })}
            {boxes.map((box) => (
              <ModuleNode
                key={box.id}
                box={box}
                broken={broken.has(box.id)}
                active={selected === box.id}
                onSelect={() => setSelected(box.id)}
              />
            ))}
            <text
              x="40"
              y="424"
              fill="#9a9384"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.16em"
            >
              {drawing === "tangled"
                ? "QUEBRA = borda vermelha  ·  * catálogo com interior exposto"
                : "QUEBRA = borda vermelha  ·  só dados e mensagem neste desenho"}
            </text>
          </svg>
        </div>

        <aside className="border border-line bg-paper-2/70 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {drawing === "tangled" ? "Alto acoplamento" : "Limites estáveis"} ·{" "}
            {ripples.length} {ripples.length === 1 ? "quebra" : "quebras"}
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">
            {selectedBox ? selectedBox.label : "Clique um módulo"}
          </h3>
          {inspector.blurb ? (
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{inspector.blurb}</p>
          ) : null}
          {inspector.ripple ? (
            <p className="mt-3 border-l-2 border-danger pl-3 text-sm leading-relaxed text-ink">
              Nesta mudança: {inspector.ripple.why}
            </p>
          ) : selected && !broken.has(selected) ? (
            <p className="mt-3 border-l-2 border-ok pl-3 text-sm leading-relaxed text-ink-dim">
              Este módulo não precisa mudar para esta exigência.
            </p>
          ) : null}

          {inspector.kindCopy ? (
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Aresta · {inspector.kindCopy.name}
              </p>
              {inspector.kindOnDrawing.length === 0 ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  {drawing === "stable"
                    ? `Neste desenho não há arestas do tipo ${inspector.kindCopy.name} (${inspector.kindCopy.english}). O limite estável recusou conteúdo, globo, flag e registro gordo.`
                    : `Neste desenho não há arestas do tipo ${inspector.kindCopy.name} (${inspector.kindCopy.english}). Escolha outro tipo — este desenho é feito dos piores.`}
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {inspector.kindOnDrawing.map((edge) => (
                    <li key={edge.id} className="text-sm leading-relaxed text-ink-dim">
                      {edge.caption}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          <p className="mt-5 text-sm leading-relaxed text-ink">{change.punch}</p>
        </aside>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-line bg-paper-2/50 p-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-danger">
            Alto acoplamento
          </dt>
          <dd className="mt-1 font-display text-3xl text-ink">
            {change.tangled.length} módulos
          </dd>
          <p className="mt-1 text-sm text-ink-dim">tocados por esta mudança.</p>
        </div>
        <div className="border border-line bg-paper-2/50 p-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ok">
            Limites estáveis
          </dt>
          <dd className="mt-1 font-display text-3xl text-ink">
            {change.stable.length} {change.stable.length === 1 ? "módulo" : "módulos"}
          </dd>
          <p className="mt-1 text-sm text-ink-dim">tocados pela mesma mudança.</p>
        </div>
      </dl>
    </Section>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider ${
        active ? "bg-gold text-paper" : "border border-line text-ink-dim hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function ModuleNode({
  box,
  broken,
  active,
  onSelect,
}: {
  box: Box;
  broken: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const fill = active ? "#e0b35a" : broken ? "#2a1616" : "#121820";
  const stroke = broken ? "#e07070" : active ? "#e0b35a" : "rgba(231,225,211,0.28)";
  const text = active ? "#0b0f14" : broken ? "#e07070" : "#e7e1d3";
  return (
    <g className="cursor-pointer" onClick={onSelect} role="button" aria-label={box.label}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        fill={fill}
        stroke={stroke}
        strokeWidth={broken || active ? 2 : 1.25}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + box.h / 2 + 4}
        textAnchor="middle"
        fill={text}
        fontSize="13"
        fontFamily="var(--font-syne), sans-serif"
      >
        {box.label}
      </text>
    </g>
  );
}
