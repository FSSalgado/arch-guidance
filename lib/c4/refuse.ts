export const REFUSE_CASES = [
  {
    id: "one-slide",
    prompt:
      "Um único diagrama: o cliente, o Helm da API, o Redis e a classe CheckoutHandler. “Assim o CEO e o time veem tudo.”",
    stance: "recuse" as const,
    verdict:
      "Recuse o slide único. Empresa, deploy e classe são três zooms. No mesmo plano ninguém herda pergunta — só ruído.",
  },
  {
    id: "skip-context",
    prompt: "Onboarding do novo: o primeiro desenho é o cluster. Ninguém mostrou quem fala com o PSP.",
    stance: "recuse" as const,
    verdict:
      "Recuse começar no pod. Contexto primeiro: cliente, Loja Norte, PSP, transportadora. Deploy é o nível 2, se ainda couber.",
  },
  {
    id: "beans",
    prompt: "Diagrama de componentes com os 40 beans Spring da API “para ficar completo”.",
    stance: "recuse" as const,
    verdict:
      "Recuse o mural de beans. Componente é o que muda por razões diferentes. Quarenta caixas não é C4 — é o IDE no quadro.",
  },
  {
    id: "instead-of-adr",
    prompt: "“Não precisa de ADR: o C4 da fila já mostra que escolhemos worker.” O porquê e o que perdeu não estão em lugar nenhum.",
    stance: "recuse" as const,
    verdict:
      "Recuse C4 como substituto de ADR. Zoom mostra o quê e com quem. Não mostra o porquê nem o que foi recusado.",
  },
  {
    id: "new-hire",
    prompt: "Alguém novo pergunta: o que a Loja Norte toca no mundo? Ainda não há um contexto. Só pastas.",
    stance: "trate" as const,
    verdict:
      "Trate. Comece no nível 1. Cliente, sistema, PSP, transportadora. Desça só quando a pergunta for o que roda onde.",
  },
] as const;
