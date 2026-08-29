import type { Clock } from "../../ports/clock";
import type { Tracer } from "../../trace";

export class SystemClock implements Clock {
  constructor(private readonly tracer: Tracer) {}

  now(): Date {
    const value = new Date();
    this.tracer.step(
      "adapter:clock",
      "Date.now() via SystemClock",
      value.toISOString(),
    );
    return value;
  }
}
