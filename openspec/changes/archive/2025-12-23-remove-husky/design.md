# Design: Remove Husky

## Strategy
Simply revert the additions made for git hooks. Enforcement moves from "pre-commit" (local) to "on-push" (remote CI).

## Trade-offs
- **Pros**: Easier for contributors on Windows; faster local commits.
- **Cons**: Bad code can be committed (but will be caught by CI).
