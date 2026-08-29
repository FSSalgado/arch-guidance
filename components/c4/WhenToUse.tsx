import { Section } from "@/components/hex/Section";

const YES = [
  "Alguém novo pergunta o que a Loja Norte toca no mundo — comece no contexto.",
  "A discussão é o que roda onde: site, API, worker, banco.",
  "Um slide mistura cliente, Helm e classe — corte em zooms, não acrescente seta.",
  "O time dono de um container precisa ver as peças grandes, não o sistema inteiro de novo.",
];

const NO = [
  "UML completa, diagrama de deployment, notação formal como produto.",
  "C4 no lugar de ADR: o zoom mostra o quê, não o porquê nem o que foi recusado.",
  "Desenhar o nível 4 para cada classe. O IDE já faz isso.",
  "Quarenta componentes “para ficar completo”.",
  "Copiar o lab hexagonal (ports, adapters, PlaceOrder) neste zoom. Aqui o juízo é outro.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 05 — Custo e benefício"
      title="Quando abrir o C4 — e quando o zoom não ajuda"
      lead="C4 não é o desenho oficial da empresa. É a disciplina de uma pergunta por diagrama. Se a pergunta é o porquê da fila, isso é ADR. Se é a classe do handler, isso é o IDE."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido desenhar" items={YES} tone="ok" />
        <List title="Provavelmente recuse" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página não é UML, não é deployment, não substitui ADR. A Loja Norte
        existe só para sentir o zoom: contexto, container, componente — e o
        quarto nível, em geral, de fora.
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
