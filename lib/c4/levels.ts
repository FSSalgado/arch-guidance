export type C4LevelId = "context" | "container" | "component" | "code";

export type C4Level = {
  id: C4LevelId;
  number: string;
  name: string;
  english: string;
  audience: string;
  question: string;
  summary: string;
  smell: string;
  refuse: string;
};

export const C4_LEVEL_IDS: C4LevelId[] = ["context", "container", "component", "code"];

export const C4_LEVELS: Record<C4LevelId, C4Level> = {
  context: {
    id: "context",
    number: "1",
    name: "Contexto",
    english: "System Context",
    audience: "Quem não abre o repositório",
    question: "Quem usa o sistema, e o que existe em volta?",
    summary:
      "Pessoas e sistemas. A caixa do meio é a nossa. O resto é vizinho. Sem pod, sem classe, sem pasta.",
    smell: "Cliente + Helm + OrderService\nno mesmo slide.",
    refuse: "Recuse o mapa da empresa com deploy dentro. Isso não é contexto — é três conversas.",
  },
  container: {
    id: "container",
    number: "2",
    name: "Container",
    english: "Container",
    audience: "Quem decide o que roda onde",
    question: "Quais aplicações e dados compõem o sistema?",
    summary:
      "Processos e stores que podem ser implantados à parte: site, API, worker, banco. Ainda não é o método.",
    smell: "A API explode em vinte\nbeans Spring no mesmo zoom.",
    refuse: "Recuse classe no diagrama de container. O time ainda não pediu o miolo.",
  },
  component: {
    id: "component",
    number: "3",
    name: "Componente",
    english: "Component",
    audience: "O time dono daquele container",
    question: "Quais as peças grandes dentro desta aplicação?",
    summary:
      "Limites que um time discute: checkout, catálogo, cobrança. Um container por vez. Não o sistema inteiro de novo.",
    smell: "Quarenta componentes\n“para ficar completo”.",
    refuse: "Recuse o mural de beans. Componente é o que muda por razões diferentes — não cada classe.",
  },
  code: {
    id: "code",
    number: "4",
    name: "Código",
    english: "Code",
    audience: "Quem já tem o IDE aberto",
    question: "Geralmente: nem desenha.",
    summary:
      "Classes e funções o IDE já mostra. C4 para no componente. Nível 4 existe para lembrar o corte — não para virar UML.",
    smell: "C4 = diagrama de classe\natualizado à mão.",
    refuse: "Recuse desenhar o nível 4 como arquitetura. Se precisa de classe no mural, o zoom errou.",
  },
};
