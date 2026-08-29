import type { PlaceOrderResult } from "../../domain/place-order";
import type { PlaceOrderPort } from "../../ports/place-order-port";
import type { Tracer } from "../../trace";

export type CliOutcome = {
  stdout: string;
  result?: PlaceOrderResult | { ok: false; error: "INVALID_INPUT" };
};

const HELP = `place-order <SKU> <qty>
  SKUs: WIDGET, GADGET, DOOHICKEY
  qty: integer 1–10

help
  Show this message.`;

export async function runCliPlaceOrder(
  port: PlaceOrderPort,
  line: string,
  tracer: Tracer,
): Promise<CliOutcome> {
  const raw = line.trim();
  tracer.step("adapter:cli", "stdin", raw || "(empty)");

  if (!raw || raw === "help") {
    tracer.step("adapter:cli", "stdout", "help");
    return { stdout: HELP };
  }

  const parts = raw.split(/\s+/);
  const isPlace =
    parts[0]?.toLowerCase() === "place-order" || parts[0]?.toLowerCase() === "place";
  const sku = isPlace ? parts[1] : parts[0];
  const qtyToken = isPlace ? parts[2] : parts[1];
  const quantity = Number.parseInt(qtyToken ?? "", 10);

  if (!sku || Number.isNaN(quantity)) {
    tracer.step("adapter:cli", "stderr", "usage error");
    return {
      stdout: `error: expected \`place-order <SKU> <qty>\`\n\n${HELP}`,
      result: { ok: false, error: "INVALID_INPUT" },
    };
  }

  const result = await port.execute({ sku, quantity });

  if (result.ok) {
    const stdout = `ok ${result.order.id}\n${result.order.quantity} × ${result.order.sku} → ${result.order.totalCents} cents`;
    tracer.step("adapter:cli", "stdout", stdout);
    return { stdout, result };
  }

  const stdout = `rejected ${result.error}`;
  tracer.step("adapter:cli", "stderr", stdout);
  return { stdout, result };
}
