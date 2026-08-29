import type { Metadata } from "next";
import { ChangeLab } from "@/components/coupling/ChangeLab";
import { CohesionModel } from "@/components/coupling/CohesionModel";
import { CouplingTypes } from "@/components/coupling/CouplingTypes";
import { Hero } from "@/components/coupling/Hero";
import { RefuseCases } from "@/components/coupling/RefuseCases";
import { SiteNav } from "@/components/coupling/SiteNav";
import { WhenToUse } from "@/components/coupling/WhenToUse";

export const metadata: Metadata = {
  title: "Acoplamento e coesão",
  description:
    "Página interativa: dois desenhos do mesmo sistema, tipos de acoplamento, coesão por razão de mudança, e quando recusar a fatiadura.",
};

export default function CouplingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <CouplingTypes />
        <ChangeLab />
        <CohesionModel />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · acoplamento e coesão · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
