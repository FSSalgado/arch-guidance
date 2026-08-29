import { Section } from "@/components/hex/Section";

const YES = [
  "Todo caller de vizinho instável: timeout no cliente, não “a gente vê depois”.",
  "PSP fora: breaker para falhar rápido e não enfileirar a loja.",
  "Erro transitório em leitura: retry com teto. Em cobrança: só com chave.",
  "A cascata já começou — isolar o clique, não fingir que o checkout passou.",
];

const NO = [
  "Retry em POST de efeito sem idempotência.",
  "Chamar sem timeout e “esperar o PSP voltar”.",
  "Istio/service mesh como substituto da política do caller.",
  "Chaos engineering de plataforma como produto desta página.",
  "Bulkhead e hedge como módulo inteiro — cabem numa nota, não aqui.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando isolar — e quando a tática piora"
      lead="Resiliência não é maximizar retries. É recusar herdar o hang e recusar duplicar o charge. A chave de idempotência é o módulo seguinte; aqui o juízo é não ligar o retry cego."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido isolar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não é mesh, não é chaos de plataforma, não implementa a
        chave. O PSP simulado existe só para sentir a fila: timeout, retry,
        breaker — e o perigo de cobrar duas vezes.
      </p>
    </Section>
  );
}

function List({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "ok" | "danger";
}) {
  return (
    <div className="border border-line bg-paper-2/50 p-5">
      <h3 className={`font-display text-2xl ${tone === "ok" ? "text-ok" : "text-danger"}`}>
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
            <span className={tone === "ok" ? "text-ok" : "text-danger"} aria-hidden>
              {tone === "ok" ? "+" : "−"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
