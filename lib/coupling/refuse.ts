export const REFUSE_CASES = [
  {
    id: "micro",
    prompt:
      "Três pessoas, um repositório, um deploy. A proposta é seis microsserviços “para reduzir acoplamento”.",
    stance: "recuse" as const,
    verdict:
      "Recuse a fatiadura. Acoplamento de conteúdo não some na rede — vira latência e contrato quebrado. Junte o que muda junto.",
  },
  {
    id: "utils",
    prompt: "ShopService.ts mistura placeOrder, sendNewsletter, formatCnpj e renderPdfFiscal.",
    stance: "recuse" as const,
    verdict:
      "Recuse o arquivo único. Não é “camada de serviço”: são quatro razões de mudança. Separe por motivo, não por verbo.",
  },
  {
    id: "content",
    prompt: "O carrinho faz catalog.internalPrices[sku] = 0 para aplicar desconto.",
    stance: "recuse" as const,
    verdict:
      "Recuse esse limite. Catálogo não é módulo se o vizinho edita o mapa interno. Contrato (preço por SKU) ou um único módulo de precificação.",
  },
  {
    id: "bus",
    prompt:
      "Duas funções no mesmo processo, mesma transação. Alguém coloca uma fila no meio “para desacoplar”.",
    stance: "recuse" as const,
    verdict:
      "Recuse a mensagem aqui. Fila entre A e B da mesma unidade de trabalho troca um call por opacidade. Dados bastam.",
  },
  {
    id: "globe",
    prompt: "Pagamento, estoque e e-mail lêem e escrevem o mesmo CURRENT_ORDER global.",
    stance: "trate" as const,
    verdict:
      "Este é o caso para agir. Acoplamento comum. Tire o globo e passe dados. Fila só se os tempos de vida forem diferentes de verdade.",
  },
] as const;
