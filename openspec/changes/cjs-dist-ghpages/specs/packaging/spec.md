
## ADDED Requirements

### Requirement: Pure ESM and UMD Distribution
The project SHALL NOT output CommonJS (CJS) files. The distribution MUST contain ESM modules and UMD bundles (for browser compatibility), along with TypeScript declaration files (`.d.ts`).

#### Scenario: Verify Build Output
- **Given** I run `pnpm build`
- **Then** the `dist` directory should contain `.js` files using ESM syntax
- **And** it should contain `umd.js` files
- **And** it should NOT contain `.cjs` files
- **And** it should contain `.d.ts` files

### Requirement: Dist in Git
The `dist` directory MUST be committed to the git repository to allow direct installation from git.

#### Scenario: Verify Gitignore
- **Given** I inspect `.gitignore`
- **Then** `dist` or `dist/` should NOT be present

### Requirement: Clean Dist
The `dist` directory MUST NOT contain demo website files (e.g., `index.html`, `index.css` related to the demo). It SHOULD only contain library assets.

#### Scenario: Verify Dist Config
- **Given** I run `pnpm build`
- **Then** `dist/index.html` should NOT exist
