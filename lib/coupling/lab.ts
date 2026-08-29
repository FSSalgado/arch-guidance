export const COUPLING_KINDS = [
  "content",
  "common",
  "control",
  "stamp",
  "data",
  "message",
] as const;

export type CouplingKind = (typeof COUPLING_KINDS)[number];

export type DrawingId = "tangled" | "stable";

export type ModuleId =
  | "god"
  | "catalog"
  | "bag"
  | "cart"
  | "payment"
  | "stock"
  | "notify"
  | "tax";

export const KIND_COPY: Record<
  CouplingKind,
  {
    name: string;
    english: string;
    rank: string;
    summary: string;
    smell: string;
    refuse: string;
  }
> = {
  content: {
    name: "Conteúdo",
    english: "Content",
    rank: "O pior",
    summary: "A altera o interior de B — campo privado, tabela do outro, mapa interno.",
    smell: "O carrinho faz catalog.internalPrices[sku] = 0 para “aplicar promo”.",
    refuse:
      "Recuse quase sempre. Se você precisa das entranhas, o limite está no lugar errado: junte os dois ou abra um contrato.",
  },
  common: {
    name: "Comum",
    english: "Common",
    rank: "Globo",
    summary: "Vários módulos lêem e escrevem o mesmo saco mutável. Quem gravou por último ganha.",
    smell: "Pagamento, estoque e e-mail compartilham CURRENT_ORDER.",
    refuse:
      "Recuse como atalho. Configuração estável pode ser comum; estado de um pedido não. Passe dados, não um globo.",
  },
  control: {
    name: "Controle",
    english: "Control",
    rank: "Flag",
    summary: "A diz a B *como* trabalhar. B não decide; executa o modo que A escolheu.",
    smell: "charge(order, { skipFraud: true, useLegacyTotal: true }).",
    refuse:
      "Recuse o flag que atravessa o limite. Se A conhece os modos internos de B, A vai mudar quando B mudar.",
  },
  stamp: {
    name: "Stamp",
    english: "Stamp",
    rank: "Registro gordo",
    summary: "A passa o objeto inteiro; B usa um campo. B fica refém da forma de A.",
    smell: "sendEmail(order) quando o aviso só precisa de email e total.",
    refuse:
      "Recuse o DTO-universo “porque já temos o objeto”. Contrato estreito. Stamp some no compile e volta no deploy.",
  },
  data: {
    name: "Dados",
    english: "Data",
    rank: "Contrato fino",
    summary: "A passa só o que B precisa. Ainda há acoplamento — o formato da conversa.",
    smell: "reserve({ sku, quantity }) — e nada mais.",
    refuse:
      "Não recuse por recusar. É o acoplamento honesto de um processo. Recuse só se A e B tiverem tempos de vida diferentes e essa chamada os amarrar.",
  },
  message: {
    name: "Mensagem",
    english: "Message",
    rank: "O mais frouxo",
    summary: "A emite um fato. B decide se escuta. A não espera o formato interno de B.",
    smell: "OrderPaid { orderId } → estoque e aviso escutam, cada um no seu tempo.",
    refuse:
      "Recuse a fila entre duas funções da mesma transação. Mensagem custa opacidade. Use quando os tempos de vida forem diferentes de verdade.",
  },
};

export type Box = {
  id: ModuleId;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Edge = {
  id: string;
  drawing: DrawingId;
  kind: CouplingKind;
  from: ModuleId;
  to: ModuleId;
  caption: string;
};

export const TANGLED_BOXES: Box[] = [
  { id: "god", label: "BalcãoGod", x: 310, y: 168, w: 180, h: 72 },
  { id: "catalog", label: "Catálogo*", x: 40, y: 36, w: 140, h: 48 },
  { id: "bag", label: "CURRENT_ORDER", x: 620, y: 36, w: 150, h: 48 },
  { id: "payment", label: "Pagamento", x: 40, y: 320, w: 140, h: 48 },
  { id: "stock", label: "Estoque", x: 330, y: 352, w: 140, h: 48 },
  { id: "notify", label: "Aviso", x: 620, y: 320, w: 140, h: 48 },
  { id: "tax", label: "Fiscal", x: 620, y: 176, w: 140, h: 48 },
];

export const STABLE_BOXES: Box[] = [
  { id: "catalog", label: "Catálogo", x: 40, y: 56, w: 150, h: 52 },
  { id: "cart", label: "Carrinho", x: 325, y: 56, w: 150, h: 52 },
  { id: "payment", label: "Pagamento", x: 610, y: 56, w: 150, h: 52 },
  { id: "tax", label: "Fiscal", x: 40, y: 300, w: 150, h: 52 },
  { id: "stock", label: "Estoque", x: 325, y: 300, w: 150, h: 52 },
  { id: "notify", label: "Aviso", x: 610, y: 300, w: 150, h: 52 },
];

export const EDGES: Edge[] = [
  {
    id: "t-content",
    drawing: "tangled",
    kind: "content",
    from: "god",
    to: "catalog",
    caption: "God escreve no mapa interno de preços do catálogo.",
  },
  {
    id: "t-common-god",
    drawing: "tangled",
    kind: "common",
    from: "god",
    to: "bag",
    caption: "God lê e grava o globo do pedido.",
  },
  {
    id: "t-common-pay",
    drawing: "tangled",
    kind: "common",
    from: "payment",
    to: "bag",
    caption: "Pagamento muta o mesmo globo.",
  },
  {
    id: "t-common-stock",
    drawing: "tangled",
    kind: "common",
    from: "stock",
    to: "bag",
    caption: "Estoque debita olhando o globo.",
  },
  {
    id: "t-common-mail",
    drawing: "tangled",
    kind: "common",
    from: "notify",
    to: "bag",
    caption: "Aviso monta o e-mail a partir do globo.",
  },
  {
    id: "t-common-tax",
    drawing: "tangled",
    kind: "common",
    from: "tax",
    to: "bag",
    caption: "Fiscal lê totais cacheados no globo.",
  },
  {
    id: "t-control",
    drawing: "tangled",
    kind: "control",
    from: "god",
    to: "payment",
    caption: "God passa flags: skipFraud, useLegacyTotal, debitNow.",
  },
  {
    id: "t-stamp",
    drawing: "tangled",
    kind: "stamp",
    from: "god",
    to: "notify",
    caption: "God empurra o pedido+cliente+carrinho+fiscal inteiros.",
  },
  {
    id: "s-data-price",
    drawing: "stable",
    kind: "data",
    from: "cart",
    to: "catalog",
    caption: "Carrinho pede preço por SKU. Catálogo não entrega o mapa interno.",
  },
  {
    id: "s-data-tax",
    drawing: "stable",
    kind: "data",
    from: "cart",
    to: "tax",
    caption: "Carrinho envia classes fiscais e valores — não o cliente inteiro.",
  },
  {
    id: "s-data-pay",
    drawing: "stable",
    kind: "data",
    from: "cart",
    to: "payment",
    caption: "Carrinho envia valor e meio. Sem flags de implementação.",
  },
  {
    id: "s-msg-stock",
    drawing: "stable",
    kind: "message",
    from: "payment",
    to: "stock",
    caption: "PaymentConfirmed { orderId } — estoque decide reservar ou debitar.",
  },
  {
    id: "s-msg-mail",
    drawing: "stable",
    kind: "message",
    from: "payment",
    to: "notify",
    caption: "OrderPaid { orderId, method } — aviso formata o texto sozinho.",
  },
];

export const KIND_COLOR: Record<CouplingKind, string> = {
  content: "#e07070",
  common: "#e0895a",
  control: "#e0b35a",
  stamp: "#8aa0d8",
  data: "#6fc4b4",
  message: "#7dbe7a",
};

export type ChangeId = "promo" | "pix" | "email" | "icms" | "reserve";

export type Ripple = { module: ModuleId; why: string };

export const CHANGES: {
  id: ChangeId;
  label: string;
  requirement: string;
  tangled: Ripple[];
  stable: Ripple[];
  punch: string;
}[] = [
  {
    id: "promo",
    label: "Promo 2ª un.",
    requirement: "10% de desconto na segunda unidade da mesma SKU.",
    tangled: [
      { module: "god", why: "A regra de preço está misturada no fluxo do balcão." },
      { module: "catalog", why: "God zera preços no mapa interno para “fazer promo”." },
      { module: "bag", why: "Total cacheado no globo fica velho; todo mundo lê o valor errado." },
      { module: "tax", why: "Fiscal recalcula em cima do globo, não da regra nova." },
      { module: "notify", why: "O e-mail imprime linhas cruas do globo, sem a promo." },
    ],
    stable: [
      { module: "cart", why: "A política de linha do carrinho é a razão desta mudança." },
    ],
    punch:
      "Se catálogo, globo, fiscal e e-mail mudam juntos para um desconto, eles não eram quatro módulos.",
  },
  {
    id: "pix",
    label: "Aceitar PIX",
    requirement: "Além do cartão, o balcão aceita PIX.",
    tangled: [
      { module: "god", why: "O switch de meios vive no god, com flags para o pagamento." },
      { module: "payment", why: "Os modos internos (legacy, skipFraud) estão no contrato com o god." },
      { module: "bag", why: "O globo tem o campo `boletoCode` — PIX não cabe sem mudar o saco." },
      { module: "notify", why: "O texto do e-mail diz “pague no cartão”, hardcoded." },
    ],
    stable: [{ module: "payment", why: "Só o módulo de pagamento conhece meios." }],
    punch: "Meio de pagamento novo não deveria reabrir o e-mail nem o formato do globo.",
  },
  {
    id: "email",
    label: "Tom do e-mail",
    requirement: "Confirmação mais curta, sem repetir o endereço fiscal.",
    tangled: [
      { module: "god", why: "A string do e-mail é montada no fluxo do pedido." },
      { module: "notify", why: "O adapter só dispara o blob que o god já formatou." },
      { module: "bag", why: "O template lê dez campos do globo, inclusive os que o aviso não usa." },
    ],
    stable: [{ module: "notify", why: "Cópia é razão de mudança do aviso, não do carrinho." }],
    punch: "Mudar um parágrafo não é mudança de checkout. Stamp e globo fingem que é.",
  },
  {
    id: "icms",
    label: "Alíquota ICMS",
    requirement: "A alíquota da categoria gadget muda.",
    tangled: [
      { module: "god", why: "O total “já com imposto” é calculado no balcão." },
      { module: "catalog", why: "Preço interno às vezes já inclui imposto — ninguém sabe." },
      { module: "bag", why: "Campos taxTotal / taxIncluded no globo." },
      { module: "tax", why: "A regra fiscal existe, mas lê o globo em vez de receber a base." },
      { module: "notify", why: "A “nota” no e-mail duplica a conta." },
    ],
    stable: [{ module: "tax", why: "Alíquota é a razão de existência do módulo fiscal." }],
    punch: "Regra fiscal espalhada é baixa coesão disfarçada de vários arquivos.",
  },
  {
    id: "reserve",
    label: "Reservar estoque",
    requirement: "Reservar na criação; debitar só com pagamento confirmado.",
    tangled: [
      { module: "god", why: "A ordem debitNow está num flag de controle para o pagamento." },
      { module: "payment", why: "Pagamento chama estoque no mesmo método, no modo que o god pediu." },
      { module: "stock", why: "Estoque só sabe debitar o globo, não reservar." },
      { module: "bag", why: "Não há estado de reserva — só quantity no saco compartilhado." },
    ],
    stable: [
      { module: "stock", why: "Reserva vs débito é política de estoque." },
    ],
    punch:
      "Trocar a ordem de duas operações não deveria exigir um flag que o checkout conhece. Mensagem (PaymentConfirmed) isola o tempo.",
  },
];

export const MODULE_BLURB: Record<DrawingId, Partial<Record<ModuleId, string>>> = {
  tangled: {
    god: "Um arquivo que orquestra preço, flag de pagamento, texto de e-mail e imposto. Três razões de mudança no mesmo sítio.",
    catalog: "Não é módulo: o mapa de preços é público. Quem quiser “promo” escreve dentro.",
    bag: "Globo mutável. Quem chega por último define o pedido. Formato novo = todos compilam de novo.",
    payment: "Recebe modos (skipFraud, debitNow). Não decide; executa o controle do god.",
    stock: "Lê o globo e debita. Não tem o conceito de reserva — isso mora num flag alheio.",
    notify: "Recebe o registro gordo ou lê o globo. Um campo novo no cliente quebra o e-mail.",
    tax: "A regra existe, mas a base vem do globo. Mudou o cache, mudou o imposto.",
  },
  stable: {
    catalog: "Responde preço por SKU. Interior fechado. Uma razão: lista e preço.",
    cart: "Linhas, totais, promo de quantidade. Pergunta preço e imposto; não manda e-mail.",
    payment: "Cobra o valor pedido. Emite PaymentConfirmed. Não conhece estoque nem copy.",
    stock: "Escuta pagamento confirmado. Reserva e débito são problema dele.",
    notify: "Escuta OrderPaid. Formata o texto. Não recebe o cliente inteiro.",
    tax: "Recebe classes e bases. Devolve imposto. Alíquota nova para aqui.",
  },
};

export function boxesFor(drawing: DrawingId): Box[] {
  return drawing === "tangled" ? TANGLED_BOXES : STABLE_BOXES;
}

export function edgesFor(drawing: DrawingId, kind?: CouplingKind | null): Edge[] {
  const list = EDGES.filter((edge) => edge.drawing === drawing);
  if (!kind) return list;
  return list.filter((edge) => edge.kind === kind);
}

export function changeById(id: ChangeId) {
  return CHANGES.find((item) => item.id === id) ?? CHANGES[0];
}

export function ripplesFor(drawing: DrawingId, changeId: ChangeId): Ripple[] {
  const change = changeById(changeId);
  return drawing === "tangled" ? change.tangled : change.stable;
}

export function centerOf(box: Box): { x: number; y: number } {
  return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
}
