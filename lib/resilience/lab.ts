export type NeighborMode = "ok" | "slow" | "down" | "flaky";
export type TimeoutMs = 100 | 300 | 800;
export type RetryCount = 0 | 1 | 2;
export type CircuitState = "closed" | "open" | "half-open";

export type LabConfig = {
  timeoutMs: TimeoutMs;
  retries: RetryCount;
  breaker: boolean;
  retryDanger: boolean;
};

export const NEIGHBOR_MODES: { id: NeighborMode; label: string }[] = [
  { id: "ok", label: "PSP ok" },
  { id: "slow", label: "PSP lento" },
  { id: "down", label: "PSP fora" },
  { id: "flaky", label: "PSP instável" },
];

export const TIMEOUTS: { id: TimeoutMs; label: string }[] = [
  { id: 100, label: "Timeout 100 ms" },
  { id: 300, label: "Timeout 300 ms" },
  { id: 800, label: "Timeout 800 ms" },
];

export const RETRIES: { id: RetryCount; label: string }[] = [
  { id: 0, label: "0 retries" },
  { id: 1, label: "1 retry" },
  { id: 2, label: "2 retries" },
];

export const BURST = 8;
const FAILURES_TO_OPEN = 3;
const OPEN_REJECTS_BEFORE_PROBE = 2;

export type AttemptSeen = "ok" | "timeout" | "error" | "short-circuit";

export type Attempt = {
  seen: AttemptSeen;
  waitMs: number;
  charged: boolean;
};

export type CallTrace = {
  n: number;
  attempts: Attempt[];
  client: "ok" | "fail" | "fail-fast";
  charges: number;
  circuit: CircuitState;
};

export type BurstResult = {
  calls: CallTrace[];
  checkoutOk: number;
  neighborHits: number;
  charges: number;
  duplicates: number;
  cascade: boolean;
  isolated: boolean;
  note: string;
};

export function simulateBurst(mode: NeighborMode, config: LabConfig): BurstResult {
  let circuit: CircuitState = "closed";
  let consecutiveFails = 0;
  let rejectsWhileOpen = 0;
  let hit = 0;
  const calls: CallTrace[] = [];

  for (let n = 0; n < BURST; n++) {
    if (config.breaker && circuit === "open") {
      if (rejectsWhileOpen >= OPEN_REJECTS_BEFORE_PROBE) {
        circuit = "half-open";
      } else {
        rejectsWhileOpen += 1;
        calls.push({
          n: n + 1,
          attempts: [{ seen: "short-circuit", waitMs: 0, charged: false }],
          client: "fail-fast",
          charges: 0,
          circuit,
        });
        continue;
      }
    }

    const maxAttempts = circuit === "half-open" ? 1 : config.retries + 1;
    const attempts: Attempt[] = [];
    let client: CallTrace["client"] = "fail";
    let callCharges = 0;

    for (let a = 0; a < maxAttempts; a++) {
      hit += 1;
      const probe = probeNeighbor(mode, hit);
      if (probe.delayMs > config.timeoutMs) {
        const charged = probe.ok;
        attempts.push({ seen: "timeout", waitMs: config.timeoutMs, charged });
        if (charged) callCharges += 1;
        consecutiveFails += 1;
      } else if (!probe.ok) {
        attempts.push({ seen: "error", waitMs: probe.delayMs, charged: false });
        consecutiveFails += 1;
      } else {
        attempts.push({ seen: "ok", waitMs: probe.delayMs, charged: true });
        callCharges += 1;
        client = "ok";
        consecutiveFails = 0;
        circuit = "closed";
        break;
      }
      if (config.breaker && consecutiveFails >= FAILURES_TO_OPEN) {
        circuit = "open";
        rejectsWhileOpen = 0;
        break;
      }
    }

    if (circuit === "half-open") {
      circuit = client === "ok" ? "closed" : "open";
      if (circuit === "open") rejectsWhileOpen = 0;
    }

    const charges = config.retryDanger ? callCharges : client === "ok" ? 1 : 0;
    calls.push({ n: n + 1, attempts, client, charges, circuit });
  }

  const checkoutOk = calls.filter((call) => call.client === "ok").length;
  const neighborHits = calls.reduce(
    (sum, call) => sum + call.attempts.filter((item) => item.seen !== "short-circuit").length,
    0,
  );
  const charges = calls.reduce((sum, call) => sum + call.charges, 0);
  const duplicates = Math.max(0, charges - checkoutOk);
  const failFast = calls.filter((call) => call.client === "fail-fast").length;
  const blocked = calls.filter((call) => call.client === "fail" && call.attempts.some((item) => item.seen === "timeout")).length;
  const cascade = blocked >= 3 && failFast === 0;
  const isolated = failFast >= 2;

  return {
    calls,
    checkoutOk,
    neighborHits,
    charges,
    duplicates,
    cascade,
    isolated,
    note: summaryNote(mode, config, { checkoutOk, duplicates, cascade, isolated, failFast }),
  };
}

function probeNeighbor(mode: NeighborMode, hit: number): { delayMs: number; ok: boolean } {
  switch (mode) {
    case "ok":
      return { delayMs: 40, ok: true };
    case "slow":
      return { delayMs: 600, ok: true };
    case "down":
      return { delayMs: 30, ok: false };
    case "flaky":
      return hit % 3 === 0 ? { delayMs: 40, ok: false } : { delayMs: 50, ok: true };
  }
}

function summaryNote(
  mode: NeighborMode,
  config: LabConfig,
  stats: { checkoutOk: number; duplicates: number; cascade: boolean; isolated: boolean; failFast: number },
): string {
  if (config.retryDanger && stats.duplicates > 0) {
    return `Retry sem idempotência: ${stats.duplicates} cobrança(s) a mais que checkouts. O cartão passou no timeout; a segunda tentativa cobrou de novo. Ponte para o módulo de chave — não é Istio.`;
  }
  if (stats.isolated) {
    return `Breaker aberto. ${stats.failFast} cliques falharam rápido, sem enfileirar no PSP morto. A loja não acompanhou o cadáver.`;
  }
  if (stats.cascade) {
    return `Cascata: vários checkouts esperaram o timeout até o fim. Sem breaker, a fila da loja é a fila do vizinho.`;
  }
  if (mode === "ok" && stats.checkoutOk === BURST) {
    return "Vizinho saudável. Timeout e breaker quase não aparecem — não é motivo para desligá-los no desenho.";
  }
  return `${stats.checkoutOk} de ${BURST} checkouts ok. Olhe a fila: cada tentativa é um hit no PSP.`;
}
