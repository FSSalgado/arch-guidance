import { Section } from "@/components/hex/Section";

const YES = [
  "Uma mudança “local” já toca vários pacotes, times ou deploys.",
  "Um globo, um static, um singleton de pedido que todo mundo escreve.",
  "Um arquivo que você não consegue descrever com uma razão de mudança.",
  "Flags que atravessam o limite (skipX, mode, useLegacy) para o vizinho se comportar.",
];

const NO = [
  "Fatiar um processo de 40 linhas que só tem uma razão de mudança.",
  "Microsserviço para “desacoplar” o que sempre vai no mesmo deploy, pelo mesmo time.",
  "Fila entre duas funções da mesma transação, no mesmo processo.",
  "Interface + pacote para uma única implementação que nunca vai ter segunda.",
  "Estourar um DTO em 40 parâmetros para fugir de stamp — o contrato ainda muda junto; só ficou ilegível.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 06 — Custo e benefício"
      title="Quando caçar acoplamento — e quando recusar a caça"
      lead="Baixo acoplamento não é máxima em todos os eixos. Coesão alta às vezes parece “tudo no mesmo sítio”. O erro é o desenho que luta contra quem muda junto."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido olhar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não mede LCOM nem instabilidade de pacote. Não é DDD. Não é hexagonal
        de novo: o hexágono isola o domínio da infra; aqui o juízo é outro — o que deve
        mudar junto, e o que não.
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
