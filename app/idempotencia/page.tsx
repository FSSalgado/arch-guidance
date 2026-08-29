import type { Metadata } from "next";
import { Hero } from "@/components/idempotency/Hero";
import { IdempotencyLab } from "@/components/idempotency/IdempotencyLab";
import { IdempotencyModel } from "@/components/idempotency/IdempotencyModel";
import { RefuseCases } from "@/components/idempotency/RefuseCases";
import { SiteNav } from "@/components/idempotency/SiteNav";
import { WhenToUse } from "@/components/idempotency/WhenToUse";

export const metadata: Metadata = {
  title: "Idempotência e outbox",
  description:
    "Página interativa: PlaceOrder com reenvio HTTP, chave de idempotência, dual write vs outbox e relay simulado.",
};

export default function IdempotencyPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <IdempotencyModel />
        <IdempotencyLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · idempotência · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
