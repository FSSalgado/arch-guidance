export const REFUSE_CASES = [
  {
    id: "slack",
    prompt:
      "Sync vs fila para o e-mail de pedido. A discussão inteira está num fio de Slack. “Quem quiser lê o histórico.”",
    stance: "trate" as const,
    verdict:
      "Trate. A escolha cruza tempo de vida e o próximo time não herda o Slack. Grave contexto, opções recusadas e o preço.",
  },
  {
    id: "winner",
    prompt: "O ADR tem uma linha: “Decisão: vamos de fila.” Não lista o que perdeu nem por quê.",
    stance: "recuse" as const,
    verdict:
      "Recuse o anúncio. Sem o que foi recusado, ninguém sabe se SMTP síncrono ou fire-and-forget voltaram à mesa. Isso não é ADR.",
  },
  {
    id: "every-ticket",
    prompt: "Política nova: todo card do board ganha um ADR antes do merge. Inclusive rename e cor de botão.",
    stance: "recuse" as const,
    verdict:
      "Recuse o volume. ADR para o óbvio ensina o time a não ler os que importam. Grave o caro de reverter.",
  },
  {
    id: "rename",
    prompt: "Alguém abriu ADR-118: renomear PlaceOrderService para OrderApplication. Uma pessoa, um PR.",
    stance: "recuse" as const,
    verdict:
      "Recuse gravar. Local, reversível, git blame chega. Papel aqui é teatro.",
  },
  {
    id: "delete",
    prompt: "A fila perdeu. O time apaga o ADR da fila “para não confundir gente nova”.",
    stance: "recuse" as const,
    verdict:
      "Recuse apagar. Status vira superado e aponta para o próximo. História some, o debate reabre.",
  },
] as const;
