import type { Metadata } from "next";
import { Hero } from "@/components/c4/Hero";
import { LevelModel } from "@/components/c4/LevelModel";
import { RefuseCases } from "@/components/c4/RefuseCases";
import { SiteNav } from "@/components/c4/SiteNav";
import { WhenToUse } from "@/components/c4/WhenToUse";
import { ZoomLab } from "@/components/c4/ZoomLab";

export const metadata: Metadata = {
  title: "C4",
  description:
    "Página interativa: quatro níveis clicáveis, a Loja Norte em zoom contexto → container → componente, e quando recusar o slide único.",
};

export default function C4Page() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <LevelModel />
        <ZoomLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · C4 · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
