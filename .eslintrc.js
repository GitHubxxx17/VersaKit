// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true, // 在浏览器环境中使用
    es2021: true, // 使用 ES2021 语法
  },
  extends: [
    "eslint:recommended", // 使用 eslint 推荐的规则
    "plugin:react/recommended", // 使用 react 推荐的规则
    "plugin:@typescript-eslint/recommended", // 使用 @typescript-eslint 推荐的规则
  ],
  overrides: [], // 不覆盖任何其他配置
  parser: "@typescript-eslint/parser", // 使用 @typescript-eslint 解析器
  parserOptions: {
    ecmaVersion: "latest", // 使用最新的 ECMAScript 版本
    sourceType: "module", // 使用 ECMAScript 模块
  },
  plugins: [
    "react", // 启用 react 插件
    "@typescript-eslint", // 启用 @typescript-eslint 插件
    "unused-imports", // 启用 unused-imports 插件
    "simple-import-sort", // 启用 simple-import-sort 插件
  ],
  rules: {
    "no-unused-vars": "off", // 禁用原生的 no-unused-vars 规则
    // 或者 "@typescript-eslint/no-unused-vars": "off", // 禁用 @typescript-eslint 的 no-unused-vars 规则
    "unused-imports/no-unused-imports": "warn", // 警告未使用的导入
    "unused-imports/no-unused-vars": [
      // 警告未使用的变量和参数
      "warn",
      {
        vars: "all", // 警告所有未使用的变量
        varsIgnorePattern: "^_", // 忽略以 "_" 开头的变量
        args: "after-used", // 只警告在使用后未使用的参数
        argsIgnorePattern: "^_", // 忽略以 "_" 开头的参数
      },
    ],
    "simple-import-sort/imports": "warn", // 警告未排序的导入
    "simple-import-sort/exports": "warn", // 警告未排序的导出
    "react/react-in-jsx-scope": "off", // 关闭在 JSX 中引入 React 的警告
    "react/prop-types": "off", // 关闭 prop-types 的警告
  },
};
