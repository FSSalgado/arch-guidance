export const REFUSE_CASES = [
  {
    id: "shared-faster",
    prompt:
      "Loja e faturação em times diferentes. A proposta é a mesma tabela invoices “porque é mais rápido que API”.",
    stance: "recuse" as const,
    verdict:
      "Recuse o schema comum. No dia 1 é INSERT. No dia 30 é ALTER sem dono. Dois times, um banco, não é integração — é casamento.",
  },
  {
    id: "file-now",
    prompt: "O cliente espera a nota no mesmo clique. O time manda CSV para a pasta da faturação “como sempre foi”.",
    stance: "recuse" as const,
    verdict:
      "Recuse o lote neste segundo. Arquivo é relógio diferente. Se a nota entra na resposta HTTP, o estilo é outro.",
  },
  {
    id: "rpc-report",
    prompt: "Relatório fiscal de madrugada. Alguém encosta um GET síncrono na API da loja a cada linha.",
    stance: "recuse" as const,
    verdict:
      "Recuse RPC para o batch. O relatório pode esperar. Arquivo (ou mensagem) é o estilo honesto.",
  },
  {
    id: "queue-same-tx",
    prompt: "Duas funções, mesmo processo, mesma transação. Fila no meio “para integrar como os grandes”.",
    stance: "recuse" as const,
    verdict:
      "Recuse a mensagem aqui. Tempo de vida único. Fila troca um call por opacidade. Não é o quarto estilo — é teatro.",
  },
  {
    id: "night-file",
    prompt: "Contabilidade de outro CNPJ precisa do movimento do dia, de manhã. Ninguém precisa disso no checkout.",
    stance: "trate" as const,
    verdict:
      "Trate com arquivo. Lote, layout versionado, horário combinado. Não invente broker para um CSV que já era o contrato.",
  },
] as const;
