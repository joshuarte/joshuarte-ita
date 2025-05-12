import nunjucks from "nunjucks";
import fs from "fs";
import path from "path";

export default function nunjucksPlugin(pages = []) {
  return {
    name: "vite-plugin-nunjucks",
    apply: "serve",
    configureServer(server) {
      const compile = () => {
        const env = nunjucks.configure(pages[0].templatesDir, {
          autoescape: true,
          watch: true
        });

        pages.forEach(({ templateFile, outputFile, context }) => {
          const rendered = env.render(templateFile, context);
          const outputPath = path.resolve(outputFile);
          fs.writeFileSync(outputPath, rendered);
          console.log(`[nunjucks] Compiled ${templateFile} → ${outputFile}`);
        });
      };

      // Compila inizialmente
      compile();

      // Watch solo per i file di template e dati, escludendo gli HTML generati
      const watchPaths = [
        ...pages.map(p => p.templatesDir),
        path.resolve('./src/html/data')
      ];

      watchPaths.forEach(path => {
        server.watcher.add(path);
      });

      // Lista dei file HTML generati
      const generatedHtmlFiles = pages.map(p => path.resolve(p.outputFile));

      // Gestione dei cambiamenti
      server.watcher.on("change", async (file) => {
        // Ignora i file HTML generati
        if (generatedHtmlFiles.includes(path.resolve(file))) {
          return;
        }

        console.log(`File modificato: ${file}`);
        
        // Piccolo delay per assicurarci che il file sia stato scritto completamente
        await new Promise(resolve => setTimeout(resolve, 100));
        
        compile();
        
        // Forza il reload del browser
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      });

      // Middleware per servire i file HTML aggiornati
      server.middlewares.use((req, res, next) => {
        const url = req.url;
        if (url.endsWith('.html')) {
          compile();
        }
        next();
      });
    },
  };
}
