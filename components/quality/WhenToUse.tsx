import { Section } from "@/components/hex/Section";

const YES = [
  "Antes de escolher cache, fila, réplica ou “eventual” — para nomear o que sobe e o que desce.",
  "Quando o pedido é “rápido, barato e sempre certo” no mesmo checkout.",
  "Quando dois times defendem padrões opostos e ninguém nomeou o atributo.",
  "Para gravar o que foi recusado: não foi preguiça, foi o terceiro eixo.",
];

const NO = [
  "Checklist ISO 25010 como produto do projeto.",
  "“Vamos maximizar os cinco no Q3.” Isso não é prioridade — é recusa disfarçada.",
  "Catálogo de dezenas de táticas SEI sem um cenário que pague o preço.",
  "Usar o vocabulário para justificar o padrão que você já tinha escolhido.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando nomear atributos — e quando a lista não ajuda"
      lead="Atributo de qualidade não é enfeite de ADR. É o teste de se o padrão responde a uma pergunta. Se a pergunta é “máximo em todos”, a resposta é recusar o pedido — não empilhar táticas."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido olhar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não é ISO 25010, não é catálogo SEI, não é cloud vendor. Não
        copia o PlaceOrder hexagonal nem o lab de ripple. O checkout aqui só
        existe para sentir o triângulo: latência, custo, consistência — escolha
        dois.
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
