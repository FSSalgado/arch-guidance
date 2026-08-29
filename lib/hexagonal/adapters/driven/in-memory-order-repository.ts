import type { Order } from "../../domain/order";
import type { OrderRepository } from "../../ports/order-repository";
import type { Tracer } from "../../trace";

export class InMemoryOrderRepository implements OrderRepository {
  private readonly rows: Order[] = [];
  private tracer: Tracer | null = null;

  bindTracer(tracer: Tracer) {
    this.tracer = tracer;
  }

  async save(order: Order): Promise<void> {
    this.rows.push(order);
    this.tracer?.step(
      "adapter:memory",
      "Map.set(order.id, order)",
      `${this.rows.length} order(s) in process memory. Lost on refresh.`,
    );
  }

  async list(): Promise<Order[]> {
    return [...this.rows];
  }
}
