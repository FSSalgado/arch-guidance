export type TraceLayer =
  | "adapter:web"
  | "adapter:cli"
  | "application"
  | "domain"
  | "port:clock"
  | "adapter:clock"
  | "port:repository"
  | "adapter:memory"
  | "adapter:postgres"
  | "port:notifier"
  | "adapter:email";

export type TraceEvent = {
  id: string;
  at: number;
  layer: TraceLayer;
  message: string;
  detail?: string;
};

export class Tracer {
  readonly events: TraceEvent[] = [];
  private readonly listeners = new Set<() => void>();

  step(layer: TraceLayer, message: string, detail?: string) {
    this.events.push({
      id: crypto.randomUUID(),
      at: Date.now(),
      layer,
      message,
      detail,
    });
    this.emit();
  }

  clear() {
    this.events.length = 0;
    this.emit();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}
