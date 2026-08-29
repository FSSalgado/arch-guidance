"use client";

import { useState } from "react";
import { Section } from "./Section";

type NodeId =
  | "web"
  | "cli"
  | "tests"
  | "in-port"
  | "domain"
  | "out-port"
  | "repo"
  | "email"
  | "clock";

const NODES: Record<
  NodeId,
  { title: string; kind: string; body: string; code: string }
> = {
  web: {
    title: "Adapter de entrada — Web",
    kind: "Driving / inbound",
    body: "Recebe HTTP, valida o formato do payload e traduz JSON em um comando do domínio. Não calcula preço nem decide se o pedido é válido.",
    code: `POST /orders
{ "sku": "WIDGET", "quantity": 2 }

→ placeOrderPort.execute({ sku, quantity })`,
  },
  cli: {
    title: "Adapter de entrada — CLI",
    kind: "Driving / inbound",
    body: "Lê uma linha de comando, faz o parse e chama a mesma porta de entrada. O caso de uso não sabe se veio de um formulário ou de um terminal.",
    code: `$ place-order WIDGET 2

→ placeOrderPort.execute({ sku, quantity })`,
  },
  tests: {
    title: "Adapter de entrada — Testes",
    kind: "Driving / inbound",
    body: "Testes são um adapter de primeira classe: exercitam o domínio (ou o caso de uso) pela porta, sem subir servidor nem banco. É por isso que o hexágono trata testes como ator, não como afterthought.",
    code: `it("rejects quantity above 10", () => {
  const result = decidePlaceOrder(
    { sku: "GADGET", quantity: 11 },
    new Date("2026-08-29"),
  );
  expect(result.ok).toBe(false);
});`,
  },
  "in-port": {
    title: "Porta de entrada",
    kind: "Port",
    body: "Contrato que o mundo exterior usa para falar com a aplicação. No código, costuma ser uma interface do caso de uso. Adapters de entrada dependem dessa porta — nunca do Postgres.",
    code: `interface PlaceOrderPort {
  execute(command: PlaceOrderCommand): Promise<PlaceOrderResult>;
}`,
  },
  domain: {
    title: "Domínio",
    kind: "Hexágono interno",
    body: "Onde vivem as regras: catálogo, quantidade máxima, valor mínimo. Zero imports de framework, SQL ou Express. Recebe dados já traduzidos e devolve uma decisão.",
    code: `function decidePlaceOrder(command, now) {
  // UNKNOWN_SKU | QUANTITY_MIN | QUANTITY_MAX | MIN_TOTAL
  // ou um Order com total e createdAt
}`,
  },
  "out-port": {
    title: "Portas de saída",
    kind: "Port",
    body: "Contratos que a aplicação precisa do mundo: persistir, notificar, perguntar as horas. O domínio/aplicação define o que precisa; o adapter decide como cumprir.",
    code: `interface OrderRepository { save(order): Promise<void> }
interface Clock { now(): Date }
interface OrderNotifier { orderPlaced(order): Promise<void> }`,
  },
  repo: {
    title: "Adapter de saída — Repositório",
    kind: "Driven / outbound",
    body: "Implementa OrderRepository. Pode ser um Map em memória ou SQL. O caso de uso chama save(); não escreve INSERT.",
    code: `class SimulatedPostgresOrderRepository
  implements OrderRepository {
  async save(order) {
    // INSERT INTO orders ...
  }
}`,
  },
  email: {
    title: "Adapter de saída — E-mail",
    kind: "Driven / outbound",
    body: "Dispara a confirmação depois que o domínio aceitou o pedido. Trocar SMTP por um log, fila ou no-op não mexe em decidePlaceOrder.",
    code: `class LogNotifier implements OrderNotifier {
  async orderPlaced(order) {
    // SMTP / console / fila
  }
}`,
  },
  clock: {
    title: "Adapter de saída — Relógio",
    kind: "Driven / outbound",
    body: "Hora do sistema é detalhe de infraestrutura. Expor Clock como porta permite testes com data fixa e evita new Date() espalhado no domínio.",
    code: `class SystemClock implements Clock {
  now() { return new Date(); }
}`,
  },
};

const ADAPTERS: { id: NodeId; label: string; x: number; y: number; side: "in" | "out" }[] =
  [
    { id: "web", label: "Web", x: 70, y: 110, side: "in" },
    { id: "cli", label: "CLI", x: 48, y: 230, side: "in" },
    { id: "tests", label: "Testes", x: 70, y: 350, side: "in" },
    { id: "clock", label: "Relógio", x: 730, y: 110, side: "out" },
    { id: "email", label: "E-mail", x: 752, y: 230, side: "out" },
    { id: "repo", label: "Repositório", x: 710, y: 350, side: "out" },
  ];

export function HexDiagram() {
  const [selected, setSelected] = useState<NodeId>("domain");
  const node = NODES[selected];

  return (
    <Section
      id="diagrama"
      kicker="FIG. 02 — Clique para inspecionar"
      title="Camadas do hexágono"
      lead="Esquerda dirige a aplicação. Direita é dirigida por ela. O miolo não aponta para nenhum dos dois."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto rounded-sm border border-line bg-paper-2/40">
          <svg
            viewBox="0 0 800 480"
            className="h-auto w-full min-w-[640px]"
            role="img"
            aria-label="Diagrama hexagonal clicável"
          >
            <defs>
              <linearGradient id="hexFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0b35a" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#6fc4b4" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {ADAPTERS.map((adapter) => (
              <line
                key={`l-${adapter.id}`}
                x1={adapter.x}
                y1={adapter.y}
                x2={adapter.side === "in" ? 250 : 550}
                y2={240}
                stroke={selected === adapter.id ? "#e0b35a" : "rgba(231,225,211,0.16)"}
                strokeWidth={selected === adapter.id ? 2 : 1}
              />
            ))}

            <polygon
              points={hex(400, 240, 168)}
              fill="url(#hexFill)"
              stroke={ringStroke(selected, ["in-port", "out-port", "domain"])}
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelected("in-port")}
            />
            <polygon
              points={hex(400, 240, 118)}
              fill="#121820"
              stroke={selected === "out-port" || selected === "in-port" ? "#6fc4b4" : "rgba(111,196,180,0.45)"}
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelected("out-port")}
            />
            <polygon
              points={hex(400, 240, 64)}
              fill={selected === "domain" ? "#e0b35a" : "#f3ead2"}
              stroke="#e0b35a"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelected("domain")}
            />

            <text
              x="400"
              y="236"
              textAnchor="middle"
              fill={selected === "domain" ? "#0b0f14" : "#0b0f14"}
              fontSize="12"
              fontFamily="var(--font-syne), sans-serif"
              className="cursor-pointer"
              onClick={() => setSelected("domain")}
            >
              DOMÍNIO
            </text>
            <text
              x="400"
              y="168"
              textAnchor="middle"
              fill="#6fc4b4"
              fontSize="10"
              letterSpacing="0.18em"
              className="cursor-pointer"
              onClick={() => setSelected("in-port")}
            >
              PORTAS
            </text>

            <text
              x="118"
              y="36"
              fill="#e0895a"
              fontSize="11"
              letterSpacing="0.22em"
              fontFamily="ui-monospace, monospace"
            >
              ENTRADA
            </text>
            <text
              x="612"
              y="36"
              fill="#8aa0d8"
              fontSize="11"
              letterSpacing="0.22em"
              fontFamily="ui-monospace, monospace"
            >
              SAÍDA
            </text>

            {ADAPTERS.map((adapter) => (
              <AdapterNode
                key={adapter.id}
                {...adapter}
                active={selected === adapter.id}
                onSelect={() => setSelected(adapter.id)}
              />
            ))}
          </svg>
        </div>

        <aside className="border border-line bg-paper-2/70 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {node.kind}
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{node.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{node.body}</p>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
            {node.code}
          </pre>
        </aside>
      </div>
    </Section>
  );
}

function hex(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function ringStroke(selected: NodeId, ids: NodeId[]) {
  return ids.includes(selected) ? "#e0b35a" : "rgba(224,179,90,0.35)";
}

function AdapterNode({
  id,
  label,
  x,
  y,
  side,
  active,
  onSelect,
}: {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  side: "in" | "out";
  active: boolean;
  onSelect: () => void;
}) {
  const color = side === "in" ? "#e0895a" : "#8aa0d8";
  const w = id === "repo" ? 118 : 92;
  return (
    <g className="cursor-pointer" onClick={onSelect} role="button" aria-label={label}>
      <rect
        x={x - w / 2}
        y={y - 18}
        width={w}
        height={36}
        fill={active ? color : "#121820"}
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={active ? "#0b0f14" : color}
        fontSize="12"
        fontFamily="var(--font-syne), sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
