import { PlaceOrderService } from "./application/place-order-service";
import { InMemoryOrderRepository } from "./adapters/driven/in-memory-order-repository";
import { LogNotifier } from "./adapters/driven/log-notifier";
import { SimulatedPostgresOrderRepository } from "./adapters/driven/simulated-postgres-order-repository";
import { SystemClock } from "./adapters/driven/system-clock";
import type { OrderRepository } from "./ports/order-repository";
import type { PlaceOrderPort } from "./ports/place-order-port";
import type { Tracer } from "./trace";

export type OutboundStore = "memory" | "postgres";

const memoryRepo = new InMemoryOrderRepository();
const postgresRepo = new SimulatedPostgresOrderRepository();

export function getRepository(store: OutboundStore): OrderRepository {
  return store === "memory" ? memoryRepo : postgresRepo;
}

export function composePlaceOrder(
  store: OutboundStore,
  tracer: Tracer,
): PlaceOrderPort {
  const repo = getRepository(store);
  if (repo instanceof InMemoryOrderRepository || repo instanceof SimulatedPostgresOrderRepository) {
    repo.bindTracer(tracer);
  }

  return new PlaceOrderService(
    repo,
    new SystemClock(tracer),
    new LogNotifier(tracer),
    tracer,
  );
}
