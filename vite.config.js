import { defineConfig } from "vite";
import nunjucksPlugin from "./vite-plugin-nunjucks.js";
import fs from "fs";
import path from "path";
import * as sass from 'sass';
import nunjucks from 'nunjucks';
import * as glob from 'glob';
import sharp from 'sharp';

// Determina se siamo in produzione o sviluppo
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig(({ command }) => {
  // Determina se siamo in modalità build o dev
  const isBuild = command === 'build';

  // Configurazione dei percorsi di output in base alla modalità
  const htmlOutputBase = isBuild ? './dist' : '.';

  // Plugin per generare WebP durante la build
  const webpConverterPlugin = () => {
    return {
      name: 'webp-converter',
      apply: 'build',
      enforce: 'post',
      closeBundle: async () => {
        // Prima di tutto verifica che il file moscanellammerda.html esista ancora
        const mnmHtmlPath = path.resolve('dist/moscanellammerda.html');
        let mnmHtmlContent = null;
        
        if (fs.existsSync(mnmHtmlPath)) {
          // Salva il contenuto per ripristinarlo in seguito se necessario
          mnmHtmlContent = fs.readFileSync(mnmHtmlPath, 'utf-8');
        }
        
        const imageExtensions = ['jpg', 'jpeg', 'png'];
        const outputDir = path.resolve('dist');
        const imageFiles = [];

        // Trova tutte le immagini nella cartella dist
        for (const ext of imageExtensions) {
          const files = await glob.glob(`${outputDir}/**/*.${ext}`);
          imageFiles.push(...files);
        }

        console.log(`Convertendo ${imageFiles.length} immagini in WebP e AVIF...`);

        // Converti ogni immagine in WebP e AVIF
        const conversionPromises = imageFiles.map(async (file) => {
          const webpOutputPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const avifOutputPath = file.replace(/\.(jpg|jpeg|png)$/i, '.avif');
          
          const isBackgroundImage = file.includes('bg.jpg') || file.includes('bg.jpeg') || file.includes('bg.png');
          
          try {
            // Ottimizzazione speciale per l'immagine di sfondo (più aggressiva)
            if (isBackgroundImage) {
              // Ottimizza l'immagine originale
              const optimizedBuffer = await sharp(file)
                .resize({ width: 1920, withoutEnlargement: true }) // Limita dimensione massima
                .jpeg({ 
                  quality: 75,
                  progressive: true,
                  mozjpeg: true // Usa mozjpeg per una maggiore compressione
                })
                .toBuffer();
              
              // Salva l'immagine originale ottimizzata
              await sharp(optimizedBuffer).toFile(file);
              console.log(`Ottimizzato originale: ${path.basename(file)} (risparmio: ${Math.round((fs.statSync(file).size - optimizedBuffer.length) / 1024)} KB)`);
              
              // Crea versione WebP
              await sharp(optimizedBuffer)
                .webp({ quality: 75, effort: 6 })
                .toFile(webpOutputPath);
              console.log(`Convertito sfondo in WebP: ${path.basename(file)} → ${path.basename(webpOutputPath)}`);
              
              // Crea versione AVIF (migliore compressione ma supporto browser più limitato)
              await sharp(optimizedBuffer)
                .avif({ quality: 65, effort: 9 })
                .toFile(avifOutputPath);
              console.log(`Convertito sfondo in AVIF: ${path.basename(file)} → ${path.basename(avifOutputPath)}`);
            } else {
              // Conversione standard per le altre immagini
              await sharp(file)
                .webp({ quality: 80, effort: 5 })
                .toFile(webpOutputPath);
              
              await sharp(file)
                .avif({ quality: 70, effort: 7 })
                .toFile(avifOutputPath);
              
              console.log(`Convertito: ${path.basename(file)} → ${path.basename(webpOutputPath)}, ${path.basename(avifOutputPath)}`);
            }
          } catch (error) {
            console.error(`Errore nella conversione di ${file}:`, error.message);
          }
        });

        await Promise.all(conversionPromises);
        console.log('Conversione WebP e AVIF completata.');

        // Aggiorna i riferimenti alle immagini nei file HTML
        await updateHtmlImageReferences(outputDir);
        
        // Verifica e ripristina il file moscanellammerda.html se necessario
        if (mnmHtmlContent && !fs.existsSync(mnmHtmlPath)) {
          console.log('Ripristino il file moscanellammerda.html che potrebbe essere stato eliminato...');
          fs.writeFileSync(mnmHtmlPath, mnmHtmlContent);
        }
      }
    };
  };

  // Funzione per aggiornare i riferimenti alle immagini nei file HTML
  async function updateHtmlImageReferences(outputDir) {
    const htmlFiles = await glob.glob(`${outputDir}/**/*.html`);
    
    htmlFiles.forEach(file => {
      let content = fs.readFileSync(file, 'utf-8');
      
      // Aggiungi il supporto per picture/source con WebP e AVIF
      content = content.replace(
        /<img([^>]*)src=['"]([^'"]+\.(jpg|jpeg|png))['"]([^>]*)>/gi,
        (match, before, src, ext, after) => {
          const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
          
          // Aggiungi lazy loading alle immagini che non sono LCP (Largest Contentful Paint)
          let lazyLoading = '';
          if (!src.includes('bg.jpg') && !src.includes('bg.jpeg') && !src.includes('bg.png')) {
            lazyLoading = ' loading="lazy"';
          }
          
          return `<picture>
            <source srcset="${avifSrc}" type="image/avif">
            <source srcset="${webpSrc}" type="image/webp">
            <img${before}src="${src}"${lazyLoading}${after}>
          </picture>`;
        }
      );
      
      fs.writeFileSync(file, content);
    });
    
    console.log(`Aggiornati riferimenti alle immagini in ${htmlFiles.length} file HTML.`);
  }

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
          },
          {
            templateFile: "404.njk",
            outputFile: `${htmlOutputBase}/404.html`,
            context: () => {
              const globalData = JSON.parse(
                fs.readFileSync("./src/html/data/global.json", "utf-8")
              );
              return { ...globalData["404"] };
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
        let errorPageProcessed = processHtmlFile(path.resolve(htmlOutputBase, '404.html'));

        // Assicurati che il file moscanellammerda.html esista
        if (!mnmProcessed || !fs.existsSync(path.resolve(htmlOutputBase, 'moscanellammerda.html'))) {
          console.warn('File moscanellammerda.html mancante o corrotto. Rigenerazione in corso...');
          
          try {
            const env = nunjucks.configure('./src/html', {
              autoescape: true
            });
            
            const globalData = JSON.parse(
              fs.readFileSync("./src/html/data/global.json", "utf-8")
            );
            
            const rendered = env.render("moscanellammerda.njk", { ...globalData.mnm });
            fs.writeFileSync(path.resolve(htmlOutputBase, 'moscanellammerda.html'), rendered);
            
            console.log('File moscanellammerda.html rigenerato con successo');
            mnmProcessed = true;
          } catch (error) {
            console.error('Errore durante la rigenerazione di moscanellammerda.html:', error);
          }
        }

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
        const htaccessContent = `# .htaccess semplificato

# Abilita il modulo rewrite
RewriteEngine On

# Assicurati che l'encoding UTF-8 sia gestito correttamente
AddDefaultCharset UTF-8

# Imposta la pagina 404 personalizzata
ErrorDocument 404 /404.html

# Gestisci estensioni .html in modo interno (senza redirect)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# Gestisci percorso specifico per moscanellammerda
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^moscanellammerda$ moscanellammerda.html [L]

# Cache control ottimizzato
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType text/javascript "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# Compressione Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
  AddOutputFilterByType DEFLATE application/xml application/xhtml+xml application/rss+xml
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
            <loc>https://www.joshuarte.it/moscanellammerda</loc>
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
    <link rel="stylesheet" href="./stylesheets/app.css" />
  </head>
  <body>
    <main>
      <h1>JOSHUARTE</h1>
      <p>Pagina in manutenzione</p>
      <a href="/">Torna alla home</a>
    </main>
    <script type="module" src="./main.js"></script>
  </body>
</html>`;
            fs.writeFileSync(path.resolve(htmlOutputBase, 'index.html'), fallbackHtml);
          }
        }

        // Se non è stato possibile processare la pagina 404, crea un fallback
        if (!errorPageProcessed) {
          console.warn('File 404.html corrotto o mancante. Creazione di un fallback...');
          
          const fallbackErrorHtml = `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Pagina non trovata | JOSHUARTE</title>
    <link rel="stylesheet" href="./stylesheets/app.css" />
    <style>
      .error-page {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .error-page h1 {
        font-size: 6rem;
        margin: 0;
      }
      .error-page a {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <main class="error-page">
      <div>
        <h1>404</h1>
        <p>Pagina non trovata</p>
        <a href="/">Torna alla home</a>
      </div>
    </main>
    <script type="module" src="./main.js"></script>
  </body>
</html>`;
          fs.writeFileSync(path.resolve(htmlOutputBase, '404.html'), fallbackErrorHtml);
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

  // Funzione di utilità per compilare gli stili critici
  function compileCriticalStyles() {
    try {
      const criticalPath = path.resolve('src/stylesheets/critical.scss');
      // Verifica che il file esista prima di procedere
      if (!fs.existsSync(criticalPath)) {
        console.error(`File non trovato: ${criticalPath}`);
        return;
      }

      console.log('Compilo gli stili critici...');

      const result = sass.compile(criticalPath, {
        style: isProd ? "compressed" : "expanded",
        loadPaths: ['node_modules', 'src/stylesheets'],
        sourceMap: !isProd,
        sourceMapIncludeSources: !isProd,
        importers: [{
          findFileUrl(url) {
            if (url.startsWith('~')) {
              return new URL(`file://${path.resolve('node_modules', url.substring(1))}`);
            }
            return null;
          }
        }]
      });

      // Assicurati che il commento di chiusura sia completamente rimosso e poi aggiunto correttamente
      let css = result.css;

      // Rimuovi eventuali commenti aperti alla fine
      css = css.replace(/\/\*([^*]*\*+[^*/])*[^*]*\*+\/|\/\*[^*]*(\*(?!\/)[^*]*)*$/g, '');

      // Aggiungi il commento di chiusura
      const template = `<style>\n${css}\n\n/* Fine stili critici */\n</style>`;
      const outputPath = path.resolve('src/html/shared/critical-styles.njk');

      // Assicurati che la directory esista
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, template);
      console.log('Template critical-styles.njk aggiornato con successo!');
    } catch (error) {
      console.error('Errore nella compilazione SCSS:', error.message);
      console.error(error.stack);
    }
  }

  // Plugin per la compilazione degli stili critici
  const criticalStylesPlugin = () => {
    return {
      name: 'critical-styles',
      enforce: 'post',
      buildStart() {
        compileCriticalStyles();
      },
      handleHotUpdate({ file }) {
        if (file === path.resolve('src/stylesheets/critical.scss')) {
          console.log('File critical.scss modificato, aggiorno il template...');
          compileCriticalStyles();
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

  // Plugin per copiare le immagini ottimizzate durante la build
  const optimizedImagesCopyPlugin = () => {
    return {
      name: 'optimized-images-copy',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        console.log('Copiando le immagini ottimizzate...');
        
        const sourceDir = path.resolve('public/images-optimized');
        const destDir = path.resolve('dist/images');
        
        // Assicurati che la directory di destinazione esista
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Leggi tutti i file nella directory sorgente
        const files = fs.readdirSync(sourceDir);
        
        // Copia ogni file nella directory di destinazione
        files.forEach(file => {
          const sourcePath = path.join(sourceDir, file);
          const destPath = path.join(destDir, file);
          
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copiato: ${file} (${Math.round(fs.statSync(sourcePath).size / 1024)} KB)`);
        });
        
        console.log('Immagini ottimizzate copiate con successo!');
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
        closeBundle() {
          console.log('Minificazione HTML in corso...');
          const htmlFiles = fs.readdirSync(path.resolve(htmlOutputBase))
            .filter(file => file.endsWith('.html'));
            
          // Funzione per minificare HTML
          const minifyHtml = (content) => {
            return content
              // Rimuovi il carattere BOM o altri caratteri invisibili all'inizio del file
              .replace(/^\ufeff|\u200b/g, '')
              // Rimuovi commenti HTML (ma mantieni i conditional comments per IE)
              .replace(/<!--(?!<!)[^\[>][\s\S]*?-->/g, '')
              // Rimuovi spazi multipli
              .replace(/\s{2,}/g, ' ')
              // Rimuovi spazi tra tag
              .replace(/>\s+</g, '><')
              // Rimuovi spazi prima della chiusura di tag self-closing
              .replace(/\s+\/>/g, '/>')
              // Rimuovi spazi all'inizio e alla fine delle linee
              .replace(/^\s+|\s+$/gm, '');
          };
          
          // Processa ogni file HTML
          htmlFiles.forEach(file => {
            const filePath = path.resolve(htmlOutputBase, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            
            // Minifica il contenuto
            content = minifyHtml(content);
            
            // Scrivi il file minificato
            fs.writeFileSync(filePath, content);
            console.log(`HTML minificato: ${file}`);
          });
          
          console.log('Minificazione HTML completata!');
        }
      } : null,

      // Plugin per convertire le immagini in WebP (solo in build)
      isBuild ? webpConverterPlugin() : null,
      
      // Plugin per copiare le immagini ottimizzate (solo in build)
      isBuild ? optimizedImagesCopyPlugin() : null,
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
