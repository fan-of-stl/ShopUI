import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,

  // ✅ Basic TS rules (safe everywhere)
  ...tseslint.configs.recommended,

  // ✅ Type-aware ONLY for TS files
  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // React
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Async safety (important)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },

  // ✅ Node config (separate)
  {
    files: ["vite.config.ts"],

    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["./tsconfig.node.json"],
      },
    },
  },
];