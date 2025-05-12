import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";

const globalData = JSON.parse(
  fs.readFileSync("./src/html/data/global.json", "utf-8")
);

export default defineConfig({
  plugins: [
    nunjucksPlugin([
      {
        templatesDir: "./src/html",
        templateFile: "index.njk",
        outputFile: "./index.html", // Genera in root in dev
        context: { ...globalData.home },
      },
      {
        templatesDir: "./src/html",
        templateFile: "moscanellammerda.njk",
        outputFile: "./moscanellammerda.html", // Genera in root in dev
        context: { ...globalData.mnm },
      },
    ]),
    {
      name: "custom-route-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/moscanellammerda") {
            req.url = "/moscanellammerda.html";
          }
          next();
        });
      },
    },
  ],
});
