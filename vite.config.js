import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
import path from "path";
import * as sass from 'sass';

// Determina se siamo in produzione o sviluppo
const isProd = process.env.NODE_ENV === 'production';
const outputDir = isProd ? './dist' : '.';

export default defineConfig(({ command }) => {
  // Determina se siamo in modalità build o dev
  const isBuild = command === 'build';
  
  // Configurazione dei percorsi di output in base alla modalità
  const htmlOutputBase = isBuild ? './dist' : '.';
  
  return {
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
          outputFile: `${htmlOutputBase}/index.html`,
          context: () => {
            // Load fresh data each time the template is rendered
            const globalData = JSON.parse(
              fs.readFileSync("./src/html/data/global.json", "utf-8")
            );
            return { ...globalData.home };
          },
        },
        {
          templatesDir: "./src/html",
          templateFile: "moscanellammerda.njk",
          outputFile: `${htmlOutputBase}/moscanellammerda.html`,
          context: () => {
            // Load fresh data each time the template is rendered
            const globalData = JSON.parse(
              fs.readFileSync("./src/html/data/global.json", "utf-8")
            );
            return { ...globalData.mnm };
          },
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
      // Plugin per copiare i file da dist alla root o vice versa in base alla modalità
      {
        name: 'html-assets-rewrite',
        apply: 'build',
        enforce: 'post',
        closeBundle() {
          console.log('Build completata. Tutti i file sono stati generati nella cartella dist.');
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: './src/html/index.njk',
          mnm: './src/html/moscanellammerda.njk',
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
        ignored: ['**/node_modules/**', '**/dist/**']
      },
      fs: {
        strict: false,
        allow: ['..']
      }
    },
  };
});
