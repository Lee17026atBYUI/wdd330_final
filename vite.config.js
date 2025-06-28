import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        compare: resolve(__dirname, "src/compare/index.html"),
        settings: resolve(__dirname, "src/settings/index.html"),
        item: resolve(__dirname, "src/item/index.html"),
      },
    },
  },
});
