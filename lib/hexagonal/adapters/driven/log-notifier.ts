import type { Order } from "../../domain/order";
import type { OrderNotifier } from "../../ports/order-notifier";
import type { Tracer } from "../../trace";

export class LogNotifier implements OrderNotifier {
  constructor(private readonly tracer: Tracer) {}

  async orderPlaced(order: Order): Promise<void> {
    this.tracer.step(
      "adapter:email",
      `SMTP send to customer@shop.test`,
      `Subject: Order ${order.id} confirmed — ${order.quantity}× ${order.sku}`,
    );
  }
}
