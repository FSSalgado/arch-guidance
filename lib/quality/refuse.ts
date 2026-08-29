export const REFUSE_CASES = [
  {
    id: "triangle",
    prompt:
      "Checkout em 80 ms, um VPS, estoque nunca negativo. O time chama isso de “requisito não negociável”.",
    stance: "recuse" as const,
    verdict:
      "Recuse o triângulo. Latência, custo e consistência no máximo não são um desenho — são um slide. Peça dois. O terceiro é o preço, com nome.",
  },
  {
    id: "style",
    prompt:
      "“Vamos de microsserviços para ter qualidade.” Ninguém disse se o que dói é latência, custo ou a troca do PSP.",
    stance: "recuse" as const,
    verdict:
      "Recuse o estilo como substituto de atributo. Qualidade não é um padrão. É o que o sistema precisa ser — e o que você admite piorar.",
  },
  {
    id: "cache-all",
    prompt: "Cache em tudo, inclusive saldo e reserva de estoque, “para a vitrine ficar rápida”.",
    stance: "recuse" as const,
    verdict:
      "Recuse o mesmo cache para catálogo e para dinheiro. Preço velho é chateação. Reserva velha vende o que não existe.",
  },
  {
    id: "nines",
    prompt: "99,99% de disponibilidade no cartaz. Infra: um Postgres, um provedor de cartão, uma região.",
    stance: "recuse" as const,
    verdict:
      "Recuse o nove extra. Disponibilidade é o que acontece quando o vizinho cai — não o número no slide.",
  },
  {
    id: "eventual-charge",
    prompt:
      "“Eventual consistency” no débito do cartão, no mesmo clique em que o cliente espera a confirmação.",
    stance: "trate" as const,
    verdict:
      "Aqui o juízo é tratar: consistência eventual no catálogo pode ser tática. No saldo, no mesmo request, é duas verdades com dinheiro no meio.",
  },
] as const;
