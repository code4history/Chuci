# Design for Initialize Development Environment

## Architecture
- **Linting**: ESLint (v9) with TypeScript integration. Configured via `eslint.config.mjs`.
- **Formatting**: Prettier. Integrated with ESLint via `eslint-config-prettier`.
- **Testing**: Vitest.
- **Git Hooks**: Husky (v9) triggering `lint-staged`.
- **CI**: GitHub Actions (reusing existing `ci.yml`).

## Decisions
- **ESLint v9**: Using the new flat config (`eslint.config.mjs`) as it is the future standard.
- **PackageManager**: `pnpm` is already in use (`pnpm-lock.yaml`), so we stick with it.
- **Strictness**: Typescript `strict: true` is enabled in `tsconfig.json`. ESLint rules should align with this but allow incremental adoption if the codebase isn't fully compliant yet (currently using `@typescript-eslint/recommended`).
