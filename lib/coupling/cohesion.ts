export const COHESION_REASONS = [
  {
    id: "order",
    label: "Pedido",
    hint: "Linha, total, desconto de quantidade.",
  },
  {
    id: "pay",
    label: "Pagamento",
    hint: "Cobrar, estornar, meio de pagamento.",
  },
  {
    id: "market",
    label: "Marketing",
    hint: "Banner da home, newsletter.",
  },
  {
    id: "fiscal",
    label: "Fiscal",
    hint: "CNPJ, PDF da nota, alíquota.",
  },
] as const;

export type CohesionReasonId = (typeof COHESION_REASONS)[number]["id"];

export type CohesionMethod = {
  signature: string;
  reason: CohesionReasonId;
};

export const GOD_FILE = {
  name: "ShopService.ts",
  methods: [
    { signature: "placeOrder(sku, qty)", reason: "order" },
    { signature: "applySecondUnitDiscount(lines)", reason: "order" },
    { signature: "chargeCard(amount)", reason: "pay" },
    { signature: "refund(paymentId)", reason: "pay" },
    { signature: "sendWeeklyNewsletter()", reason: "market" },
    { signature: "updateHomeBanner(html)", reason: "market" },
    { signature: "formatCnpj(value)", reason: "fiscal" },
    { signature: "renderFiscalPdf(order)", reason: "fiscal" },
  ] satisfies CohesionMethod[],
};

export const SPLIT_FILES: { name: string; reason: CohesionReasonId; methods: CohesionMethod[] }[] =
  [
    {
      name: "Cart.ts",
      reason: "order",
      methods: GOD_FILE.methods.filter((item) => item.reason === "order"),
    },
    {
      name: "Payment.ts",
      reason: "pay",
      methods: GOD_FILE.methods.filter((item) => item.reason === "pay"),
    },
    {
      name: "Marketing.ts",
      reason: "market",
      methods: GOD_FILE.methods.filter((item) => item.reason === "market"),
    },
    {
      name: "Fiscal.ts",
      reason: "fiscal",
      methods: GOD_FILE.methods.filter((item) => item.reason === "fiscal"),
    },
  ];
