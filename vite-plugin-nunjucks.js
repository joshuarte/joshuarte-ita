import nunjucks from "nunjucks";
import fs from "fs";
import path from "path";

export default function nunjucksPlugin({
  templatesDir = "./src/html",
  outputFile = "./index.html",
  context = {},
} = {}) {
  return {
    name: "vite-plugin-nunjucks",
    apply: "serve",
    configureServer(server) {
      const compile = () => {
        const env = nunjucks.configure(templatesDir, { autoescape: true });
        const rendered = env.render("index.njk", context);
        fs.writeFileSync(outputFile, rendered);
        console.log(`[nunjucks] Recompiled ${outputFile}`);
      };

      compile();

      server.watcher.add(templatesDir);
      server.watcher.on("change", (file) => {
        if (file.startsWith(templatesDir)) {
          compile();
        }
      });
    },
  };
}
