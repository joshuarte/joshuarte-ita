import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
const globalData = JSON.parse(
  fs.readFileSync("./src/html/data/global.json", "utf-8")
);

export default defineConfig({
  plugins: [
    nunjucksPlugin({
      templatesDir: "./src/html",
      outputFile: "./index.html",
      context: {
        ...globalData,
      },
    }),
  ],
});
