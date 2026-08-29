import type { Metadata } from "next";
import { AttributeModel } from "@/components/quality/AttributeModel";
import { Hero } from "@/components/quality/Hero";
import { RefuseCases } from "@/components/quality/RefuseCases";
import { SiteNav } from "@/components/quality/SiteNav";
import { TradeoffLab } from "@/components/quality/TradeoffLab";
import { WhenToUse } from "@/components/quality/WhenToUse";

export const metadata: Metadata = {
  title: "Atributos de qualidade e trade-off",
  description:
    "Página interativa: cinco eixos clicáveis, checkout com sliders de prioridade, e quando recusar máximo em latência, custo e consistência.",
};

export default function QualityPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <AttributeModel />
        <TradeoffLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · atributos de qualidade · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
