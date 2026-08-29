export type Order = { id: string; key: string | null };
export type EventRow = { id: string; orderId: string };
export type OutboxRow = { id: string; orderId: string; relayed: boolean };

export type Crash = "none" | "afterWrite" | "afterPublish";

export type LabState = {
  seq: number;
  orders: Order[];
  events: EventRow[];
  outbox: OutboxRow[];
  note: string;
};

export const EMPTY_STATE: LabState = {
  seq: 1,
  orders: [],
  events: [],
  outbox: [],
  note: "Nada ainda. Peça, reenvie, ou grave e publique.",
};

function nextId(state: LabState, prefix: string): { id: string; seq: number } {
  return { id: `${prefix}-${String(state.seq).padStart(2, "0")}`, seq: state.seq + 1 };
}

export function placeOrder(state: LabState, key: string | null): LabState {
  if (key) {
    const existing = state.orders.find((order) => order.key === key);
    if (existing) {
      return {
        ...state,
        note: `Mesma chave. Devolveu ${existing.id}. Um pedido, dois HTTP.`,
      };
    }
  }
  const { id, seq } = nextId(state, "ord");
  return {
    ...state,
    seq,
    orders: [...state.orders, { id, key }],
    note: key
      ? `Criou ${id} com chave. O próximo reenvio com a mesma chave não duplica.`
      : `Criou ${id} sem chave. Reenviar HTTP abre outro pedido.`,
  };
}

export function persistAndPublish(
  state: LabState,
  useOutbox: boolean,
  crash: Crash,
): LabState {
  const last = state.orders[state.orders.length - 1];
  if (!last) {
    return { ...state, note: "Não há pedido para publicar. Faça um PlaceOrder antes." };
  }
  if (state.events.some((row) => row.orderId === last.id) || state.outbox.some((row) => row.orderId === last.id)) {
    return { ...state, note: `${last.id} já tem rastro de publicação. Relaye ou resete.` };
  }

  if (useOutbox) {
    if (crash === "afterPublish") {
      return {
        ...state,
        note: "Com outbox não existe “publicar antes do commit”. O evento só sai no relay depois da linha gravada.",
      };
    }
    const { id, seq } = nextId(state, "obx");
    const outbox: OutboxRow[] = [...state.outbox, { id, orderId: last.id, relayed: false }];
    if (crash === "afterWrite") {
      return {
        ...state,
        seq,
        outbox,
        note: `Commit de ${last.id} + outbox ${id}. Crash antes do relay. Pedido existe; evento ainda não saiu — recuperável.`,
      };
    }
    return {
      ...state,
      seq,
      outbox,
      note: `Commit conjunto: ${last.id} e outbox ${id}. Clique Relay para entregar o evento.`,
    };
  }

  if (crash === "afterWrite") {
    return {
      ...state,
      note: `Gravou ${last.id}. Crash antes do publish. Evento sumiu. Faturação nunca fica sabendo.`,
    };
  }
  if (crash === "afterPublish") {
    const { id, seq } = nextId(state, "evt");
    return {
      ...state,
      seq,
      orders: state.orders.slice(0, -1),
      events: [...state.events, { id, orderId: last.id }],
      note: `Publicou ${id} e crashou antes do commit. Evento existe, pedido não. Duas verdades.`,
    };
  }
  const { id, seq } = nextId(state, "evt");
  return {
    ...state,
    seq,
    events: [...state.events, { id, orderId: last.id }],
    note: `Dois destinos no happy path: ${last.id} e evento ${id}. O crash é que denuncia.`,
  };
}

export function relayOutbox(state: LabState): LabState {
  const pending = state.outbox.filter((row) => !row.relayed);
  if (pending.length === 0) {
    return { ...state, note: "Outbox vazia. Nada para reler." };
  }
  let seq = state.seq;
  const events = [...state.events];
  for (const row of pending) {
    const minted = nextId({ ...state, seq }, "evt");
    seq = minted.seq;
    events.push({ id: minted.id, orderId: row.orderId });
  }
  return {
    ...state,
    seq,
    events,
    outbox: state.outbox.map((row) => ({ ...row, relayed: true })),
    note: `Relay entregou ${pending.length} evento(s). Entrega pode repetir — o consumidor é que precisa da chave. Sem broker exactly-once.`,
  };
}
