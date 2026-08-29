import type { Order } from "../../domain/order";
import type { OrderRepository } from "../../ports/order-repository";
import type { Tracer } from "../../trace";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class SimulatedPostgresOrderRepository implements OrderRepository {
  private readonly rows: Order[] = [];
  private tracer: Tracer | null = null;

  bindTracer(tracer: Tracer) {
    this.tracer = tracer;
  }

  async save(order: Order): Promise<void> {
    const sql = `INSERT INTO orders (id, sku, quantity, total_cents, created_at)
VALUES ('${order.id}', '${order.sku}', ${order.quantity}, ${order.totalCents}, TIMESTAMPTZ '${order.createdAt}')
RETURNING id;`;

    this.tracer?.step(
      "adapter:postgres",
      "Simulated round-trip (~280ms)",
      sql,
    );

    await sleep(280);
    this.rows.push(order);
  }

  async list(): Promise<Order[]> {
    return [...this.rows];
  }
}
