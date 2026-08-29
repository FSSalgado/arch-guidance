export type TacticId = "timeout" | "retry" | "breaker";

export type Tactic = {
  id: TacticId;
  name: string;
  english: string;
  question: string;
  summary: string;
  smell: string;
  refuse: string;
};

export const TACTIC_IDS: TacticId[] = ["timeout", "retry", "breaker"];

export const TACTICS: Record<TacticId, Tactic> = {
  timeout: {
    id: "timeout",
    name: "Timeout",
    english: "Timeout",
    question: "Quanto tempo o clique pode esperar o vizinho?",
    summary:
      "Sem teto, a loja espera para sempre. Com teto curto demais, o PSP ainda cobra e o cliente vê falha — e o retry entra.",
    smell: "await psp.charge()\n// sem deadline",
    refuse: "Recuse chamar o vizinho sem timeout. O hang do PSP vira hang da loja.",
  },
  retry: {
    id: "retry",
    name: "Retry",
    english: "Retry",
    question: "Tentar de novo — o efeito já aconteceu?",
    summary:
      "Erro transitório pede outra tentativa. POST de cobrança sem chave pede outra cobrança. O perigo é o assunto do módulo seguinte.",
    smell: "for (i < 3) psp.charge()\n// timeout, mas o cartão passou",
    refuse: "Recuse retry em efeito colateral sem idempotência. Timeout + retry = duas cobranças.",
  },
  breaker: {
    id: "breaker",
    name: "Circuit breaker",
    english: "Circuit breaker",
    question: "Ainda vale bater no cadáver?",
    summary:
      "Fechado: chama. Aberto: falha rápido, sem enfileirar. Meio-aberto: um probe. Isola a cascata; não cura o vizinho.",
    smell: "8 checkouts na fila\nesperando o PSP morto.",
    refuse: "Recuse continuar chamando depois de N falhas. Isolar não é service mesh — é parar.",
  },
};
