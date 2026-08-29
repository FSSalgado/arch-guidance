"use client";

import { useState } from "react";
import { Section } from "./Section";

const LAYERS = [
  {
    name: "Adapters",
    detail: "Web, CLI, SQL, SMTP, Date. Detalhes que mudam.",
    color: "#e0895a",
  },
  {
    name: "Portas",
    detail: "Contratos. O único idioma entre dentro e fora.",
    color: "#6fc4b4",
  },
  {
    name: "Domínio",
    detail: "Regras. Não importam nada de fora.",
    color: "#e0b35a",
  },
];

export function DependencyRule() {
  const [wrong, setWrong] = useState(false);

  return (
    <Section
      id="dependencias"
      kicker="FIG. 03 — A seta que importa"
      title="Dependências apontam para dentro"
      lead="Código de fora conhece o contrato do dentro. O dentro nunca importa o fora. Se o domínio referencia Express ou um driver de banco, o hexágono já furou."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setWrong(false)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider ${
            !wrong
              ? "bg-gold text-paper"
              : "border border-line text-ink-dim hover:text-ink"
          }`}
        >
          Regra correta
        </button>
        <button
          type="button"
          onClick={() => setWrong(true)}
          className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider ${
            wrong
              ? "bg-danger text-paper"
              : "border border-line text-ink-dim hover:text-ink"
          }`}
        >
          Antipadrão
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-0 border border-line bg-paper-2/50 px-6 py-10">
          {LAYERS.map((layer, index) => (
            <div key={layer.name} className="flex w-full max-w-sm flex-col items-center">
              <div
                className="w-full border px-4 py-3 text-center"
                style={{ borderColor: layer.color }}
              >
                <p
                  className="font-display text-lg"
                  style={{ color: layer.color }}
                >
                  {layer.name}
                </p>
                <p className="mt-1 text-xs text-ink-dim">{layer.detail}</p>
              </div>
              {index < LAYERS.length - 1 ? (
                <ArrowDown
                  label={wrong ? "importa detalhe ↓" : "conhece só o contrato ↓"}
                  ok={!wrong}
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-ink-dim">
          {wrong ? (
            <>
              <p className="text-danger">
                Aqui o domínio (ou a “camada de negócio”) importa o adapter:{" "}
                <code className="text-ink">new Pool()</code>,{" "}
                <code className="text-ink">req.body</code>,{" "}
                <code className="text-ink">Date.now()</code> espalhado na regra.
              </p>
              <p>
                Resultado: para testar “quantidade máxima é 10” você precisa de
                HTTP ou de Postgres. Trocar o banco vira refactor no miolo.
              </p>
            </>
          ) : (
            <>
              <p className="text-ink">
                Adapters de entrada chamam a porta de entrada. O caso de uso chama
                portas de saída. Quem implementa essas portas vive na borda.
              </p>
              <p>
                Inversão de dependência: o núcleo define a interface{" "}
                <code className="text-gold-2">OrderRepository</code>; o adapter
                Postgres é quem a implementa. A seta de compilação aponta para o
                centro, mesmo quando o fluxo em runtime sai para o banco.
              </p>
              <p>
                Runtime: o pedido viaja web → domínio → repositório. Compilação: o
                repositório depende da porta, a porta não depende do repositório.
              </p>
            </>
          )}
          <p className="border-l-2 border-gold/50 pl-4 text-ink">
            {wrong
              ? "Se o INSERT vive ao lado da regra de quantidade, você não tem hexágono — tem um script com camadas de nome."
              : "Se você consegue rodar decidePlaceOrder sem Next, sem SQL e sem relógio real, a seta está no sentido certo."}
          </p>
        </div>
      </div>
    </Section>
  );
}

function ArrowDown({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex flex-col items-center py-2">
      <span className={`font-mono text-[10px] uppercase tracking-wider ${ok ? "text-port" : "text-danger"}`}>
        {label}
      </span>
      <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true">
        <path
          d="M12 0v22M4 16l8 8 8-8"
          fill="none"
          stroke={ok ? "#6fc4b4" : "#e07070"}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
