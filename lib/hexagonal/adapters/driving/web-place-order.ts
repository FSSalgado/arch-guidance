import type { PlaceOrderResult } from "../../domain/place-order";
import type { PlaceOrderPort } from "../../ports/place-order-port";
import type { Tracer } from "../../trace";

export type WebPlaceOrderInput = {
  sku: string;
  quantity: string;
};

export type WebPlaceOrderResponse =
  | { status: 201; result: Extract<PlaceOrderResult, { ok: true }> }
  | { status: 400; result: Extract<PlaceOrderResult, { ok: false }> | { ok: false; error: "INVALID_INPUT" } };

export async function submitWebPlaceOrder(
  port: PlaceOrderPort,
  input: WebPlaceOrderInput,
  tracer: Tracer,
): Promise<WebPlaceOrderResponse> {
  tracer.step(
    "adapter:web",
    "POST /orders",
    JSON.stringify({ sku: input.sku, quantity: input.quantity }),
  );

  const quantity = Number.parseInt(input.quantity, 10);
  if (!input.sku.trim() || Number.isNaN(quantity)) {
    tracer.step("adapter:web", "HTTP 400", "Malformed body — stopped before the domain.");
    return { status: 400, result: { ok: false, error: "INVALID_INPUT" } };
  }

  const result = await port.execute({ sku: input.sku, quantity });

  if (result.ok) {
    tracer.step("adapter:web", "HTTP 201 Created", JSON.stringify({ id: result.order.id }));
    return { status: 201, result };
  }

  tracer.step("adapter:web", "HTTP 400", result.error);
  return { status: 400, result };
}
