import { STYLES, type StyleId } from "@/lib/integration/styles";

export type IncidentId = "none" | "billingDown" | "schemaChange" | "resend";

export type Incident = {
  id: IncidentId;
  label: string;
};

export const INCIDENTS: Incident[] = [
  { id: "none", label: "Nenhum" },
  { id: "billingDown", label: "Faturação fora" },
  { id: "schemaChange", label: "Schema / contrato mudou" },
  { id: "resend", label: "Reenvio" },
];

export type SideStatus = "ok" | "blocked" | "delayed" | "corrupt" | "duplicate";

export type LabResult = {
  style: StyleId;
  incident: IncidentId;
  loja: { status: SideStatus; note: string };
  billing: { status: SideStatus; note: string };
  couple: string;
  story: string;
  refuse: string | null;
};

export function evaluateLab(style: StyleId, incident: IncidentId): LabResult {
  const couple = STYLES[style].couples;
  const key = `${style}:${incident}` as const;
  return { style, incident, couple, ...SCENES[key] };
}

const SCENES: Record<`${StyleId}:${IncidentId}`, Omit<LabResult, "style" | "incident" | "couple">> = {
  "file:none": {
    loja: { status: "ok", note: "Pedido confirma. O lote sai à noite." },
    billing: { status: "delayed", note: "Lê o CSV de madrugada. A nota não entra no clique." },
    story: "Dois relógios. O contrato é a pasta e o layout — não o HTTP.",
    refuse: null,
  },
  "file:billingDown": {
    loja: { status: "ok", note: "O arquivo já está na pasta. A loja não espera." },
    billing: { status: "delayed", note: "Fora. O lote espera. Quando voltar, processa — ou processa duas vezes." },
    story: "Faturação caiu; o checkout não. Atraso é o preço honesto do arquivo.",
    refuse: null,
  },
  "file:schemaChange": {
    loja: { status: "ok", note: "Exportou a coluna nova. Ninguém avisou o parser." },
    billing: { status: "corrupt", note: "Coluna 7 mudou. O lote entra torto ou recusa o arquivo inteiro." },
    story: "O acoplamento era o layout. Mudou o CSV, quebrou o vizinho — sem partilhar tabela.",
    refuse: "Recuse mudar o lote sem versão. Arquivo também tem contrato.",
  },
  "file:resend": {
    loja: { status: "ok", note: "Mandou o lote de novo “porque não vimos o ACK”." },
    billing: { status: "duplicate", note: "Dois arquivos, duas notas — a menos que a chave do pedido exista." },
    story: "Reenvio sem chave é duplicata. Ponte para idempotência, sem implementá-la aqui.",
    refuse: null,
  },
  "sharedDb:none": {
    loja: { status: "ok", note: "INSERT na tabela que os dois usam. Rápido no dia 1." },
    billing: { status: "ok", note: "SELECT na mesma linha. Sem lote, sem HTTP." },
    story: "Um schema, dois times. Ainda não são dois sistemas — são um deploy que ainda não brigou.",
    refuse: "Recuse chamar isso de integração. É o mesmo banco com dois donos.",
  },
  "sharedDb:billingDown": {
    loja: { status: "ok", note: "Gravou. O banco está no ar; o app da faturação não." },
    billing: { status: "delayed", note: "Quando voltar, lê as linhas. O schema continua o casamento." },
    story: "App fora não é o cheiro. O cheiro é o ALTER da semana que vem.",
    refuse: null,
  },
  "sharedDb:schemaChange": {
    loja: { status: "ok", note: "ALTER TABLE. O deploy da loja passou." },
    billing: { status: "corrupt", note: "SQL da faturação explode. Mesma tabela, outro time, outro horário." },
    story: "Este é o caso. Dois times, um schema. “Mais rápido hoje” chegou a conta.",
    refuse: "Recuse o banco compartilhado entre times. O ALTER não tem dono.",
  },
  "sharedDb:resend": {
    loja: { status: "ok", note: "O clique rodou de novo. INSERT de novo na mesma tabela." },
    billing: { status: "duplicate", note: "Duas linhas ou unique que recusa. A regra vive no schema comum." },
    story: "A duplicata é problema dos dois — porque a tabela é dos dois.",
    refuse: null,
  },
  "rpc:none": {
    loja: { status: "ok", note: "POST /invoices, espera 201, aí confirma o pedido." },
    billing: { status: "ok", note: "Emite no mesmo clique. Tempo de vida único." },
    story: "Honesto quando a nota precisa existir antes da resposta ao cliente.",
    refuse: null,
  },
  "rpc:billingDown": {
    loja: { status: "blocked", note: "O checkout espera. Timeout ou 5xx. O pedido não fecha." },
    billing: { status: "blocked", note: "Fora. O clique da loja saiu junto." },
    story: "Disponibilidade acoplada. Cascata. Resiliência é o próximo módulo — o estilo já mostrou o preço.",
    refuse: "Recuse RPC síncrono se o pedido pode existir sem a nota neste segundo.",
  },
  "rpc:schemaChange": {
    loja: { status: "blocked", note: "Mandou customerId. A faturação ainda espera client_id." },
    billing: { status: "corrupt", note: "400. Contrato quebrado no mesmo request." },
    story: "O acoplamento é o JSON, não a tabela. Ainda é síncrono: os dois sentem agora.",
    refuse: null,
  },
  "rpc:resend": {
    loja: { status: "ok", note: "O cliente apertou de novo. Segundo POST." },
    billing: { status: "duplicate", note: "Duas notas, ou a faturação recusa. Sem chave, dinheiro duplica." },
    story: "Retry síncrono sem idempotência. De novo: ponte, não o módulo 8.",
    refuse: null,
  },
  "messages:none": {
    loja: { status: "ok", note: "Pedido confirma. Publica PedidoPago e segue." },
    billing: { status: "delayed", note: "Consome quando puder. A nota chega depois." },
    story: "Tempos de vida diferentes, sem partilhar tabela. O contrato é o evento.",
    refuse: null,
  },
  "messages:billingDown": {
    loja: { status: "ok", note: "Já respondeu 201 ao cliente. O evento espera o consumidor." },
    billing: { status: "delayed", note: "Fora. A fila (simulada) segura. Sem cascata no checkout." },
    story: "Este é o ganho. Isolamento de tempo. Não é Kafka — é o estilo.",
    refuse: null,
  },
  "messages:schemaChange": {
    loja: { status: "ok", note: "Publicou o payload novo. O pedido já está gravado." },
    billing: { status: "corrupt", note: "Não reconhece o campo. A loja já disse sim. Duas verdades." },
    story: "Evento versionado ou consumidor quebrado. Outbox e idempotência são o módulo 8.",
    refuse: null,
  },
  "messages:resend": {
    loja: { status: "ok", note: "Publicou PedidoPago outra vez." },
    billing: { status: "duplicate", note: "Duas notas se o consumidor não for idempotente." },
    story: "Mensagem + reenvio sem chave. O estilo não perdoa o atalho.",
    refuse: null,
  },
};
