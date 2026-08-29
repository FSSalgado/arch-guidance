"use client";

import { useEffect, useState } from "react";
import { Section } from "./Section";

const STEPS = [
  {
    title: "HTTP chega no adapter Web",
    highlight: "web",
    body: "POST /orders com JSON. Nenhum cálculo de negócio acontece aqui — só transporte e formato.",
    code: `POST /orders HTTP/1.1
{ "sku": "WIDGET", "quantity": 2 }`,
  },
  {
    title: "Tradução para o comando",
    highlight: "web",
    body: "O adapter converte o mundo HTTP num PlaceOrderCommand. Strings viram tipos do domínio.",
    code: `const command = { sku: body.sku, quantity: Number(body.quantity) }
await placeOrderPort.execute(command)`,
  },
  {
    title: "Porta de entrada / caso de uso",
    highlight: "app",
    body: "PlaceOrderService orquestra. Ainda não sabe se a origem foi browser ou CLI.",
    code: `class PlaceOrderService implements PlaceOrderPort {
  async execute(command) { /* ... */ }
}`,
  },
  {
    title: "Relógio pela porta de saída",
    highlight: "clock",
    body: "A aplicação pede now() ao Clock. O adapter SystemClock lê a máquina; um teste passaria um relógio falso.",
    code: `const now = this.clock.now()`,
  },
  {
    title: "Domínio decide",
    highlight: "domain",
    body: "decidePlaceOrder aplica catálogo, quantidade e valor mínimo. Devolve Order ou erro. Sem I/O.",
    code: `const decision = decidePlaceOrder(command, now)
if (!decision.ok) return decision`,
  },
  {
    title: "Persistência pela porta",
    highlight: "repo",
    body: "Só depois da aceitação o caso de uso chama OrderRepository.save. Memória ou Postgres: mesma chamada.",
    code: `await this.orders.save(decision.order)`,
  },
  {
    title: "E-mail de confirmação",
    highlight: "email",
    body: "OrderNotifier.orderPlaced. Falha de SMTP não deveria reescrever a regra de quantidade — são eixos diferentes.",
    code: `await this.notifier.orderPlaced(decision.order)`,
  },
  {
    title: "HTTP de volta",
    highlight: "web",
    body: "O adapter Web mapeia o resultado para 201 ou 400. O cliente nunca vê o hexágono — só o contrato HTTP.",
    code: `201 Created { "id": "ord-…-WIDGET" }
400 { "error": "QUANTITY_MAX" }`,
  },
] as const;

const HIGHLIGHT_LABEL: Record<string, { label: string; color: string }> = {
  web: { label: "Adapter Web", color: "#e0895a" },
  app: { label: "Aplicação + porta", color: "#6fc4b4" },
  clock: { label: "Adapter relógio", color: "#8aa0d8" },
  domain: { label: "Domínio", color: "#e0b35a" },
  repo: { label: "Adapter repositório", color: "#8aa0d8" },
  email: { label: "Adapter e-mail", color: "#8aa0d8" },
};

export function HttpFlow() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = STEPS[index];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        if (current >= STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1600);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <Section
      id="fluxo"
      kicker="FIG. 04 — Um request, oito estações"
      title="Do HTTP ao domínio e de volta"
      lead="O fluxo em runtime sai para a borda; as dependências de código continuam apontando para o centro. Percorra os passos."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setPlaying(true);
          }}
          className="rounded-full bg-gold px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-paper"
        >
          Reproduzir
        </button>
        <button
          type="button"
          onClick={() => setPlaying(false)}
          className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-dim"
        >
          Pausar
        </button>
        <p className="font-mono text-xs text-ink-dim">
          Passo {index + 1} / {STEPS.length}
        </p>
      </div>

      <ol className="mt-6 flex gap-1 overflow-x-auto pb-2">
        {STEPS.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex(i);
              }}
              className={`h-2 w-10 rounded-full ${
                i === index ? "bg-gold" : i < index ? "bg-gold/40" : "bg-line"
              }`}
              aria-label={`Passo ${i + 1}`}
            />
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <FlowRail active={step.highlight} />
        <div className="border border-line bg-paper-2/60 p-6">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: HIGHLIGHT_LABEL[step.highlight].color }}
          >
            {HIGHLIGHT_LABEL[step.highlight].label}
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">{step.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
            {step.body}
          </p>
          <pre className="mt-5 overflow-x-auto border border-line bg-paper p-4 font-mono text-[12px] leading-relaxed text-gold-2">
            {step.code}
          </pre>
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => {
                setPlaying(false);
                setIndex((i) => Math.max(0, i - 1));
              }}
              className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink disabled:opacity-30"
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={index === STEPS.length - 1}
              onClick={() => {
                setPlaying(false);
                setIndex((i) => Math.min(STEPS.length - 1, i + 1));
              }}
              className="rounded-full border border-gold/40 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-gold"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FlowRail({ active }: { active: string }) {
  const items = [
    { id: "web", label: "Web" },
    { id: "app", label: "Porta / app" },
    { id: "clock", label: "Relógio" },
    { id: "domain", label: "Domínio" },
    { id: "repo", label: "Repositório" },
    { id: "email", label: "E-mail" },
  ];

  return (
    <ol className="flex flex-row gap-2 lg:flex-col">
      {items.map((item) => {
        const on = item.id === active || (active === "web" && item.id === "web");
        return (
          <li
            key={item.id}
            className={`flex-1 border px-3 py-2 font-mono text-[11px] uppercase tracking-wider ${
              on
                ? "border-gold bg-gold/10 text-gold-2"
                : "border-line text-ink-dim"
            }`}
          >
            {item.label}
          </li>
        );
      })}
    </ol>
  );
}
