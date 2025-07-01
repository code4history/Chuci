import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const isPackageBuild = process.env.BUILD_MODE === 'package';

export default defineConfig({
  base: './',
  build: isPackageBuild ? {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'Chuci',  // UMDグローバル変数名
      fileName: (format) => {
        switch(format) {
          case 'es':
            return 'chuci.js';
          case 'cjs':
            return 'chuci.cjs';
          case 'umd':
            return 'chuci.umd.js';
          default:
            return `chuci.${format}.js`;
        }
      }
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  } : {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    dts({
      outDir: 'dist',
      exclude: ['tests', 'node_modules'],
      rollupTypes: true,
      skipDiagnostics: true,
      tsconfigPath: './tsconfig.json',
      logLevel: 'silent',
      insertTypesEntry: true,
      staticImport: true,
      copyDtsFiles: true
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version)
  }
});