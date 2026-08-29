import { Section } from "@/components/hex/Section";

const YES = [
  "A escolha cruza time, deploy ou tempo de vida — o Slack não vai herdar.",
  "Há duas ou três opções reais, e o que perdeu precisa ficar escrito.",
  "Reverter depois é migração, não um PR de uma tarde.",
  "O status vai mudar: aceito hoje, superado quando o contexto mudar.",
];

const NO = [
  "Rename, lint, cor de botão, biblioteca óbvia num arquivo só.",
  "Decisão local, reversível no próximo PR, pela mesma pessoa.",
  "Template corporativo de doze seções para um hotfix.",
  "“Já decidimos — só documentar o vencedor”, sem o que foi recusado.",
  "Ferramenta de gestão de ADR no git como produto. Esta página não é isso.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando gravar um ADR — e quando o papel atrapalha"
      lead="ADR não é diário de board. É o mínimo que impede o debate de reabrir sem as restrições de então. Se a escolha é óbvia e reversível, recuse o arquivo — não o hábito de recusar."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido gravar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não é ferramenta de ADR no repositório, não é template de
        empresa, não é C4. O e-mail de pedido existe só para sentir o artefato:
        contexto, opções, decisão, consequências — e o sétimo campo, não gravar.
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
