import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
import path from "path";
import * as sass from 'sass';
import nunjucks from 'nunjucks';

// Determina se siamo in produzione o sviluppo
const isProd = process.env.NODE_ENV === 'production';

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

  // Plugin per il post-processing dei file HTML durante la build
  const htmlPostProcessPlugin = () => {
    return {
      name: 'html-post-processing',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        console.log('Post-processing dei file HTML...');

        // ============ Funzioni helper ============
        // Corregge i percorsi nei file HTML
        const fixPaths = (content) => {
          content = content.replace(
            /<script type="module" src="\/src\/main.js"><\/script>/g,
            `<script type="module" src="./main.js"></script>`
          );

          content = content.replace(
            /<script type="module" src="main.js"><\/script>/g,
            `<script type="module" src="./main.js"></script>`
          );

          content = content.replace(
            /<link rel="stylesheet" href="stylesheets\/app.css" \/>/g,
            `<link rel="stylesheet" href="./stylesheets/app.css" />`
          );

          return content;
        };

        // Processa un file HTML
        const processHtmlFile = (filePath) => {
          if (!fs.existsSync(filePath)) {
            console.warn(`File non trovato: ${filePath}`);
            return false;
          }

          let content = fs.readFileSync(filePath, 'utf-8');

          // Se il file è corrotto (è un modulo JS), eliminalo
          if (content.includes('export default')) {
            fs.unlinkSync(filePath);
            console.log(`Eliminato file HTML corrotto: ${filePath}`);
            return false;
          }

          // Correggi i percorsi
          content = fixPaths(content);

          // Scrivi il file aggiornato
          fs.writeFileSync(filePath, content);
          console.log(`Aggiornato file HTML: ${filePath}`);
          return true;
        };

        // ============ Elaborazione file HTML ============
        // Processa i file HTML principali
        let indexProcessed = processHtmlFile(path.resolve(htmlOutputBase, 'index.html'));
        let mnmProcessed = processHtmlFile(path.resolve(htmlOutputBase, 'moscanellammerda.html'));

        // Processa anche i file nella cartella assets
        const assetsDir = path.resolve(htmlOutputBase, 'assets');
        if (fs.existsSync(assetsDir)) {
          const htmlFiles = fs.readdirSync(assetsDir)
            .filter(file => file.endsWith('.html'));

          htmlFiles.forEach(file => {
            const filePath = path.join(assetsDir, file);

            // Leggi il contenuto del file
            if (!fs.existsSync(filePath)) return;

            let content = fs.readFileSync(filePath, 'utf-8');
            if (content.includes('export default')) return; // Skip moduli JS

            // Estrai il nome del file senza hash
            const fileName = file.split('-')[0] + '.html';
            const destPath = path.resolve(htmlOutputBase, fileName);

            // Correggi i percorsi
            content = fixPaths(content);

            // Scrivi il file nella directory principale
            fs.writeFileSync(destPath, content);
            console.log(`Copiato e corretto ${filePath} → ${destPath}`);

            // Aggiorna lo stato di elaborazione
            if (fileName === 'index.html') indexProcessed = true;
            if (fileName === 'moscanellammerda.html') mnmProcessed = true;
          });
        }

        // ============ Creazione file ausiliari ============
        // Crea robots.txt e sitemap.xml
        const robotsContent = `User-agent: *
        Allow: /
        Sitemap: https://www.joshuarte.it/sitemap.xml`;
        fs.writeFileSync(path.resolve(htmlOutputBase, 'robots.txt'), robotsContent);

        // Crea il file .htaccess per gestire i redirect
        const htaccessContent = `# Forza HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect da non-www a www
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Altre regole di rewrite
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Gestisci file specifici senza estensione
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^moscanellammerda$ moscanellammerda.html [L]
  
  # Assicurati che il percorso main.js funzioni
  RewriteRule ^main\.js$ /main.js [L]
</IfModule>

# Migliora la sicurezza
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compressione Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>

# Cache control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`;
        fs.writeFileSync(path.resolve(htmlOutputBase, '.htaccess'), htaccessContent);

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
        fs.writeFileSync(path.resolve(htmlOutputBase, 'sitemap.xml'), sitemapContent);

        // Assicurati che ci sia la directory stylesheets
        const stylesheetsDir = path.resolve(htmlOutputBase, 'stylesheets');
        if (!fs.existsSync(stylesheetsDir)) {
          fs.mkdirSync(stylesheetsDir, { recursive: true });
        }

        // ============ Generazione fallback ============
        // Se non è stato possibile processare index.html, creane uno di fallback
        if (!indexProcessed) {
          console.warn('File index.html corrotto o mancante. Creazione di un fallback...');

          // Se abbiamo un index.html nella root, copialo
          if (fs.existsSync('./index.html')) {
            let content = fs.readFileSync('./index.html', 'utf-8');
            content = fixPaths(content);
            fs.writeFileSync(path.resolve(htmlOutputBase, 'index.html'), content);
          } else {
            // Altrimenti, crea un file HTML minimo
            const fallbackHtml = `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JOSHUARTE | Frontend Developer &amp; UI/UX Designer</title>
    <link rel="stylesheet" href="./stylesheets/app.css">
  </head>
  <body>
    <h1>JOSHUARTE</h1>
    <p>Sito in manutenzione</p>
    <script type="module" src="./main.js"></script>
  </body>
</html>`;
            fs.writeFileSync(path.resolve(htmlOutputBase, 'index.html'), fallbackHtml);
          }
        }

        // Stesso procedimento per moscanellammerda.html
        if (!mnmProcessed && fs.existsSync('./moscanellammerda.html')) {
          let content = fs.readFileSync('./moscanellammerda.html', 'utf-8');
          content = fixPaths(content);
          fs.writeFileSync(path.resolve(htmlOutputBase, 'moscanellammerda.html'), content);
        }

        // Rimuovi eventuali file .html.html duplicati
        fs.readdirSync(path.resolve(htmlOutputBase))
          .filter(file => file.endsWith('.html.html'))
          .forEach(file => {
            fs.unlinkSync(path.resolve(htmlOutputBase, file));
            console.log(`Rimosso file duplicato: ${file}`);
          });
      }
    };
  };

  // Plugin per la verifica finale della build
  const buildVerificationPlugin = () => {
    return {
      name: 'build-verification',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        console.log('\n✅ Build completata! I file sono stati generati nella cartella dist.\n');

        // Verifica i file essenziali
        const essentialFiles = [
          { path: 'dist/index.html', name: 'index.html' },
          { path: 'dist/main.js', name: 'main.js' },
          { path: 'dist/stylesheets/app.css', name: 'stylesheets/app.css' }
        ];

        let allFilesExist = true;

        essentialFiles.forEach(file => {
          if (!fs.existsSync(path.resolve(file.path))) {
            console.error(`❌ ERRORE: ${file.name} non trovato!`);
            allFilesExist = false;
          }
        });

        if (allFilesExist) {
          console.log('✅ Tutti i file principali sono stati generati correttamente.');
          console.log('🔷 Ora puoi caricare la cartella dist sul tuo server.');
        } else {
          console.error('⚠️ Alcuni file principali non sono stati generati. La build potrebbe non funzionare correttamente.');
        }
      }
    };
  };

  // Plugin per la compilazione degli stili critici
  const criticalStylesPlugin = () => {
    return {
      name: 'critical-styles',
      enforce: 'post',
      buildStart() {
        // Compila gli stili critici
        try {
          const criticalPath = path.resolve('src/stylesheets/critical.scss');
          const result = sass.compile(criticalPath);
          const template = `<style>\n${result.css}\n</style>`;
          fs.writeFileSync('src/html/shared/critical-styles.njk', template);
          console.log('Template critical-styles.njk aggiornato con successo');
        } catch (error) {
          console.error('Errore nella compilazione SCSS:', error);
        }
      },
      handleHotUpdate({ file }) {
        if (file === path.resolve('src/stylesheets/critical.scss')) {
          console.log('File critical.scss modificato, aggiorno il template...');
          try {
            const criticalPath = path.resolve('src/stylesheets/critical.scss');
            const result = sass.compile(criticalPath);
            const template = `<style>\n${result.css}\n</style>`;
            fs.writeFileSync('src/html/shared/critical-styles.njk', template);
            console.log('Template critical-styles.njk aggiornato con successo');
          } catch (error) {
            console.error('Errore nella compilazione SCSS:', error);
          }
        }
      }
    };
  };

  // Plugin per fissare i percorsi nei file HTML in modalità dev
  const devPathFixPlugin = () => {
    return {
      name: 'dev-path-fix',
      apply: 'serve',
      enforce: 'post',
      configResolved() {
        // Correggi i percorsi nei file HTML
        const fixHtmlPaths = () => {
          const files = ['index.html', 'moscanellammerda.html'];

          files.forEach(file => {
            const filePath = path.resolve(file);
            if (!fs.existsSync(filePath)) return;

            let content = fs.readFileSync(filePath, 'utf-8');

            // Correggi i percorsi per la modalità dev
            content = content.replace(
              /<script type="module" src=".\/main.js"><\/script>/g,
              `<script type="module" src="/src/main.js"></script>`
            );

            // In development, i CSS vengono iniettati da Vite
            content = content.replace(
              /<link rel="stylesheet" href=".*stylesheets\/app.css" \/>/g,
              ``
            );

            fs.writeFileSync(filePath, content);
            console.log(`Corretti percorsi per modalità dev in ${file}`);
          });
        };

        // Esegui la correzione dopo un breve timeout per assicurarsi che i file siano stati generati
        setTimeout(fixHtmlPaths, 1000);
      }
    };
  };

  // Plugin per modificare i template HTML di Nunjucks in modalità dev
  const customNunjucksPlugin = () => {
    return {
      name: 'custom-nunjucks-plugin',
      apply: 'serve',
      enforce: 'pre',
      transform(code, id) {
        // Modifica solo il file application.html
        if (id.endsWith('src/html/layouts/application.html')) {
          return code.replace(
            /<script type="module" src="\.\/main.js"><\/script>/g,
            `<script type="module" src="/src/main.js"></script>`
          );
        }

        return code;
      }
    };
  };

  return {
    // Configurazione base
    assetsInclude: ['**/*.njk', '**/*.html'],

    // Plugins
    plugins: [
      // Plugin per gli stili critici (sia in build che in dev)
      criticalStylesPlugin(),

      // Plugin per modificare i template in modalità dev
      !isBuild ? customNunjucksPlugin() : null,

      // Plugin nunjucks solo in development
      !isBuild ? nunjucksPlugin([
        {
          templatesDir: "./src/html",
          templateFile: "index.njk",
          outputFile: "./index.html",
          context: () => {
            const globalData = JSON.parse(
              fs.readFileSync("./src/html/data/global.json", "utf-8")
            );
            return { ...globalData.home };
          },
        },
        {
          templatesDir: "./src/html",
          templateFile: "moscanellammerda.njk",
          outputFile: "./moscanellammerda.html",
          context: () => {
            const globalData = JSON.parse(
              fs.readFileSync("./src/html/data/global.json", "utf-8")
            );
            return { ...globalData.mnm };
          },
        },
      ]) : null,

      // Plugin per fix dei percorsi in dev mode
      !isBuild ? devPathFixPlugin() : null,

      // Plugins solo per modalità build
      isBuild ? buildNunjucksPlugin() : null,
      isBuild ? htmlPostProcessPlugin() : null,
      isBuild ? buildVerificationPlugin() : null,

      // Middleware per il routing personalizzato in dev
      {
        name: "custom-route-middleware",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Gestione URL senza estensione
            if (req.url === "/moscanellammerda") {
              req.url = "/moscanellammerda.html";
            }

            // Rewrite per ./main.js a /src/main.js
            if (req.url === "/main.js") {
              req.url = "/src/main.js";
              console.log("Rewrite: /main.js -> /src/main.js");
            }

            next();
          });
        },
      },
      
      // Plugin per minificare HTML in build mode
      isBuild ? {
        name: 'html-minify',
        apply: 'build',
        enforce: 'post',
        transformIndexHtml(html) {
          const minify = (html) => {
            return html
              .replace(/<!--(?!<!)[^\[>][\s\S]*?-->/g, '') // rimuove commenti
              .replace(/\s{2,}/g, ' ') // rimuove spazi multipli
              .replace(/>\s+</g, '><') // rimuove spazi tra tag
              .replace(/\s+\/>/g, '/>'); // rimuove spazi prima della chiusura di tag self-closing
          };
          return minify(html);
        }
      } : null
    ].filter(Boolean),

    // Configurazione build
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsInlineLimit: 0, // Non fare inlining degli asset
      minify: 'terser', // Utilizza terser per minificare JavaScript
      terserOptions: {
        compress: {
          drop_console: true, // Rimuove i console.log
          drop_debugger: true // Rimuove i debugger
        }
      },
      cssMinify: true, // Abilita la minificazione CSS
      rollupOptions: {
        input: path.resolve(__dirname, 'src/main.js'),
        output: {
          entryFileNames: 'main.js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `images/[name][extname]`;
            }

            if (/\.(css)$/i.test(assetInfo.name)) {
              return `stylesheets/app.css`;
            }

            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `fonts/[name][extname]`;
            }

            return `assets/[name][extname]`;
          }
        }
      }
    },

    // Configurazione server di sviluppo
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
