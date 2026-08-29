import type {
  PlaceOrderCommand,
  PlaceOrderResult,
} from "../domain/place-order";

export interface PlaceOrderPort {
  execute(command: PlaceOrderCommand): Promise<PlaceOrderResult>;
}
