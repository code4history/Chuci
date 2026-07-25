# Design for Distribution and Deployment

## Architecture
- **Packaging**: Pure ESM. `package.json` `type: "module"`.
- **Output**:
    - `dist/`: Library files (`.js`, `.d.ts`). Committed to git.
    - `dist-demo/` (or similar, gitignored): Demo site build for GitHub Pages.
- **Build Tools**: Vite for both library and demo.
- **CI/CD**: GitHub Actions for Pages deployment.

## Decisions
- **Remove CJS**: Simplifies build config and `package.json`.
- **Commit Dist**: Explicit request to support git-based installation.
- **Separate Demo Build**: We need to build the "app" (index.html + src) for the demo, but only the "lib" (src/index.ts) for the package. We will likely use a separate script or vite config mode for the demo build.
