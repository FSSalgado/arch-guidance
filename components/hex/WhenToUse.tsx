import { Section } from "./Section";

const YES = [
  "Regras que você quer testar sem HTTP e sem banco.",
  "Mais de um adapter de entrada de verdade (web + CLI + job + testes).",
  "Infraestrutura que vai mudar — ou que você quer atrasar (qual banco, qual fila).",
  "Time disposto a manter portas honestas, não interfaces-fantasma em cima do ORM.",
];

const NO = [
  "CRUD fino: um formulário, um aggregate anêmico, um único canal.",
  "Protótipo descartável em que a cerimônia de pastas custa mais que o domínio.",
  "Quando “domínio” seria só empilhar DTOs no Entity Framework / Prisma.",
  "Time que vai furar a porta no primeiro JOIN complexo e viver com o pior dos dois mundos.",
];

export function WhenToUse() {
  return (
    <Section
      id="quando"
      kicker="FIG. 08 — Custo e benefício"
      title="Quando o hexágono paga a conta"
      lead="É um isolamento caro. Use quando o núcleo merece sobreviver a frameworks. Não use para parecer arquiteto."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <List title="Faz sentido" items={YES} tone="ok" />
        <List title="Provavelmente não" items={NO} tone="danger" />
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Esta página cobre só hexagonal. Laboratório, fluxo e pastas falam do mesmo
        PlaceOrder — para você sentir a simetria, não para colecionar estilos.
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
      <h3
        className={`font-display text-2xl ${tone === "ok" ? "text-ok" : "text-danger"}`}
      >
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
