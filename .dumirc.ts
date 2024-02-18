import { defineConfig } from "dumi";

export default defineConfig({
  base: "/VersaKit",
  publicPath: "/VersaKit/",
  outputPath: "docs-dist",
  resolve: {
    atomDirs: [{ type: "component", dir: "src/components" }],
  },
  themeConfig: {
    name: "VersaKit",
    nav: [
      { title: "介绍", link: "/guide" },
      { title: "组件", link: "/components/button" }, // components会默认自动对应到src文件夹
    ],
  },
});
