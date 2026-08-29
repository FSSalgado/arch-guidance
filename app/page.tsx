import { GuideNav } from "@/components/guide/GuideNav";
import { ModuleCard } from "@/components/guide/ModuleCard";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <GuideNav />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
              Guia de arquitetura
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink md:text-7xl">
              Estude até conseguir
              <span className="block text-gold">recusar</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
              Cada módulo é uma página interativa. Não há trilha obrigatória: abra o
              assunto que está doendo agora. O critério de pronto é o mesmo em todos
              — quem termina consegue recusar o padrão no caso errado.
            </p>
          </div>
        </section>
        <section className="border-t border-line py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:px-8">
            <ModuleCard
              href="/hexagonal"
              kicker="FIG. 01"
              title="Arquitetura hexagonal"
              problem="Regras de negócio acopladas a HTTP, SQL, SMTP, relógio."
              whenToStudy="Quando o núcleo precisa sobreviver a frameworks e a mais de um canal de entrada."
              tags={["estrutura"]}
            />
            <ModuleCard
              href="/acoplamento"
              kicker="FIG. 02"
              title="Acoplamento e coesão"
              problem="“Módulos” que mudam juntos, ou um arquivo que mistura três razões de mudança."
              whenToStudy="Antes de fatiar serviços, pastas ou camadas — para saber o que deve ficar junto."
              tags={["estrutura"]}
            />
            <ModuleCard
              href="/atributos"
              kicker="FIG. 03"
              title="Atributos de qualidade"
              problem="Escolher padrão sem dizer o que o sistema precisa ser."
              whenToStudy="Antes de cache, fila, réplica ou “eventual” — para nomear o que sobe e o que desce."
              tags={["decisão"]}
            />
            <ModuleCard
              href="/adr"
              kicker="FIG. 04"
              title="ADR"
              problem="Decisão só na cabeça / no Slack; ninguém sabe o porquê nem o que foi recusado."
              whenToStudy="Quando a escolha vai sobreviver ao Slack e ao time que saiu."
              tags={["decisão"]}
            />
            <ModuleCard
              href="/c4"
              kicker="FIG. 05"
              title="C4"
              problem="Um único diagrama tenta explicar empresa, deploy e classe."
              whenToStudy="Quando o slide mistura quem usa o sistema, o que sobe onde e a classe do checkout."
              tags={["estrutura"]}
            />
          </div>
        </section>
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:px-8">
          Arch-guidance · código em inglês, interface em português
        </p>
      </footer>
    </div>
  );
}
