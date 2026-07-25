# Repository Guidelines

## Core Operating Principles

These principles govern how an AI coding agent should operate in this repository, regardless of which tool (Claude Code, Codex, or others) is used.

1. **Response Language Discipline**: Follow this repository's working-language convention when responding to the user (for this repository, Japanese), and keep responses polite and concise. This rule governs the language the agent uses when *talking with the user* — it is a separate axis from the language this document itself is written in (English, see "Documentation Language" below), and separate from the bilingual (English/Japanese) convention that applies to README and Wiki pages.
2. **Respect for Existing Behavior**: Do not invent your own implementation or make unsupported leaps of inference. Prioritize faithfully reproducing and porting the logic of the existing implementation — the migration source, the specification, or prior commits — over introducing a novel design.
3. **Root-Cause Analysis**: When a problem or bug occurs, do not keep patching based on guesses. Always compare against the existing implementation or specification and investigate the root cause thoroughly before applying a fix.
4. **The Human Gate Is Sovereign**: Never decide on your own that it is fine to move on to the next step without an explicit response from the user to a question or confirmation request. The agent privately concluding that something is fine is not a substitute for the user confirming it — the user must obtain that assurance for themselves. Whether to proceed to the next step is always the user's exclusive prerogative. Proceeding without a response usurps that prerogative and must be treated as the equivalent of a coup — a grave violation, never a minor process slip.

### Documentation Language

This document (`AGENTS.md`) itself is written in English, independent of principle 1 above.

## Operational Rules & History

- Repository-specific operating rules for AI coding agents are recorded under `docs/superpowers/rules/`.
- A translated index of this repository's pre-2026 development history (proposals and records originally written in the OpenSpec workflow) is available at `docs/history/openspec-legacy-index.md`, with original documents preserved under `docs/history/openspec-legacy/`.

## Project Structure & Module Organization

Web component logic lives in `src/` (`index.ts`, `components/`, `utils/`, `types/`). Vitest unit tests live in `tests/` (`components.test.ts`, `z_index.test.ts`, `setup.ts`). `public/` hosts static demo assets. `CHANGELOG.md` tracks released versions; do not edit generated `dist/` artifacts directly.

## Build, Test, and Development Commands

`pnpm dev` starts the Vite dev server. `pnpm build` runs `pnpm typecheck` then a production bundle (`BUILD_MODE=package vite build`); `pnpm build:demo` builds the demo site. `pnpm typecheck` runs `tsc --noEmit`. `pnpm test` (`vitest run`) and `pnpm test:watch` run the unit suite; `pnpm coverage` adds V8 coverage. `pnpm lint` (`eslint src tests`) and `pnpm lint:fix` (autofix) are the pre-flight checks.

## Coding Style & Naming Conventions

TypeScript with `strict: true` in `tsconfig.json` and the `@/*` path alias mapped to `src/*`. ESLint is configured via `eslint.config.mjs` (`@typescript-eslint` rules); Prettier formatting is enforced via `.prettierrc`, and `.editorconfig` fixes indentation/line-ending defaults across editors. Run `pnpm lint:fix` before committing.

## Testing Guidelines

Vitest is the test runner (`pnpm test`). Tests live in `tests/` and mirror component/behavior areas (`components.test.ts`, `z_index.test.ts`); `setup.ts` configures the DOM test environment for the Lit web components.

## Commit & Pull Request Guidelines

Recent `git log` shows a mix of terse subject-only commits, `docs:`-prefixed messages, and task-ID-prefixed messages (e.g. `m15-t1:`, `c2-m4-t3:`) tied to this project's internal task tracking. Keep commits scoped to one concern; when a message is not part of a tracked task, prefer a Conventional Commits prefix. Pull requests should describe the component behavior affected, note any `CHANGELOG.md` update, and confirm lint, typecheck, and tests pass locally before requesting review.

## Release & Configuration Tips

`pnpm prepublishOnly` runs typecheck and build together as the release gate. Update `CHANGELOG.md` alongside version bumps in `package.json`. Keep secrets out of the repository.
