export type Product = {
  sku: string;
  name: string;
  unitPriceCents: number;
};

export const CATALOG: readonly Product[] = [
  { sku: "WIDGET", name: "Widget", unitPriceCents: 2900 },
  { sku: "GADGET", name: "Gadget", unitPriceCents: 7900 },
  { sku: "DOOHICKEY", name: "Doohickey", unitPriceCents: 1500 },
];

export const MAX_UNITS_PER_ORDER = 10;
export const MIN_ORDER_TOTAL_CENTS = 2000;

export function findProduct(sku: string): Product | undefined {
  const normalized = sku.trim().toUpperCase();
  return CATALOG.find((product) => product.sku === normalized);
}
