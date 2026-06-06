import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { jsdoc } from 'eslint-plugin-jsdoc'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node
    },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  tseslint.configs.recommended,
  {
    ...jsdoc({
      config: 'flat/recommended',
    }),
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
  },
  {
    ...eslintPluginUnicorn.configs.recommended,
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      // Unicorn相关完善
      // 避免unicorn因commonjs而报错
      'unicorn/prefer-module': 'off',
      // 避免unicorn不让用null
      'unicorn/no-null': 'off',
      // 避免unicorn不让if时反向条件在前
      'unicorn/no-negated-condition': 'off',
      // 避免拼写不能缩写强制检擦
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-node-protocol": "off",


      // 允许 Electron 主进程用 CJS 语法
      '@typescript-eslint/no-require-imports': 'off',

      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-param-description': 'off',

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
      // 禁止不必要的布尔转换，比如 if (!!foo)
      'no-extra-boolean-cast': 'error',
      // 禁用 alert、confirm、prompt（在生产代码中一般不建议使用）
      'no-alert': 'warn',
      // // 禁用未使用的变量（下方已启用）
      // 'no-unused-vars': [
      //   'warn',
      //   { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      // ],
      // 未使用值警告
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      // 禁止 debugger，避免调试代码遗留
      'no-debugger': 'error',
      // 禁用 with（严格模式中已废弃）
      'no-with': 'error',
      // 禁止使用 arguments.callee 和 arguments.caller（已过时）
      'no-caller': 'error',
      // 禁止将 await 写在非 async 函数中
      'no-return-await': 'error',
      // 禁止混用 tabs 和 spaces（Prettier 会处理，但冗余提示也可以启用）
      'no-mixed-spaces-and-tabs': 'error',
      // 禁止 eval（安全问题）
      'no-eval': 'error',
      // 强制函数参数有明确顺序（如默认参数不能在非默认之后）
      'default-param-last': 'error',
      // 禁止 function 声明出现在嵌套块中（避免提升问题）
      'no-inner-declarations': ['error', 'functions'],

      // 空行控制
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],

      // // 避免非布尔值被 if 或 ! 语句使用
      // // 'no-implicit-coercion': ['error', { boolean: false }], （好像不生效）
      // // '@typescript-eslint/strict-boolean-expressions': 'error',
      // '@typescript-eslint/strict-boolean-expressions': [
      //   'error',
      //   {
      //     allowNullableBoolean: false,
      //     allowString: false,
      //     allowNumber: false,
      //     allowNullableString: false,
      //     allowNullableNumber: false,
      //     allowAny: false,
      //   },
      // ],
      // // 禁止对类型不安全的值访问成员
      // '@typescript-eslint/no-unsafe-member-access': 'error',

      indent: [
        "error",
        2,
        {
          SwitchCase: 1,        // switch 内缩进
          VariableDeclarator: 1, // 多变量声明缩进
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { body: 1, parameters: 1 },
          FunctionExpression: { body: 1, parameters: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          offsetTernaryExpressions: true,
          ignoreComments: false
        }
      ]

    }
  }
])
