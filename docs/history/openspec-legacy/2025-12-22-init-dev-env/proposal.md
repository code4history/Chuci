# Initialize Development Environment

## Goal
Establish a robust and consistent development environment for Chuci by configuring linting, formatting, testing, CI, and git hooks. This ensures code quality and developer productivity.

## Why
Issue #1 "Initialize Development Environment" requires setting up foundational tools. While basic config exists (`package.json`, `tsconfig.json`), gaps remain (Husky, EditorConfig, VSCode settings) and existing configs need formalization via OpenSpec to prevent regression.

## What Changes
- **Git Hooks**: Install and configure Husky and lint-staged to run checks on commit.
- **Editor Config**: Add `.editorconfig` for cross-editor consistency.
- **VSCode**: Add `.vscode/extensions.json` and `.vscode/settings.json` for VSCode users.
- **Formalization**: Define OpenSpec requirements for existing Linting (ESLint), Formatting (Prettier), and Testing (Vitest) setups.
