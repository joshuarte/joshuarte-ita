import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";

export default defineConfig({
  plugins: [
    nunjucksPlugin({
      templatesDir: "./src/html",
      outputFile: "./index.html",
      context: {
        title: "Il mio progetto con Nunjucks",
        // puoi aggiungere altre variabili dinamiche qui
      },
    }),
  ],
});
