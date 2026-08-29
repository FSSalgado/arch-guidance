export const REFUSE_CASES = [
  {
    id: "no-timeout",
    prompt: "Checkout espera o PSP sem deadline. “Se ele voltar, a gente responde.”",
    stance: "recuse" as const,
    verdict:
      "Recuse o hang. Sem timeout a loja é o PSP. O clique não tem o direito de herdar o cadáver.",
  },
  {
    id: "retry-charge",
    prompt:
      "Timeout de 200 ms no charge. Três retries. Ninguém falou em chave de idempotência. O PSP às vezes cobra depois do timeout.",
    stance: "recuse" as const,
    verdict:
      "Recuse esse retry. O efeito já pode ter acontecido. Timeout + POST sem chave é duas cobranças. Idempotência é o próximo módulo, não um detalhe.",
  },
  {
    id: "no-breaker",
    prompt: "PSP fora há dois minutos. Os 40 workers da loja ainda encostam, cada um com 3 retries.",
    stance: "recuse" as const,
    verdict:
      "Recuse continuar batendo. Abra o circuito. Isolar é falhar rápido — não é mesh, não é chaos da plataforma.",
  },
  {
    id: "mesh",
    prompt: "“Vamos de Istio que a resiliência vem de graça.” Ninguém configurou timeout no cliente.",
    stance: "recuse" as const,
    verdict:
      "Recuse o mesh como substituto. Timeout, retry e breaker são política do caller. Plataforma não pensa o POST do cartão.",
  },
  {
    id: "fail-fast",
    prompt: "PSP lento. A proposta é timeout curto, breaker depois de três falhas, e não fingir que o checkout passou.",
    stance: "trate" as const,
    verdict:
      "Trate. Isolar a cascata. Retry só o que for seguro; cobrança espera chave. Bulkhead/hedge podem ser nota — não são esta página.",
  },
] as const;
