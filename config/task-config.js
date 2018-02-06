module.exports = {
  html:  {
    min: true,
    excludeFolders: ["layouts", "shared", "macros", "data", "components"], 
  },
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,

  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    sass: {
      indentedSyntax: false,
      includePaths: [
        "./node_modules",
      ]
    },
    extensions: ["sass", "scss", "css"]
  },

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  },

  production: {
    rev: false
  }
}

