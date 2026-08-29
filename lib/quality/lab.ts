import {
  ATTRIBUTE_COPY,
  ATTRIBUTE_IDS,
  type AttributeId,
} from "./attributes";

export type Priorities = Record<AttributeId, number>;

export const DEFAULT_PRIORITIES: Priorities = {
  latency: 3,
  availability: 3,
  cost: 3,
  evolvability: 3,
  consistency: 3,
};

export type CheckoutNodeId = "catalog" | "cart" | "stock" | "pay" | "order";

export type TacticStatus = "applied" | "blocked" | "idle";

export type Tactic = {
  id: string;
  name: string;
  node: CheckoutNodeId;
  summary: string;
  up: AttributeId[];
  down: AttributeId[];
  wants: AttributeId[];
  hurts: AttributeId[];
};

export type EvaluatedTactic = Tactic & { status: TacticStatus; reason: string };

export type LabVerdict = {
  kind: "compromise" | "ok" | "conflict" | "impossible";
  title: string;
  body: string;
};

export type CheckoutNode = {
  id: CheckoutNodeId;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  caption: string;
  hot: boolean;
  danger: boolean;
};

export type LabState = {
  tactics: EvaluatedTactic[];
  applied: EvaluatedTactic[];
  blocked: EvaluatedTactic[];
  scores: Record<AttributeId, number>;
  verdict: LabVerdict;
  nodes: CheckoutNode[];
};

const HIGH = 4;

export const TACTICS: Tactic[] = [
  {
    id: "cache",
    name: "Cache de preço",
    node: "catalog",
    summary: "O GET de preço não vai ao banco. A vitrine responde em milissegundos.",
    up: ["latency"],
    down: ["consistency"],
    wants: ["latency"],
    hurts: ["consistency"],
  },
  {
    id: "replicas",
    name: "Várias instâncias",
    node: "order",
    summary: "Mais de um processo aceita pedido. Um caixa caído não fecha a loja.",
    up: ["availability"],
    down: ["cost"],
    wants: ["availability"],
    hurts: ["cost"],
  },
  {
    id: "single-box",
    name: "Uma máquina",
    node: "order",
    summary: "Um processo, um banco, conta pequena. O barato é o único ponto de falha.",
    up: ["cost"],
    down: ["availability"],
    wants: ["cost"],
    hurts: ["availability"],
  },
  {
    id: "sync-pay",
    name: "Pagamento no request",
    node: "pay",
    summary: "O clique espera o PSP. Pedido e dinheiro nascem juntos — ou nenhum dos dois.",
    up: ["consistency"],
    down: ["latency", "availability"],
    wants: ["consistency"],
    hurts: ["latency", "availability"],
  },
  {
    id: "async-ack",
    name: "Aceita e cobra depois",
    node: "pay",
    summary: "202 imediato. O PSP entra noutro tempo. A loja não some com o vizinho lento.",
    up: ["latency", "availability"],
    down: ["consistency"],
    wants: ["latency", "availability"],
    hurts: ["consistency"],
  },
  {
    id: "stock-lock",
    name: "Reserva no commit",
    node: "stock",
    summary: "Estoque e pedido fecham na mesma transação. Não vende o que não tem.",
    up: ["consistency"],
    down: ["latency", "availability"],
    wants: ["consistency"],
    hurts: ["latency"],
  },
  {
    id: "stock-hope",
    name: "Debita depois",
    node: "stock",
    summary: "O clique não espera o lock. Oversell vira um caso a tratar, não um round-trip.",
    up: ["latency", "availability"],
    down: ["consistency"],
    wants: ["latency", "availability"],
    hurts: ["consistency"],
  },
  {
    id: "pay-contract",
    name: "Contrato de PSP",
    node: "pay",
    summary: "O carrinho fala com uma porta. Trocar o provedor não reescreve o checkout.",
    up: ["evolvability"],
    down: ["cost"],
    wants: ["evolvability"],
    hurts: ["cost"],
  },
  {
    id: "inline-psp",
    name: "SDK no carrinho",
    node: "pay",
    summary: "O provedor entra no fluxo agora. Barato no dia 1. A troca é um trimestre.",
    up: ["cost"],
    down: ["evolvability"],
    wants: ["cost"],
    hurts: ["evolvability"],
  },
];

const EXCLUSIVE_GROUPS: string[][] = [
  ["replicas", "single-box"],
  ["sync-pay", "async-ack"],
  ["stock-lock", "stock-hope"],
  ["pay-contract", "inline-psp"],
];

const NODE_BASELINE: Record<
  CheckoutNodeId,
  { label: string; x: number; y: number; w: number; h: number; caption: string }
> = {
  catalog: {
    label: "Catálogo",
    x: 28,
    y: 48,
    w: 132,
    h: 56,
    caption: "Preço no request, sem cache.",
  },
  cart: {
    label: "Carrinho",
    x: 196,
    y: 48,
    w: 132,
    h: 56,
    caption: "Monta o total e espera o resto.",
  },
  stock: {
    label: "Estoque",
    x: 364,
    y: 48,
    w: 132,
    h: 56,
    caption: "Reserva no mesmo round-trip.",
  },
  pay: {
    label: "Pagamento",
    x: 532,
    y: 48,
    w: 140,
    h: 56,
    caption: "Cobra no mesmo clique.",
  },
  order: {
    label: "Pedido",
    x: 280,
    y: 200,
    w: 160,
    h: 56,
    caption: "Duas instâncias, um banco. Sem herói.",
  },
};

export const CHECKOUT_EDGES: { from: CheckoutNodeId; to: CheckoutNodeId }[] = [
  { from: "catalog", to: "cart" },
  { from: "cart", to: "stock" },
  { from: "stock", to: "pay" },
  { from: "pay", to: "order" },
  { from: "stock", to: "order" },
];

export type PresetId = "fast" | "safe" | "cheap" | "evolve" | "all" | "balanced";

export const PRESETS: {
  id: PresetId;
  label: string;
  priorities: Priorities;
}[] = [
  {
    id: "balanced",
    label: "Sem herói",
    priorities: { ...DEFAULT_PRIORITIES },
  },
  {
    id: "fast",
    label: "Vitrine rápida",
    priorities: {
      latency: 5,
      availability: 3,
      cost: 2,
      evolvability: 2,
      consistency: 2,
    },
  },
  {
    id: "safe",
    label: "Não oversell",
    priorities: {
      latency: 2,
      availability: 3,
      cost: 2,
      evolvability: 2,
      consistency: 5,
    },
  },
  {
    id: "cheap",
    label: "Barato no dia 1",
    priorities: {
      latency: 2,
      availability: 2,
      cost: 5,
      evolvability: 2,
      consistency: 3,
    },
  },
  {
    id: "evolve",
    label: "Trocar o PSP",
    priorities: {
      latency: 2,
      availability: 3,
      cost: 2,
      evolvability: 5,
      consistency: 3,
    },
  },
  {
    id: "all",
    label: "Máximo em tudo",
    priorities: {
      latency: 5,
      availability: 5,
      cost: 5,
      evolvability: 5,
      consistency: 5,
    },
  },
];

function maxOf(priorities: Priorities, ids: AttributeId[]): number {
  return Math.max(...ids.map((id) => priorities[id]));
}

function namesOf(ids: AttributeId[], priorities: Priorities, min: number): string {
  return ids
    .filter((id) => priorities[id] >= min)
    .map((id) => ATTRIBUTE_COPY[id].name.toLowerCase())
    .join(" e ");
}

function evaluateOne(tactic: Tactic, priorities: Priorities): EvaluatedTactic {
  const want = maxOf(priorities, tactic.wants);
  const hurt = maxOf(priorities, tactic.hurts);
  if (want < HIGH) {
    return {
      ...tactic,
      status: "idle",
      reason: "Ninguém priorizou o que esta tática sobe.",
    };
  }
  if (hurt >= HIGH) {
    const up = namesOf(tactic.wants, priorities, HIGH);
    const down = namesOf(tactic.hurts, priorities, HIGH);
    return {
      ...tactic,
      status: "blocked",
      reason: `Subiria ${up} e rebaixaria ${down}. Você pediu os dois altos.`,
    };
  }
  return { ...tactic, status: "applied", reason: tactic.summary };
}

function resolveExclusive(
  tactics: EvaluatedTactic[],
  priorities: Priorities,
): EvaluatedTactic[] {
  const byId = new Map(tactics.map((tactic) => [tactic.id, tactic]));
  for (const group of EXCLUSIVE_GROUPS) {
    const applied = group
      .map((id) => byId.get(id))
      .filter((tactic): tactic is EvaluatedTactic => tactic?.status === "applied");
    if (applied.length <= 1) continue;
    const ranked = [...applied].sort(
      (a, b) => maxOf(priorities, b.wants) - maxOf(priorities, a.wants),
    );
    const top = ranked[0];
    const runner = ranked[1];
    if (maxOf(priorities, top.wants) === maxOf(priorities, runner.wants)) {
      for (const tactic of applied) {
        const others = applied
          .filter((item) => item.id !== tactic.id)
          .map((item) => item.name)
          .join(" e ");
        byId.set(tactic.id, {
          ...tactic,
          status: "blocked",
          reason: `Não cabe junto com ${others}.`,
        });
      }
    } else {
      for (const tactic of applied.slice(1)) {
        byId.set(tactic.id, {
          ...tactic,
          status: "blocked",
          reason: `Cedeu para ${top.name} — o outro eixo está mais alto.`,
        });
      }
    }
  }
  return tactics.map((tactic) => byId.get(tactic.id) ?? tactic);
}

function scoresFrom(applied: EvaluatedTactic[]): Record<AttributeId, number> {
  const scores = Object.fromEntries(ATTRIBUTE_IDS.map((id) => [id, 50])) as Record<
    AttributeId,
    number
  >;
  for (const tactic of applied) {
    for (const id of tactic.up) {
      scores[id] = Math.min(95, scores[id] + 16);
    }
    for (const id of tactic.down) {
      scores[id] = Math.max(8, scores[id] - 16);
    }
  }
  return scores;
}

function verdictFor(
  priorities: Priorities,
  applied: EvaluatedTactic[],
  blocked: EvaluatedTactic[],
): LabVerdict {
  const maxed = ATTRIBUTE_IDS.filter((id) => priorities[id] >= 5);
  const high = ATTRIBUTE_IDS.filter((id) => priorities[id] >= HIGH);

  if (
    priorities.latency >= HIGH &&
    priorities.cost >= HIGH &&
    priorities.consistency >= HIGH
  ) {
    return {
      kind: "impossible",
      title: "Não existe máximo em todos",
      body: "Você pediu checkout instantâneo, barato, e estoque+pagamento sempre iguais. Escolha dois. O terceiro é o preço.",
    };
  }

  if (maxed.length >= 3 || high.length >= 4) {
    return {
      kind: "impossible",
      title: "Não existe máximo em todos",
      body: "Três ou mais eixos no teto não viram um desenho — viram um slide. Baixe um ou admita o que vai piorar.",
    };
  }

  if (blocked.length > 0 && applied.length === 0) {
    return {
      kind: "conflict",
      title: "As táticas se recusam",
      body: "Cada tática que subiria um eixo rebaixaria outro que você também marcou alto. Isso não é falha do lab: é o juízo. Recuse o desenho, não a física.",
    };
  }

  if (blocked.length > 0) {
    return {
      kind: "conflict",
      title: "Parte do pedido não cabe",
      body: "O checkout aplicou o que não brigava. O que brigava ficou recusado — e é isso que você precisa saber nomear.",
    };
  }

  if (applied.length === 0) {
    return {
      kind: "compromise",
      title: "Ninguém pediu máximo",
      body: "Este é o checkout sem herói: mediano em tudo. Serve para lembrar que “equilíbrio” também é uma escolha — só não finja que é o teto nos cinco eixos.",
    };
  }

  const up = [...new Set(applied.flatMap((tactic) => tactic.up))]
    .map((id) => ATTRIBUTE_COPY[id].name.toLowerCase())
    .join(", ");
  const down = [...new Set(applied.flatMap((tactic) => tactic.down))]
    .map((id) => ATTRIBUTE_COPY[id].name.toLowerCase())
    .join(", ");
  return {
    kind: "ok",
    title: "Um eixo sobe, outro paga",
    body: `Táticas no desenho sobem ${up}. O preço aparece em ${down}. Não existe máximo em todos.`,
  };
}

function nodesFrom(
  applied: EvaluatedTactic[],
  blocked: EvaluatedTactic[],
  impossible: boolean,
): CheckoutNode[] {
  return (Object.keys(NODE_BASELINE) as CheckoutNodeId[]).map((id) => {
    const base = NODE_BASELINE[id];
    const onNode = applied.filter((tactic) => tactic.node === id);
    const blockedHere = blocked.filter((tactic) => tactic.node === id);
    const caption = impossible
      ? "Sem desenho honesto neste pedido."
      : onNode.length > 0
        ? onNode.map((tactic) => tactic.name).join(" · ")
        : blockedHere.length > 0
          ? `Recusado: ${blockedHere.map((tactic) => tactic.name).join(", ")}`
          : base.caption;
    return {
      id,
      label: base.label,
      x: base.x,
      y: base.y,
      w: base.w,
      h: base.h,
      caption,
      hot: onNode.length > 0,
      danger: impossible || (blockedHere.length > 0 && onNode.length === 0),
    };
  });
}

export function evaluateLab(priorities: Priorities): LabState {
  const firstPass = TACTICS.map((tactic) => evaluateOne(tactic, priorities));
  const tactics = resolveExclusive(firstPass, priorities);
  const applied = tactics.filter((tactic) => tactic.status === "applied");
  const blocked = tactics.filter((tactic) => tactic.status === "blocked");
  const verdict = verdictFor(priorities, applied, blocked);
  const impossible = verdict.kind === "impossible";
  const visible = impossible
    ? tactics.map((tactic) =>
        tactic.status === "idle"
          ? tactic
          : {
              ...tactic,
              status: "blocked" as const,
              reason: "O pedido inteiro recusa um desenho honesto. Não existe máximo em todos.",
            },
      )
    : tactics;
  return {
    tactics: visible,
    applied: impossible ? [] : applied,
    blocked: impossible ? visible.filter((tactic) => tactic.status === "blocked") : blocked,
    scores: impossible ? scoresFrom([]) : scoresFrom(applied),
    verdict,
    nodes: nodesFrom(impossible ? [] : applied, blocked, impossible),
  };
}

export function nodeCenter(node: CheckoutNode): { x: number; y: number } {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

export function tacticsOnNode(
  state: LabState,
  nodeId: CheckoutNodeId,
): EvaluatedTactic[] {
  return state.tactics.filter((tactic) => tactic.node === nodeId);
}
