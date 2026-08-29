export type ModelId = "key" | "dualWrite" | "outbox" | "relay";

export type ModelPiece = {
  id: ModelId;
  name: string;
  english: string;
  question: string;
  summary: string;
  smell: string;
  refuse: string;
};

export const MODEL_IDS: ModelId[] = ["key", "dualWrite", "outbox", "relay"];

export const MODEL: Record<ModelId, ModelPiece> = {
  key: {
    id: "key",
    name: "Chave de idempotência",
    english: "Idempotency key",
    question: "O reenvio é o mesmo comando — ou um segundo pedido?",
    summary:
      "O cliente manda a mesma chave. A loja devolve o mesmo pedido. Sem chave, retry HTTP é INSERT de novo.",
    smell: "POST /orders\nPOST /orders  // timeout, o cliente insiste",
    refuse: "Recuse PlaceOrder sem chave se o canal reenvia. Dois 201 não são dois sucessos — são dois pedidos.",
  },
  dualWrite: {
    id: "dualWrite",
    name: "Dual write",
    english: "Dual write",
    question: "Persistir e publicar são um commit — ou dois destinos?",
    summary:
      "Grava o pedido, depois publica o evento (ou o contrário). Um dos dois pode falhar. Sobram duas verdades.",
    smell: "db.save(order)\nbus.publish(OrderPlaced)",
    refuse: "Recuse dois destinos sem um só commit. Ou o evento some, ou o evento existe sem pedido.",
  },
  outbox: {
    id: "outbox",
    name: "Outbox",
    english: "Outbox",
    question: "A linha do evento nasce no mesmo commit do pedido?",
    summary:
      "Pedido e registro de outbox no mesmo commit. Se o processo morrer, o pedido existe e o evento ainda pode sair. Sem fila real neste lab.",
    smell: "commit(order)\n// crash\npublish()",
    refuse: "Recuse publicar fora da transação do agregado. Outbox é a linha, não o broker exactly-once.",
  },
  relay: {
    id: "relay",
    name: "Relay",
    english: "Relay",
    question: "Quem tira a linha da outbox e entrega o evento?",
    summary:
      "Um processo bobo relê o que não foi publicado e tenta de novo. Pode duplicar a entrega — por isso a chave no consumidor. Inbox genérico e saga não entram aqui.",
    smell: "outbox cheia,\nninguém lê.",
    refuse: "Recuse achar que o commit da outbox já entregou. Sem relay, o evento não saiu.",
  },
};
