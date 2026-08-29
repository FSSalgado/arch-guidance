import type { Metadata } from "next";
import { AdrLab } from "@/components/adr/AdrLab";
import { AnatomyModel } from "@/components/adr/AnatomyModel";
import { Hero } from "@/components/adr/Hero";
import { RefuseCases } from "@/components/adr/RefuseCases";
import { SiteNav } from "@/components/adr/SiteNav";
import { WhenToUse } from "@/components/adr/WhenToUse";

export const metadata: Metadata = {
  title: "ADR (Architecture Decision Records)",
  description:
    "Página interativa: anatomia clicável de um ADR, laboratório com sync vs fila vs fire-and-forget para o e-mail de pedido, e quando recusar gravar.",
};

export default function AdrPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <AnatomyModel />
        <AdrLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · ADR · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
