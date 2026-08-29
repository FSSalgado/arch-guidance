"use client";

import { useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  EMPTY_STATE,
  persistAndPublish,
  placeOrder,
  relayOutbox,
  type Crash,
  type LabState,
} from "@/lib/idempotency/lab";

const CLIENT_KEY = "chk-77";

export function IdempotencyLab() {
  const [state, setState] = useState<LabState>(EMPTY_STATE);
  const [useKey, setUseKey] = useState(false);
  const [useOutbox, setUseOutbox] = useState(false);
  const [crash, setCrash] = useState<Crash>("none");

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — PlaceOrder, reenvio, dois destinos"
      title="Primeiro o retry. Depois o commit e o evento."
      lead="Não é o lab hexagonal. Um comando, um cliente insistente, um crash entre gravar e publicar. Sem fila real. Sem inbox. Sem saga."
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        1 · Cliente retried
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setUseKey((value) => !value)}
          className={`border px-3 py-2 font-display text-sm ${
            useKey ? "border-gold bg-gold/15 text-gold-2" : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Chave {useKey ? "ligada" : "desligada"}
        </button>
        <button
          type="button"
          onClick={() => setState((current) => placeOrder(current, useKey ? CLIENT_KEY : null))}
          className="border border-gold/40 bg-gold/10 px-3 py-2 font-display text-sm text-gold-2 hover:bg-gold/20"
        >
          PlaceOrder
        </button>
        <button
          type="button"
          onClick={() => setState((current) => placeOrder(current, useKey ? CLIENT_KEY : null))}
          className="border border-line px-3 py-2 font-display text-sm text-ink-dim hover:text-ink"
        >
          Cliente reenvia
        </button>
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
        2 · Persistir e publicar
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setUseOutbox((value) => !value)}
          className={`border px-3 py-2 font-display text-sm ${
            useOutbox ? "border-gold bg-gold/15 text-gold-2" : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Outbox {useOutbox ? "ligada" : "desligada"}
        </button>
        {(
          [
            ["none", "Sem crash"],
            ["afterWrite", "Crash após gravar"],
            ["afterPublish", "Crash após publicar"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setCrash(id)}
            className={`border px-3 py-2 font-display text-sm ${
              crash === id
                ? id === "none"
                  ? "border-gold bg-gold/15 text-gold-2"
                  : "border-danger bg-danger/15 text-danger"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setState((current) => persistAndPublish(current, useOutbox, crash))}
          className="border border-gold/40 bg-gold/10 px-3 py-2 font-display text-sm text-gold-2 hover:bg-gold/20"
        >
          Commit + publicar
        </button>
        <button
          type="button"
          onClick={() => setState((current) => relayOutbox(current))}
          className="border border-line px-3 py-2 font-display text-sm text-ink-dim hover:text-ink"
        >
          Relay
        </button>
      </div>

      <p className="mt-6 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink">
        {state.note}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Bucket
          title={`Pedidos (${state.orders.length})`}
          empty="Nenhum"
          lines={state.orders.map((order) => `${order.id}${order.key ? ` · ${order.key}` : " · sem chave"}`)}
        />
        <Bucket
          title={`Outbox (${state.outbox.filter((row) => !row.relayed).length} pendente)`}
          empty="Vazia"
          lines={state.outbox.map(
            (row) => `${row.id} → ${row.orderId} ${row.relayed ? "· relayed" : "· pendente"}`,
          )}
        />
        <Bucket
          title={`Eventos (${state.events.length})`}
          empty="Nenhum"
          lines={state.events.map((row) => `${row.id} · ${row.orderId}`)}
        />
      </div>

      <button
        type="button"
        onClick={() => setState(EMPTY_STATE)}
        className="mt-6 font-mono text-[11px] uppercase tracking-wider text-ink-dim hover:text-ink"
      >
        Resetar o mundo
      </button>
    </Section>
  );
}

function Bucket({
  title,
  empty,
  lines,
}: {
  title: string;
  empty: string;
  lines: string[];
}) {
  return (
    <div className="border border-line bg-paper-2/50 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{title}</p>
      {lines.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {lines.map((line) => (
            <li key={line} className="font-mono text-sm text-ink">
              {line}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-ink-dim">{empty}</p>
      )}
    </div>
  );
}
