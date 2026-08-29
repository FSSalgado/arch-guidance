import type { Metadata } from "next";
import { Hero } from "@/components/resilience/Hero";
import { RefuseCases } from "@/components/resilience/RefuseCases";
import { ResilienceLab } from "@/components/resilience/ResilienceLab";
import { SiteNav } from "@/components/resilience/SiteNav";
import { TacticModel } from "@/components/resilience/TacticModel";
import { WhenToUse } from "@/components/resilience/WhenToUse";

export const metadata: Metadata = {
  title: "Resiliência — timeout, retry, circuit breaker",
  description:
    "Página interativa: oito checkouts contra um PSP instável, timeout, retries, circuit breaker, e o perigo de retry sem idempotência.",
};

export default function ResiliencePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <TacticModel />
        <ResilienceLab />
        <RefuseCases />
        <WhenToUse />
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · resiliência · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
