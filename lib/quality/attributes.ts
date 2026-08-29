export const ATTRIBUTE_IDS = [
  "latency",
  "availability",
  "cost",
  "evolvability",
  "consistency",
] as const;

export type AttributeId = (typeof ATTRIBUTE_IDS)[number];

export const ATTRIBUTE_COPY: Record<
  AttributeId,
  {
    name: string;
    english: string;
    question: string;
    summary: string;
    smell: string;
    refuse: string;
    tension: string;
  }
> = {
  latency: {
    name: "Latência",
    english: "Latency",
    question: "Quanto o cliente espera no clique de pagar?",
    summary:
      "Tempo até a primeira resposta útil. Não é “o servidor está no ar” — é o milissegundo que a pessoa sente.",
    smell: "Cache em tudo, inclusive saldo e estoque, “para ficar rápido”.",
    refuse:
      "Recuse tratar preço de vitrine e reserva de estoque como o mesmo problema de latência. Um pode estar velho. O outro vende o que não existe.",
    tension: "Sobe com cache e 202. Desce com commit síncrono e lock.",
  },
  availability: {
    name: "Disponibilidade",
    english: "Availability",
    question: "Quando o PSP cai, a loja some com ele?",
    summary:
      "Fração do tempo em que o checkout ainda aceita pedido. Réplica e degradação sobem o eixo. Um único processo o derruba.",
    smell: "“99,99%” desenhado em cima de um Postgres e um provedor de cartão.",
    refuse:
      "Recuse o nove extra sem dizer quem fica de pé quando o vizinho morre. Disponibilidade não é um número no slide — é o que você faz na falha.",
    tension: "Sobe com várias instâncias e aceite assíncrono. Desce com uma máquina e pagamento no request.",
  },
  cost: {
    name: "Custo",
    english: "Cost",
    question: "Quanto custa o nove extra — infra e gente?",
    summary:
      "Dinheiro de máquina e de complexidade. Uma caixa é barata. Multi-zona e contratos demais não são.",
    smell: "Multi-região no dia 1 da loja de um, “porque qualidade”.",
    refuse:
      "Recuse pagar disponibilidade de banco grande com receita de banca. Custo alto pode ser a decisão certa — desde que alguém nomeie o que ela compra.",
    tension: "Sobe (fica barato) com uma máquina e SDK no fluxo. Desce com réplicas e contratos a mais.",
  },
  evolvability: {
    name: "Evoluibilidade",
    english: "Evolvability",
    question: "Trocar o PSP é um PR ou um trimestre?",
    summary:
      "Custo de mudar o desenho depois. Contrato estreito ajuda. SDK espalhado no carrinho não.",
    smell: "Microsserviços “para poder evoluir”, sem dizer *o que* evolui.",
    refuse:
      "Recuse fatiar o sistema para comprar evoluibilidade que ninguém pediu. Se o PSP não vai mudar, o contrato extra é custo — não qualidade.",
    tension: "Sobe com limite no pagamento. Desce quando o SDK mora no carrinho.",
  },
  consistency: {
    name: "Consistência",
    english: "Consistency",
    question: "Estoque 0 e pagamento aprovado no mesmo segundo — o que é verdade?",
    summary:
      "Quando duas escritas concordam. Transação e lock sobem o eixo. Aceite agora / cobra depois o rebaixa.",
    smell: "“Eventual” no débito do cartão, no mesmo clique do cliente.",
    refuse:
      "Recuse consistência eventual onde a mentira custa dinheiro de verdade. Eventual no catálogo é uma coisa. No saldo, outra.",
    tension: "Sobe com reserva no commit. Desce com cache de preço e débito depois.",
  },
};

export const ATTRIBUTE_COLOR: Record<AttributeId, string> = {
  latency: "#e0b35a",
  availability: "#7dbe7a",
  cost: "#e0895a",
  evolvability: "#8aa0d8",
  consistency: "#6fc4b4",
};

export type TradeoffPair = {
  id: string;
  a: AttributeId;
  b: AttributeId;
  punch: string;
};

export const TRADEOFF_PAIRS: TradeoffPair[] = [
  {
    id: "lat-con",
    a: "latency",
    b: "consistency",
    punch: "Resposta imediata e estoque+pagamento sempre iguais não cabem no mesmo round-trip.",
  },
  {
    id: "av-cost",
    a: "availability",
    b: "cost",
    punch: "O nove extra é réplica. Réplica não é o plano de um VPS.",
  },
  {
    id: "lat-cost",
    a: "latency",
    b: "cost",
    punch: "Cache, borda e instância a mais compram milissegundo com dinheiro.",
  },
  {
    id: "evo-cost",
    a: "evolvability",
    b: "cost",
    punch: "Contrato para trocar o PSP custa agora. SDK no carrinho custa na troca.",
  },
  {
    id: "av-con",
    a: "availability",
    b: "consistency",
    punch: "Aceitar pedido com o PSP lento mantém a loja aberta e admite duas verdades por um tempo.",
  },
];
