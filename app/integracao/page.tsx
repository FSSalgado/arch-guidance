import type { Metadata } from "next";
import { Hero } from "@/components/integration/Hero";
import { IntegrationLab } from "@/components/integration/IntegrationLab";
import { RefuseCases } from "@/components/integration/RefuseCases";
import { SiteNav } from "@/components/integration/SiteNav";
import { StyleModel } from "@/components/integration/StyleModel";
import { WhenToUse } from "@/components/integration/WhenToUse";

export const metadata: Metadata = {
  title: "Integração — quatro estilos",
  description:
    "Página interativa: arquivo, banco compartilhado, API síncrona e mensagens no mesmo par loja ↔ faturação, e quando recusar o atalho do schema comum.",
};

export default function IntegrationPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <StyleModel />
        <IntegrationLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · integração · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
