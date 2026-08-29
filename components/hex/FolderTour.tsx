"use client";

import { useState } from "react";
import { Section } from "./Section";

const TREE = [
  {
    path: "domain/",
    title: "Domínio",
    blurb: "Entidades, catálogo, políticas. Zero dependências para fora.",
    file: "domain/place-order.ts",
    snippet: `export function decidePlaceOrder(command, now) {
  const product = findProduct(command.sku);
  if (!product) return { ok: false, error: "UNKNOWN_SKU" };
  if (command.quantity > MAX_UNITS_PER_ORDER) {
    return { ok: false, error: "QUANTITY_MAX" };
  }
  // ...
}`,
  },
  {
    path: "ports/",
    title: "Portas",
    blurb: "Contratos. A aplicação depende disto; adapters implementam.",
    file: "ports/order-repository.ts",
    snippet: `export interface OrderRepository {
  save(order: Order): Promise<void>;
  list(): Promise<Order[]>;
}`,
  },
  {
    path: "application/",
    title: "Aplicação",
    blurb: "Casos de uso. Orquestram portas; não conhecem HTTP nem SQL.",
    file: "application/place-order-service.ts",
    snippet: `export class PlaceOrderService implements PlaceOrderPort {
  async execute(command) {
    const now = this.clock.now();
    const decision = decidePlaceOrder(command, now);
    if (!decision.ok) return decision;
    await this.orders.save(decision.order);
    await this.notifier.orderPlaced(decision.order);
    return decision;
  }
}`,
  },
  {
    path: "adapters/driving/",
    title: "Adapters de entrada",
    blurb: "Web, CLI, testes. Traduzem o mundo para PlaceOrderPort.",
    file: "adapters/driving/web-place-order.ts",
    snippet: `export async function submitWebPlaceOrder(port, input, tracer) {
  tracer.step("adapter:web", "POST /orders");
  const quantity = Number.parseInt(input.quantity, 10);
  return port.execute({ sku: input.sku, quantity });
}`,
  },
  {
    path: "adapters/driven/",
    title: "Adapters de saída",
    blurb: "Repositório, e-mail, relógio. Cumprem as portas de saída.",
    file: "adapters/driven/simulated-postgres-order-repository.ts",
    snippet: `export class SimulatedPostgresOrderRepository
  implements OrderRepository {
  async save(order) {
    // INSERT INTO orders ...  (aqui, simulado)
    this.rows.push(order);
  }
}`,
  },
] as const;

export function FolderTour() {
  const [open, setOpen] = useState<(typeof TREE)[number]["path"]>("domain/");
  const current = TREE.find((item) => item.path === open) ?? TREE[0];

  return (
    <Section
      id="pastas"
      kicker="FIG. 06 — Mapa de pastas"
      title="Onde cada coisa vive"
      lead="Nomes variam (inbound/outbound, driving/driven). A ideia é a mesma: núcleo, contratos, orquestração, bordas."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ul className="border border-line bg-paper-2/40">
          {TREE.map((item) => (
            <li key={item.path} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(item.path)}
                className={`w-full px-4 py-3 text-left ${
                  open === item.path ? "bg-gold/10" : "hover:bg-paper-3"
                }`}
              >
                <span className="block font-mono text-[11px] text-gold">
                  {item.path}
                </span>
                <span className="font-display text-lg text-ink">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border border-line bg-paper-2/50 p-5">
          <h3 className="font-display text-2xl text-ink">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">{current.blurb}</p>
          <p className="mt-4 font-mono text-[11px] text-port">{current.file}</p>
          <pre className="mt-3 overflow-x-auto border border-line bg-paper p-4 font-mono text-[12px] leading-relaxed text-gold-2">
            {current.snippet}
          </pre>
        </div>
      </div>
    </Section>
  );
}
