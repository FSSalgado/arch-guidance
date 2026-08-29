import { Section } from "@/components/hex/Section";

const YES = [
  "Lote noturno para outro CNPJ — arquivo, layout versionado, horário combinado.",
  "A nota precisa existir no mesmo clique, e o vizinho aguenta a disponibilidade.",
  "Pedido pode confirmar sem a fatura pronta — tempos de vida diferentes, mensagem.",
  "Ainda é um time, um deploy, um modelo: banco compartilhado é o sistema, não integração.",
];

const NO = [
  "Dois times, uma tabela “porque é mais rápido que API”.",
  "CSV no caminho crítico do checkout.",
  "GET síncrono por linha de um relatório de madrugada.",
  "Fila entre duas funções da mesma transação.",
  "Kafka, broker ou REST vs GraphQL como produto desta página. Hexagonal também não.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando cada cano — e quando recusar o tubo"
      lead="Integração não é escolher o produto da moda. É nomear o que acopla: layout, schema, tempo de vida, evento. Se a pergunta é “vamos de Kafka”, ainda não há estilo — há marca."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido o estilo" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não implementa broker, não é guerra REST vs GraphQL, não é
        hexagonal de novo. Loja e faturação existem só para sentir os quatro
        canos no mesmo par — e recusar o atalho do schema comum.
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
