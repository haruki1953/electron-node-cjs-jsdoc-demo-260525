// eslint.config.js
import js from "@eslint/js";
import pluginNode from "eslint-plugin-node";
import pluginJsdoc from "eslint-plugin-jsdoc";

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script", // ⭐ 这里指定 CJS
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      node: pluginNode,
      jsdoc: pluginJsdoc,
    },
    rules: {
      // 官方推荐 JS 规则
      ...js.configs.recommended.rules,
      // Node 环境规则
      ...pluginNode.configs.recommended.rules,
      // JSDoc 规则
      ...pluginJsdoc.configs.recommended.rules,

      // 允许 Electron 主进程用 CJS 语法
      "node/no-unsupported-features/es-syntax": "off",

      // 你可以按自己习惯调 JSDoc 严格度
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "off",

        // Standard 风格核心部分
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        // 'comma-dangle': ['error', 'always-multiline'],
        // 'space-before-function-paren': ['error', 'always'],
        // 'no-unused-vars': 'warn',
        'no-console': 'warn',
        // 'no-debugger': 'error',
        // 更严格的ESLint
        // 强制使用 ===，但允许 == null（这是一个约定俗成的例外）
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        // 不允许使用隐式类型转换，比如 !!foo、+foo
        'no-implicit-coercion': 'error',
    },
  },

  {
    ignores: [
      "dist/",
      "out/",
      "node_modules/",
    ],
  },
];

export default config;
