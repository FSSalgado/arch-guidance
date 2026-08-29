"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { runCliPlaceOrder } from "@/lib/hexagonal/adapters/driving/cli-place-order";
import { submitWebPlaceOrder } from "@/lib/hexagonal/adapters/driving/web-place-order";
import { composePlaceOrder, getRepository, type OutboundStore } from "@/lib/hexagonal/composition";
import { CATALOG } from "@/lib/hexagonal/domain/catalog";
import type { Order } from "@/lib/hexagonal/domain/order";
import type { PlaceOrderError } from "@/lib/hexagonal/domain/place-order";
import { Tracer, type TraceEvent, type TraceLayer } from "@/lib/hexagonal/trace";
import { Section } from "./Section";

type Inbound = "web" | "cli";

const ERROR_COPY: Record<PlaceOrderError | "INVALID_INPUT", string> = {
  UNKNOWN_SKU: "SKU fora do catálogo — o domínio recusou antes de persistir.",
  QUANTITY_MIN: "Quantidade mínima é 1 (regra do domínio).",
  QUANTITY_MAX: "No máximo 10 unidades por pedido (regra do domínio, não do banco).",
  MIN_TOTAL: "Pedido mínimo de R$ 20,00. Doohickey unitário fica abaixo.",
  INVALID_INPUT: "O adapter de entrada parou no parse. O domínio nem rodou.",
};

const LAYER_TONE: Record<TraceLayer, string> = {
  "adapter:web": "text-inbound",
  "adapter:cli": "text-inbound",
  application: "text-port",
  domain: "text-gold",
  "port:clock": "text-port",
  "adapter:clock": "text-outbound",
  "port:repository": "text-port",
  "adapter:memory": "text-outbound",
  "adapter:postgres": "text-outbound",
  "port:notifier": "text-port",
  "adapter:email": "text-outbound",
};

function formatBRL(cents: number) {
  const [reais, centavos] = (cents / 100).toFixed(2).split(".");
  return `R$ ${reais},${centavos}`;
}

export function LiveLab() {
  const [inbound, setInbound] = useState<Inbound>("web");
  const [store, setStore] = useState<OutboundStore>("memory");
  const [sku, setSku] = useState("WIDGET");
  const [quantity, setQuantity] = useState("2");
  const [cliLine, setCliLine] = useState("place-order WIDGET 2");
  const [cliHistory, setCliHistory] = useState<string[]>([
    "hex-shop — adapter CLI. O domínio por trás é o mesmo do formulário.",
  ]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [statusOk, setStatusOk] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [events, setEvents] = useState<TraceEvent[]>([]);
  const [tracer] = useState(() => new Tracer());

  const refreshOrders = useCallback(async () => {
    const list = await getRepository(store).list();
    setOrders(list);
  }, [store]);

  useEffect(() => {
    return tracer.subscribe(() => setEvents([...tracer.events]));
  }, [tracer]);

  useEffect(() => {
    void refreshOrders();
  }, [refreshOrders]);

  const domainFingerprint = useMemo(
    () => "lib/hexagonal/domain/place-order.ts → decidePlaceOrder",
    [],
  );

  async function placeFromWeb() {
    setBusy(true);
    setStatus(null);
    const port = composePlaceOrder(store, tracer);
    const response = await submitWebPlaceOrder(port, { sku, quantity }, tracer);
    if (response.status === 201 && response.result.ok) {
      setStatusOk(true);
      setStatus(
        `201 Created · ${response.result.order.id} · ${formatBRL(response.result.order.totalCents)}`,
      );
    } else {
      setStatusOk(false);
      const error =
        "error" in response.result ? response.result.error : "INVALID_INPUT";
      setStatus(`400 · ${ERROR_COPY[error]}`);
    }
    await refreshOrders();
    setBusy(false);
  }

  async function placeFromCli(line: string) {
    setBusy(true);
    setStatus(null);
    const port = composePlaceOrder(store, tracer);
    const outcome = await runCliPlaceOrder(port, line, tracer);
    setCliHistory((prev) => [...prev, `hex-shop % ${line}`, outcome.stdout]);
    if (outcome.result?.ok) {
      setStatusOk(true);
      setStatus(`stdout ok · ${outcome.result.order.id}`);
    } else if (outcome.result) {
      setStatusOk(false);
      setStatus(ERROR_COPY[outcome.result.error]);
    } else {
      setStatusOk(true);
      setStatus("Ajuda impressa no stdout. Nenhum pedido.");
    }
    await refreshOrders();
    setBusy(false);
  }

  return (
    <Section
      id="laboratorio"
      kicker="FIG. 05 — PlaceOrder ao vivo"
      title="Troque os adapters. O domínio não muda."
      lead="O mesmo caso de uso PlaceOrder. Formulário ou CLI na entrada; memória ou Postgres simulado na saída. Sem Docker, sem banco de verdade — o SQL é teatro didático."
    >
      <div className="border border-gold/30 bg-gold/5 px-4 py-3 font-mono text-xs text-gold-2">
        Núcleo travado: {domainFingerprint}
        <span className="mt-1 block text-ink-dim">
          Você só troca quem chama e quem é chamado. decidePlaceOrder continua o
          mesmo arquivo.
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ToggleGroup
          label="Adapter de entrada"
          value={inbound}
          options={[
            { id: "web", label: "Formulário web" },
            { id: "cli", label: "CLI (neste painel)" },
          ]}
          onChange={setInbound}
        />
        <ToggleGroup
          label="Adapter de saída"
          value={store}
          options={[
            { id: "memory", label: "Memória (Map)" },
            { id: "postgres", label: "Postgres simulado" },
          ]}
          onChange={(next) => {
            setStore(next);
            setStatus(
              next === "memory"
                ? "Store: memória — lista isolada do Postgres simulado."
                : "Store: Postgres simulado — INSERT fictício, ~280ms, outra lista.",
            );
            setStatusOk(true);
          }}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-line bg-paper-2/50 p-5">
          {inbound === "web" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void placeFromWeb();
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inbound">
                POST /orders
              </p>
              <label className="block text-sm">
                <span className="text-ink-dim">SKU</span>
                <select
                  value={sku}
                  onChange={(event) => setSku(event.target.value)}
                  className="mt-1 w-full border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-gold"
                >
                  {CATALOG.map((product) => (
                    <option key={product.sku} value={product.sku}>
                      {product.sku} — {formatBRL(product.unitPriceCents)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-ink-dim">Quantidade</span>
                <input
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="mt-1 w-full border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-gold"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-inbound px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper disabled:opacity-50"
              >
                {busy ? "Enviando…" : "Enviar pedido"}
              </button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void placeFromCli(cliLine);
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inbound">
                stdin / stdout
              </p>
              <div className="h-48 overflow-y-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-ok">
                {cliHistory.map((line, index) => (
                  <pre key={`${index}-${line.slice(0, 12)}`} className="whitespace-pre-wrap text-ink-dim">
                    {line}
                  </pre>
                ))}
              </div>
              <div className="flex gap-2">
                <span className="py-2 font-mono text-xs text-gold">%</span>
                <input
                  value={cliLine}
                  onChange={(event) => setCliLine(event.target.value)}
                  className="flex-1 border border-line bg-paper px-3 py-2 font-mono text-sm text-ink outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-inbound px-3 py-2 font-mono text-xs uppercase tracking-wider text-paper disabled:opacity-50"
                >
                  Run
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["place-order WIDGET 2", "place-order DOOHICKEY 1", "place-order GADGET 11", "help"].map(
                  (sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setCliLine(sample)}
                      className="border border-line px-2 py-1 font-mono text-[10px] text-ink-dim hover:text-ink"
                    >
                      {sample}
                    </button>
                  ),
                )}
              </div>
            </form>
          )}

          {status ? (
            <p className={`mt-4 text-sm ${statusOk ? "text-ok" : "text-danger"}`}>
              {status}
            </p>
          ) : null}

          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outbound">
              Pedidos neste adapter de saída ({store === "memory" ? "memória" : "Postgres simulado"})
            </p>
            {orders.length === 0 ? (
              <p className="mt-2 text-sm text-ink-dim">Nenhum pedido nesta store ainda.</p>
            ) : (
              <ul className="mt-2 space-y-1 font-mono text-[11px] text-ink">
                {orders.map((order) => (
                  <li key={order.id} className="border-b border-line py-1">
                    {order.id} · {order.quantity}× {order.sku} · {formatBRL(order.totalCents)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="border border-line bg-paper-2/50 p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Rastro da chamada
            </p>
            <button
              type="button"
              onClick={() => {
                tracer.clear();
                setStatus(null);
              }}
              className="font-mono text-[10px] uppercase tracking-wider text-ink-dim hover:text-ink"
            >
              Limpar
            </button>
          </div>
          <ol className="mt-3 max-h-72 space-y-2 overflow-y-auto">
            {events.length === 0 ? (
              <li className="text-sm text-ink-dim">
                Dispare um pedido. Cada linha é uma camada: adapter, porta ou domínio.
              </li>
            ) : (
              events.map((event, index) => (
                <li key={event.id} className="border-l-2 border-line pl-3">
                  <p className={`font-mono text-[10px] uppercase tracking-wider ${LAYER_TONE[event.layer]}`}>
                    {index + 1}. {event.layer}
                  </p>
                  <p className="text-sm text-ink">{event.message}</p>
                  {event.detail ? (
                    <pre className="mt-1 whitespace-pre-wrap font-mono text-[10px] text-ink-dim">
                      {event.detail}
                    </pre>
                  ) : null}
                </li>
              ))
            )}
          </ol>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-3 font-mono text-[11px] leading-relaxed text-gold-2">
{`// domain/place-order.ts — não troca com o adapter
export function decidePlaceOrder(command, now) {
  const product = findProduct(command.sku);
  if (command.quantity > 10) return fail("QUANTITY_MAX");
  if (total < 2000) return fail("MIN_TOTAL");
  return ok(order);
}`}
          </pre>
        </div>
      </div>
    </Section>
  );
}

function ToggleGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
        {label}
      </p>
      <div className="mt-2 flex gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`flex-1 border px-3 py-2 font-display text-sm ${
              value === option.id
                ? "border-gold bg-gold/15 text-gold-2"
                : "border-line text-ink-dim hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
