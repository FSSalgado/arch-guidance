<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Guia de arquitetura

Produto: páginas interativas para estudo (desenvolvedores/arquitetos). Não é o template Next.js genérico.

- Backlog, formato de módulo, restrições e icebox: `docs/BACKLOG.md`
- Regra persistente: `.cursor/rules/arch-guidance.mdc`
- Hexagonal (Ports & Adapters) já está em `/hexagonal`. Índice em `/`. Próximos módulos só os da primeira leva no backlog, quando o usuário pedir.
