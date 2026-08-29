import type { Order } from "../domain/order";

export interface OrderNotifier {
  orderPlaced(order: Order): Promise<void>;
}
