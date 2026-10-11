// @ts-nocheck // TypeScriptの型チェックを無効化
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier"; // 書式の規則は prettier に任せる（recommended のうち no-unexpected-multiline を off にする）

const config = [
  {
    ignores: []
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    }
  },
  
  // recommended は独立した要素に置く。同じ要素に rules を並べると recommended の rules が丸ごと上書きされ、
  // 1 つも効かなくなる（Chuci#4）。上書きしたい規則は後続の要素に書く
  js.configs.recommended,
  
  {
    files: ["**/*.{ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"]
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-undef": "off", // TS では未定義の識別子を tsc（pnpm run typecheck）が検出する。no-undef は DOM のグローバル（customElements・setTimeout 等）を知らず誤検出する（typescript-eslint の推奨）
      "no-unused-vars": "off", // @typescript-eslint/no-unused-vars（warn・_ 始まりを除外）で代替する。基点でも off だった
      "no-constant-condition": ["error", { "checkLoops": false }]
    }
  },

  prettier,

  {
    ignores: ["dist/**", "node_modules/**", "*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
        require: "readonly",
        process: "readonly",
        global: "readonly"
      }
    }
  }
];

export default config;