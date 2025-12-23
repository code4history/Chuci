# Remove CJS and Unify Dist/Deploy

## Goal
Modernize the distribution strategy by removing CommonJS, cleaning up the distribution folder, and enabling easy deployment of the demo site to GitHub Pages.

## Why
- **CommonJS Removal**: The ecosystem is moving to ESM. Maintaining CJS adds complexity.
- **Dev Server**: Currently accessing the root URL fails, requiring explicit `index.html`, which is poor UX.
- **Dist Hygiene**: `dist` currently mixes demo files and library files. It should only contain the library.
- **GitHub Pages**: We want to showcase the demo easily.
- **Git Dist**: Committing `dist` allows installing the library directly from GitHub without npm.

## What Changes
- **Breaking**: Remove CommonJS output from build (Keep UMD and ESM).
- **Dev Server**: Configure Vite to serve `index.html` at root correctly.
- **Build**: Separate library build (`dist`) from demo build.
- **Deployment**: Add GitHub Actions workflow for static site deployment.
- **Git**: Remove `dist` from `.gitignore`.
- **Packaging**: Ensure `d.ts` is included in `dist`.
