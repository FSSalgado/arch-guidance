# Backlog do guia de arquitetura

Histórico para chats de agent. Módulos **independentes**: não precisam se referenciar. Um cartão no índice + uma página interativa cada.

Última decisão de produto (2026-08-29): desenvolver a **primeira leva** com o tempo. Não começar a segunda/terceira leva sem pedido explícito.

**Próximo `a fazer`:** [4. ADR (Architecture Decision Records)](#4-adr-architecture-decision-records--a-fazer) — rota sugerida `/adr`. Só pule se o usuário pedir outro da primeira leva.

## Como um módulo fica “pronto”

Página única, interativa (não artigo). Obrigatório:

1. Problema visível (hero / definição)
2. Diagrama ou modelo clicável
3. Fluxo passo a passo **ou** laboratório ao vivo
4. Quando usar **e quando não usar**

Opcional, se ensinar: tour de pastas/código, comparação curta com vizinhos (sem virar outro módulo).

Critério de aceite pedagógico: quem termina a página consegue **recusar** o padrão no caso errado, não só recitar o nome.

## Restrições do produto (vale para qualquer módulo)

- Stack existente: Next.js, TypeScript, Tailwind. Dev server local. Sem login, sem banco real, sem Docker, sem Postgres de verdade.
- Código em inglês, UI em português.
- CLI, se existir no lab, é painel na própria página.
- Não inventar módulo fora deste backlog sem o usuário pedir.
- Não reescrever páginas já `feito` para “encaixar” o próximo assunto.

## Mapa do produto (não reinventar)

| Superfície | Rota | Código | Mexer no próximo módulo? |
| --- | --- | --- | --- |
| Índice | `/` | `app/page.tsx`, `components/guide/*` | **Sim:** um `ModuleCard` novo. Não virar o índice em artigo. |
| Hexagonal | `/hexagonal` | `components/hex/*`, `lib/hexagonal/` | Não. |
| Acoplamento e coesão | `/acoplamento` | `components/coupling/*`, `lib/coupling/` | Não. |
| Atributos de qualidade | `/atributos` | `components/quality/*`, `lib/quality/` | Não. |

Chrome compartilhado (layout, não pedagogia): `GuideNav`, `ModuleCard`, `components/hex/Section.tsx` (wrapper de seção — ok importar).

Convenção do que já existe: **URL em português**, pastas de componente/`lib` em **inglês**. Nav do módulo: link **Índice** → `/` + âncoras da própria página. Metadata no `page.tsx` do módulo (o root layout usa `template: "%s — Arch-guidance"`).

## Primeira leva (compromisso)

Ordem sugerida de implementação (pode pular se o usuário pedir outro da lista). Status: `feito` | `a fazer`.

### 1. Arquitetura hexagonal (Ports & Adapters) — feito

- **Página:** `/hexagonal`

- **Problema:** regras de negócio acopladas a HTTP, SQL, SMTP, relógio.
- **Lab:** `PlaceOrder` com troca de adapter de entrada (web vs CLI) e de saída (memória vs Postgres simulado); domínio inalterado.
- **Não entra:** outros estilos como páginas próprias (só contraste rápido com N-camadas, Onion, Clean).

### 2. Acoplamento e coesão — feito

- **Página:** `/acoplamento`

- **Problema:** “módulos” que mudam juntos, ou um arquivo que mistura três razões de mudança.
- **Lab mínimo:** dois desenhos do mesmo sistema (alto acoplamento vs limites estáveis). Clique numa mudança de requisito e veja o que quebra. Controles: tipo de acoplamento (conteúdo, comum, controle, stamp, dados, mensagem — ou um recorte menor: conteúdo / comum / dados).
- **Não entra:** métricas de ferramenta (LCOM, instabilidade de pacote) como produto; DDD completo; hexagonal de novo.

### 3. Atributos de qualidade e trade-off — feito

- **Página:** `/atributos`
- **Problema:** escolher padrão sem dizer *o que* o sistema precisa ser.
- **Lab mínimo:** um cenário (ex.: checkout) + sliders ou prioridades (latência, disponibilidade, custo, evoluibilidade, consistência). O lab mostra táticas que sobem um atributo e rebaixam outro. Encerrar com “não existe máximo em todos”.
- **Não entra:** ISO 25010 enciclopédica; catálogo de 40 táticas SEI; cloud vendor; copiar o lab hexagonal (`PlaceOrder`) ou o lab de acoplamento.
- **Recusar (aceite):** o leitor recusa “máximo em latência *e* custo *e* consistência” no mesmo desenho — não só lista os atributos.

### 4. ADR (Architecture Decision Records) — a fazer

- **Rota sugerida:** `/adr` · tag `decisão`.
- **Problema:** decisão só na cabeça / no Slack; ninguém sabe o *porquê* nem o que foi recusado.
- **Lab mínimo:** preencher um ADR curto (contexto, opções, decisão, consequências). Duas ou três opções pré-prontas (ex.: sync vs fila para “email de pedido”). Mostrar o artefato gerado. Incluir “quando *não* gravar ADR” (decisão local, reversível, óbvia).
- **Não entra:** ferramenta de gestão de ADR no git; templates de empresa; C4 na mesma página.

### 5. C4 — a fazer

- **Rota sugerida:** `/c4` · tag `estrutura`.
- **Problema:** um único diagrama tenta explicar empresa, deploy e classe.
- **Lab mínimo:** as mesmas caixas em zoom — contexto → container → componente. Clique para descer/subir. Nível 4 (código) só como “geralmente nem desenha”. Sistema exemplo estável (ex.: loja / PlaceOrder) sem copiar o lab hexagonal.
- **Não entra:** UML completa; UML deployment; notação formal obrigatória; C4 como substituto de ADR.

### 6. Integração — quatro estilos — a fazer

- **Rota sugerida:** `/integracao` · tag `dados`.
- **Problema:** times compartilham banco “porque é mais rápido” e descobrem o custo depois.
- **Lab mínimo:** os quatro estilos clássicos lado a lado no *mesmo* par de sistemas (loja ↔ faturação, ou equivalente): arquivo, banco compartilhado, API síncrona, mensagens. Para cada um: o que acopla, falha típica, quando faz sentido.
- **Não entra:** implementação de broker; Kafka; REST vs GraphQL como guerra santa; hexagonal.

### 7. Resiliência — timeout, retry, circuit breaker — a fazer

- **Rota sugerida:** `/resiliencia` · tag `runtime`.
- **Problema:** o vizinho lenta/cai e o sistema inteiro acompanha (ou retry duplica efeito).
- **Lab mínimo:** chamar um serviço instável (simulado). Controles: timeout, retries, circuit breaker (fechado / aberto / meio-aberto). Ver fila de chamadas, latência, falhas em cascata vs isolamento. Ligar retry sem idempotência e mostrar o perigo (ponte para o módulo 8, sem implementá-lo aqui).
- **Não entra:** Istio/service mesh; chaos engineering de plataforma; bulkhead/hedge como página inteira (podem ser uma nota).

### 8. Idempotência e outbox — a fazer

- **Rota sugerida:** `/idempotencia` · tag `dados`.
- **Problema:** HTTP reenvia; processo publica evento e o commit falha (ou o contrário) — duas verdades.
- **Lab mínimo:** PlaceOrder (ou comando equivalente) com “cliente retried”. Sem idempotência: dois pedidos. Com chave de idempotência: um. Segundo passo: persistir e publicar — sem outbox (sumiu o evento *ou* publicou sem commit) vs com outbox (mesmo commit, relay simulado). Sem fila real.
- **Não entra:** inbox genérico como produto; exactly-once de broker; saga (icebox).

## Icebox — não puxar agora

Segunda leva (quando o usuário pedir): CQRS; saga; event-driven; modular monolith vs serviços; strangler fig; cache; observabilidade.

Terceira leva: event sourcing; CAP/PACELC formal; multi-tenant; BFF; threat modeling.

Fora do guia (a menos que peçam): catálogo GoF; Kubernetes/cloud como produto; três cursos Clean vs Hex vs Onion; TOGAF/ESB.

## Índice do produto

Já existe em `/`. Cartão = título, uma frase de problema, “quando estudar”, link, tag (`estrutura` | `dados` | `runtime` | `decisão`). Sem trilha obrigatória. Kickers `FIG. 01`, `FIG. 02` e `FIG. 03` já usados.

## Como o agent deve pegar o próximo

1. Ler este arquivo (mapa + item `a fazer`) e a regra em `.cursor/rules/`.
2. Só implementar o módulo que o usuário apontar (ou o **Próximo `a fazer`** no topo, se disser “segue o backlog” / “pode implementar”).
3. Entregar juntos, e só isso:
   - `app/<rota>/page.tsx` + componentes novos (não pendurar pedagogia em `components/hex` nem `components/coupling`)
   - um `ModuleCard` em `app/page.tsx`
   - os quatro obrigatórios da seção “pronto” (incluindo quando **não** usar)
4. Ao concluir: neste arquivo, `a fazer` → `feito`, linha **Página:** `/rota`, e atualizar o **Próximo `a fazer`** e a tabela do mapa.
5. Não misturar dois módulos numa página “para render”. Não devolver hexagonal para `/`.
