import {
  findProduct,
  MAX_UNITS_PER_ORDER,
  MIN_ORDER_TOTAL_CENTS,
} from "./catalog";
import type { Order } from "./order";

export type PlaceOrderCommand = {
  sku: string;
  quantity: number;
};

export type PlaceOrderError =
  | "UNKNOWN_SKU"
  | "QUANTITY_MIN"
  | "QUANTITY_MAX"
  | "MIN_TOTAL";

export type PlaceOrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: PlaceOrderError };

export function decidePlaceOrder(
  command: PlaceOrderCommand,
  now: Date,
): PlaceOrderResult {
  const product = findProduct(command.sku);
  if (!product) {
    return { ok: false, error: "UNKNOWN_SKU" };
  }

  if (!Number.isInteger(command.quantity) || command.quantity < 1) {
    return { ok: false, error: "QUANTITY_MIN" };
  }

  if (command.quantity > MAX_UNITS_PER_ORDER) {
    return { ok: false, error: "QUANTITY_MAX" };
  }

  const totalCents = product.unitPriceCents * command.quantity;
  if (totalCents < MIN_ORDER_TOTAL_CENTS) {
    return { ok: false, error: "MIN_TOTAL" };
  }

  const stamp = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const order: Order = {
    id: `ord-${stamp}-${product.sku}`,
    sku: product.sku,
    quantity: command.quantity,
    totalCents,
    createdAt: now.toISOString(),
  };

  return { ok: true, order };
}
