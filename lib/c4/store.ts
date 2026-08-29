import type { C4LevelId } from "@/lib/c4/levels";

export type NodeKind = "person" | "system" | "external" | "container" | "component" | "code";

export type DiagramNode = {
  id: string;
  kind: NodeKind;
  name: string;
  summary: string;
  zoomTo?: C4LevelId;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label: string;
};

export type ZoomView = {
  id: C4LevelId;
  title: string;
  focus: string;
  lead: string;
  hint: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export const ZOOM_VIEWS: Record<C4LevelId, ZoomView> = {
  context: {
    id: "context",
    title: "Contexto",
    focus: "Loja Norte no mundo",
    lead: "Pessoas e sistemas. A Loja Norte é a caixa nossa. Clique nela para descer.",
    hint: "Clique a Loja Norte para os containers.",
    nodes: [
      {
        id: "customer",
        kind: "person",
        name: "Cliente",
        summary: "Pessoa que compra. Não é um container.",
      },
      {
        id: "store",
        kind: "system",
        name: "Loja Norte",
        summary: "O sistema que estamos descrevendo. Um retângulo. Ainda sem pastas.",
        zoomTo: "container",
      },
      {
        id: "psp",
        kind: "external",
        name: "PSP",
        summary: "Cobra o cartão. Sistema de outro. Não abrimos o miolo.",
      },
      {
        id: "shipper",
        kind: "external",
        name: "Transportadora",
        summary: "Leva a caixa. Outro sistema. Fora do nosso deploy.",
      },
    ],
    edges: [
      { from: "customer", to: "store", label: "faz pedido" },
      { from: "store", to: "psp", label: "cobra" },
      { from: "store", to: "shipper", label: "despacha" },
    ],
  },
  container: {
    id: "container",
    title: "Containers",
    focus: "Dentro da Loja Norte",
    lead: "O que pode subir sozinho: site, API, worker, banco. Clique a API para o miolo.",
    hint: "Clique a API da loja para os componentes. As outras caixas param neste zoom.",
    nodes: [
      {
        id: "web",
        kind: "container",
        name: "Vitrine",
        summary: "Site no browser. Não fala com o PSP direto.",
      },
      {
        id: "api",
        kind: "container",
        name: "API da loja",
        summary: "Onde o pedido acontece. Um processo. Clique para descer.",
        zoomTo: "component",
      },
      {
        id: "worker",
        kind: "container",
        name: "Worker de envio",
        summary: "Despacha para a transportadora depois do pagamento.",
      },
      {
        id: "db",
        kind: "container",
        name: "Banco da loja",
        summary: "Pedidos e catálogo. Store, não classe.",
      },
    ],
    edges: [
      { from: "web", to: "api", label: "HTTPS" },
      { from: "api", to: "db", label: "lê/grava" },
      { from: "api", to: "worker", label: "pedido pago" },
    ],
  },
  component: {
    id: "component",
    title: "Componentes",
    focus: "Dentro da API da loja",
    lead: "Peças grandes de um container. Clique o Checkout só para ver por que o nível 4 quase não se desenha.",
    hint: "Clique Checkout para o nível código — e o recado de não desenhar.",
    nodes: [
      {
        id: "checkout",
        kind: "component",
        name: "Checkout",
        summary: "Fecha o pedido. Uma razão de mudança. Clique para o corte.",
        zoomTo: "code",
      },
      {
        id: "catalog",
        kind: "component",
        name: "Catálogo",
        summary: "Preço e disponibilidade para o checkout ler.",
      },
      {
        id: "charge",
        kind: "component",
        name: "Cobrança",
        summary: "Fala com o PSP. O resto da API não precisa conhecer o provedor.",
      },
      {
        id: "orders",
        kind: "component",
        name: "Pedidos",
        summary: "Persistência do agregado. Não é o banco inteiro no diagrama de componente.",
      },
    ],
    edges: [
      { from: "checkout", to: "catalog", label: "preço" },
      { from: "checkout", to: "charge", label: "cobra" },
      { from: "checkout", to: "orders", label: "grava" },
    ],
  },
  code: {
    id: "code",
    title: "Código",
    focus: "Dentro do Checkout",
    lead: "Geralmente nem desenha. O IDE já tem a árvore. Este zoom existe para você recusá-lo no mural.",
    hint: "Suba. Arquitetura para no componente.",
    nodes: [
      {
        id: "handler",
        kind: "code",
        name: "CheckoutHandler",
        summary: "Classe. O repositório mostra. O mural não precisa.",
      },
      {
        id: "line",
        kind: "code",
        name: "OrderLine",
        summary: "Classe. Mudou o campo? Diff. Não é C4.",
      },
      {
        id: "guard",
        kind: "code",
        name: "StockGuard",
        summary: "Classe. Se precisa disto no slide, o zoom errou.",
      },
    ],
    edges: [
      { from: "handler", to: "line", label: "monta" },
      { from: "handler", to: "guard", label: "reserva" },
    ],
  },
};

export type MixedNode = {
  id: string;
  name: string;
  tag: string;
};

export const MIXED_NODES: MixedNode[] = [
  { id: "m-person", name: "Cliente", tag: "pessoa" },
  { id: "m-helm", name: "chart/api.yaml", tag: "deploy" },
  { id: "m-class", name: "CheckoutHandler", tag: "classe" },
  { id: "m-pod", name: "api-7f3", tag: "pod" },
  { id: "m-psp", name: "PSP", tag: "sistema" },
  { id: "m-redis", name: "Redis", tag: "store" },
];

export const BREADCRUMB: { id: C4LevelId; label: string }[] = [
  { id: "context", label: "Contexto" },
  { id: "container", label: "Loja Norte" },
  { id: "component", label: "API da loja" },
  { id: "code", label: "Checkout" },
];
