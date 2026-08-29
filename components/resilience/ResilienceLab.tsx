"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/hex/Section";
import {
  BURST,
  NEIGHBOR_MODES,
  RETRIES,
  TIMEOUTS,
  simulateBurst,
  type NeighborMode,
  type RetryCount,
  type TimeoutMs,
} from "@/lib/resilience/lab";

export function ResilienceLab() {
  const [mode, setMode] = useState<NeighborMode>("slow");
  const [timeoutMs, setTimeoutMs] = useState<TimeoutMs>(300);
  const [retries, setRetries] = useState<RetryCount>(2);
  const [breaker, setBreaker] = useState(false);
  const [retryDanger, setRetryDanger] = useState(true);
  const result = useMemo(
    () => simulateBurst(mode, { timeoutMs, retries, breaker, retryDanger }),
    [mode, timeoutMs, retries, breaker, retryDanger],
  );

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 03 — Oito checkouts, um PSP"
      title="Chame o vizinho instável e veja a fila"
      lead="Oito PlaceOrder contra um PSP simulado. Não é mesh. Ajuste timeout, retries e breaker. Ligue retry sem idempotência: o timeout cobra e a segunda tentativa cobra de novo."
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Vizinho</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {NEIGHBOR_MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              mode === item.id
                ? item.id === "ok"
                  ? "border-gold bg-gold/15 text-gold-2"
                  : "border-danger bg-danger/15 text-danger"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Política</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TIMEOUTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTimeoutMs(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              timeoutMs === item.id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
        {RETRIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRetries(item.id)}
            className={`border px-3 py-2 font-display text-sm ${
              retries === item.id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBreaker((value) => !value)}
          className={`border px-3 py-2 font-display text-sm ${
            breaker ? "border-gold bg-gold/15 text-gold-2" : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Breaker {breaker ? "ligado" : "desligado"}
        </button>
        <button
          type="button"
          onClick={() => setRetryDanger((value) => !value)}
          className={`border px-3 py-2 font-display text-sm ${
            retryDanger
              ? "border-danger bg-danger/15 text-danger"
              : "border-line text-ink-dim hover:text-ink"
          }`}
        >
          Retry sem idempotência {retryDanger ? "ligado" : "desligado"}
        </button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <Stat label="Checkouts ok" value={`${result.checkoutOk}/${BURST}`} />
        <Stat label="Hits no PSP" value={String(result.neighborHits)} />
        <Stat label="Cobranças" value={String(result.charges)} danger={result.duplicates > 0} />
        <Stat
          label="Fila"
          value={result.isolated ? "isolada" : result.cascade ? "cascata" : "calma"}
          danger={result.cascade}
        />
      </div>

      <ol className="mt-6 grid gap-2">
        {result.calls.map((call) => (
          <li
            key={call.n}
            className="flex flex-wrap items-center gap-2 border border-line bg-paper-2/40 px-3 py-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold">
              #{call.n}
            </span>
            <span className="font-display text-sm text-ink">
              {call.client === "ok" ? "ok" : call.client === "fail-fast" ? "fail fast" : "falhou"}
            </span>
            {call.attempts.map((attempt, index) => (
              <span
                key={`${call.n}-${index}`}
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  attempt.seen === "ok"
                    ? "text-ok"
                    : attempt.seen === "short-circuit"
                      ? "text-gold"
                      : "text-danger"
                }`}
              >
                {attempt.seen}
                {attempt.charged ? " · cobrou" : ""}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-dim">
              {call.circuit}
            </span>
          </li>
        ))}
      </ol>

      <p
        className={`mt-6 border-l-2 pl-4 text-sm leading-relaxed text-ink ${
          result.duplicates > 0 || result.cascade ? "border-danger" : "border-gold/50"
        }`}
      >
        {result.note}
      </p>
    </Section>
  );
}

function Stat({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className={`border p-4 ${danger ? "border-danger/50 bg-danger/5" : "border-line bg-paper-2/50"}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{label}</p>
      <p className={`mt-1 font-display text-2xl ${danger ? "text-danger" : "text-ink"}`}>{value}</p>
    </div>
  );
}
