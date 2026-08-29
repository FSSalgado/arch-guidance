# Arch-guidance

Guia interativo de arquitetura de software. Não é um blog: cada assunto é uma página com problema, modelo clicável, laboratório ao vivo e o momento de **usar** e de **recusar** o padrão.

Interface em português. Código em inglês.

**Site:** [https://arch-guidance.vercel.app](https://arch-guidance.vercel.app)

## O que estudar

Não há trilha obrigatória. Abra o módulo que estiver doendo agora.

| | Módulo | Página |
| --- | --- | --- |
| FIG. 01 | Arquitetura hexagonal | [/hexagonal](https://arch-guidance.vercel.app/hexagonal) |
| FIG. 02 | Acoplamento e coesão | [/acoplamento](https://arch-guidance.vercel.app/acoplamento) |
| FIG. 03 | Atributos de qualidade | [/atributos](https://arch-guidance.vercel.app/atributos) |
| FIG. 04 | ADR | [/adr](https://arch-guidance.vercel.app/adr) |
| FIG. 05 | C4 | [/c4](https://arch-guidance.vercel.app/c4) |
| FIG. 06 | Integração | [/integracao](https://arch-guidance.vercel.app/integracao) |
| FIG. 07 | Resiliência | [/resiliencia](https://arch-guidance.vercel.app/resiliencia) |
| FIG. 08 | Idempotência e outbox | [/idempotencia](https://arch-guidance.vercel.app/idempotencia) |

Os laboratórios (pedido, PSP, fila, CLI) são simulações no navegador. Não há login, banco real nem chamada a serviços externos.

## Rodar localmente

Requisitos: Node.js e npm (já usados neste repositório).

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Build de produção:

```bash
npm run build
npm start
```

## Licença

[MIT](LICENSE).
