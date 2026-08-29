export type AdrSectionId =
  | "title"
  | "status"
  | "context"
  | "options"
  | "decision"
  | "consequences"
  | "skip";

export type AdrSection = {
  id: AdrSectionId;
  name: string;
  english: string;
  question: string;
  summary: string;
  smell: string;
  refuse: string;
};

export const ADR_SECTION_IDS: AdrSectionId[] = [
  "title",
  "status",
  "context",
  "options",
  "decision",
  "consequences",
  "skip",
];

export const ADR_SECTIONS: Record<AdrSectionId, AdrSection> = {
  title: {
    id: "title",
    name: "Título",
    english: "Title",
    question: "Qual decisão cabe numa linha?",
    summary:
      "Verbo + objeto. Quem abre o arquivo daqui a um ano precisa achar a escolha, não o número do ticket.",
    smell: "adr-042.md\n# Melhorias de arquitetura",
    refuse: "Se o título não nomeia a decisão, ainda é um desabafo — não um registro.",
  },
  status: {
    id: "status",
    name: "Status",
    english: "Status",
    question: "Esta decisão ainda vale?",
    summary:
      "Proposto, aceito, superado. O arquivo não se apaga quando a ideia muda: o próximo aponta para o anterior.",
    smell: "git rm docs/adr/003-fila.md\n# “não vale mais”",
    refuse: "Recuse apagar. Superado é o status. História some, o próximo time reabre o debate.",
  },
  context: {
    id: "context",
    name: "Contexto",
    english: "Context",
    question: "Que forças tornam a escolha inevitável agora?",
    summary:
      "Restrições de verdade: latência, um time, um provedor, um prazo. Sem isso, qualquer opção parece equivalente.",
    smell: "Precisamos ser modernos\ne “escalar o e-mail”.",
    refuse: "Contexto sem restrição é opinião. Sem força, não há decisão — há gosto.",
  },
  options: {
    id: "options",
    name: "Opções",
    english: "Options",
    question: "O que foi recusado, e por quê?",
    summary:
      "Duas ou três alternativas reais. O valor do ADR está no que perdeu, não no anúncio do vencedor.",
    smell: "Decisão: Kafka.\n(fim do arquivo)",
    refuse: "“Escolhemos X” sem o que perdeu não é ADR — é comunicado interno.",
  },
  decision: {
    id: "decision",
    name: "Decisão",
    english: "Decision",
    question: "O que vamos fazer, no presente?",
    summary:
      "Uma frase no indicativo. Não é roadmap. Não é “vamos avaliar”. É o que o próximo PR já obedece.",
    smell: "Vamos estudar fila\nquando der tempo.",
    refuse: "Se ainda é talvez, é ata de reunião. Grave quando alguém pode executar.",
  },
  consequences: {
    id: "consequences",
    name: "Consequências",
    english: "Consequences",
    question: "O que fica mais fácil — e o que fica mais difícil?",
    summary:
      "Todo ganho tem preço. Quem só lista prós está vendendo, não registrando.",
    smell: "Mais simples.\nMais rápido.\nMais barato.",
    refuse: "Decisão sem preço é slide. Se nada desce, você ainda não escolheu.",
  },
  skip: {
    id: "skip",
    name: "Não grave",
    english: "Skip",
    question: "Isto sobrevive ao PR da próxima semana sem papel?",
    summary:
      "Local, reversível, óbvio, uma pessoa. Git blame chega. ADR aqui é teatro — e ensina o time a ignorar os que importam.",
    smell: "ADR-118: rename\nPlaceOrderService",
    refuse: "Recuse gravar o óbvio. O critério é custo de reverter e quem herda — não o template cheio.",
  },
};
