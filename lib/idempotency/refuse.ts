export const REFUSE_CASES = [
  {
    id: "retry-no-key",
    prompt: "O cliente deu timeout no PlaceOrder e reenviou. A API não pede chave. Dois 201.",
    stance: "recuse" as const,
    verdict:
      "Recuse o segundo pedido. Reenvio HTTP não é intenção nova. Sem chave, o estoque vende duas vezes.",
  },
  {
    id: "publish-then-commit",
    prompt: "O serviço publica OrderPlaced e só então commita o pedido. O processo morre no meio.",
    stance: "recuse" as const,
    verdict:
      "Recuse publicar antes do commit. O mundo ouviu um pedido que a loja não tem. Dual write na ordem inversa ainda é dual write.",
  },
  {
    id: "commit-then-bus",
    prompt: "Commit do pedido, depois bus.publish. Crash entre os dois. “A fila resolve.”",
    stance: "recuse" as const,
    verdict:
      "Recuse os dois destinos. O pedido existe e o evento sumiu. Outbox no mesmo commit; relay depois. A fila não inventa o que não foi gravado.",
  },
  {
    id: "exactly-once",
    prompt: "“O broker é exactly-once, não precisamos de chave nem outbox.”",
    stance: "recuse" as const,
    verdict:
      "Recuse exactly-once como produto desta página. O broker não é o commit da loja. Chave no comando, outbox no agregado.",
  },
  {
    id: "double-click",
    prompt: "Checkout com chave Idempotency-Key. O cliente aperta pagar duas vezes na mesma sessão.",
    stance: "trate" as const,
    verdict:
      "Trate. Um pedido. O segundo HTTP devolve o primeiro. Outbox se a faturação vive de evento — sem saga, sem inbox genérico.",
  },
] as const;
