import { Section } from "@/components/hex/Section";

const YES = [
  "Canal que reenvia: HTTP, o cliente apertou duas vezes, o timeout do módulo de resiliência.",
  "Precisa publicar o que o agregado commitou — outbox no mesmo commit, relay depois.",
  "Consumidor pode ver o evento duas vezes: a chave também vive lá. Não é exactly-once de broker.",
  "O dual write já doeu uma vez. Não volte a gravar e publicar em dois destinos.",
];

const NO = [
  "PlaceOrder sem chave “porque o front não duplica”. O HTTP duplica.",
  "Exactly-once do broker como substituto de outbox.",
  "Inbox genérico como produto. Saga. Isso é icebox.",
  "Fila real, Kafka, relay de plataforma. O lab é a linha no mesmo commit.",
  "Copiar o lab hexagonal de ports/adapters. Aqui o juízo é o reenvio e as duas verdades.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando a chave e a outbox — e quando é teatro"
      lead="Idempotência não é magia do POST. É o mesmo comando não ter o segundo efeito. Outbox não é o broker: é não partir o commit. Se a pergunta é saga, esta página recusa o pedido."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido tratar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não é inbox, não é saga, não é exactly-once de broker. O
        PlaceOrder existe só para sentir o reenvio e o crash entre persistir e
        publicar.
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
