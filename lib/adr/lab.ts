export type OptionId = "sync" | "queue" | "forget";
export type AdrStatus = "proposed" | "accepted" | "superseded";

export type AdrOption = {
  id: OptionId;
  name: string;
  summary: string;
  good: string[];
  bad: string[];
  warning?: string;
};

export const OPTION_IDS: OptionId[] = ["sync", "queue", "forget"];

export const OPTIONS: Record<OptionId, AdrOption> = {
  sync: {
    id: "sync",
    name: "SMTP no mesmo request",
    summary:
      "PlaceOrder chama o provedor de e-mail e só então responde 201. Um tempo de vida, uma falha visível.",
    good: [
      "Falha de envio aparece no checkout — ninguém finge que o e-mail saiu.",
      "Zero infra nova: sem broker, sem worker, sem dual-write.",
    ],
    bad: [
      "Latência do SMTP entra no caminho crítico do pedido.",
      "Provedor fora: ou o pedido recusa, ou confirma sem e-mail — duas verdades.",
    ],
  },
  queue: {
    id: "queue",
    name: "Fila + worker",
    summary:
      "O checkout persiste o pedido e publica um evento. Um worker envia o e-mail com retry próprio.",
    good: [
      "Checkout não espera SMTP. O pedido confirma mesmo se o provedor tossir.",
      "Retry e isolamento de falha ficam no worker, não no request do cliente.",
    ],
    bad: [
      "E-mail atrasa. O cliente pode atualizar a página antes da caixa de entrada.",
      "Dois destinos (pedido e evento): se um commit falhar, a verdade parte. Outbox é outro módulo.",
    ],
  },
  forget: {
    id: "forget",
    name: "Fire-and-forget no processo",
    summary:
      "O request dispara um Promise sem await e responde. Parece fila. Não é. Parece sincero. Também não é.",
    good: [
      "Nenhuma dependência nova. O checkout “fica rápido” no happy path.",
    ],
    bad: [
      "O processo morre e o e-mail some — sem fila, sem retry, sem rastros.",
      "Erro no envio não chega ao cliente nem a um worker. Silêncio.",
    ],
    warning:
      "O artefato pode gravar esta escolha. O juízo pedagógico é recusar a opção: não é sincera nem resiliente.",
  },
};

export const ADR_STATUSES: { id: AdrStatus; label: string }[] = [
  { id: "proposed", label: "Proposto" },
  { id: "accepted", label: "Aceito" },
  { id: "superseded", label: "Superado" },
];

export const DEFAULT_CONTEXT =
  "O checkout confirma o pedido. O cliente precisa de um e-mail. SMTP no mesmo request deixa o caminho crítico à mercê do provedor. Fila adiciona um tempo de vida novo. Disparar e esquecer no processo parece os dois e não entrega nenhum.";

export const DEFAULT_TITLE = "Como enviar o e-mail de confirmação de pedido";

export const ADR_DATE = "2026-08-29";

export type Threshold = {
  id: string;
  prompt: string;
  record: boolean;
  verdict: string;
};

export const THRESHOLDS: Threshold[] = [
  {
    id: "email",
    prompt: "Sync vs fila para o e-mail de pedido",
    record: true,
    verdict:
      "Grave. Cruza tempo de vida (checkout × SMTP), tem recusa real, o próximo time não vai achar no fio do Slack.",
  },
  {
    id: "rename",
    prompt: "Renomear um método privado no service",
    record: false,
    verdict:
      "Não grave. Local, reversível no próximo PR, uma pessoa. Git blame chega. ADR aqui é teatro.",
  },
  {
    id: "color",
    prompt: "Cor do botão de pagar no checkout",
    record: false,
    verdict:
      "Não grave. Óbvio, reversível, não atravessa time nem runtime. Um ADR desses ensina o time a ignorar os outros.",
  },
  {
    id: "store",
    prompt: "SQL vs documento para o agregado Pedido",
    record: true,
    verdict:
      "Grave. Caro de reverter, vaza para testes e relatórios. Escreva o que foi recusado — não só o vencedor.",
  },
];

export function statusLabel(status: AdrStatus): string {
  return ADR_STATUSES.find((item) => item.id === status)?.label ?? status;
}

export function renderAdr(input: {
  title: string;
  status: AdrStatus;
  context: string;
  selected: OptionId | null;
  why: string;
}): string {
  const title = input.title.trim() || DEFAULT_TITLE;
  const context = input.context.trim() || DEFAULT_CONTEXT;
  const why = input.why.trim();
  const chosen = input.selected ? OPTIONS[input.selected] : null;

  const optionLines = OPTION_IDS.map((id) => {
    const option = OPTIONS[id];
    const mark = chosen && id === chosen.id ? " ← escolhida" : chosen ? " — recusada" : "";
    return `### ${option.name}${mark}\n${option.summary}`;
  }).join("\n\n");

  const decisionBlock = chosen
    ? [
        `Escolhemos **${chosen.name}**.`,
        why ? `\nPor quê: ${why}` : "",
      ].join("")
    : "(ainda sem decisão — clique uma opção)";

  const consequenceLines = chosen
    ? [
        ...chosen.good.map((line) => `- (+) ${line}`),
        ...chosen.bad.map((line) => `- (−) ${line}`),
      ].join("\n")
    : "- (preencha a decisão para listar o preço)";

  const superseded =
    input.status === "superseded"
      ? "\n- Superado por: (aponte o ADR seguinte — não apague este arquivo)"
      : "";

  return `# ${title}

- Status: ${statusLabel(input.status)}
- Data: ${ADR_DATE}${superseded}

## Contexto

${context}

## Opções consideradas

${optionLines}

## Decisão

${decisionBlock}

## Consequências

${consequenceLines}
`;
}
