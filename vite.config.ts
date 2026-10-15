import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const isPackageBuild = process.env.BUILD_MODE === 'package';

export default defineConfig({
  base: './',
  build: isPackageBuild ? {
    // nov26-m9-t6 S3: base（vite 7）の解決値を明示して保つ（t6 §3.3）
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      name: 'Chuci',  // UMDグローバル変数名
      fileName: (format) => {
        switch(format) {
          case 'es':
            return 'chuci.js';
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
        globals: {},
        inlineDynamicImports: true
      }
    },
    copyPublicDir: false
  } : {
    outDir: 'dist-demo',
    emptyOutDir: true
  },
  plugins: [
    ...(isPackageBuild ? [
      dts({
        outDir: 'dist',
        exclude: ['tests', 'node_modules'],
        bundleTypes: true,
        skipDiagnostics: true,
        tsconfigPath: './tsconfig.json',
        logLevel: 'silent',
        insertTypesEntry: true,
        staticImport: true,
        copyDtsFiles: true
      })
    ] : [])
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