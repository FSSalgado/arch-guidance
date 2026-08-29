import { decidePlaceOrder } from "../domain/place-order";
import type { PlaceOrderCommand, PlaceOrderResult } from "../domain/place-order";
import type { Clock } from "../ports/clock";
import type { OrderNotifier } from "../ports/order-notifier";
import type { OrderRepository } from "../ports/order-repository";
import type { PlaceOrderPort } from "../ports/place-order-port";
import type { Tracer } from "../trace";

export class PlaceOrderService implements PlaceOrderPort {
  constructor(
    private readonly orders: OrderRepository,
    private readonly clock: Clock,
    private readonly notifier: OrderNotifier,
    private readonly tracer: Tracer,
  ) {}

  async execute(command: PlaceOrderCommand): Promise<PlaceOrderResult> {
    this.tracer.step(
      "application",
      "PlaceOrderService.execute",
      "Use case orchestrates ports. It does not know Web, CLI, memory, or Postgres.",
    );

    const now = this.clock.now();
    this.tracer.step(
      "port:clock",
      "Clock.now()",
      now.toISOString(),
    );

    const decision = decidePlaceOrder(command, now);
    this.tracer.step(
      "domain",
      "decidePlaceOrder",
      decision.ok
        ? `Accepted ${decision.order.id}`
        : `Rejected ${decision.error}`,
    );

    if (!decision.ok) {
      return decision;
    }

    await this.orders.save(decision.order);
    this.tracer.step(
      "port:repository",
      "OrderRepository.save",
      "Outbound port only. The use case never imports a database driver.",
    );

    await this.notifier.orderPlaced(decision.order);
    this.tracer.step(
      "port:notifier",
      "OrderNotifier.orderPlaced",
      `Confirmation for ${decision.order.id}`,
    );

    return decision;
  }
}
