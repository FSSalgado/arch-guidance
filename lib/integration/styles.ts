export type StyleId = "file" | "sharedDb" | "rpc" | "messages";

export type IntegrationStyle = {
  id: StyleId;
  name: string;
  english: string;
  pipe: string;
  question: string;
  summary: string;
  couples: string;
  failure: string;
  when: string;
  smell: string;
  refuse: string;
};

export const STYLE_IDS: StyleId[] = ["file", "sharedDb", "rpc", "messages"];

export const STYLES: Record<StyleId, IntegrationStyle> = {
  file: {
    id: "file",
    name: "Arquivo",
    english: "File Transfer",
    pipe: "lote",
    question: "Os tempos de vida são diferentes de verdade?",
    summary:
      "A loja escreve um lote. A faturação lê depois. O contrato é o formato e o horário — não o segundo do clique.",
    couples: "Layout do arquivo, pasta, relógio do lote.",
    failure: "Não chegou, chegou duas vezes, ou a coluna 7 mudou de nome.",
    when: "Batch, volume, times que não precisam conversar no mesmo request.",
    smell: "CSV no checkout\npara emitir a nota agora.",
    refuse: "Recuse arquivo para o clique que precisa da fatura neste segundo.",
  },
  sharedDb: {
    id: "sharedDb",
    name: "Banco compartilhado",
    english: "Shared Database",
    pipe: "schema",
    question: "Dois times, uma tabela — quem é dono do ALTER?",
    summary:
      "Loja e faturação lêem e escrevem as mesmas linhas. No dia 1 é rápido. No dia 30 o schema é o casamento.",
    couples: "Tabelas, tipos, transação, horário de deploy.",
    failure: "Um ALTER na loja quebra o SQL da faturação. Ou o contrário.",
    when: "Um time, um deploy, um modelo — ainda não são dois sistemas.",
    smell: "CREATE TABLE invoices\n/* os dois times gravam */",
    refuse: "Recuse o schema comum entre times. “Mais rápido hoje” é o custo de amanhã.",
  },
  rpc: {
    id: "rpc",
    name: "API síncrona",
    english: "Remote Procedure Invocation",
    pipe: "request",
    question: "O checkout pode esperar o vizinho?",
    summary:
      "A loja chama a faturação e espera. Tempo de vida único. Se o vizinho tossir, o clique tossiu.",
    couples: "Contrato HTTP, disponibilidade, latência no caminho crítico.",
    failure: "Faturação fora: checkout recusa ou trava. Timeout vira produto do outro módulo.",
    when: "A resposta precisa entrar no mesmo clique, e o vizinho é estável o bastante.",
    smell: "POST /invoices\nno meio do PlaceOrder.",
    refuse: "Recuse RPC síncrono para trabalho que pode esperar — e para vizinho que cai junto.",
  },
  messages: {
    id: "messages",
    name: "Mensagens",
    english: "Messaging",
    pipe: "evento",
    question: "Os tempos de vida podem ser diferentes sem partilhar a tabela?",
    summary:
      "A loja publica PedidoPago. A faturação consome quando puder. Sem broker de verdade neste lab — o juízo é o tempo, não o produto.",
    couples: "Formato do evento, ordem, reenvio. Não o schema interno do vizinho.",
    failure: "Consumidor atrasado ou payload novo: a loja já disse sim. Duas verdades — ponte para idempotência.",
    when: "O pedido pode confirmar sem a nota pronta. Retry e atraso são aceitáveis.",
    smell: "Fila entre duas funções\nda mesma transação.",
    refuse: "Recuse mensagem no mesmo processo e a mesma unidade de trabalho. Também recuse Kafka como substituto de estilo.",
  },
};
