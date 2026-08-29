import type { Metadata } from "next";
import { Comparison } from "@/components/hex/Comparison";
import { DependencyRule } from "@/components/hex/DependencyRule";
import { FolderTour } from "@/components/hex/FolderTour";
import { Hero } from "@/components/hex/Hero";
import { HexDiagram } from "@/components/hex/HexDiagram";
import { HttpFlow } from "@/components/hex/HttpFlow";
import { LiveLab } from "@/components/hex/LiveLab";
import { SiteNav } from "@/components/hex/SiteNav";
import { WhenToUse } from "@/components/hex/WhenToUse";

export const metadata: Metadata = {
  title: {
    absolute: "Arquitetura Hexagonal — Ports & Adapters",
  },
  description:
    "Página interativa para estudar arquitetura hexagonal: diagrama, regra de dependência, fluxo HTTP e laboratório PlaceOrder.",
};

export default function HexagonalPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <HexDiagram />
        <DependencyRule />
        <HttpFlow />
        <LiveLab />
        <FolderTour />
        <Comparison />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · hexagonal · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
