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
        });

        pages.forEach(({ templateFile, outputFile, context }) => {
          const rendered = env.render(templateFile, context);

          // In modalità DEV, salva nella root del progetto
          fs.writeFileSync(outputFile, rendered);
          console.log(`[nunjucks] Compiled ${templateFile} → ${outputFile}`);
        });
      };

      compile();

      // Listener per il watch di tutte le directory di template
      pages.forEach(({ templatesDir }) => {
        server.watcher.add(templatesDir);
      });

      server.watcher.on("change", (file) => {
        if (pages.some(({ templatesDir }) => file.startsWith(templatesDir))) {
          compile();
        }
      });
    },
  };
}
