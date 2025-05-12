import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
import path from "path";
import * as sass from 'sass';
import nunjucks from 'nunjucks';

// Determina se siamo in produzione o sviluppo
const isProd = process.env.NODE_ENV === 'production';
const outputDir = isProd ? './dist' : '.';

export default defineConfig(({ command }) => {
  // Determina se siamo in modalità build o dev
  const isBuild = command === 'build';
  
  // Configurazione dei percorsi di output in base alla modalità
  const htmlOutputBase = isBuild ? './dist' : '.';
  
  // Define custom plugin for build mode
  const buildNunjucksPlugin = () => {
    return {
      name: 'vite:build-nunjucks',
      apply: 'build',
      enforce: 'pre',
      buildStart() {
        console.log('Building Nunjucks templates before Vite build...');
        const env = nunjucks.configure('./src/html', {
          autoescape: true
        });

        // Define the pages to build
        const pages = [
          {
            templateFile: "index.njk",
            outputFile: `${htmlOutputBase}/index.html`,
            context: () => {
              const globalData = JSON.parse(
                fs.readFileSync("./src/html/data/global.json", "utf-8")
              );
              return { ...globalData.home };
            }
          },
          {
            templateFile: "moscanellammerda.njk",
            outputFile: `${htmlOutputBase}/moscanellammerda.html`,
            context: () => {
              const globalData = JSON.parse(
                fs.readFileSync("./src/html/data/global.json", "utf-8")
              );
              return { ...globalData.mnm };
            }
          }
        ];

        // Compile each page
        pages.forEach(({ templateFile, outputFile, context }) => {
          const contextData = typeof context === 'function' ? context() : context;
          try {
            const rendered = env.render(templateFile, contextData);
            const outputPath = path.resolve(outputFile);
            
            // Ensure output directory exists
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }
            
            fs.writeFileSync(outputPath, rendered);
            console.log(`[build] Compiled ${templateFile} → ${outputFile}`);
          } catch (error) {
            console.error(`Error compiling ${templateFile}:`, error);
          }
        });
      }
    };
  };

  // Fix per copiare i file HTML dalla cartella assets alla root dopo la build
  const copyHtmlFilesPlugin = () => {
    return {
      name: 'copy-html-files',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        console.log('Copiando i file HTML compilati nella directory principale...');
        
        // Trova tutti i file HTML nella cartella assets
        const assetsDir = path.resolve(`${htmlOutputBase}/assets`);
        if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir);
          const htmlFiles = files.filter(file => file.endsWith('.html'));
          
          htmlFiles.forEach(file => {
            const sourcePath = path.join(assetsDir, file);
            const fileName = file.split('-')[0] + '.html'; // Rimuovi l'hash dal nome file
            const destPath = path.resolve(`${htmlOutputBase}/${fileName}`);
            
            // Leggi il file HTML dalla cartella assets
            const content = fs.readFileSync(sourcePath, 'utf-8');
            
            // Scrivi il file nella directory principale
            fs.writeFileSync(destPath, content);
            console.log(`Copiato ${sourcePath} → ${destPath}`);
          });
        }

        // Crea o ripristina i file robots.txt e sitemap.xml
        const robotsContent = `User-agent: *
Allow: /
Sitemap: https://www.joshuarte.it/sitemap.xml`;
        fs.writeFileSync(path.resolve(`${htmlOutputBase}/robots.txt`), robotsContent);
        console.log(`Creato robots.txt`);

        // Sitemap base semplificata
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.joshuarte.it/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.joshuarte.it/moscanellammerda.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;
        fs.writeFileSync(path.resolve(`${htmlOutputBase}/sitemap.xml`), sitemapContent);
        console.log(`Creato sitemap.xml`);
      }
    };
  };
  
  return {
    // Add Nunjucks files to assetsInclude to prevent Vite from trying to process them as JS
    assetsInclude: ['**/*.njk', '**/*.html'],
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
      // Only use nunjucksPlugin during development (serve)
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
      // Add the custom build plugin for production builds
      isBuild ? buildNunjucksPlugin() : null,
      // Add plugin to copy HTML files to root after build
      isBuild ? copyHtmlFilesPlugin() : null,
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
    ].filter(Boolean), // Filter out null plugins
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: './index.html', // Reference the compiled HTML instead of the njk file
          mnm: './moscanellammerda.html',
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
