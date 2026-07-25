# Proposal: Remove Husky and Lint-Staged

## Goal
Remove local git hooks (`husky` and `lint-staged`) and rely on CI/CD for code quality enforcement.

## Why
- **Windows Friction**: Avoiding execution policy issues and flakiness on Windows environments.
- **Legacy Migration**: Prioritizing smooth migration without blocking commits for existing style issues.
- **CI Enforcement**: GitHub Actions (`ci.yml`) is already configured to run linting and testing, providing a centralized and consistent enforcement mechanism to replace local hooks.

## Alternatives Considered
- **Keep Husky**: Rejected due to Windows friction.
- **Client-side hooks only**: Rejected as it defeats the purpose of shared enforcement.
- **Reliance on CI (Adopted)**: Use existing `ci.yml` to block bad code at the PR level.

## Proposed Changes
- **Dependencies**: Remove `husky` and `lint-staged` from `devDependencies`.
- **Scripts**: Remove `prepare` script (husky install).
- **Config**: Remove `lint-staged` configuration from `package.json`.
- **Files**: Delete `.husky` directory.
