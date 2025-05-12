import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
import path from "path";
import * as sass from 'sass';

const globalData = JSON.parse(
  fs.readFileSync("./src/html/data/global.json", "utf-8")
);

export default defineConfig({
  plugins: [
    {
      name: 'critical-styles',
      enforce: 'post',
      buildStart() {
        // Funzione per aggiornare il template
        const updateTemplate = () => {
          try {
            const criticalPath = path.resolve('src/stylesheets/critical.scss');
            const result = sass.compile(criticalPath);
            const template = `<style>\n${result.css}\n</style>`;
            fs.writeFileSync('src/html/shared/critical-styles.njk', template);
            console.log('Template critical-styles.njk aggiornato con successo');
          } catch (error) {
            console.error('Errore nella compilazione SCSS:', error);
          }
        };

        // Aggiorna il template all'avvio
        updateTemplate();
      },
      handleHotUpdate({ file, server }) {
        if (file === path.resolve('src/stylesheets/critical.scss')) {
          console.log('File critical.scss modificato, aggiorno il template...');
          // Aspetta che Vite abbia finito di processare il file
          setTimeout(() => {
            try {
              const criticalPath = path.resolve('src/stylesheets/critical.scss');
              const result = sass.compile(criticalPath);
              const template = `<style>\n${result.css}\n</style>`;
              fs.writeFileSync('src/html/shared/critical-styles.njk', template);
              console.log('Template critical-styles.njk aggiornato con successo');
            } catch (error) {
              console.error('Errore nella compilazione SCSS:', error);
            }
          }, 100);
        }
      },
      generateBundle(options, bundle) {
        try {
          const criticalPath = path.resolve('src/stylesheets/critical.scss');
          const result = sass.compile(criticalPath);
          const template = `<style>\n${result.css}\n</style>`;
          fs.writeFileSync('src/html/shared/critical-styles.njk', template);
        } catch (error) {
          console.error('Errore nella compilazione SCSS durante la build:', error);
        }
      }
    },
    nunjucksPlugin([
      {
        templatesDir: "./src/html",
        templateFile: "index.njk",
        outputFile: "./index.html",
        context: { ...globalData.home },
      },
      {
        templatesDir: "./src/html",
        templateFile: "moscanellammerda.njk",
        outputFile: "./moscanellammerda.html",
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
  build: {
    rollupOptions: {
      input: {
        app: 'src/stylesheets/app.scss',
        critical: 'src/stylesheets/critical.scss'
      }
    }
  },
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**']
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },
});
